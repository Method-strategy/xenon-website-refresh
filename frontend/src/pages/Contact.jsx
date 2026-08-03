import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
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
import { toast } from "sonner";
import { PROFESSIONS, COMPANY_SIZES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const FIELD =
  "border-fg/15 bg-fg/[0.03] text-fg placeholder:text-fg/30 focus-visible:ring-xo-blue focus-visible:border-xo-blue";

// HubSpot Forms Submit API. This form/portal pair matches the live "Request a Demo"
// form on xophthalmics.com/contact (see hs-form-frame data-portal-id / data-form-id).
// Do not change these IDs without a new form/portal from the client.
const HUBSPOT_PORTAL_ID = "245698072";
const HUBSPOT_FORM_GUID = "cf605cae-ee6b-4a84-9783-ae35dd05bae2";
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

function getHubspotCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("hubspotutk="))
    ?.split("=")[1];
}

export default function Contact() {
  usePageMeta({
    title: "Contact & Demo",
    description:
      "Request a demo of the XO Vision Care System or get in touch with the Xenon Ophthalmics team.",
  });
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profession: "",
    company_name: "",
    company_size: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.phone ||
      !form.profession ||
      !form.company_name
    ) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fields = [
        { objectTypeId: "0-1", name: "firstname", value: form.first_name },
        { objectTypeId: "0-1", name: "lastname", value: form.last_name },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "phone", value: form.phone },
        { objectTypeId: "0-1", name: "profession", value: form.profession },
        { objectTypeId: "0-2", name: "name", value: form.company_name },
      ];
      if (form.company_size) {
        fields.push({ objectTypeId: "0-2", name: "numberofemployees", value: form.company_size });
      }
      if (form.message) {
        fields.push({ objectTypeId: "0-1", name: "comments", value: form.message });
      }

      const hutk = getHubspotCookie();
      const res = await fetch(HUBSPOT_SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        const details = (result.errors || []).map((err) => err.message).join(" ");
        throw new Error(details || "Submission failed.");
      }
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
      <section className="grain relative overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Request a Demo</div>
          <MaskText
            lines={["See the whole journey", "in thirty minutes."]}
            as="span"
            className="max-w-[16ch] font-display text-[8.5vw] font-medium leading-[0.97] tracking-tight text-fg sm:text-4xl lg:text-6xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">
            Tell us about your practice and we'll be in touch within one business day:
            a walkthrough of the full patient visit, mapped against how your practice
            runs today.
          </p>
        </div>
      </section>

      <section className="border-t border-fg/10 bg-bg py-20 md:py-28">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="demo-success"
                className="flex min-h-[400px] flex-col items-start justify-center rounded-md border border-xo-blue/30 bg-surface p-12"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-xo-blue/40 bg-xo-blue/10">
                  <Check className="h-6 w-6 text-xo-blue" />
                </div>
                <h2 className="mt-8 font-display text-4xl text-fg">Request received.</h2>
                <p className="mt-4 max-w-md text-fg/55">
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
                    <Field label="Phone" required>
                      <Input data-testid="input-phone" type="tel" value={form.phone} onChange={set("phone")} className={FIELD} placeholder="+1 (555) 000-0000" />
                    </Field>
                    <Field label="Profession" required>
                      <Select value={form.profession} onValueChange={(v) => setForm((f) => ({ ...f, profession: v }))}>
                        <SelectTrigger data-testid="select-profession" className={FIELD}>
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                        <SelectContent className="border-fg/10 bg-surface text-fg">
                          {PROFESSIONS.map((p) => (
                            <SelectItem key={p} value={p} className="focus:bg-fg/5 focus:text-xo-blue">
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Company name" required>
                      <Input data-testid="input-company-name" value={form.company_name} onChange={set("company_name")} className={FIELD} placeholder="Practice or company" />
                    </Field>
                    <Field label="Company size">
                      <Select value={form.company_size} onValueChange={(v) => setForm((f) => ({ ...f, company_size: v }))}>
                        <SelectTrigger data-testid="select-company-size" className={FIELD}>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="border-fg/10 bg-surface text-fg">
                          {COMPANY_SIZES.map((s) => (
                            <SelectItem key={s} value={s} className="focus:bg-fg/5 focus:text-xo-blue">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field label="Additional information">
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
              <div className="sticky top-32 rounded-md border border-fg/10 bg-surface p-8">
                <div className="eyebrow mb-6">Contact</div>
                <p className="font-display text-2xl leading-snug text-fg">
                  Talk to Xenon Ophthalmics.
                </p>
                <div className="mt-8 space-y-6 text-sm text-fg/55">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">Address</div>
                    <p className="mt-2 leading-relaxed">
                      525 Washington Blvd, Suite 300
                      <br />
                      Jersey City, NJ 07310
                      <br />
                      United States
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">Email</div>
                    <a href="mailto:info@xophthalmics.com" data-testid="contact-email" className="mt-2 block text-xo-blue transition-colors hover:text-fg">
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
      <Label className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/50">
        {label} {required && <span className="text-xo-blue">*</span>}
      </Label>
      {children}
    </div>
  );
}
