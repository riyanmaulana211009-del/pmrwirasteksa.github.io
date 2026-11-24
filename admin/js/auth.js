// ============================================================
// PMR WIRA STEKSA - ADMIN PANEL AUTH
// File: admin/js/auth.js
// ============================================================

(function() {
  'use strict';

  const ADMIN_EMAIL = 'admin@pmrste.sch.id';
  const ADMIN_NAME = 'Admin PMR';

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    }
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementBy('overlay') || document.getElementById('overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function logout() {
    if (confirm('Yakin ingin keluar dari Admin Panel?')) {
      sessionStorage.removeItem('pmr_admin_logged');
      sessionStorage.removeItem('pmr_admin_email');
      window.location.href = 'login.html';
    }
  }

  function initAuthUI() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');

    if (hamburger) {
      hamburger.addEventListener('click', toggleSidebar);
    }

    // Set user info di topbar jika ada
    const userNameEl = document.querySelector('.admin-user-info h3');
    const userEmailEl = document.querySelector('.admin-user-info p');
    if (userNameEl) userNameEl.textContent = ADMIN_NAME;
    if (userEmailEl) userEmailEl.textContent = ADMIN_EMAIL;

    // Set avatar inisial
    const avatarEls = document.querySelectorAll('.admin-user-avatar, .detail-avatar, .login-logo');
    avatarEls.forEach(el => {
      if (el && !el.querySelector('img')) {
        el.textContent = 'PW';
      }
    });
  }

  // Expose ke global
  window.toggleSidebar = toggleSidebar;
  window.closeSidebar = closeSidebar;
  window.logout = logout;
  window.initAuthUI = initAuthUI;

  // Inisialisasi saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }
})();