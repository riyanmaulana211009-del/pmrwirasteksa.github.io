const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxkZMFSUFp91J3q4CThO9lk0Hw8n445CXrM_I17AQuMmaDNDhGYKjYIDkhmrSCUHshFVA/exec';
const ADMIN_EMAIL = 'riyanmaulana211009@gmail.com';
const GOOGLE_CLIENT_ID =
  '233845011318-9cbh4ichb4v0uas56uuub7ml2dnc1m9v.apps.googleusercontent.com';

const isLoginPage = location.pathname.endsWith('login.html');
const sudahLogin = sessionStorage.getItem('admin_logged_in') === 'true';

if (isLoginPage && sudahLogin) {
  location.href = 'dashboard.html';
} else if (!isLoginPage && !sudahLogin) {
  location.href = 'login.html';
}

function handleCredentialResponse(response) {
  const callbackName = 'cb_' + Date.now();
  const params = new URLSearchParams({
    action: 'verifikasi-token',
    token: response.credential,
    callback: callbackName
  });

  const script = document.createElement('script');

  window[callbackName] = function (data) {
    script.remove();
    delete window[callbackName];

    if (
      data.success === true &&
      data.verified === true &&
      String(data.email).toLowerCase() === ADMIN_EMAIL
    ) {
      sessionStorage.setItem('admin_logged_in', 'true');
      sessionStorage.setItem('admin_email', ADMIN_EMAIL);
      sessionStorage.setItem('admin_token', response.credential);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Akses Admin ditolak.');
    }
  };

  script.onerror = function () {
    script.remove();
    delete window[callbackName];
    alert('Gagal menghubungi AdminAPI. Periksa deployment.');
  };

  script.src = SCRIPT_URL + '?' + params.toString();
  document.body.appendChild(script);
}

function siapkanTombolGoogle() {
  const tempat = document.getElementById('tombol-google');
  if (!tempat) return;

  if (!window.google || !google.accounts) {
    setTimeout(siapkanTombolGoogle, 200);
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(tempat, {
    theme: 'outline',
    size: 'large',
    text: 'signin_with'
  });
}

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
  const overlay = document.getElementById('overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function logout() {
  if (confirm('Yakin ingin keluar?')) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_email');
    sessionStorage.removeItem('admin_token');
    window.location.href = 'login.html';
  }
}

window.handleCredentialResponse = handleCredentialResponse;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.logout = logout;

window.addEventListener('load', siapkanTombolGoogle);
