import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchBencana, editBencana, deleteBencana } from "../redux/dataSlice";

const Contentt = () => {
  const dispatch = useDispatch();
  const { bencana , loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchBencana());
  }, [dispatch]);

  const handleEditBencana = async (id) => {
    const bencanaData = bencana.find((item) => item.id === id);
    const { value: formValues } = await Swal.fire({
      title: "Edit Data Bencana",
      html: `
        <input id="swal-input-judul" class="swal2-input" placeholder="Judul" value="${bencanaData.judul}">
        <input id="swal-input-nama" class="swal2-input" placeholder="nama" value="${bencanaData.nama}">
        <input id="swal-input-tanggal" class="swal2-input" placeholder="tanggal" value="${bencanaData.tanggal}">
        <input id="swal-input-lokasi" class="swal2-input" placeholder="Lokasi" value="${bencanaData.lokasi}">
        <input id="swal-input-keterangan" class="swal2-input" placeholder="keterangan" value="${bencanaData.keterangan}">
      `,
      preConfirm: () => {
        const judul = document.getElementById("swal-input-judul").value;
        const nama = document.getElementById("swal-input-nama").value;
        const tanggal = document.getElementById("swal-input-tanggal").value;
        const lokasi = document.getElementById("swal-input-lokasi").value;
        const keterangan = document.getElementById("swal-input-keterangan").value;
        if (!judul || !nama || !tanggal || !lokasi || !keterangan) {
          Swal.showValidationMessage("Semua field harus diisi!");
          return null;
        }
        return { judul, nama, tanggal, lokasi, keterangan };
      },
    });

    if (formValues) {
      try {
        await dispatch(editBencana({ id, updatedData: formValues })).unwrap();
        Swal.fire("Berhasil", "Data berhasil diperbarui", "success");
      } catch (error) {
        Swal.fire("Error", "Gagal mengupdate data", "error");
      }
    }
  };

  const handleDeleteBencana = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteBencana(id)).unwrap();
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus data", "error");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-5 overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Daftar Bencana</h1>
      <table className="table-auto min-w-full border-collapse border border-gray-300 text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">Judul</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">Nama Pengadu</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">Waktu</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">Tempat</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">keterangan</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Memuat Data...</td>
            </tr>
          ) : bencana.length > 0 ?  (
            bencana.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.judul}</td>
                <td className="border border-gray-300 px-4 py-2">{item.nama}</td>
                <td className="border border-gray-300 px-4 py-2">{item.tanggal}</td>
                <td className="border border-gray-300 px-4 py-2">{item.lokasi}</td>
                <td className="border border-gray-300 px-4 py-2">{item.keterangan}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEditBencana(item.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBencana(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">Tidak ada data tersedia</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default Contentt;
