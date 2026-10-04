import { CheckCircle2, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { KATEGORI, onlyDigits, URGENTI, type ComplaintData, type Urgensi } from "@/lib/wizard-data";
import { Field, TextArea, TextInput } from "@/components/ui/inputs";

export type StepProps = {
  data: ComplaintData;
  onChange: (patch: Partial<ComplaintData>) => void;
  errors: Record<string, string>;
  touch: (key: string) => void;
};

/* ---------- Step 1 · Data Pelapor ---------- */

export function StepPelapor({ data, onChange, errors, touch }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Nama Lengkap" htmlFor="nama" required error={errors["nama"]}>
        <TextInput
          id="nama"
          value={data.nama}
          maxLength={100}
          autoComplete="name"
          aria-invalid={Boolean(errors["nama"])}
          onChange={(e) => onChange({ nama: e.target.value })}
          onBlur={() => touch("nama")}
          placeholder="Nama sesuai KTP"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="NIK" hint="16 digit, sesuai KTP" htmlFor="nik" required error={errors["nik"]}>
          <TextInput
            id="nik"
            inputMode="numeric"
            autoComplete="off"
            value={data.nik}
            aria-invalid={Boolean(errors["nik"])}
            onChange={(e) => onChange({ nik: onlyDigits(e.target.value, 16) })}
            onBlur={() => touch("nik")}
            placeholder="Contoh: 3201081290000007"
          />
        </Field>
        <Field label="No. HP" hint="Diawali 08, 10–13 digit" htmlFor="nohp" required error={errors["noHp"]}>
          <TextInput
            id="nohp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.noHp}
            aria-invalid={Boolean(errors["noHp"])}
            onChange={(e) => onChange({ noHp: onlyDigits(e.target.value, 13) })}
            onBlur={() => touch("noHp")}
            placeholder="Contoh: 081234567890"
          />
        </Field>
      </div>

      <p className="rounded-lg bg-secondary px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
        Identitas pelapor bersifat rahasia dan hanya digunakan untuk menindaklanjuti laporan Anda.
      </p>
    </div>
  );
}

/* ---------- Step 2 · Kategori & Jenis Masalah ---------- */

export function StepKategori({ data, onChange, errors }: StepProps) {
  const aktif = KATEGORI[data.kategori] ?? Object.values(KATEGORI)[0]!;

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-foreground">
          Kategori<span className="ml-0.5 text-destructive">*</span>
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.keys(KATEGORI).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ kategori: c, jenis: "" })}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
                data.kategori === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        {errors["kategori"] && (
          <p role="alert" className="mt-1.5 text-[11px] font-medium text-destructive">
            {errors["kategori"]}
          </p>
        )}
      </div>

      <Field label="Jenis masalah" hint="Pilih yang paling sesuai" required error={errors["jenis"]}>
        <div className="grid gap-2 sm:grid-cols-2">
          {aktif.jenis.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => onChange({ jenis: j })}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-[13px] transition-colors",
                data.jenis === j
                  ? "border-primary bg-primary/5 font-semibold text-primary"
                  : "border-border bg-card text-foreground hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full border-2",
                  data.jenis === j ? "border-primary" : "border-border",
                )}
              >
                {data.jenis === j && <span className="size-2 rounded-full bg-primary" />}
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
          placeholder="Contoh: Jl. Merdeka No. 10, RT 02/RW 03"
        />
      </Field>

      <p className="rounded-lg bg-secondary px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
        Unit tujuan: <span className="font-semibold text-foreground">{aktif.unit}</span> · estimasi tanggap 2×24 jam.
      </p>
    </div>
  );
}

/* ---------- Step 3 · Detail Pengaduan ---------- */

const urgensiStyles: Record<Urgensi, string> = {
  Rendah: "bg-success text-success-foreground",
  Sedang: "bg-primary text-primary-foreground",
  Tinggi: "bg-warn text-warn-foreground",
};

export function StepDetail({ data, onChange, errors, touch }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Judul Pengaduan" htmlFor="judul" required error={errors["judul"]} hint="Minimal 10 karakter">
        <TextInput
          id="judul"
          value={data.judul}
          maxLength={120}
          aria-invalid={Boolean(errors["judul"])}
          onChange={(e) => onChange({ judul: e.target.value })}
          onBlur={() => touch("judul")}
          placeholder="Ringkas masalah dalam satu kalimat"
        />
      </Field>

      <Field
        label="Deskripsi Kronologi"
        htmlFor="deskripsi"
        required
        error={errors["deskripsi"]}
        hint="Jelaskan apa yang terjadi, sejak kapan, dan dampaknya (min. 30 karakter)"
      >
        <TextArea
          id="deskripsi"
          rows={5}
          maxLength={1000}
          value={data.deskripsi}
          aria-invalid={Boolean(errors["deskripsi"])}
          onChange={(e) => onChange({ deskripsi: e.target.value })}
          onBlur={() => touch("deskripsi")}
          placeholder="Tuliskan kronologi kejadian…"
        />
        <p className="mt-1 text-right text-[11px] text-muted-foreground">{data.deskripsi.length} / 1000 karakter</p>
      </Field>

      <Field label="Tingkat Urgensi">
        <div className="mt-1.5 flex gap-2">
          {URGENTI.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => onChange({ urgensi: u })}
              className={cn(
                "flex-1 rounded-full border px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-5",
                data.urgensi === u ? urgensiStyles[u] : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Lampiran Bukti" hint="Opsional — foto atau dokumen pendukung">
        <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-dashed border-border bg-card p-3 transition-colors hover:bg-secondary">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Paperclip className="size-4" />
          </span>
          <label htmlFor="lampiran" className="min-w-0 flex-1 cursor-pointer">
            <span className="block truncate text-[13px] font-medium text-foreground">
              {data.lampiran?.name ?? "Tambah foto bukti"}
            </span>
            <span className="text-[11px] text-muted-foreground">
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
              className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
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
    <div className="panel-in rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs font-semibold text-primary transition hover:text-primary/80"
        >
          Ubah
        </button>
      </div>
      <dl className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="shrink-0 text-xs text-muted-foreground">{k}</dt>
            <dd className="min-w-0 truncate text-right text-xs font-medium text-foreground">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}

export function StepKonfirmasi({
  data,
  onEdit,
  setuju,
  onSetuju,
  errorSetuju,
}: {
  data: ComplaintData;
  onEdit: (step: number) => void;
  setuju: boolean;
  onSetuju: (v: boolean) => void;
  errorSetuju?: string | undefined;
}) {
  return (
    <div className="space-y-3">
      <ReviewBlock
        label="Data Pelapor"
        onEdit={() => onEdit(0)}
        rows={[
          ["Nama", data.nama],
          ["NIK", data.nik],
          ["No. HP", data.noHp],
        ]}
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

      <label className="panel-in flex cursor-pointer items-start gap-3 rounded-lg p-4">
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
      {errorSetuju && (
        <p role="alert" className="text-[11px] font-medium text-destructive">
          {errorSetuju}
        </p>
      )}
    </div>
  );
}

export function SuccessPanel({ ticket, onReset }: { ticket: string; onReset: () => void }) {
  return (
    <div className="panel rise mx-auto max-w-xl rounded-2xl p-8 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="size-7" />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">Pengaduan Terkirim</h2>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Pengaduan Anda telah diteruskan ke unit yang berwenang. Simpan nomor tiket berikut untuk memantau status
        tindak lanjut.
      </p>
      <div className="panel-in mx-auto mt-5 w-fit rounded-lg px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Nomor Tiket</p>
        <p className="mt-0.5 text-lg font-bold tracking-wide text-primary">{ticket}</p>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Estimasi tanggap pertama: 2×24 jam kerja.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Buat pengaduan baru
        </button>
      </div>
    </div>
  );
}
