import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, ShieldCheck } from "lucide-react";
import { initialData, STEPS, type ComplaintData } from "@/lib/wizard-data";
import { DesktopStepper, MobileStepper } from "@/components/wizard/Stepper";
import { StepDetail, StepKategori, StepKonfirmasi, StepPelapor, SuccessPanel } from "@/components/wizard/steps";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Form Pengaduan Masyarakat — Lapor Warga" },
      {
        name: "description",
        content:
          "Sampaikan pengaduan Anda kepada pemerintah dalam 4 langkah mudah: data pelapor, kategori masalah, detail pengaduan, dan konfirmasi.",
      },
      { property: "og:title", content: "Form Pengaduan Masyarakat — Lapor Warga" },
      { property: "og:description", content: "Sampaikan pengaduan Anda dalam 4 langkah mudah." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stepComponents = [StepPelapor, StepKategori, StepDetail] as const;

function Index() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ComplaintData>(initialData);
  const [setuju, setSetuju] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);

  const onChange = (patch: Partial<ComplaintData>) => setData((d) => ({ ...d, ...patch }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canContinue = [
    Boolean(data.nama.trim() && data.noHp.trim()),
    Boolean(data.kategori && data.jenis),
    Boolean(data.judul.trim() && data.deskripsi.trim()),
    setuju,
  ][step];

  const submit = () => {
    const now = new Date();
    const rand = String(Math.floor(Math.random() * 900) + 100);
    setTicket(`ADU-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${rand}`);
  };

  const reset = () => {
    setData(initialData);
    setSetuju(false);
    setStep(0);
    setTicket(null);
  };

  const ActiveStep = step < 3 ? stepComponents[step]! : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient glow backdrop */}
      <div className="pointer-events-none fixed -left-24 -top-32 size-[420px] rounded-full bg-primary-soft/40 opacity-55 blur-[90px]" />
      <div className="pointer-events-none fixed -right-28 top-1/3 size-[460px] rounded-full bg-glow-sky/30 opacity-55 blur-[90px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 size-[380px] rounded-full bg-glow-violet/30 opacity-55 blur-[90px]" />

      <header className="relative z-10 mx-auto max-w-6xl px-5 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/30">
              L
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold tracking-tight text-foreground">Lapor Warga</p>
              <p className="truncate text-[11px] font-medium text-muted-foreground">Form Pengaduan Masyarakat</p>
            </div>
          </div>
          <div className="glass hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 sm:flex">
            <span className="size-2 rounded-full bg-success" />
            <span className="text-xs font-semibold text-muted-foreground">Kanal pengaduan aktif</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        {ticket ? (
          <SuccessPanel ticket={ticket} onReset={reset} />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Sampaikan pengaduan Anda
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Lengkapi 4 langkah. Semua data tersimpan otomatis saat berpindah.
                </p>
              </div>
              <div className="glass hidden shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 sm:flex">
                <ShieldCheck className="size-4 text-success" />
                <span className="text-xs font-semibold text-muted-foreground">Data tersimpan aman</span>
              </div>
            </div>

            <MobileStepper current={step} />

            <div className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
              <DesktopStepper current={step} onSelect={setStep} />

              <section className="glass rounded-3xl p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Langkah {step + 1} dari {STEPS.length}
                    </p>
                    <h2 className="mt-1 truncate text-xl font-extrabold tracking-tight text-foreground">
                      {STEPS[step]!.title}
                    </h2>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success sm:block">
                    Draft disimpan
                  </span>
                </div>

                <div key={step} className="rise">
                  {ActiveStep ? (
                    <ActiveStep data={data} onChange={onChange} />
                  ) : (
                    <StepKonfirmasi
                      data={data}
                      onEdit={setStep}
                      setuju={setuju}
                      onSetuju={setSetuju}
                    />
                  )}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                    Kembali
                  </Button>
                  {step < 3 ? (
                    <Button onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={!canContinue}>
                      Lanjut ke {STEPS[step + 1].title}
                    </Button>
                  ) : (
                    <Button onClick={submit} disabled={!canContinue}>
                      Kirim Pengaduan
                      <Send className="size-4" />
                    </Button>
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
