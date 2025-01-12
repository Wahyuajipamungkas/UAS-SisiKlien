import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosintall";

// Async Thunk untuk Fetch Data Bencana
export const fetchBencana = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/data");
      return response.data || []; // Pastikan yang dikembalikan adalah array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal memuat data bencana"
      );
    }
  }
);

// Async Thunk untuk Menambah Data Bencana
export const addBencana = createAsyncThunk(
  "data/addData",
  async (newData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/api/data", newData);
        return response.data;
      } catch (error) {
        // Menambahkan log untuk melihat lebih rinci
        console.error('Error Response:', error.response);  // Melihat seluruh respons error
        console.error('Error Message:', error.message);     // Melihat pesan error umum
        console.error('Error Stack:', error.stack);         // Melihat jejak tumpukan (stack trace)
      
        return rejectWithValue(
          error.response?.data?.message || "Gagal menambah data bencana"
        );
      }
      
  }
);

// Async Thunk untuk Mengedit Data Bencana
export const editBencana = createAsyncThunk(
  "data/editData",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/data/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengedit data bencana"
      );
    }
  }
);

// Async Thunk untuk Menghapus Data Bencana
export const deleteBencana = createAsyncThunk(
  "data/deleteBencana",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/data/${id}`);
      if (!response.ok) throw new Error("Gagal menghapus data");
      return id; // Mengembalikan ID yang berhasil dihapus
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice Data Bencana
const initialState = {
  user: null,
  token: null,
  data: [],
  loading: false,
  error: null,
};

export const bencanaSlice = createSlice({
  name: "data",
  initialState: {
    bencana: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBencana.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBencana.fulfilled, (state, action) => {
        state.loading = false;
        state.bencana = action.payload;
      })
      .addCase(fetchBencana.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBencana.pending, (state) => {
        state.loading = true;
      })
      // .addCase(addBencana.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data.pust(action.payload);
      // })
      .addCase(addBencana.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBencana.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBencana.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      })
      .addCase(editBencana.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBencana.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBencana.fulfilled, (state, action) => {
        state.bencana = state.bencana.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteBencana.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { login, logout } = bencanaSlice.actions;

export default bencanaSlice.reducer;
