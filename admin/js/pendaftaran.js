(function () {
  'use strict';

  let pendaftaranData = [];
  let currentFilter = 'semua';
  let currentSearch = '';

  const statusLabel = {
    menunggu: 'Menunggu',
    dipertimbangkan: 'Dipertimbangkan',
    diterima: 'Diterima',
    ditolak: 'Ditolak'
  };

  function formatTanggal(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function renderTable() {
    const tbody = document.getElementById('pendaftaranTable');
    if (!tbody) return;

    const filtered = pendaftaranData.filter(p => {
      const nama = String(p.nama || '').toLowerCase();
      const kelas = String(p.kelas || '').toLowerCase();
      const search = currentSearch.toLowerCase();

      return (
        (nama.includes(search) || kelas.includes(search)) &&
        (currentFilter === 'semua' || p.status === currentFilter)
      );
    });

    if (!filtered.length) {
      tbody.innerHTML =
        '<tr><td colspan="5">Belum ada data pendaftar.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td>${escapeHTML(p.nama)}</td>
        <td>${escapeHTML(p.kelas)}</td>
        <td>${formatTanggal(p.tanggal)}</td>
        <td>
          <span class="status-badge status-${escapeHTML(p.status)}">
            ${statusLabel[p.status] || 'Menunggu'}
          </span>
        </td>
        <td>
          <a href="detail.html?id=${encodeURIComponent(p.id || p.nama)}"
             class="btn-detail">Detail</a>
        </td>
      </tr>
    `).join('');
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

  function filterStatus(status) {
    currentFilter = status;

    document.querySelectorAll('.filter-chip')
      .forEach(chip => chip.classList.remove('active'));

    const chip = document.getElementById(
      'filter' + status.charAt(0).toUpperCase() + status.slice(1)
    );

    if (chip) chip.classList.add('active');
    renderTable();
  }

  async function loadPendaftaran() {
    const tbody = document.getElementById('pendaftaranTable');
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="5">Memuat data...</td></tr>';
    }

    // Pengambilan data akan dihubungkan ke backend
    // setelah endpoint dan autentikasi admin dipastikan aman.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('searchInput');

    if (search) {
      search.addEventListener('input', () => {
        currentSearch = search.value;
        renderTable();
      });
    }

    loadPendaftaran();
  });

  window.filterStatus = filterStatus;
})();