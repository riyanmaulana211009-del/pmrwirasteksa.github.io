const ADMIN_EMAIL = 'riyanmaulana211009@gmail.com';
const GOOGLE_CLIENT_ID =
  '233845011318-9cbh4ichb4v0uas56uuub7ml2dnc1m9v.apps.googleusercontent.com';
const STATUS_BOLEH = ['menunggu', 'dipertimbangkan', 'diterima', 'ditolak'];

function jsonp(callback, data) {
  const safeCallback = /^[a-zA-Z_$][0-9a-zA-Z_$.]*$/.test(callback)
    ? callback
    : 'callback';
  return ContentService
    .createTextOutput(safeCallback + '(' + JSON.stringify(data) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function verifikasiGoogle(token) {
  if (!token) throw new Error('Token Google tidak ditemukan.');

  const url =
    'https://oauth2.googleapis.com/tokeninfo?id_token=' +
    encodeURIComponent(token);
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  if (response.getResponseCode() !== 200) {
    throw new Error('Token Google tidak valid.');
  }

  const user = JSON.parse(response.getContentText());

  if (
    user.aud !== GOOGLE_CLIENT_ID ||
    user.email_verified !== 'true' ||
    String(user.email).toLowerCase() !== ADMIN_EMAIL
  ) {
    throw new Error('Akun Google tidak memiliki akses Admin.');
  }
  return user.email;
}

function ambilSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pendaftaran');
  if (!sheet) throw new Error('Sheet Pendaftaran tidak ditemukan.');
  if (sheet.getMaxColumns() < 6) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), 6 - sheet.getMaxColumns());
  }
  if (sheet.getRange(1, 6).getValue() === '') {
    sheet.getRange(1, 6).setValue('Status');
  }
  return sheet;
}

function bacaPendaftaranAdmin() {
  const sheet = ambilSheet();
  const jumlah = sheet.getLastRow() - 1;
  if (jumlah < 1) return [];

  const zona = Session.getScriptTimeZone();
  const values = sheet.getRange(2, 1, jumlah, 6).getValues();

  return values.map((row, i) => {
    const waktu = row[0] instanceof Date
      ? Utilities.formatDate(row[0], zona, "yyyy-MM-dd'T'HH:mm:ss")
      : String(row[0]);
    const status = String(row[5] || '').toLowerCase();
    return {
      id: i + 2,
      waktu: waktu,
      tanggal: waktu,
      nama: String(row[1]),
      kelas: String(row[2]),
      alasan: String(row[3]),
      harapan: String(row[4]),
      status: STATUS_BOLEH.indexOf(status) >= 0 ? status : 'menunggu'
    };
  }).reverse();
}

function ubahStatusAdmin(id, status) {
  const baris = Number(id);
  status = String(status || '').toLowerCase();
  if (STATUS_BOLEH.indexOf(status) < 0) throw new Error('Status tidak valid.');

  const sheet = ambilSheet();
  if (!Number.isInteger(baris) || baris < 2 || baris > sheet.getLastRow()) {
    throw new Error('Data pendaftar tidak ditemukan.');
  }
  sheet.getRange(baris, 6).setValue(status);
  return { id: baris, status: status };
}

function doGet(e) {
  const callback = (e && e.parameter && e.parameter.callback) || 'callback';

  try {
    const action = e.parameter.action;
    const email = verifikasiGoogle(e.parameter.token);

    if (action === 'verifikasi-token') {
      return jsonp(callback, { success: true, verified: true, email: email });
    }
    if (action === 'pendaftaran') {
      return jsonp(callback, { success: true, data: bacaPendaftaranAdmin() });
    }
    if (action === 'ubah-status') {
      return jsonp(callback, {
        success: true,
        data: ubahStatusAdmin(e.parameter.id, e.parameter.status)
      });
    }
    throw new Error('Aksi tidak dikenal.');

  } catch (error) {
    return jsonp(callback, {
      success: false,
      verified: false,
      message: error.message
    });
  }
}