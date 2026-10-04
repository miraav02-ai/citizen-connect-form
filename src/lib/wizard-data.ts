export type Urgensi = "Rendah" | "Sedang" | "Tinggi";

export type Lampiran = { name: string; size: string } | null;

export type ComplaintData = {
  nama: string;
  nik: string;
  noHp: string;
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
  { title: "Data Pelapor", hint: "Nama, NIK, dan No. HP" },
  { title: "Kategori Masalah", hint: "Jenis & lokasi kejadian" },
  { title: "Detail Pengaduan", hint: "Kronologi & bukti" },
  { title: "Konfirmasi", hint: "Tinjau & kirim" },
] as const;

/* All fields start empty — the user fills them in themselves */
export const initialData: ComplaintData = {
  nama: "",
  nik: "",
  noHp: "",
  kategori: "",
  jenis: "",
  lokasi: "",
  judul: "",
  deskripsi: "",
  urgensi: "Sedang",
  lampiran: null,
};
