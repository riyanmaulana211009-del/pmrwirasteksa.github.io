(function () {
  'use strict';

  const API_URL =
    'https://script.google.com/macros/s/AKfycbxkZMFSUFp91J3q4CThO9lk0Hw8n445CXrM_I17AQuMmaDNDhGYKjYIDkhmrSCUHshFVA/exec';

  const statusLabel = {
    menunggu: 'Menunggu',
    dipertimbangkan: 'Dipertimbangkan',
    diterima: 'Diterima',
    ditolak: 'Ditolak'
  };

  function sesiHabis() {
    ['admin_logged_in', 'admin_email', 'admin_token']
      .forEach(k => sessionStorage.removeItem(k));
    alert('Sesi login habis. Silakan login lagi.');
    window.location.href = 'login.html';
  }

  function panggilApi(params) {
    return new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('admin_token');
      if (!token) {
        reject(new Error('SESI_HABIS'));
        return;
      }

      const cb = 'cb_' + Date.now() + '_' + Math.floor(Math.random() * 100000);
      const query = new URLSearchParams(
        Object.assign({}, params, { token: token, callback: cb })
      );
      const script = document.createElement('script');
      const timer = setTimeout(() => {
        bersihkan();
        reject(new Error('Waktu habis. Coba lagi.'));
      }, 20000);

      function bersihkan() {
        clearTimeout(timer);
        script.remove();
        delete window[cb];
      }

      window[cb] = function (data) {
        bersihkan();
        resolve(data);
      };
      script.onerror = function () {
        bersihkan();
        reject(new Error('Gagal menghubungi AdminAPI. Periksa deployment.'));
      };
      script.src = API_URL + '?' + query.toString();
      document.body.appendChild(script);
    });
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function formatTanggal(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value || '-';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function hariIni(value) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return false;
    const n = new Date();
    return (
      d.getFullYear() === n.getFullYear() &&
      d.getMonth() === n.getMonth() &&
      d.getDate() === n.getDate()
    );
  }

  function isi(id, nilai) {
    const el = document.getElementById(id);
    if (el) el.textContent = nilai;
  }

  async function muatDashboard() {
    const daftar = document.getElementById('recentList');
    if (daftar) daftar.innerHTML = '<p style="padding:16px">Memuat data...</p>';

    try {
      const hasil = await panggilApi({ action: 'pendaftaran' });

      if (!hasil.success) {
        if (/token|akses admin/i.test(hasil.message || '')) {
          sesiHabis();
          return;
        }
        throw new Error(hasil.message || 'Gagal mengambil data.');
      }

      const data = hasil.data || [];
      const hitung = s => data.filter(p => p.status === s).length;

      isi('statTotal', data.length);
      isi('statToday', data.filter(p => hariIni(p.tanggal)).length);
      isi('statMenunggu', hitung('menunggu'));
      isi('statDipertimbangkan', hitung('dipertimbangkan'));
      isi('statDiterima', hitung('diterima'));
      isi('statDitolak', hitung('ditolak'));

      if (!daftar) return;

      if (!data.length) {
        daftar.innerHTML = '<p style="padding:16px">Belum ada pendaftar.</p>';
        return;
      }

      daftar.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nama</th><th>Kelas</th><th>Tanggal</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${data.slice(0, 5).map(p => `
              <tr class="baris-pendaftar" data-id="${escapeHTML(p.id)}" style="cursor:pointer">
                <td>${escapeHTML(p.nama)}</td>
                <td>${escapeHTML(p.kelas)}</td>
                <td>${escapeHTML(formatTanggal(p.tanggal))}</td>
                <td>
                  <span class="status-badge status-${escapeHTML(p.status)}">
                    ${statusLabel[p.status] || 'Menunggu'}
                  </span>
                </td>
                <td>
                  <a href="detail.html?id=${encodeURIComponent(p.id)}" class="btn-detail">Detail</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      daftar.querySelectorAll('.baris-pendaftar').forEach(baris => {
        baris.addEventListener('click', () => {
          window.location.href =
            'detail.html?id=' + encodeURIComponent(baris.dataset.id);
        });
      });

    } catch (error) {
      if (error.message === 'SESI_HABIS') {
        sesiHabis();
        return;
      }
      console.error('Gagal memuat dashboard:', error);
      if (daftar) {
        daftar.innerHTML =
          '<p style="padding:16px">' + escapeHTML(error.message) + '</p>';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const emailEl = document.querySelector('.admin-user-info p');
    const email = sessionStorage.getItem('admin_email');
    if (emailEl && email) emailEl.textContent = email;

    document.querySelectorAll('.stat-card').forEach(kartu => {
      kartu.style.cursor = 'pointer';
      kartu.addEventListener('click', () => {
        window.location.href = 'pendaftaran.html';
      });
    });

    muatDashboard();
  });

})();