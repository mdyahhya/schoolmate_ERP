/* =============================================================================
   SCHOOL ERP — SHARED SHELL SCRIPT (shell.js)
   ============================================================================= */
if (typeof window.electronAPI === 'undefined') {
  const script = document.createElement('script');
  script.src = 'assets/js/browser-bridge.js';
  document.head.appendChild(script);
}


/* --------------------------------------------------------------------------
   1.  NAVIGATION MANIFEST  (filename → { label, icon })
   -------------------------------------------------------------------------- */
const NAV_ITEMS = [
  { file: 'dashboard.html',     icon: 'dashboard',    label: 'Dashboard'            },
  { file: 'admission.html',     icon: 'admissions',   label: 'Admissions & Enquiry' },
  { file: 'students.html',      icon: 'students',     label: 'Student Information'  },
  { file: 'teachers.html',      icon: 'teachers',     label: 'Teacher Management'   },
  { file: 'staff.html',         icon: 'user',         label: 'Staff Management'     },
  { file: 'attendance.html',    icon: 'attendance',   label: 'Attendance Logs'      },
  { file: 'academics.html',     icon: 'school',       label: 'Academics & Timetable'},
  { file: 'exams.html',         icon: 'examination',  label: 'Exams & Results'      },
  { file: 'finance.html',       icon: 'finance',      label: 'Fees & Finance'       },
  { file: 'communication.html', icon: 'notification', label: 'Communication'        },
  { file: 'transport.html',     icon: 'transport',    label: 'Transport Log'        },
  { file: 'hostel.html',        icon: 'hostel',       label: 'Hostel System'        },
  { file: 'calendar.html',      icon: 'calendar',     label: 'Academic Calendar'    },
  { file: 'reports.html',       icon: 'reports',      label: 'Reports Generator'    },
  { file: 'settings.html',      icon: 'settings',     label: 'System Settings'      },
];

/* --------------------------------------------------------------------------
   2.  ACCENT COLORS — mirror of app.js so shell can apply on every page
   -------------------------------------------------------------------------- */
const SHELL_ACCENT_COLORS = {
  'Dark Blue':  { color: '#1e40af', hover: '#1d4ed8', light: '#eff6ff',  glow: 'rgba(30, 64, 175, 0.15)'  },
  'Black':      { color: '#0f172a', hover: '#020617', light: '#f1f5f9',  glow: 'rgba(15, 23, 42, 0.15)'   },
  'Charcoal':   { color: '#334155', hover: '#1e293b', light: '#f8fafc',  glow: 'rgba(51, 65, 85, 0.15)'   },
  'Burgundy':   { color: '#881337', hover: '#4c0519', light: '#fff1f2',  glow: 'rgba(136, 19, 55, 0.15)'  },
  'Emerald':    { color: '#059669', hover: '#047857', light: '#ecfdf5',  glow: 'rgba(5, 150, 105, 0.15)'  },
  'Ocean Blue': { color: '#0284c7', hover: '#0369a1', light: '#f0f9ff',  glow: 'rgba(2, 132, 199, 0.15)'  },
  'Coral':      { color: '#f43f5e', hover: '#e11d48', light: '#fff1f2',  glow: 'rgba(244, 63, 94, 0.15)'  },
  'Amber Gold': { color: '#b45309', hover: '#92400e', light: '#fef3c7',  glow: 'rgba(180, 83, 9, 0.15)'   },
  'Green':      { color: '#065f46', hover: '#047857', light: '#ecfdf5',  glow: 'rgba(6, 95, 70, 0.15)'    },
  'Purple':     { color: '#6b21a8', hover: '#7e22ce', light: '#faf5ff',  glow: 'rgba(107, 33, 168, 0.15)' },
  'Orange':     { color: '#c2410c', hover: '#ea580c', light: '#fff7ed',  glow: 'rgba(194, 65, 12, 0.15)'  },
  'Red':        { color: '#991b1b', hover: '#b91c1c', light: '#fef2f2',  glow: 'rgba(153, 27, 27, 0.15)'  },
  'Teal':       { color: '#0f766e', hover: '#0d9488', light: '#f0fdfa',  glow: 'rgba(15, 118, 110, 0.15)' },
};

/* --------------------------------------------------------------------------
   3.  THEME HELPERS
   -------------------------------------------------------------------------- */
function shellApplyAccentColor(accentName) {
  const cfg = SHELL_ACCENT_COLORS[accentName];
  if (!cfg) return;
  const r = document.documentElement;
  r.style.setProperty('--accent-color', cfg.color);
  r.style.setProperty('--accent-hover', cfg.hover);
  r.style.setProperty('--accent-light', cfg.light);
  r.style.setProperty('--accent-glow',  cfg.glow);
}

function shellApplyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z"/></svg>`;
  } else {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 22c.16 0 .32-.01.48-.02.48-.04.83-.49.77-.97-.24-2 .39-3.95 1.73-5.3 1.35-1.34 3.3-1.97 5.3-1.73.48.06.93-.29.97-.77.01-.16.02-.32.02-.48C21.37 7.02 16.98 3 12 3c-4.97 0-9 4.03-9 9 0 4.98 4.02 9.37 9.1 9.1z"/></svg>`;
  }
}

/* --------------------------------------------------------------------------
   4.  SIDEBAR HTML BUILDER
   -------------------------------------------------------------------------- */
function buildSidebarHTML(currentFile, user) {
  const initials = user
    ? user.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';
  const displayName = user ? user.full_name  : 'Admin User';
  const displayRole = user ? user.role.toUpperCase() : 'ADMINISTRATOR';

  const navLinks = NAV_ITEMS.map(item => {
    const isActive = currentFile === item.file;
    const translatedLabel = window.i18n ? window.i18n.t(item.label) : item.label;
    return `
      <a class="sidebar-item${isActive ? ' active' : ''}" href="${item.file}" data-icon-nav="${item.icon}" data-i18n-origin="${item.label}">
        <span class="sidebar-icon" data-icon="${item.icon}"></span>
        <span class="sidebar-item-text" data-i18n="${item.label}">${translatedLabel}</span>
      </a>`;
  }).join('');

  const transDisplayName = window.i18n ? window.i18n.t(displayName, displayName) : displayName;
  const transDisplayRole = window.i18n ? window.i18n.t(displayRole, displayRole) : displayRole;

  let activeSchool = null;
  try {
    activeSchool = JSON.parse(sessionStorage.getItem('active_school') || 'null');
  } catch(e) {}

  const schoolTitle = activeSchool ? activeSchool.name : 'Schoolmate ERP';
  const schoolSub = activeSchool ? `Code: ${activeSchool.code}` : 'by OpenSoftwares';
  const schoolLogo = (activeSchool && activeSchool.logo_url) ? activeSchool.logo_url : 'assets/brand/schoolmate_logo.jpg';

  return `
    <div class="sidebar-header" style="padding: 14px 16px;">
      <div class="sidebar-logo" style="display:flex; align-items:center; gap:10px;">
        <img src="${schoolLogo}" alt="Logo" style="width:32px; height:32px; border-radius:6px; object-fit:contain; background:#fff;" onerror="this.src='assets/brand/schoolmate_logo.jpg'">
        <div style="display:flex; flex-direction:column; overflow:hidden;">
          <span class="sidebar-title" style="font-size:0.95rem; font-weight:700; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${escapeHtml(schoolTitle)}</span>
          <span style="font-size:0.72rem; color:var(--accent-color, #e8a317); font-weight:600;">${escapeHtml(schoolSub)}</span>
        </div>
      </div>
    </div>
    <nav class="sidebar-menu">${navLinks}</nav>
    <div style="padding: 8px 12px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.72rem; background:rgba(0,0,0,0.15);">
      <a href="https://opensoftwares.in" target="_blank" style="color:var(--text-muted, #94a3b8); text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
        <img src="assets/brand/opensoftwares_logo.png" style="width:14px; height:14px; object-fit:contain; border-radius:2px; background:#fff; padding:1px;">
        <span>Powered by <strong>OpenSoftwares</strong></span>
      </a>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-avatar" id="user-avatar">${initials}</div>
      <div class="sidebar-user-info">
        <span class="sidebar-username" id="user-display-name" data-i18n="${displayName}">${transDisplayName}</span>
        <span class="sidebar-role" id="user-display-role" data-i18n="${displayRole}">${transDisplayRole}</span>
      </div>
    </div>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* --------------------------------------------------------------------------
   5.  HEADER HTML BUILDER (Includes Language Dropdown)
   -------------------------------------------------------------------------- */
function buildHeaderHTML(pageLabel) {
  const curLang = window.i18n ? window.i18n.getLanguage() : (localStorage.getItem('erp_language') || 'en');
  const translatedPage = window.i18n ? window.i18n.t(pageLabel) : pageLabel;

  return `
    <div class="header-left">
      <div class="breadcrumb">
        <span id="breadcrumb-parent" data-i18n="School ERP">School ERP</span>
        <span class="breadcrumb-separator">&raquo;</span>
        <span class="breadcrumb-active" id="breadcrumb-current" data-i18n="${pageLabel}">${translatedPage}</span>
      </div>
    </div>
    <div class="header-right">
      <!-- Multi-Language Selector Dropdown -->
      <div class="lang-selector-container">
        <span class="lang-globe-icon" title="Language / भाषा">🌐</span>
        <select class="lang-select-dropdown" id="global-lang-select" title="Change Language">
          <option value="en" ${curLang === 'en' ? 'selected' : ''}>English</option>
          <option value="hi" ${curLang === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी (Hindi)</option>
          <option value="mr" ${curLang === 'mr' ? 'selected' : ''}>🇮🇳 मराठी (Marathi)</option>
          <option value="kn" ${curLang === 'kn' ? 'selected' : ''}>🇮🇳 ಕನ್ನಡ (Kannada)</option>
          <option value="ur" ${curLang === 'ur' ? 'selected' : ''}>🇮🇳 اردو (Urdu)</option>
        </select>
      </div>

      <div class="header-time" id="realtime-clock">Loading...</div>
      <div class="header-actions">
        <button class="icon-btn" id="theme-toggle-btn" title="Toggle Theme"></button>
        <button class="icon-btn" id="logout-btn" title="Sign Out">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   6.  REAL-TIME CLOCK
   -------------------------------------------------------------------------- */
function shellStartClock() {
  const el = document.getElementById('realtime-clock');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const localeMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', kn: 'kn-IN', ur: 'ur-IN' };
    const locale = localeMap[lang] || 'en-IN';
    try {
      el.textContent = now.toLocaleDateString(locale, {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      }) + ' | ' + now.toLocaleTimeString(locale, {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch(e) {
      el.textContent = now.toLocaleDateString() + ' | ' + now.toLocaleTimeString();
    }
  };
  tick();
  setInterval(tick, 1000);
}

/* --------------------------------------------------------------------------
   7.  TOAST UTILITY  (available globally from shell)
   -------------------------------------------------------------------------- */
function shellShowToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = window.i18n ? window.i18n.t(message, message) : message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   8.  CONFIRM DIALOG UTILITY
   -------------------------------------------------------------------------- */
function shellConfirm(message, onConfirm) {
  const modal   = document.getElementById('app-modal');
  const title   = document.getElementById('app-modal-title');
  const body    = document.getElementById('app-modal-body');
  const footer  = document.getElementById('app-modal-footer');
  const closeBtn= document.getElementById('app-modal-close-btn');

  const translatedMsg = window.i18n ? window.i18n.t(message, message) : message;
  const translatedTitle = window.i18n ? window.i18n.t('Confirm Action', 'Confirm Action') : 'Confirm Action';
  const cancelText = window.i18n ? window.i18n.t('Cancel', 'Cancel') : 'Cancel';
  const confirmText = window.i18n ? window.i18n.t('Confirm', 'Confirm') : 'Confirm';

  if (!modal) { if (confirm(translatedMsg)) onConfirm(); return; }

  title.textContent = translatedTitle;
  body.innerHTML = `<p style="margin:0;color:var(--text-secondary);">${translatedMsg}</p>`;
  footer.innerHTML = `
    <button class="btn btn-secondary" id="_conf-cancel">${cancelText}</button>
    <button class="btn btn-primary"   id="_conf-ok">${confirmText}</button>`;

  modal.classList.add('active');
  const close = () => modal.classList.remove('active');
  document.getElementById('_conf-cancel').onclick = close;
  closeBtn.onclick = close;
  document.getElementById('_conf-ok').onclick = () => { close(); onConfirm(); };
}

/* --------------------------------------------------------------------------
   9.  MAIN BOOT SEQUENCE — runs on every module page
   -------------------------------------------------------------------------- */
async function shellBoot() {
  /* 9a. Auth guard */
  const rawUser = sessionStorage.getItem('erpUser');
  if (!rawUser) {
    window.location.href = 'index.html';
    return;
  }
  const user = JSON.parse(rawUser);

  /* 9b. Determine which page we are on */
  const currentFile = window.location.pathname.split(/[\\/]/).pop() || 'dashboard.html';
  const navEntry    = NAV_ITEMS.find(n => n.file === currentFile);
  const pageLabel   = navEntry ? navEntry.label : 'Dashboard';

  /* 9c. Ensure i18n initialized */
  if (window.i18n) {
    window.i18n.init();
  }

  /* 9d. Inject sidebar */
  const sidebarEl = document.getElementById('sidebar-container');
  if (sidebarEl) sidebarEl.innerHTML = buildSidebarHTML(currentFile, user);

  /* 9e. Inject header */
  const headerEl = document.getElementById('header-container');
  if (headerEl) headerEl.innerHTML = buildHeaderHTML(pageLabel);

  /* 9f. Render all SVG icons */
  if (typeof icons !== 'undefined') {
    document.querySelectorAll('[data-icon]').forEach(el => {
      const name = el.getAttribute('data-icon');
      if (icons[name]) el.innerHTML = icons[name];
    });
    const logoWrap = document.getElementById('sidebar-logo-icon-wrapper');
    if (logoWrap) logoWrap.innerHTML = icons.school;
  }

  /* 9g. Load settings from DB → apply theme + accent */
  try {
    const result = await window.electronAPI.dbGet('SELECT * FROM school_settings WHERE id = 1');
    if (result.success && result.data) {
      shellApplyAccentColor(result.data.accent_color || 'Dark Blue');
      shellApplyTheme(result.data.is_dark_mode ? 'dark' : 'light');
      const schoolName = result.data.school_name || 'School ERP';
      const pageTitle = window.i18n ? window.i18n.t(pageLabel) : pageLabel;
      document.title = schoolName + ' — ' + pageTitle;
    }
  } catch (err) {
    console.warn('Shell: could not load settings from DB', err);
  }

  /* 9h. Clock */
  shellStartClock();

  /* 9i. Theme toggle */
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', async () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      shellApplyTheme(isDark ? 'light' : 'dark');
      await window.electronAPI.dbRun(
        'UPDATE school_settings SET is_dark_mode = ? WHERE id = 1',
        [isDark ? 0 : 1]
      );
    });
  }

  /* 9j. Language Selector Event Listener */
  const langSelect = document.getElementById('global-lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const chosenLang = e.target.value;
      if (window.i18n) {
        window.i18n.setLanguage(chosenLang);
      }
      // Re-translate sidebar items and breadcrumb
      if (sidebarEl) sidebarEl.innerHTML = buildSidebarHTML(currentFile, user);
      const curBreadcrumb = document.getElementById('breadcrumb-current');
      if (curBreadcrumb && window.i18n) {
        curBreadcrumb.textContent = window.i18n.t(pageLabel);
      }
      // Re-render SVG icons in sidebar
      if (typeof icons !== 'undefined') {
        document.querySelectorAll('[data-icon]').forEach(el => {
          const name = el.getAttribute('data-icon');
          if (icons[name]) el.innerHTML = icons[name];
        });
        const logoWrap = document.getElementById('sidebar-logo-icon-wrapper');
        if (logoWrap) logoWrap.innerHTML = icons.school;
      }
      // Trigger full page auto-translate
      if (window.i18n) {
        window.i18n.translatePage();
      }
    });
  }

  /* 9k. Run page translation on load */
  if (window.i18n) {
    window.i18n.translatePage();
  }

  /* 9l. Logout */
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      shellConfirm('Are you sure you want to sign out?', () => {
        sessionStorage.removeItem('erpUser');
        window.location.href = 'index.html';
      });
    });
  }

  /* 9m. Modal close button */
  const modalCloseBtn = document.getElementById('app-modal-close-btn');
  const appModal      = document.getElementById('app-modal');
  const cancelBtn     = document.getElementById('app-modal-cancel');
  if (modalCloseBtn && appModal) {
    modalCloseBtn.addEventListener('click', () => appModal.classList.remove('active'));
  }
  if (cancelBtn && appModal) {
    cancelBtn.addEventListener('click', () => appModal.classList.remove('active'));
  }

  /* 9n. Expose helpers to the module's own JS */
  window.shellUser    = user;
  window.showToast    = shellShowToast;
  window.showConfirmDialog = shellConfirm;
}

/* --------------------------------------------------------------------------
   AUTO-BOOT on DOM ready
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', shellBoot);
