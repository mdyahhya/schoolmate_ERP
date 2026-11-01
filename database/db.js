const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Determine data directory (portable, in the application directory)
const appRoot = path.join(__dirname, '..');
const dataDir = path.join(appRoot, 'data');
const dbDir = path.join(dataDir, 'database');
const backupDir = path.join(dataDir, 'backups');
const imagesDir = path.join(dataDir, 'images');

// Ensure essential directories exist
[dataDir, dbDir, backupDir, imagesDir, 
 path.join(imagesDir, 'students'), 
 path.join(imagesDir, 'teachers'), 
 path.join(imagesDir, 'school'), 
 path.join(imagesDir, 'misc'),
 path.join(dataDir, 'documents')
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const dbPath = path.join(dbDir, 'school-erp.db');
console.log(`Connecting to database at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err);
  } else {
    console.log('Successfully connected to SQLite database.');
    // Enable foreign keys constraints support and WAL mode
    db.run('PRAGMA foreign_keys = ON;');
    db.run('PRAGMA journal_mode = WAL;');
  }
});

// Promise-based wrappers for async queries
const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes, lastInsertRowid: this.lastID });
    });
  });
};

const dbExec = (sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  db,
  dbAll,
  dbGet,
  dbRun,
  dbExec,
  dbPath,
  dataDir,
  backupDir,
  imagesDir
};
