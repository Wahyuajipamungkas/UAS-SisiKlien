import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBencana } from '../redux/dataSlice';

const InventoryList = () => {
  const dispatch = useDispatch();
  const { bencana, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchBencana());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!bencana.length) {
    return <p>Data tidak ditemukan.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Bencana</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bencana.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <img src="../asset/trash.png" alt="" />
            <h3 className="text-lg font-semibold mb-2">{item.judul}</h3>
            <p className="text-gray-600">Nama: {item.nama}</p>
            <p className="text-gray-600">Waktu: {item.tanggal}</p>
            <p className="text-gray-600">Lokasi: {item.lokasi}</p>
            <p className="text-blue-600 font-semibold">Keterangan: {item.keterangan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
