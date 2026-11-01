const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Database Query Layer
  dbAll: (sql, params) => ipcRenderer.invoke('db-all', sql, params),
  dbGet: (sql, params) => ipcRenderer.invoke('db-get', sql, params),
  dbRun: (sql, params) => ipcRenderer.invoke('db-run', sql, params),
  dbTransaction: (queries) => ipcRenderer.invoke('db-transaction', queries),

  // Backup Management Layer
  createBackup: (type) => ipcRenderer.invoke('backup-create', type),
  listBackups: () => ipcRenderer.invoke('backup-list'),
  restoreBackup: (filePath) => ipcRenderer.invoke('backup-restore', filePath),
  selectBackupFile: () => ipcRenderer.invoke('select-backup-file'),

  // PDF Printing Layer
  printToPDF: () => ipcRenderer.invoke('print-pdf')
});
