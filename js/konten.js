(function () {
  'use strict';

  const API_URL =
    'https://script.google.com/macros/s/AKfycbxkZMFSUFp91J3q4CThO9lk0Hw8n445CXrM_I17AQuMmaDNDhGYKjYIDkhmrSCUHshFVA/exec';

  const elemen = document.querySelectorAll(
    '[data-konten], [data-konten-src], [data-konten-href]'
  );
  if (!elemen.length) return;

  function ada(data, kunci) {
    return Object.prototype.hasOwnProperty.call(data, kunci) && data[kunci] !== '';
  }

  function aman(url) {
    return !/^\s*(javascript|data):/i.test(url);
  }

  function terapkan(data) {
    elemen.forEach(el => {
      const kt = el.getAttribute('data-konten');
      if (kt && ada(data, kt)) {
        el.textContent = data[kt];
        if (/\n/.test(data[kt])) el.style.whiteSpace = 'pre-line';
      }

      const ks = el.getAttribute('data-konten-src');
      if (ks && ada(data, ks) && aman(data[ks])) el.setAttribute('src', data[ks]);

      const kh = el.getAttribute('data-konten-href');
      if (kh && ada(data, kh) && aman(data[kh])) el.setAttribute('href', data[kh]);
    });
  }

  const cb = 'kontenCb_' + Date.now();
  const script = document.createElement('script');

  function bersihkan() {
    script.remove();
    delete window[cb];
  }

  window[cb] = function (hasil) {
    bersihkan();
    if (hasil && hasil.success && hasil.data) terapkan(hasil.data);
  };
  script.onerror = bersihkan;
  script.src = API_URL + '?action=konten-publik&callback=' + cb;
  document.head.appendChild(script);
})();