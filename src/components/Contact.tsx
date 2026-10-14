import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY } from '../data/site';
import { supabase, type LeadInquiry } from '../lib/supabase';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = { full_name: '', corporate_email: '', country: '', inquiry_message: '' };

export default function Contact() {
  const [form, setForm] = useState<LeadInquiry>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (key: keyof LeadInquiry, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('lead_inquiries').insert(form);
      if (error) throw error;
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white ' +
    'placeholder:text-white/40 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20';

  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <PerspectiveStage perspective={1000} className="container-tight relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeRise} className="eyebrow justify-center">
            Contact Sales
          </motion.span>
          <motion.h2
            variants={fadeRise}
            className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Let's build a healthier future, together
          </motion.h2>
          <motion.p variants={fadeRise} className="mt-4 text-slate-300/80">
            Tell us about your requirements and our sales team will get back to you within
            one business day.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={transition}
            className="glass flex flex-col gap-6 p-8"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-white">Reach us directly</h3>
              <p className="mt-1 text-sm text-slate-300/70">
                Prefer email or phone? Use the channels below.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <a href={`mailto:${COMPANY.emails.contact}`} className="flex items-start gap-3 text-slate-200 transition-colors hover:text-cyan-300">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cyan-300">Email</span>
                  {COMPANY.emails.contact}
                </span>
              </a>
              <a href={COMPANY.phoneHref} className="flex items-start gap-3 text-slate-200 transition-colors hover:text-cyan-300">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cyan-300">Phone</span>
                  {COMPANY.phone}
                </span>
              </a>
              <a
                href={COMPANY.headOfficeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-200 transition-all duration-300 hover:text-cyan-300"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cyan-300">Head Office</span>
                  <span className="transition-all duration-300 hover:underline decoration-cyan-400/60 underline-offset-4">
                    {COMPANY.headOffice}
                  </span>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Lead form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={transition}
            className="glass flex flex-col gap-5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="full_name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Full Name
                </label>
                <input
                  id="full_name"
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => update('full_name', e.target.value)}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="corporate_email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Corporate Email
                </label>
                <input
                  id="corporate_email"
                  type="email"
                  required
                  value={form.corporate_email}
                  onChange={(e) => update('corporate_email', e.target.value)}
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="country" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Country
              </label>
              <input
                id="country"
                type="text"
                required
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
                placeholder="Pakistan"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="inquiry_message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Inquiry Message
              </label>
              <textarea
                id="inquiry_message"
                required
                rows={5}
                value={form.inquiry_message}
                onChange={(e) => update('inquiry_message', e.target.value)}
                placeholder="Tell us about the products, volumes, and markets you're interested in…"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Status feedback */}
            {status === 'success' && (
              <div className="flex items-center gap-2 rounded-2xl bg-bioteal-600/20 px-4 py-3 text-sm text-bioteal-200 ring-1 ring-bioteal-400/30">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Thank you — your inquiry has been received. Our team will respond within one business day.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/30">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={transition}
              style={{ transformStyle: 'preserve-3d' }}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-bioteal-600 px-6 py-3.5 text-sm font-semibold text-obsidian shadow-[0_8px_32px_rgba(6,182,212,0.45)] transition disabled:cursor-not-allowed disabled:opacity-60 will-change-transform hover:shadow-[0_12px_44px_rgba(6,182,212,0.6)]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Inquiry
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </PerspectiveStage>
    </section>
  );
}
