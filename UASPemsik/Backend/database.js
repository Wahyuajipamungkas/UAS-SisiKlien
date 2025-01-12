const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 8000,    // Ganti dengan host database Anda
  user: 'root',         // Ganti dengan username database Anda
  password: '',         // Ganti dengan password database Anda
  database: 'klien'  // Nama database Anda
});

db.connect(err => {
  if (err) {
    console.error('Error koneksi: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;
