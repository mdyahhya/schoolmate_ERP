const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Initialize database & run migrations on startup
const { db, dbAll, dbGet, dbRun, dbExec, dbPath, backupDir, dataDir } = require('../database/db');
const { runMigrations } = require('../database/migration');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 720,
    show: false, // Show once ready to prevent visual flicker
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
  mainWindow.maximize();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Enable keyboard shortcut for DevTools
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });
}

// Start application and run migrations before window creation
app.whenReady().then(async () => {
  try {
    await runMigrations();
  } catch (err) {
    console.error('Migration failed during startup:', err);
  }
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Safely close database connection
    try {
      if (db) {
        db.close((err) => {
          if (err) console.error('Error closing database:', err);
          else console.log('Database connection closed.');
          app.quit();
        });
      } else {
        app.quit();
      }
    } catch (e) {
      console.error('Error closing database:', e);
      app.quit();
    }
  }
});

// =============================================================================
// IPC HANDLERS FOR DATABASE ACTIONS
// =============================================================================

ipcMain.handle('db-all', async (event, sql, params = []) => {
  try {
    const data = await dbAll(sql, params);
    return { success: true, data };
  } catch (err) {
    console.error('db-all error:', err, 'SQL:', sql, 'Params:', params);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('db-get', async (event, sql, params = []) => {
  try {
    const data = await dbGet(sql, params);
    return { success: true, data };
  } catch (err) {
    console.error('db-get error:', err, 'SQL:', sql, 'Params:', params);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('db-run', async (event, sql, params = []) => {
  try {
    const data = await dbRun(sql, params);
    return { success: true, data };
  } catch (err) {
    console.error('db-run error:', err, 'SQL:', sql, 'Params:', params);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('db-transaction', async (event, queries) => {
  // queries = [ { sql: '...', params: [...] }, ... ]
  await dbExec('BEGIN TRANSACTION');
  try {
    const results = [];
    for (const q of queries) {
      const res = await dbRun(q.sql, q.params || []);
      results.push(res);
    }
    await dbExec('COMMIT');
    return { success: true, data: results };
  } catch (err) {
    await dbExec('ROLLBACK');
    console.error('db-transaction error:', err);
    return { success: false, error: err.message };
  }
});

// =============================================================================
// IPC HANDLERS FOR BACKUPS & SYSTEM
// =============================================================================

ipcMain.handle('backup-create', async (event, type = 'Manual') => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `school_erp_backup_${timestamp}.db`;
    const destPath = path.join(backupDir, filename);

    // Use SQLite native VACUUM INTO to create a safe backup while running
    await dbRun(`VACUUM INTO ?`, [destPath]);
    
    // Log success in db
    await dbRun('INSERT INTO backups_log (backup_path, backup_type, status) VALUES (?, ?, ?)', [destPath, type, 'Success']);

    return { success: true, path: destPath, filename };
  } catch (err) {
    console.error('Backup creation failed:', err);
    try {
      await dbRun('INSERT INTO backups_log (backup_path, backup_type, status) VALUES (?, ?, ?)', ['N/A', type, 'Failed']);
    } catch (e) {}
    return { success: false, error: err.message };
  }
});

ipcMain.handle('backup-list', async () => {
  try {
    const logs = await dbAll('SELECT * FROM backups_log ORDER BY created_at DESC');
    return { success: true, data: logs };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('backup-restore', async (event, backupFilePath) => {
  try {
    if (!fs.existsSync(backupFilePath)) {
      return { success: false, error: 'Backup file does not exist.' };
    }

    // Close active db connection before writing over
    await new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Copy backup over active db path
    fs.copyFileSync(backupFilePath, dbPath);

    // Restart connection by reloading the module or reconnecting
    const reconnect = () => {
      const sqlite3 = require('sqlite3').verbose();
      const newDb = new sqlite3.Database(dbPath, (err) => {
        if (err) console.error('Reconnect failed:', err);
        else {
          newDb.run('PRAGMA foreign_keys = ON;');
          newDb.run('PRAGMA journal_mode = WAL;');
        }
      });
      
      // Update exports on the cached module
      const dbModule = require('../database/db');
      dbModule.db = newDb;
    };
    
    reconnect();

    return { success: true };
  } catch (err) {
    console.error('Backup restore failed:', err);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('select-backup-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Backup Database File',
    defaultPath: backupDir,
    filters: [
      { name: 'SQLite Database', extensions: ['db'] }
    ],
    properties: ['openFile']
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { success: false, canceled: true };
  }
  return { success: true, filePath: result.filePaths[0] };
});

ipcMain.handle('print-pdf', async (event) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: 'Save Report as PDF',
      defaultPath: path.join(dataDir, 'documents', 'report.pdf'),
      filters: [{ name: 'PDF Documents', extensions: ['pdf'] }]
    });

    if (result.canceled || !result.filePath) {
      return { success: false, canceled: true };
    }

    const options = {
      marginsType: 1, // Minimum margins
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false
    };

    const data = await mainWindow.webContents.printToPDF(options);
    fs.writeFileSync(result.filePath, data);
    return { success: true, filePath: result.filePath };
  } catch (err) {
    console.error('PDF printing failed:', err);
    return { success: false, error: err.message };
  }
});
