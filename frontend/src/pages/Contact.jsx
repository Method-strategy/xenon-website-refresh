import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { MaskText, Reveal } from "@/components/common/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { PROFESSIONS } from "@/data/site";
import { cn } from "@/lib/utils";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELD =
  "border-white/15 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:ring-xo-teal focus-visible:border-xo-teal";

const TIMES = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Late (4pm–6pm)"];
const SIZES = ["Solo / 1 provider", "2–4 providers", "5–10 providers", "Multi-location / enterprise"];

export default function Contact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    organization: "",
    profession: "",
    practice_size: "",
    preferred_time: "",
    message: "",
  });
  const [date, setDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) {
      toast.error("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/demo-request`, {
        ...form,
        preferred_date: date ? format(date, "yyyy-MM-dd") : "",
      });
      setDone(true);
      toast.success("Request received. We'll be in touch within one business day.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please email info@xophthalmics.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-xo-obsidian pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Request a Demo</div>
          <MaskText
            lines={["See the whole journey", "in thirty minutes."]}
            as="span"
            className="max-w-[16ch] font-display text-[11vw] font-medium leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-7xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Tell us about your practice and we'll be in touch within one business day —
            a walkthrough of the full patient visit, mapped against how your practice
            runs today.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-xo-obsidian py-20 md:py-28">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="demo-success"
                className="flex min-h-[400px] flex-col items-start justify-center rounded-md border border-xo-teal/30 bg-xo-void p-12"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-xo-teal/40 bg-xo-teal/10">
                  <Check className="h-6 w-6 text-xo-teal" />
                </div>
                <h2 className="mt-8 font-display text-4xl text-white">Request received.</h2>
                <p className="mt-4 max-w-md text-white/55">
                  Thank you, {form.first_name}. A member of our team will reach out
                  within one business day to schedule your walkthrough.
                </p>
              </motion.div>
            ) : (
              <Reveal>
                <form onSubmit={submit} data-testid="demo-form" className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="First name" required>
                      <Input data-testid="input-first-name" value={form.first_name} onChange={set("first_name")} className={FIELD} placeholder="Jane" />
                    </Field>
                    <Field label="Last name" required>
                      <Input data-testid="input-last-name" value={form.last_name} onChange={set("last_name")} className={FIELD} placeholder="Doe" />
                    </Field>
                    <Field label="Email" required>
                      <Input data-testid="input-email" type="email" value={form.email} onChange={set("email")} className={FIELD} placeholder="jane@practice.com" />
                    </Field>
                    <Field label="Phone">
                      <Input data-testid="input-phone" value={form.phone} onChange={set("phone")} className={FIELD} placeholder="+1 (555) 000-0000" />
                    </Field>
                    <Field label="Organization">
                      <Input data-testid="input-organization" value={form.organization} onChange={set("organization")} className={FIELD} placeholder="Practice or company" />
                    </Field>
                    <Field label="Profession">
                      <Select value={form.profession} onValueChange={(v) => setForm((f) => ({ ...f, profession: v }))}>
                        <SelectTrigger data-testid="select-profession" className={FIELD}>
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-xo-void text-white">
                          {PROFESSIONS.map((p) => (
                            <SelectItem key={p} value={p} className="focus:bg-white/5 focus:text-xo-teal">
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Practice size">
                      <Select value={form.practice_size} onValueChange={(v) => setForm((f) => ({ ...f, practice_size: v }))}>
                        <SelectTrigger data-testid="select-size" className={FIELD}>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-xo-void text-white">
                          {SIZES.map((s) => (
                            <SelectItem key={s} value={s} className="focus:bg-white/5 focus:text-xo-teal">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Preferred time">
                      <Select value={form.preferred_time} onValueChange={(v) => setForm((f) => ({ ...f, preferred_time: v }))}>
                        <SelectTrigger data-testid="select-time" className={FIELD}>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-xo-void text-white">
                          {TIMES.map((t) => (
                            <SelectItem key={t} value={t} className="focus:bg-white/5 focus:text-xo-teal">
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Preferred date">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            data-testid="date-trigger"
                            className={cn(
                              "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors",
                              FIELD,
                              !date && "text-white/30",
                            )}
                          >
                            {date ? format(date, "PPP") : "Pick a date"}
                            <CalendarIcon className="h-4 w-4 text-white/40" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto border-white/10 bg-xo-void p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </Field>
                  </div>

                  <Field label="What would you like to see?">
                    <Textarea
                      data-testid="input-message"
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      className={FIELD}
                      placeholder="Tell us about your current workflow, goals, or questions."
                    />
                  </Field>

                  <button type="submit" data-testid="demo-submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </>
                    ) : (
                      "Request a Demo"
                    )}
                  </button>
                </form>
              </Reveal>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="sticky top-32 rounded-md border border-white/10 bg-xo-void p-8">
                <div className="eyebrow mb-6">Contact</div>
                <p className="font-display text-2xl leading-snug text-white">
                  Talk to Xenon Ophthalmics.
                </p>
                <div className="mt-8 space-y-6 text-sm text-white/55">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Address</div>
                    <p className="mt-2 leading-relaxed">
                      525 Washington Blvd, Suite 300
                      <br />
                      Jersey City, NJ 07310
                      <br />
                      United States
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Email</div>
                    <a href="mailto:info@xophthalmics.com" data-testid="contact-email" className="mt-2 block text-xo-teal transition-colors hover:text-white">
                      info@xophthalmics.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
        {label} {required && <span className="text-xo-teal">*</span>}
      </Label>
      {children}
    </div>
  );
}
