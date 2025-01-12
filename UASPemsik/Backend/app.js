const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import pustaka CORS
const db = require('./database');

const app = express();
const port = 3021;

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  credentials: true // Jika menggunakan cookie atau otentikasi
}));

// Middleware untuk parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Buat folder uploads jika belum ada
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}



// READ (Baca Data)
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM bencana', (err, results) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// CREATE (Tambah Data)
app.post("/api/data", (req, res) => {
  const { judul, nama, tanggal, lokasi, keterangan } = req.body;
  const foto = req.file ? req.file.filename : null;
  console.log("body: ", req.body)

  const query = 'INSERT INTO bencana (judul, nama, tanggal, lokasi, keterangan) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [judul, nama, tanggal, lokasi, keterangan], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);  // Log error lebih rinci
      return res.status(500).send({ message: 'Terjadi kesalahan pada server', error: err });
    }
    res.status(201).send({ message: 'Data berhasil ditambahkan!', id: result.insertId });
  });
});

app.put('/api/data/:id', (req, res) => {
  const { id } = req.params; // Mengambil id dari parameter URL
  const { judul, nama, tanggal, lokasi, keterangan } = req.body; // Data yang akan diupdate
  // const foto = req.file ? req.file.filename : null; // Jika ada file baru yang diupload

  // Validasi input
  // if (!judul || !nama || !tanggal || !tempat || !keterangan) {
  //   return res.status(400).send({ message: 'Semua field harus diisi!' });
  // }

  // Query untuk update data
  const query = `
    UPDATE bencana 
    SET judul = ?, nama = ?, tanggal = ?, lokasi = ?, keterangan = ? 
    WHERE id = ?
  `;

  // Parameter untuk query
  const params = nama
    ? [judul, nama, tanggal, lokasi, keterangan, id]
    : [judul, nama, tanggal, lokasi, keterangan, id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error executing query:', err); // Log error lebih rinci
      return res.status(500).send({ message: 'Terjadi kesalahan pada server', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Data tidak ditemukan!' });
    }

    res.status(200).send({ message: 'Data berhasil diperbarui!' });
  });
});



// DELETE (Hapus Data)
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  // db.query('SELECT * FROM bencana WHERE id = ?', [id], (err, result) => {
  //   if (err) {
  //     return res.status(500).send({ error: err.message });
  //   }
  //   if (result.length === 0) {
  //     return res.status(404).send({ message: 'Data tidak ditemukan!' });
  //   }

  //   const image = result[0].image;
  //   const filePath = path.join(__dirname, 'uploads', image);

  //   if (fs.existsSync(filePath)) {
  //     try {
  //       fs.unlinkSync(filePath);
  //     } catch (err) {
  //       console.error('Gagal menghapus file:', err);
  //     }
  //   }

    db.query('DELETE FROM bencana WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(200).send({ message: 'Data berhasil dihapus!' });
    });
  // });
});


// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
