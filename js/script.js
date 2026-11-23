// ============================================================
// PMR WIRA SMK NEGERI 1 SAGARANTEN
// JavaScript tunggal - modul terpisah, setiap modul try/catch
// ============================================================

(function() {
  'use strict';

  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz9f11img0FODor5fxWWUl1ABEuvEc80YsUSbURRlkz9fShKfSo_hv80xft1SoLHXGm_Q/exec';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function initHamburger() {
    try {
      var btn = document.querySelector('.hamburger');
      var dropdown = document.querySelector('.nav-dropdown');
      var overlay = document.querySelector('.nav-overlay');
      if (!btn || !dropdown || !overlay) return;
      var isOpen = false;
      function toggle() {
        isOpen = !isOpen;
        if (isOpen) {
          btn.classList.add('active');
          dropdown.classList.add('open');
          overlay.classList.add('open');
          document.body.style.overflow = 'hidden';
          btn.setAttribute('aria-expanded', 'true');
        } else {
          btn.classList.remove('active');
          dropdown.classList.remove('open');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
          btn.setAttribute('aria-expanded', 'false');
        }
      }
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggle();
      });
      overlay.addEventListener('click', function() {
        if (isOpen) toggle();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) toggle();
      });
      var links = dropdown.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          if (isOpen) toggle();
        });
      });
    } catch (err) {
      console.error('Hamburger error:', err);
    }
  }

  function initReveal() {
    try {
      var reveals = document.querySelectorAll('.reveal');
      if (reveals.length === 0) return;
      if (!document.documentElement.classList.contains('reveal-ready')) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        reveals.forEach(function(el) {
          observer.observe(el);
        });
        document.documentElement.classList.add('reveal-ready');
      }
      setTimeout(function() {
        reveals.forEach(function(el) {
          el.classList.add('is-visible');
        });
      }, 1500);
    } catch (err) {
      console.error('Reveal error:', err);
      var allReveals = document.querySelectorAll('.reveal');
      allReveals.forEach(function(el) {
        el.classList.add('is-visible');
      });
      document.documentElement.classList.add('reveal-ready');
    }
  }
  function initTagline() {
    try {
      var el = document.querySelector('.tagline-typing');
      if (!el) return;
      var teks = el.getAttribute('data-text') || 'Satu hati, satu jiwa, rumah kita';
      el.textContent = '';
      var i = 0;
      var cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      el.appendChild(cursor);
      function ketik() {
        if (i < teks.length) {
          el.insertBefore(document.createTextNode(teks.charAt(i)), cursor);
          i++;
          setTimeout(ketik, 70);
        }
      }
      ketik();
    } catch (err) {
      console.error('Tagline error:', err);
    }
  }

  function initStruktur() {
    try {
      var container = document.querySelector('.struktur-data');
      if (!container) return;
      var data = [
        { nama: 'Rian Najwa, S.S.Gr', jabatan: 'Pembina', kelas: '-', kelompok: 'Pembina', foto: '', wa: '6285759595733' },
        { nama: 'Riyan Maulana', jabatan: 'Ketua', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Pengurus Inti', foto: '', wa: '6283808146592' },
        { nama: 'Siti Hujaemah', jabatan: 'Wakil Ketua', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Pengurus Inti', foto: '', wa: '' },
        { nama: 'Muhamad Samsul Arifin Ilham', jabatan: 'Sekretaris 1', kelas: 'XII 1 Teknik Jaringan Komputer', kelompok: 'Sekretaris', foto: '', wa: '' },
        { nama: 'Anisa Fitria Atmaja', jabatan: 'Sekretaris 2', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Sekretaris', foto: '', wa: '' },
        { nama: 'Sahlan Al-Fariz', jabatan: 'Bendahara 1', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Bendahara', foto: '', wa: '' },
        { nama: 'Rinda', jabatan: 'Bendahara 2', kelas: 'XII 2 Desain Komunikasi Visual', kelompok: 'Bendahara', foto: '', wa: '' },
        { nama: 'Dewi Nurhaeni', jabatan: 'Koordinator', kelas: 'XII 1 Teknik Jaringan Komputer', kelompok: 'Umum', foto: '', wa: '' },
        { nama: 'Rahma Aulia', jabatan: 'Anggota', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Umum', foto: '', wa: '' },
        { nama: 'Feby Yasmin Nurlaela', jabatan: 'Anggota', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Umum', foto: '', wa: '' },
        { nama: 'Ridho Agustian', jabatan: 'Koordinator', kelas: 'XII Teknik Bisnis Sepeda Motor', kelompok: 'Lapangan', foto: '', wa: '' },
        { nama: 'Dinda Octavia', jabatan: 'Anggota', kelas: 'XII 1 Teknik Jaringan Komputer', kelompok: 'Lapangan', foto: '', wa: '' },
        { nama: 'Bella', jabatan: 'Koordinator', kelas: 'XII 3 Desain Komunikasi Visual', kelompok: 'UKS', foto: '', wa: '' },
        { nama: 'Astri Aprilia', jabatan: 'Anggota', kelas: 'XII 4 Desain Komunikasi Visual', kelompok: 'UKS', foto: '', wa: '' },
        { nama: 'Nuraeni', jabatan: 'Koordinator', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Alat', foto: '', wa: '' },
        { nama: 'Putri Laura', jabatan: 'Anggota', kelas: 'XII 1 Teknik Jaringan Komputer', kelompok: 'Alat', foto: '', wa: '' },
        { nama: 'Muhammad Ramji Ilyas', jabatan: 'Anggota', kelas: 'XII 1 Teknik Jaringan Komputer', kelompok: 'Alat', foto: '', wa: '' },
        { nama: 'Rika Giska Putri', jabatan: 'Koordinator', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Dokumentasi', foto: '', wa: '' },
        { nama: 'Kamaludin', jabatan: 'Anggota', kelas: 'XII 2 Teknik Jaringan Komputer', kelompok: 'Dokumentasi', foto: '', wa: '' }
      ];
      var iconMap = {
        'Pembina': 'fa-award',
        'Pengurus Inti': 'fa-star',
        'Sekretaris': 'fa-pen-to-square',
        'Bendahara': 'fa-wallet',
        'Umum': 'fa-users',
        'Lapangan': 'fa-truck-medical',
        'UKS': 'fa-kit-medical',
        'Alat': 'fa-toolbox',
        'Dokumentasi': 'fa-camera'
      };
      var groupLabels = {
        'Pembina': 'Pembina',
        'Pengurus Inti': 'Pengurus Inti',
        'Sekretaris': 'Sekretaris',
        'Bendahara': 'Bendahara',
        'Umum': 'Umum',
        'Lapangan': 'Lapangan',
        'UKS': 'UKS',
        'Alat': 'Alat',
        'Dokumentasi': 'Dokumentasi'
      };
      var searchInput = document.querySelector('#strukturSearch');
      var btnClear = document.querySelector('.btn-clear');
      var chipsContainer = document.querySelector('.filter-chips');
      var resultInfo = document.querySelector('.result-info');
      var noResults = document.querySelector('.no-results');

      var currentFilter = 'Semua';
      var currentSearch = '';
      var filterList = ['Semua', 'Pembina', 'Pengurus Inti', 'Sekretaris', 'Bendahara', 'Umum', 'Lapangan', 'UKS', 'Alat', 'Dokumentasi'];

      function renderChips() {
        chipsContainer.innerHTML = '';
        filterList.forEach(function(name) {
          var chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'filter-chip' + (name === currentFilter ? ' active' : '');
          chip.textContent = name;
          chip.addEventListener('click', function() {
            currentFilter = name;
            renderChips();
            renderData();
            chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          });
          chipsContainer.appendChild(chip);
        });
      }

      function getInitials(nama) {
        var parts = nama.trim().split(/\s+/);
        if (parts.length >= 2) {
          return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
        }
        return nama.substring(0, 2).toUpperCase();
      }

      function makeAvatar(p, wrapCls) {
        var wrap = document.createElement('div');
        wrap.className = wrapCls;
        if (p.foto) {
          var img = document.createElement('img');
          img.className = 'member-avatar';
          img.src = 'assets/foto/' + p.foto;
          img.alt = 'Foto ' + p.nama;
          img.onerror = function() {
            img.style.display = 'none';
            var fb = document.createElement('div');
            fb.className = 'member-avatar-fallback';
            fb.textContent = getInitials(p.nama);
            wrap.appendChild(fb);
          };
          wrap.appendChild(img);
        } else {
          var fb = document.createElement('div');
          fb.className = 'member-avatar-fallback';
          fb.textContent = getInitials(p.nama);
          wrap.appendChild(fb);
        }
        return wrap;
      }

      function makeCard(p) {
        var card = document.createElement('div');
        var initials = getInitials(p.nama);

        if (p.kelompok === 'Pembina') {
          card.className = 'member-card single reveal is-visible';
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'button');
          card.setAttribute('aria-label', 'Lihat detail ' + p.nama);
          card.appendChild(makeAvatar(p, 'member-avatar-wrap'));
          var name = document.createElement('div');
          name.className = 'member-name';
          name.textContent = p.nama;
          var role = document.createElement('div');
          role.className = 'member-role';
          role.textContent = p.jabatan;
          card.appendChild(name);
          card.appendChild(role);
        } else {
          card.className = 'member-card reveal is-visible';
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'button');
          card.setAttribute('aria-label', 'Lihat detail ' + p.nama);
          card.appendChild(makeAvatar(p, 'member-avatar-wrap'));
          var info = document.createElement('div');
          info.className = 'member-info';
          var name = document.createElement('div');
          name.className = 'member-name';
          name.textContent = p.nama;
          var role = document.createElement('div');
          role.className = 'member-role';
          role.textContent = p.jabatan;
          var cls = document.createElement('div');
          cls.className = 'member-class';
          if (p.kelas && p.kelas !== '-') {
            cls.textContent = 'Kelas: ' + p.kelas;
          } else {
            cls.style.display = 'none';
          }
          info.appendChild(name);
          info.appendChild(role);
          info.appendChild(cls);
          card.appendChild(info);
        }

        card.addEventListener('click', function() { openModal(p); });
        card.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') openModal(p);
        });
        return card;
      }

      function renderData() {
        container.innerHTML = '';
        var filtered = data.filter(function(p) {
          var matchSearch = true;
          var matchFilter = true;
          if (currentSearch) {
            var s = currentSearch.toLowerCase();
            matchSearch = (p.nama.toLowerCase().indexOf(s) >= 0) ||
                          (p.jabatan.toLowerCase().indexOf(s) >= 0) ||
                          (p.kelas.toLowerCase().indexOf(s) >= 0) ||
                          (p.kelompok.toLowerCase().indexOf(s) >= 0);
          }
          if (currentFilter !== 'Semua') {
            matchFilter = (p.kelompok === currentFilter);
          }
          return matchSearch && matchFilter;
        });

        if (resultInfo) {
          resultInfo.textContent = 'Menampilkan ' + filtered.length + ' dari ' + data.length + ' pengurus';
        }
        if (filtered.length === 0) {
          if (noResults) noResults.classList.remove('hidden');
          return;
        }
        if (noResults) noResults.classList.add('hidden');

        var groups = {};
        filtered.forEach(function(p) {
          if (!groups[p.kelompok]) groups[p.kelompok] = [];
          groups[p.kelompok].push(p);
        });

        var groupOrder = ['Pembina', 'Pengurus Inti', 'Sekretaris', 'Bendahara', 'Umum', 'Lapangan', 'UKS', 'Alat', 'Dokumentasi'];
        groupOrder.forEach(function(gkey) {
          if (!groups[gkey]) return;
          var members = groups[gkey];
          var groupEl = document.createElement('div');
          groupEl.className = 'timeline-group reveal is-visible';

          var line = document.createElement('div');
          line.className = 'group-line';
          groupEl.appendChild(line);

          var marker = document.createElement('div');
          marker.className = 'group-marker';
          var badge = document.createElement('div');
          badge.className = 'group-badge';
          var icon = document.createElement('i');
          icon.className = 'fa-solid ' + (iconMap[gkey] || 'fa-user');
          badge.appendChild(icon);
          var nameEl = document.createElement('span');
          nameEl.className = 'group-name';
          nameEl.textContent = groupLabels[gkey] || gkey;
          marker.appendChild(badge);
          marker.appendChild(nameEl);
          groupEl.appendChild(marker);

          if (members.length === 1) {
            groupEl.appendChild(makeCard(members[0]));
          } else {
            var grid = document.createElement('div');
            grid.className = 'member-grid';
            members.forEach(function(p) {
              grid.appendChild(makeCard(p));
            });
            groupEl.appendChild(grid);
          }

          container.appendChild(groupEl);
        });

        setTimeout(function() {
          var all = container.querySelectorAll('.reveal');
          all.forEach(function(el) {
            el.classList.add('is-visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
          });
        }, 100);
      }

      function openModal(p) {
        var modalOverlay = document.querySelector('.modal-overlay');
        if (!modalOverlay) return;
        var initials = getInitials(p.nama);
        var avatarHTML = '';
        if (p.foto) {
          avatarHTML = '<img class="modal-avatar" src="assets/foto/' + p.foto + '" alt="Foto ' + p.nama + '" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<div class=\\\'modal-avatar-fallback\\\'>' + initials + '</div>\';">';
        } else {
          avatarHTML = '<div class="modal-avatar-fallback">' + initials + '</div>';
        }
        var waHTML = '';
        if (p.wa) {
          waHTML = '<a href="https://wa.me/' + p.wa + '" target="_blank" rel="noopener" class="btn-wa"><i class="fa-brands fa-whatsapp"></i> Hubungi via WhatsApp</a>';
        }
        var kelasHTML = (p.kelas && p.kelas !== '-') ?
          '<div class="modal-info-row"><span class="modal-info-label">Kelas</span><span class="modal-info-value">' + p.kelas + '</span></div>' : '';
        modalOverlay.innerHTML =
          '<div class="modal">' +
          '<div class="modal-header">' +
          '<button class="modal-close" aria-label="Tutup">&times;</button>' +
          '<div style="position:relative;">' + avatarHTML + '</div>' +
          '</div>' +
          '<div class="modal-body">' +
          '<h2 class="modal-name">' + p.nama + '</h2>' +
          '<div class="modal-role-pill">' + p.jabatan + '</div>' +
          '<div class="modal-info">' +
          '<div class="modal-info-row"><span class="modal-info-label">Jabatan</span><span class="modal-info-value">' + p.jabatan + '</span></div>' +
          kelasHTML +
          '<div class="modal-info-row"><span class="modal-info-label">Bagian</span><span class="modal-info-value">' + p.kelompok + '</span></div>' +
          '</div>' +
          waHTML +
          '</div>' +
          '</div>';
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        function closeModal() {
          modalOverlay.classList.remove('open');
          document.body.style.overflow = '';
        }
        setTimeout(function() {
          var closeBtn = modalOverlay.querySelector('.modal-close');
          if (closeBtn) closeBtn.focus();
          closeBtn.addEventListener('click', closeModal);
          modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeModal();
          });
          document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
              closeModal();
              document.removeEventListener('keydown', escHandler);
            }
          });
        }, 50);
      }

      if (searchInput) {
        searchInput.addEventListener('input', function() {
          currentSearch = this.value;
          if (btnClear) btnClear.style.display = currentSearch ? 'block' : 'none';
          renderData();
        });
      }
      if (btnClear) {
        btnClear.addEventListener('click', function() {
          if (searchInput) searchInput.value = '';
          currentSearch = '';
          if (btnClear) btnClear.style.display = 'none';
          renderData();
        });
      }

      renderChips();
      renderData();

      setTimeout(function() {
        var all = document.querySelectorAll('.struktur-data .reveal');
        all.forEach(function(el) {
          el.classList.add('is-visible');
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.visibility = 'visible';
        });
      }, 1500);

    } catch (err) {
      console.error('Struktur error:', err);
      var container = document.querySelector('.struktur-data');
      if (container) {
        container.innerHTML = '<div class="card"><div style="text-align:center; padding: 40px 20px; color: var(--abu);">Data pengurus tidak dapat dimuat. Muat ulang halaman.</div></div>';
      }
    }
  }
  function initFormulir() {
    try {
      var form = document.querySelector('form.daftar-form');
      if (!form) return;

      var msg = document.querySelector('.msg-success');
      var btn = form.querySelector('.btn-submit');
      var errMsg = document.querySelector('.form-error-msg');
      var btnWa = document.querySelector('.btn-wa-confirm');

      var namaInput = form.querySelector('input[name="nama"]');
      var kelasInput = form.querySelector('input[name="kelas"]');
      var alasanTextarea = form.querySelector('textarea[name="alasan"]');
      var harapanTextarea = form.querySelector('textarea[name="harapan"]');
      var honeypot = form.querySelector('input[name="website"]');

      var lastSubmitTime = 0;
      var isSubmitting = false;

      var counters = document.querySelectorAll('.char-counter');
      function setupCounter(textarea, counter) {
        textarea.addEventListener('input', function() {
          counter.textContent = this.value.length + '/1000';
        });
      }
      if (alasanTextarea && counters[0]) setupCounter(alasanTextarea, counters[0]);
      if (harapanTextarea && counters[1]) setupCounter(harapanTextarea, counters[1]);

      function showError(input, message) {
        input.classList.add('error');
        var existing = input.parentNode.querySelector('.field-error');
        if (existing) existing.remove();
        var err = document.createElement('div');
        err.className = 'field-error show';
        err.textContent = message;
        input.parentNode.appendChild(err);
        input.focus();
      }
      function clearError(input) {
        input.classList.remove('error');
        var existing = input.parentNode.querySelector('.field-error');
        if (existing) existing.remove();
      }
      function clearAllErrors() {
        clearError(namaInput); clearError(kelasInput); clearError(alasanTextarea); clearError(harapanTextarea);
      }
      function showFormError(message) {
        if (errMsg) {
          errMsg.textContent = message;
          errMsg.style.display = 'block';
        }
      }
      function hideFormError() {
        if (errMsg) errMsg.style.display = 'none';
      }

      function openWhatsApp(nama, kelas, alasan, harapan) {
        var pesan = 'Halo, saya ingin konfirmasi pendaftaran PMR Wira.%0A%0A';
        pesan += '*Nama:* ' + encodeURIComponent(nama) + '%0A';
        pesan += '*Kelas:* ' + encodeURIComponent(kelas) + '%0A';
        pesan += '*Alasan masuk PMR:* ' + encodeURIComponent(alasan) + '%0A';
        pesan += '*Harapan:* ' + encodeURIComponent(harapan);
        window.open('https://wa.me/6283808146592?text=' + pesan, '_blank');
      }
      if (btnWa) {
        btnWa.addEventListener('click', function() {
          openWhatsApp(
            namaInput ? namaInput.value.trim() : '',
            kelasInput ? kelasInput.value.trim() : '',
            alasanTextarea ? alasanTextarea.value.trim() : '',
            harapanTextarea ? harapanTextarea.value.trim() : ''
          );
        });
      }
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isSubmitting) return;
        if (honeypot && honeypot.value.trim() !== '') {
          if (msg) msg.classList.add('show');
          if (btnWa) btnWa.style.display = 'none';
          form.reset();
          counters.forEach(function(c) { c.textContent = '0/1000'; });
          hideFormError();
          return;
        }
        var now = Date.now();
        if (now - lastSubmitTime < 3000) {
          showFormError('Tunggu beberapa saat sebelum mengirim lagi.');
          return;
        }
        clearAllErrors();
        hideFormError();
        var valid = true;
        if (!namaInput.value.trim()) { showError(namaInput, 'Nama lengkap harus diisi.'); valid = false; }
        if (!kelasInput.value.trim()) { showError(kelasInput, 'Kelas harus diisi.'); valid = false; }
        if (!alasanTextarea.value.trim()) { showError(alasanTextarea, 'Alasan masuk PMR harus diisi.'); valid = false; }
        if (!harapanTextarea.value.trim()) { showError(harapanTextarea, 'Harapan Anda harus diisi.'); valid = false; }
        if (!valid) return;

        isSubmitting = true;
        lastSubmitTime = now;
        btn.classList.add('loading');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim...';

        var data = new URLSearchParams();
        data.append('nama', namaInput.value.trim());
        data.append('kelas', kelasInput.value.trim());
        data.append('alasan', alasanTextarea.value.trim());
        data.append('harapan', harapanTextarea.value.trim());
        data.append('website', honeypot ? honeypot.value.trim() : '');

        try {
          fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: data
          }).then(function() {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
            if (msg) msg.classList.add('show');
            if (btnWa) btnWa.style.display = 'inline-flex';
            form.reset();
            counters.forEach(function(c) { c.textContent = '0/1000'; });
            hideFormError();
            isSubmitting = false;
          }).catch(function(err) {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
            showFormError('Pendaftaran gagal terkirim. Periksa koneksi lalu coba lagi.');
            isSubmitting = false;
          });
        } catch (err) {
          btn.classList.remove('loading');
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
          showFormError('Pendaftaran gagal terkirim. Periksa koneksi lalu coba lagi.');
          isSubmitting = false;
        }
      });
    } catch (err) {
      console.error('Formulir error:', err);
    }
  }

  function initTransisi() {
    try {
      var body = document.body;
      body.classList.add('page-fade');
      setTimeout(function() {
        body.style.opacity = '1';
        body.style.visibility = 'visible';
      }, 600);
      var links = document.querySelectorAll('a[href]');
      links.forEach(function(link) {
        var href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
        link.addEventListener('click', function(e) {
          if (e.ctrlKey || e.metaKey || e.which === 2) return;
          e.preventDefault();
          body.style.opacity = '0';
          setTimeout(function() {
            window.location.href = href;
          }, 200);
        });
      });
    } catch (err) {
      console.error('Transisi error:', err);
      document.body.style.opacity = '1';
    }
  }

  function initScrollTop() {
    try {
      var btn = document.querySelector('.btn-scrolltop');
      if (!btn) return;
      function toggle() {
        if (window.scrollY > 300) {
          btn.classList.add('show');
        } else {
          btn.classList.remove('show');
        }
      }
      window.addEventListener('scroll', toggle);
      toggle();
      btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } catch (err) {
      console.error('ScrollTop error:', err);
    }
  }

  onReady(function() {
    initHamburger();
    initReveal();
    initTagline();
    initStruktur();
    initFormulir();
    initTransisi();
    initScrollTop();
    var logoImg = document.querySelector('.logo-wrap img');
    if (logoImg) {
      logoImg.addEventListener('error', function() {
        logoImg.style.display = 'none';
        var fb = document.querySelector('.logo-fallback');
        if (fb) fb.style.display = 'flex';
      });
    }
  });

})();
