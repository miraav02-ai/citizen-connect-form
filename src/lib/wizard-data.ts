export type Urgensi = "Rendah" | "Sedang" | "Tinggi";

export type Lampiran = { name: string; size: string } | null;

export type ComplaintData = {
  nama: string;
  nik: string;
  noHp: string;
  email: string;
  alamat: string;
  kategori: string;
  jenis: string;
  lokasi: string;
  judul: string;
  deskripsi: string;
  urgensi: Urgensi;
  lampiran: Lampiran;
};

export const KATEGORI: Record<string, { jenis: string[]; unit: string }> = {
  Infrastruktur: {
    jenis: ["Jalan berlubang & rusak", "Drainase tersumbat", "Trotoar rusak", "Jembatan rusak"],
    unit: "Dinas Bina Marga & Pengairan",
  },
  Lingkungan: {
    jenis: ["Sampah menumpuk", "Pencemaran sungai", "Pohon tumbang", "Bau tidak sedap"],
    unit: "Dinas Lingkungan Hidup",
  },
  "Pelayanan Publik": {
    jenis: ["Pelayanan lambat", "Pungutan tidak resmi", "Fasilitas umum rusak", "Informasi tidak jelas"],
    unit: "Bagian Pengaduan Layanan",
  },
  Kebersihan: {
    jenis: ["Sampah tidak diangkut", "Sampah liar", "Saluran kotor", "Taman tidak terawat"],
    unit: "Dinas Kebersihan",
  },
  Penerangan: {
    jenis: ["Lampu jalan mati", "Lampu rusak", "Belum ada penerangan", "Kabel menggantung"],
    unit: "Dinas Perumahan & Energi",
  },
  Keamanan: {
    jenis: ["Ketertiban umum", "Gangguan keamanan", "Parkir liar", "Fasilitas rusak"],
    unit: "Satuan Polisi Pamong",
  },
};

export const URGENTI: Urgensi[] = ["Rendah", "Sedang", "Tinggi"];

export const STEPS = [
  { title: "Data Pelapor", hint: "Nama, kontak, alamat" },
  { title: "Kategori Masalah", hint: "Jenis & lokasi kejadian" },
  { title: "Detail Pengaduan", hint: "Kronologi & bukti" },
  { title: "Konfirmasi", hint: "Tinjau & kirim" },
] as const;

/* Dummy data prefilled so the flow reads like a real draft */
export const initialData: ComplaintData = {
  nama: "Ahmad Fauzan",
  nik: "3201081290000007",
  noHp: "0812-3456-7890",
  email: "ahmad.fauzan@surel.id",
  alamat: "Jl. Melati No. 12, RT 04/RW 02, Sukamaju",
  kategori: "Infrastruktur",
  jenis: "Jalan berlubang & rusak",
  lokasi: "Depan SD Negeri 3, Sukamaju",
  judul: "Jalan berlubang di depan SD Negeri 3, rawan kecelakaan",
  deskripsi:
    "Lubang sepanjang kurang lebih 1,5 meter muncul sejak tiga minggu lalu setelah hujan deras. Beberapa pengendara motor terjatuh saat menghindari lubang. Mohon segera dilakukan perbaikan.",
  urgensi: "Tinggi",
  lampiran: { name: "foto-lubang-01.jpg", size: "1.2 MB" },
};
