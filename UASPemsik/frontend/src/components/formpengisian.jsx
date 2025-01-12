import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBencana } from '../redux/dataSlice'; // Perbaiki impor
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const AddBencanaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State untuk menyimpan data form
    const [formData, setFormData] = useState({
        judul: '',
        nama: '', // Ganti 'name' menjadi 'nama'
        tanggal: '',
        lokasi: '',
        keterangan: '',
    });

    const [errors, setErrors] = useState({});

    // Menangani perubahan input
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0] // Menangani perubahan file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Validasi form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.judul) newErrors.judul = 'Judul harus diisi';
        if (!formData.nama) newErrors.nama = 'Nama harus diisi';  // Validasi nama
        if (!formData.tanggal) newErrors.tanggal = 'Waktu harus diisi';  // Validasi waktu
        if (!formData.lokasi) newErrors.lokasi = 'lokasi harus diisi';  // Validasi gambar
        if (!formData.keterangan) newErrors.keterangan = 'keterangan harus diisi';  // Validasi dokumen
        return newErrors;
    };

    // Menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            try {
                // Dispatch action addBencana ke Redux
                await dispatch(addBencana(formData)).unwrap(); // .unwrap() untuk menangani hasilnya langsung
                Swal.fire({
                    title: "Berhasil",
                    text: "Data bencana berhasil ditambahkan ke sistem.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate('/dasboard'); // Redirect setelah berhasil
            } catch (error) {
                Swal.fire({
                    title: "Gagal Menambahkan Data",
                    text: error.message || "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error("Error:", error);
                setErrors({ api: error.message || 'Gagal menambah data bencana' });
            }
        } else {
            // Jika ada error validasi, set error state
            setErrors(newErrors);
            Swal.fire({
                title: "Form Tidak Valid",
                text: "Harap periksa kembali data yang Anda masukkan.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Tambah Data Bencana</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                {/* Judul */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul}</p>}
                </div>

                {/* Nama */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                </div>

                {/* Waktu */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Waktu</label>
                    <input
                        type="datetime-local"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.tanggal && <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>}
                </div>

                {/* Gambar */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Lokasi</label>
                    <input
                        type="text"
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.lokasi}</p>}
                </div>

                {/* Dokumen */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Dokumen</label>
                    <textarea
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                    {errors.dokumen && <p className="text-red-500 text-sm mt-1">{errors.keterangan}</p>}
                </div>

                {/* Error API */}
                {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}

                {/* Tombol Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Tambah Data Bencana
                </button>
            </form>
        </div>
    );
};

export default AddBencanaForm;
