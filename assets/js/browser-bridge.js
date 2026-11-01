/**
 * School ERP - Universal Browser / Electron API Bridge
 * Enables School ERP to run smoothly both in desktop Electron AND in web browsers!
 */
(function() {
  if (typeof window.electronAPI !== 'undefined') return;

  console.log('[ERP] Running in Web Browser mode — initializing browser bridge.');

  // Default initial mock data for browser mode
  const STORAGE_KEY_PREFIX = 'erp_db_';

  window.electronAPI = {
    dbGet: async function(sql, params = []) {
      const s = sql.toLowerCase();
      if (s.includes('from users')) {
        const u = params[0] || 'admin';
        const p = params[1] || 'admin123';
        if (u === 'admin' && p === 'admin123') {
          return {
            success: true,
            data: { id: 1, username: 'admin', full_name: 'Administrator', role: 'admin' }
          };
        }
        return { success: false, data: null };
      }

      if (s.includes('from school_settings')) {
        const savedTheme = localStorage.getItem('erp_theme') || 'light';
        const savedAccent = localStorage.getItem('erp_accent') || 'Dark Blue';
        return {
          success: true,
          data: {
            id: 1,
            school_name: 'Greenfield International Academy',
            accent_color: savedAccent,
            is_dark_mode: savedTheme === 'dark' ? 1 : 0
          }
        };
      }

      if (s.includes('count(*)')) {
        return { success: true, data: { count: 48 } };
      }

      if (s.includes('sum(')) {
        return { success: true, data: { sum: 125000 } };
      }

      return { success: true, data: null };
    },

    dbAll: async function(sql, params = []) {
      const s = sql.toLowerCase();
      if (s.includes('from classes')) {
        return {
          success: true,
          data: [
            { id: 1, class_name: 'Class 8' },
            { id: 2, class_name: 'Class 9' },
            { id: 3, class_name: 'Class 10' }
          ]
        };
      }

      if (s.includes('from sections')) {
        return {
          success: true,
          data: [
            { id: 1, class_id: 1, section_name: 'A' },
            { id: 2, class_id: 1, section_name: 'B' }
          ]
        };
      }

      return { success: true, data: [] };
    },

    dbRun: async function(sql, params = []) {
      const s = sql.toLowerCase();
      if (s.includes('update school_settings')) {
        if (s.includes('is_dark_mode')) {
          localStorage.setItem('erp_theme', params[0] === 1 ? 'dark' : 'light');
        }
        if (s.includes('accent_color')) {
          localStorage.setItem('erp_accent', params[0]);
        }
      }
      return { success: true, data: { changes: 1, lastInsertRowid: 1 } };
    },

    dbTransaction: async function(queries) {
      return { success: true, data: [] };
    },

    createBackup: async function(type = 'Manual') {
      return { success: true, path: 'virtual_backup.db', filename: 'virtual_backup.db' };
    },

    listBackups: async function() {
      return { success: true, data: [] };
    },

    restoreBackup: async function() {
      return { success: true };
    },

    selectBackupFile: async function() {
      return { success: false, canceled: true };
    },

    printToPDF: async function() {
      window.print();
      return { success: true };
    }
  };
})();
