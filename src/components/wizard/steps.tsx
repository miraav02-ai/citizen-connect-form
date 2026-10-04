import { CheckCircle2, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { KATEGORI, URGENTI, type ComplaintData, type Urgensi } from "@/lib/wizard-data";
import { Field, TextArea, TextInput } from "@/components/ui/inputs";

export type StepProps = {
  data: ComplaintData;
  onChange: (patch: Partial<ComplaintData>) => void;
};

/* ---------- Step 1 · Data Pelapor ---------- */

export function StepPelapor({ data, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Nama Lengkap" htmlFor="nama">
        <TextInput
          id="nama"
          value={data.nama}
          onChange={(e) => onChange({ nama: e.target.value })}
          placeholder="Nama sesuai KTP"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="NIK" hint="16 digit, sesuai KTP" htmlFor="nik">
          <TextInput
            id="nik"
            inputMode="numeric"
            value={data.nik}
            onChange={(e) => onChange({ nik: e.target.value })}
            placeholder="3201 0812 9000 0007"
          />
        </Field>
        <Field label="No. HP" htmlFor="nohp">
          <TextInput
            id="nohp"
            inputMode="tel"
            value={data.noHp}
            onChange={(e) => onChange({ noHp: e.target.value })}
            placeholder="08xx xxxx xxxx"
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" hint="Untuk notifikasi tindak lanjut">
        <TextInput
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="nama@surel.id"
        />
      </Field>

      <Field label="Alamat" htmlFor="alamat">
        <TextArea
          id="alamat"
          rows={2}
          value={data.alamat}
          onChange={(e) => onChange({ alamat: e.target.value })}
          placeholder="Alamat domisili saat ini"
        />
      </Field>

      <p className="rounded-xl bg-primary/5 px-4 py-3 text-xs font-medium leading-relaxed text-muted-foreground ring-1 ring-primary/10">
        Identitas pelapor bersifat rahasia dan hanya digunakan untuk menindaklanjuti laporan Anda.
      </p>
    </div>
  );
}

/* ---------- Step 2 · Kategori & Jenis Masalah ---------- */

export function StepKategori({ data, onChange }: StepProps) {
  const aktif = KATEGORI[data.kategori] ?? Object.values(KATEGORI)[0];

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold text-muted-foreground">Kategori</label>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {Object.keys(KATEGORI).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ kategori: c, jenis: "" })}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97]",
                data.kategori === c
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "glass-in text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Field label="Jenis masalah" hint="Pilih yang paling sesuai">
        <div className="grid gap-2 sm:grid-cols-2">
          {aktif.jenis.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => onChange({ jenis: j })}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.98]",
                data.jenis === j
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "glass-in text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border",
                  data.jenis === j ? "border-primary-foreground/60 bg-primary-foreground/20" : "border-border",
                )}
              >
                {data.jenis === j && <span className="size-2 rounded-full bg-primary-foreground" />}
              </span>
              <span className="min-w-0">{j}</span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="Lokasi kejadian" htmlFor="lokasi" hint="Nama jalan, patokan, atau RT/RW">
        <TextInput
          id="lokasi"
          value={data.lokasi}
          onChange={(e) => onChange({ lokasi: e.target.value })}
          placeholder="Contoh: Depan SD Negeri 3, Sukamaju"
        />
      </Field>

      <p className="rounded-xl bg-primary/5 px-4 py-3 text-xs font-medium leading-relaxed text-muted-foreground ring-1 ring-primary/10">
        Unit tujuan: <span className="font-bold text-foreground">{aktif.unit}</span> · estimasi tanggap 2×24 jam.
      </p>
    </div>
  );
}

/* ---------- Step 3 · Detail Pengaduan ---------- */

const urgensiStyles: Record<Urgensi, string> = {
  Rendah: "bg-success text-success-foreground shadow-md shadow-success/30",
  Sedang: "bg-primary text-primary-foreground shadow-md shadow-primary/30",
  Tinggi: "bg-warn text-warn-foreground shadow-md shadow-warn/30",
};

export function StepDetail({ data, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Judul Pengaduan" htmlFor="judul">
        <TextInput
          id="judul"
          value={data.judul}
          onChange={(e) => onChange({ judul: e.target.value })}
          placeholder="Ringkas masalah dalam satu kalimat"
        />
      </Field>

      <Field label="Deskripsi Kronologi" htmlFor="deskripsi" hint="Jelaskan apa yang terjadi, sejak kapan, dan dampaknya">
        <TextArea
          id="deskripsi"
          rows={5}
          maxLength={1000}
          value={data.deskripsi}
          onChange={(e) => onChange({ deskripsi: e.target.value })}
          placeholder="Tuliskan kronologi kejadian…"
        />
        <p className="mt-1.5 text-right text-[11px] font-semibold text-muted-foreground">
          {data.deskripsi.length} / 1000 karakter
        </p>
      </Field>

      <Field label="Tingkat Urgensi">
        <div className="mt-1.5 flex gap-2">
          {URGENTI.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => onChange({ urgensi: u })}
              className={cn(
                "flex-1 rounded-full px-3 py-2 text-xs font-bold transition-all active:scale-[0.97] sm:flex-none sm:px-5",
                data.urgensi === u
                  ? urgensiStyles[u]
                  : "glass-in text-muted-foreground hover:text-foreground",
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Lampiran Bukti" hint="Opsional — foto atau dokumen pendukung">
        <div className="glass-in mt-1.5 flex items-center gap-3 rounded-2xl p-4 transition hover:bg-card/80">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Paperclip className="size-5" />
          </span>
          <label htmlFor="lampiran" className="min-w-0 flex-1 cursor-pointer">
            <span className="block truncate text-sm font-semibold text-foreground">
              {data.lampiran?.name ?? "Tambah foto bukti"}
            </span>
            <span className="text-xs text-muted-foreground">
              {data.lampiran ? `${data.lampiran.size} · ditambahkan` : "JPG atau PNG, hingga 5 MB"}
            </span>
          </label>
          {data.lampiran && (
            <button
              type="button"
              aria-label="Hapus lampiran"
              onClick={(e) => {
                e.preventDefault();
                onChange({ lampiran: null });
              }}
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
          <input
            id="lampiran"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onChange({ lampiran: { name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` } });
            }}
          />
        </div>
      </Field>
    </div>
  );
}

/* ---------- Step 4 · Konfirmasi ---------- */

function ReviewBlock({
  label,
  onEdit,
  rows,
  note,
}: {
  label: string;
  onEdit: () => void;
  rows: [string, string][];
  note?: string;
}) {
  return (
    <div className="glass-in rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs font-bold text-primary transition hover:text-primary/80"
        >
          Ubah
        </button>
      </div>
      <dl className="mt-3 space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="shrink-0 text-xs font-semibold text-muted-foreground">{k}</dt>
            <dd className="min-w-0 truncate text-right text-xs font-semibold text-foreground">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}

export function StepKonfirmasi({
  data,
  onEdit,
  setuju,
  onSetuju,
}: {
  data: ComplaintData;
  onEdit: (step: number) => void;
  setuju: boolean;
  onSetuju: (v: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <ReviewBlock
        label="Data Pelapor"
        onEdit={() => onEdit(0)}
        rows={[
          ["Nama", data.nama],
          ["NIK", data.nik],
          ["No. HP", data.noHp],
          ["Email", data.email],
        ]}
        note={data.alamat}
      />
      <ReviewBlock
        label="Kategori & Lokasi"
        onEdit={() => onEdit(1)}
        rows={[
          ["Kategori", data.kategori],
          ["Jenis", data.jenis],
          ["Lokasi", data.lokasi],
        ]}
      />
      <ReviewBlock
        label="Detail Pengaduan"
        onEdit={() => onEdit(2)}
        rows={[
          ["Judul", data.judul],
          ["Urgensi", data.urgensi],
          ["Lampiran", data.lampiran ? `${data.lampiran.name} (${data.lampiran.size})` : "Tidak ada"],
        ]}
        note={data.deskripsi}
      />

      <label className="glass-in flex cursor-pointer items-start gap-3 rounded-2xl p-4 transition hover:bg-card/80">
        <input
          type="checkbox"
          checked={setuju}
          onChange={(e) => onSetuju(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-primary"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">
          Saya menyatakan data yang saya isikan benar dan dapat dipertanggungjawabkan. Pengaduan yang sama tidak perlu
          dikirim lebih dari satu kali.
        </span>
      </label>
    </div>
  );
}

export function SuccessPanel({ ticket, onReset }: { ticket: string; onReset: () => void }) {
  return (
    <div className="glass rise mx-auto max-w-xl rounded-3xl p-8 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="size-8" />
      </div>
      <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground">Pengaduan Terkirim</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Pengaduan Anda telah diteruskan ke unit yang berwenang. Simpan nomor tiket berikut untuk memantau status
        tindak lanjut.
      </p>
      <div className="glass-in mt-5 rounded-2xl px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Nomor Tiket</p>
        <p className="mt-0.5 text-xl font-extrabold tracking-wide text-primary">{ticket}</p>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Estimasi tanggap pertama: 2×24 jam kerja.</p>
    </div>
  );
}
