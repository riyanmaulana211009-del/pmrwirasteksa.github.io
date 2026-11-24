// ============================================================
// PMR WIRA STEKSA - ADMIN PANEL DASHBOARD
// File: admin/js/dashboard.js
// Data dummy untuk tampilan awal
// ============================================================

(function() {
  'use strict';

  const dummyPendaftaran = [
    { nama: 'Riyan Maulana', kelas: 'XII 2 TKJ', tanggal: '2026-11-20', status: 'diterima' },
    { nama: 'Siti Hujaemah', kelas: 'XII 2 TKJ', tanggal: '2026-11-19', status: 'baru' },
    { nama: 'Muhamad Samsul', kelas: 'XII 1 TKJ', tanggal: '2026-11-18', status: 'ditinjau' },
    { nama: 'Anisa Fitria', kelas: 'XII 2 DKV', tanggal: '2026-11-17', status: 'baru' },
    { nama: 'Sahlan Al-Fariz', kelas: 'XII 2 TKJ', tanggal: '2026-11-16', status: 'diterima' }
  ];

  const statusLabel = {
    baru: 'Baru',
    ditinjau: 'Ditinjau',
    diterima: 'Diterima',
    ditolak: 'Ditolak'
  };

  function formatTanggal(tgl) {
    const d = new Date(tgl + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function initDashboard() {
    // Hitung statistik
    const total = dummyPendaftaran.length;
    const today = dummyPendaftaran.filter(p => p.tanggal === '2026-11-20').length;
    const pending = dummyPendaftaran.filter(p => p.status === 'baru').length;
    const accepted = dummyPendaftaran.filter(p => p.status === 'diterima').length;

    // Update stat cards
    const elTotal = document.getElementById('statTotal');
    const elToday = document.getElementById('statToday');
    const elPending = document.getElementById('statPending');
    const elAccepted = document.getElementById('statAccepted');

    if (elTotal) elTotal.textContent = total;
    if (elToday) elToday.textContent = today;
    if (elPending) elPending.textContent = pending;
    if (elAccepted) elAccepted.textContent = accepted;

    // Render aktivitas terkini (5 terbaru)
    const recentList = document.getElementById('recentList');
    if (recentList) {
      const recent = dummyPendaftaran.slice(0, 5);
      let html = '<table><thead><tr><th>Nama</th><th>Kelas</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead><tbody>';
      recent.forEach(p => {
        html += `
          <tr>
            <td>${p.nama}</td>
            <td>${p.kelas}</td>
            <td>${formatTanggal(p.tanggal)}</td>
            <td><span class="status-badge status-${p.status}">${statusLabel[p.status]}</span></td>
            <td><a href="detail.html?id=${encodeURIComponent(p.nama)}" class="btn-detail"><i class="fa-solid fa-eye"></i> Detail</a></td>
          </tr>
        `;
      });
      html += '</tbody></table>';
      recentList.innerHTML = html;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }
})();