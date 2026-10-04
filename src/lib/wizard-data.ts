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

/* ---------- Validation ---------- */

export const onlyDigits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);

export const validators = {
  nama: (v: string) => {
    const t = v.trim();
    if (!t) return "Nama lengkap wajib diisi.";
    if (t.length < 3) return "Nama minimal 3 karakter.";
    if (t.length > 100) return "Nama maksimal 100 karakter.";
    return "";
  },
  nik: (v: string) => {
    if (!v) return "NIK wajib diisi.";
    if (v.length !== 16) return `NIK harus 16 digit (sekarang ${v.length}).`;
    return "";
  },
  noHp: (v: string) => {
    if (!v) return "No. HP wajib diisi.";
    if (!v.startsWith("08")) return "No. HP harus diawali 08.";
    if (v.length < 10 || v.length > 13) return "No. HP harus 10–13 digit.";
    return "";
  },
  kategori: (v: string) => (v ? "" : "Pilih salah satu kategori."),
  jenis: (v: string) => (v ? "" : "Pilih jenis masalah."),
  judul: (v: string) => {
    const t = v.trim();
    if (!t) return "Judul pengaduan wajib diisi.";
    if (t.length < 10) return "Judul minimal 10 karakter.";
    return "";
  },
  deskripsi: (v: string) => {
    const t = v.trim();
    if (!t) return "Deskripsi kronologi wajib diisi.";
    if (t.length < 30) return "Deskripsi minimal 30 karakter agar mudah ditindaklanjuti.";
    return "";
  },
} as const;

export type FieldKey = keyof typeof validators;

export function stepErrors(step: number, data: ComplaintData, setuju: boolean): Partial<Record<string, string>> {
  const e: Record<string, string> = {};
  if (step === 0) {
    e["nama"] = validators.nama(data.nama);
    e["nik"] = validators.nik(data.nik);
    e["noHp"] = validators.noHp(data.noHp);
  } else if (step === 1) {
    e["kategori"] = validators.kategori(data.kategori);
    e["jenis"] = validators.jenis(data.jenis);
  } else if (step === 2) {
    e["judul"] = validators.judul(data.judul);
    e["deskripsi"] = validators.deskripsi(data.deskripsi);
  } else if (step === 3 && !setuju) {
    e["setuju"] = "Centang pernyataan untuk melanjutkan.";
  }
  return e;
}

export const stepValid = (step: number, data: ComplaintData, setuju: boolean) =>
  Object.values(stepErrors(step, data, setuju)).every((m) => !m);

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
