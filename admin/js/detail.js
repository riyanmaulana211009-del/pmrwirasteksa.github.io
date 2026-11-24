// ============================================================
// PMR WIRA STEKSA - ADMIN PANEL DETAIL
// File: admin/js/detail.js
// Data dummy untuk halaman detail pendaftar
// ============================================================

(function() {
  'use strict';

  const dummyPendaftaran = [
    {
      nama: 'Riyan Maulana',
      kelas: 'XII 2 Teknik Jaringan Komputer',
      tanggal: '2026-11-20',
      status: 'diterima',
      alasan: 'Saya ingin belajar pertolongan pertama untuk membantu teman dan orang tua saat kecelakaan.',
      harapan: 'Meningkatkan keterampilan hidup sehat dan menjadi relawan yang bermanfaat bagi masyarakat.',
      wa: '6283808146592'
    },
    {
      nama: 'Siti Hujaemah',
      kelas: 'XII 2 Teknik Jaringan Komputer',
      tanggal: '2026-11-19',
      status: 'menunggu',
      alasan: 'Ingin meningkatkan jiwa kemanusiaan dan belajar P3K.',
      harapan: 'Menambah pengalaman organisasi dan teman baru.',
      wa: ''
    },
    {
      nama: 'Muhamad Samsul',
      kelas: 'XII 1 Teknik Jaringan Komputer',
      tanggal: '2026-11-18',
      status: 'dipertimbangkan',
      alasan: 'PMR adalah wadah untuk belajar kepemimpinan dan disiplin.',
      harapan: 'Jadi anggota aktif dalam kegiatan kemanusiaan.',
      wa: '6285811892458'
    }
  ];

  const statusLabel = {
    menunggu: 'Menunggu',
    dipertimbangkan: 'Dipertimbangkan',
    diterima: 'Diterima',
    ditolak: 'Ditolak'
  };

  const statusColor = {
    menunggu: '#856404',
    dipertimbangkan: '#0c5460',
    diterima: '#fff',
    ditolak: '#fff'
  };

  const statusBg = {
    menunggu: '#FFF3CD',
    dipertimbangkan: '#D1ECF1',
    diterima: '#25D366',
    ditolak: '#B71C1C'
  };

  // Activity log simulasi (recent changes)
  const activityLog = [
    { nama: 'Riyan Maulana', statusBaru: 'diterima', tanggal: '2026-11-20' },
    { nama: 'Siti Hujaemah', statusBaru: 'menunggu', tanggal: '2026-11-19' },
    { nama: 'Muhamad Samsul', statusBaru: 'dipertimbangkan', tanggal: '2026-11-18' }
  ];

  function formatTanggal(tgl) {
    const d = new Date(tgl + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function getInisial(nama) {
    const parts = nama.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    return nama.substring(0, 2).toUpperCase();
  }

  function initDetail() {
    const params = new URLSearchParams(window.location.search);
    const namaParam = params.get('id');

    const pendaftar = dummyPendaftaran.find(p => p.nama === decodeURIComponent(namaParam || ''));

    if (!pendaftar) {
      document.body.innerHTML = '<div style="text-align:center; padding: 48px; font-family: Poppins, sans-serif;"><h2>Data tidak ditemukan</h2><a href="pendaftaran.html" style="color: var(--merah-utama);">Kembali ke Daftar</a></div>';
      return;
    }

    // Isi data ke halaman
    const elAvatar = document.getElementById('detailAvatar');
    const elNama = document.getElementById('detailNama');
    const elKelas = document.getElementById('detailKelas');
    const elNamaLengkap = document.getElementById('detailNamaLengkap');
    const elKelasView = document.getElementById('detailKelasView');
    const elTanggal = document.getElementById('detailTanggal');
    const elStatus = document.getElementById('detailStatus');
    const elAlasan = document.getElementById('detailAlasan');
    const elHarapan = document.getElementById('detailHarapan');
    const elBtnWa = document.getElementById('btnWa');

    if (elAvatar) elAvatar.textContent = getInisial(pendaftar.nama);
    if (elNama) elNama.textContent = pendaftar.nama;
    if (elKelas) elKelas.textContent = pendaftar.kelas;
    if (elNamaLengkap) elNamaLengkap.textContent = pendaftar.nama;
    if (elKelasView) elKelasView.textContent = pendaftar.kelas;
    if (elTanggal) elTanggal.textContent = formatTanggal(pendaftar.tanggal);
    if (elStatus) {
      elStatus.textContent = statusLabel[pendaftar.status] || pendaftar.status;
      elStatus.style.background = statusBg[pendaftar.status] || '#ccc';
      elStatus.style.color = statusColor[pendaftar.status] || '#000';
      elStatus.style.padding = '6px 12px';
      elStatus.style.borderRadius = '20px';
      elStatus.style.fontSize = '0.75rem';
      elStatus.style.fontWeight = '600';
      elStatus.style.textTransform = 'uppercase';
      elStatus.style.display = 'inline-block';
    }
    if (elAlasan) elAlasan.textContent = pendaftar.alasan;
    if (elHarapan) elHarapan.textContent = pendaftar.harapan;

    if (elBtnWa && pendaftar.wa) {
      elBtnWa.href = 'https://wa.me/' + pendaftar.wa;
    } else if (elBtnWa) {
      elBtnWa.style.display = 'none';
    }
  }

  function goBack() {
    window.history.back();
  }

  function updateStatus(status) {
    const pendaftar = getCurrentPendaftar();
    if (!pendaftar) return;

    const konfirmasi = status === 'diterima' || status === 'ditolak'
      ? confirm('Yakin ingin menetapkan status "' + statusLabel[status] + '" untuk ' + pendaftar.nama + '?')
      : confirm('Ubah status pendaftar menjadi "' + statusLabel[status] + '"?');

    if (konfirmasi) {
      pendaftar.status = status;
      alert('Status berhasil diperbarui menjadi "' + statusLabel[status] + '" (simulasi frontend).');

      // Tambah ke activity log
      activityLog.unshift({
        nama: pendaftar.nama,
        statusBaru: status,
        tanggal: new Date().toISOString().split('T')[0]
      });

      // Refresh tampilan status
      const elStatus = document.getElementById('detailStatus');
      if (elStatus) {
        elStatus.textContent = statusLabel[status] || status;
        elStatus.style.background = statusBg[status] || '#ccc';
        elStatus.style.color = statusColor[status] || '#000';
      }
    }
  }

  function konfirmasiKeputusan(status) {
    updateStatus(status);
  }

  function getCurrentPendaftar() {
    const params = new URLSearchParams(window.location.search);
    const namaParam = params.get('id');
    return dummyPendaftaran.find(p => p.nama === decodeURIComponent(namaParam || ''));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDetail);
  } else {
    initDetail();
  }

  window.goBack = goBack;
  window.updateStatus = updateStatus;
  window.konfirmasiKeputusan = konfirmasiKeputusan;
  window.activityLog = activityLog;
})();