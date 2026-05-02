import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import AnimatedSection from '../components/shared/AnimatedSection';

// ────────────────────────────────────────────────────────────
//  🔑  PASTE YOUR EMAILJS CREDENTIALS HERE
// ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_4bod105';
const EMAILJS_TEMPLATE_ID = 'template_hqr53f5';
const EMAILJS_PUBLIC_KEY  = 'a-4YHqGJK564klK0N';


const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Property Investment Office 4, Dubai Investment Park First, Office S-200, Dubai — UAE',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+971 52 322 2928',
    href: 'tel:+971523222928',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'Info@almersalalsareeuae.com',
    href: 'mailto:Info@almersalalsareeuae.com',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Monday – Saturday: 11:00 AM – 11:00 PM (GST)',
    href: null,
  },
];

const features = [
  'Direct manufacturer partnerships',
  'Competitive wholesale pricing',
  'Reliable international shipping',
  'Dedicated account management',
];

/** @typedef {'idle'|'sending'|'success'|'error'} Status */

export default function Contact() {
  const [form, setForm] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  /** @type {[Status, React.Dispatch<React.SetStateAction<Status>>]} */
  const [status, setStatus] = useState(/** @type {Status} */ ('idle'));
  const [focused, setFocused] = useState('');

  const handleChange = (/** @type {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} */ e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (/** @type {React.FormEvent} */ e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          subject:    form.subject,
          message:    form.message,
          to_email:   'Info@almersalalsareeuae.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const fieldClass = (field) => {
    const base =
      'w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-800 bg-slate-50 border';
    return focused === field
      ? `${base} border-amber-400 bg-white shadow-[0_0_0_3px_rgba(251,191,36,0.15)]`
      : `${base} border-slate-200 hover:border-slate-300 hover:bg-white`;
  };

  return (
    <div className="pt-20 bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-navy-deep">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-gold font-mono text-[11px] tracking-[0.3em] uppercase mb-5 border border-gold/25 px-4 py-1.5 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Let's Build Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300">
                Together
              </span>
            </h1>
            <p className="text-gold-light/70 text-lg max-w-xl mx-auto leading-relaxed">
              Ready to start a wholesale partnership? Our team is available 7 days a week to answer your enquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: info card ── */}
            <AnimatedSection className="lg:col-span-2">
              <div className="bg-navy-deep rounded-2xl overflow-hidden shadow-2xl shadow-navy-deep/20">
                <div className="h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
                <div className="p-8 sm:p-10">

                  <div className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                      ALMERSAL ALSAREE
                    </h2>
                    <p className="text-gold font-mono text-xs tracking-widest uppercase mt-1.5">
                      Electronics Trading L.L.C
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gold rounded-full" />
                      <div className="w-2 h-0.5 bg-gold/40 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-7 mb-10">
                    {contactInfo.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-0.5 group-hover:bg-gold/15 group-hover:border-gold/30 transition-all duration-200">
                          <item.icon className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <p className="text-gold/50 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a href={item.href} className="text-white/75 text-sm leading-relaxed hover:text-gold transition-colors duration-150">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white/75 text-sm leading-relaxed">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.07] pt-8">
                    <p className="text-gold/50 font-mono text-[10px] tracking-[0.25em] uppercase mb-5">
                      Why partner with us
                    </p>
                    <ul className="space-y-3.5">
                      {features.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.07 }}
                          className="flex items-center gap-3 text-white/55 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-gold/70 flex-shrink-0" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── Right: form ── */}
            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden">

                {/* Form header */}
                <div className="px-8 sm:px-10 pt-8 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1 h-6 bg-gradient-to-b from-gold to-amber-400 rounded-full" />
                    <h3 className="text-xl font-bold text-slate-800">Send Us a Message</h3>
                  </div>
                  <p className="text-slate-400 text-sm mt-1 ml-4">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>

                {/* Success banner */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-8 sm:mx-10 mt-6 flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-5 py-4 text-sm"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-emerald-600 text-xs mt-0.5">We'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {/* Error banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-8 sm:mx-10 mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Failed to send message.</p>
                      <p className="text-red-600 text-xs mt-0.5">Please check your EmailJS credentials or try again later.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="px-8 sm:px-10 py-8 space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs tracking-wider uppercase mb-2">
                        Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="from_name"
                        value={form.from_name}
                        onChange={handleChange}
                        onFocus={() => setFocused('from_name')}
                        onBlur={() => setFocused('')}
                        className={fieldClass('from_name')}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs tracking-wider uppercase mb-2">
                        Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        name="from_email"
                        value={form.from_email}
                        onChange={handleChange}
                        onFocus={() => setFocused('from_email')}
                        onBlur={() => setFocused('')}
                        className={fieldClass('from_email')}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-slate-600 font-semibold text-xs tracking-wider uppercase mb-2">
                      Subject <span className="text-amber-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused('')}
                      className={fieldClass('subject')}
                      placeholder="e.g. Wholesale inquiry for iPhone 16 series"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-slate-600 font-semibold text-xs tracking-wider uppercase mb-2">
                      Message <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      className={`${fieldClass('message')} resize-none`}
                      placeholder="Tell us about your wholesale requirements, order volume, target markets..."
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-slate-400 text-xs">
                      <span className="text-amber-500 font-semibold">*</span> Required fields
                    </p>
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gold hover:bg-amber-500 text-navy-deep font-bold text-sm tracking-wider uppercase rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-400/25"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.145!2d55.155!3d25.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAwJzE4LjAiTiA1NcKwMDknMTguMCJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                title="Office Location — Dubai Investment Park"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
