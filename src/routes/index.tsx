import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { initialData, STEPS, stepErrors, stepValid, type ComplaintData } from "@/lib/wizard-data";
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const onChange = (patch: Partial<ComplaintData>) => setData((d) => ({ ...d, ...patch }));
  const touch = (key: string) => setTouched((t) => (t[key] ? t : { ...t, [key]: true }));

  const allErrors = stepErrors(step, data, setuju);
  const errors: Record<string, string> = Object.fromEntries(
    Object.entries(allErrors).filter(([k, v]) => v && touched[k]),
  ) as Record<string, string>;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canContinue = stepValid(step, data, setuju);

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
    setTouched({});
  };

  const ActiveStep = step < 3 ? stepComponents[step]! : null;

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-5xl border-b border-border bg-card px-5 sm:px-8">
        <div className="flex h-14 items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            L
          </div>
          <p className="truncate text-sm font-bold tracking-tight text-foreground">Lapor Warga</p>
          <span className="ml-auto truncate text-xs font-medium text-muted-foreground">
            Layanan Pengaduan Online
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-5 sm:px-8 sm:py-8">
        {ticket ? (
          <SuccessPanel ticket={ticket} onReset={reset} />
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Sampaikan pengaduan Anda
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Lengkapi 4 langkah. Data tersimpan saat Anda berpindah langkah.
              </p>
            </div>

            <MobileStepper current={step} />

            <div className="mt-4 grid items-start gap-4 lg:grid-cols-[224px_1fr]">
              <DesktopStepper current={step} onSelect={setStep} />

              <section className="panel rounded-2xl p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3.5">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Langkah {step + 1} dari {STEPS.length}
                    </p>
                    <h2 className="mt-0.5 truncate text-base font-bold tracking-tight text-foreground">
                      {STEPS[step]!.title}
                    </h2>
                  </div>
                  <span className="hidden shrink-0 text-[11px] font-medium text-muted-foreground sm:block">
                    Tersimpan otomatis
                  </span>
                </div>

                <div key={step} className="rise">
                  {ActiveStep ? (
                    <ActiveStep data={data} onChange={onChange} errors={errors} touch={touch} />
                  ) : (
                    <StepKonfirmasi
                      data={data}
                      onEdit={setStep}
                      setuju={setuju}
                      onSetuju={(v) => {
                        setSetuju(v);
                        touch("setuju");
                      }}
                      errorSetuju={errors["setuju"]}
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-col-reverse gap-2.5 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                  >
                    Kembali
                  </Button>
                  {step < 3 ? (
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => setStep((s) => Math.min(3, s + 1))}
                      disabled={!canContinue}
                    >
                      Lanjut ke {STEPS[step + 1]!.title}
                    </Button>
                  ) : (
                    <Button className="w-full sm:w-auto" onClick={submit} disabled={!canContinue}>
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
