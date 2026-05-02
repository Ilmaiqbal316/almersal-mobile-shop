import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, ShoppingCart, Shield, Clock, Globe } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SectionTitle from '../components/shared/SectionTitle';
import GlassCard from '../components/shared/GlassCard';
import AnimatedCounter from '../components/shared/AnimatedCounter';
import Flag from '../components/shared/Flag.jsx';
import img2 from '../assets/image/img2.jpeg';

const countries = [
  { name: 'Libya',   flagCode: 'ly', desc: 'Major wholesale distribution network across Libyan markets',            highlight: 'Primary Market' },
  { name: 'Algeria', flagCode: 'dz', desc: 'Growing distribution channels throughout Algeria',                      highlight: 'Expanding'     },
  { name: 'Egypt',   flagCode: 'eg', desc: 'Strategic partnerships with Egyptian wholesale distributors',           highlight: 'Key Partner'   },
  { name: 'Tunisia', flagCode: 'tn', desc: 'Expanding wholesale partnerships in the Tunisian electronics sector',    highlight: 'Key Partner'   },
  { name: 'Mauritania', flagCode: 'mr', desc: 'Developing logistics corridors to serve Mauritanian distributors',   highlight: 'Expanding'     },
  { name: 'Morocco', flagCode: 'ma', desc: 'Strategic expansion into the vibrant Moroccan consumer market',         highlight: 'Key Partner'   },
];

const logistics = [
  { icon: Truck, title: 'Fast Shipping', desc: 'Express logistics from Dubai to all target markets with reliable delivery timelines' },
  { icon: Package, title: 'Safe Packaging', desc: 'Industry-standard secure packaging ensuring products arrive in perfect condition' },
  { icon: ShoppingCart, title: 'Wholesale Supply', desc: 'Large-scale bulk orders with flexible MOQ to suit your business needs' },
  { icon: Shield, title: 'Insured Shipments', desc: 'Full insurance coverage on all international shipments for peace of mind' },
  { icon: Clock, title: 'Timely Delivery', desc: 'Consistent delivery schedules with real-time tracking and updates' },
  { icon: Globe, title: 'Global Reach', desc: 'Expanding our distribution network to serve more international markets' },
];

export default function Markets() {
  return (
    <div className="pt-20">
      {/* Header with logistics background image */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80"
            alt="Port logistics and container shipping"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Export Markets</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gold-gradient-text mb-4">
              The Logistics Nexus
            </h1>
            <p className="text-gold-light text-lg max-w-xl mx-auto">
              Bridging Dubai to North Africa with seamless wholesale distribution
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map visualization */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Our Markets" title="Export Destinations" subtitle="Reliable supply chains connecting Dubai to key African markets" />
          
          {/* Animated route */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card gold-border-glow rounded-xl px-6 py-4 text-center"
            >
              <div className="flex justify-center mb-1">
                <Flag code="ae" size="md" />
              </div>
              <div className="text-gold font-semibold text-sm mt-2">Dubai</div>
              <div className="text-gold-light/30 text-xs font-mono">HQ</div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="flex-1 max-w-xs h-px bg-gradient-to-r from-gold via-gold/50 to-gold relative"
            >
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full"
                animate={{ x: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              {countries.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card gold-border-glow rounded-xl px-4 sm:px-6 py-4 text-center animate-pulse-gold"
                >
                  <div className="flex justify-center mb-2">
                    <Flag code={c.flagCode} size="md" />
                  </div>
                  <div className="text-black font-semibold text-xs sm:text-sm mt-1">{c.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {countries.map((country, i) => (
              <AnimatedSection key={country.name} delay={i * 0.1}>
                <GlassCard hover3D className="h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-xl overflow-hidden shadow-lg shadow-black/40 border-2 border-gold/30 ring-2 ring-gold/10">
                      <Flag code={country.flagCode} size="xl" />
                    </div>
                  </div>
                  <span className="inline-block text-gold font-mono text-xs tracking-wider uppercase mb-2 bg-gold/10 px-3 py-1 rounded-full">
                    {country.highlight}
                  </span>
                  <h3 className="text-2xl font-bold text-black mb-3">{country.name}</h3>
                  <p className="text-black/40 text-sm leading-relaxed">{country.desc}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics with imagery */}
      <section className="py-5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Logistics" title="Delivery Excellence" subtitle="End-to-end logistics solutions for wholesale mobile trading" />

          {/* Big split image + cards layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left — warehouse image */}
            <AnimatedSection>
              <div className="relative rounded-xl overflow-hidden h-full" style={{ maxHeight: '380px' }}>
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80"
                  alt="Forklift operating in warehouse"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold font-mono text-[10px] tracking-[0.25em] uppercase mb-2 block">Dubai Warehouse</span>
                  <h3 className="text-white text-lg font-bold mb-1">Professional Cargo Handling</h3>
                  <p className="text-gold-light/60 text-sm leading-relaxed">
                    Our team of certified forklift operators ensures safe, efficient movement of bulk mobile phone shipments.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — shipping image + 2 cards */}
            <div className="flex flex-col gap-4">
              <AnimatedSection delay={0.1}>
                <div className="relative rounded-xl overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80"
                    alt="International cargo shipping"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-6">
                    <div>
                      <span className="text-gold font-mono text-[10px] tracking-[0.25em] uppercase mb-1 block">Air & Sea Freight</span>
                      <h3 className="text-white text-base font-bold">Express Global Shipping</h3>
                      <p className="text-gold-light/60 text-xs mt-1">Dubai → North Africa in 48–96 hours</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="relative rounded-xl overflow-hidden" style={{ height: '166px' }}>
                  <img
                    src={img2}
                    alt="Export packaging and palletizing"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-6">
                    <div>
                      <span className="text-gold font-mono text-[10px] tracking-[0.25em] uppercase mb-1 block">Export Ready</span>
                      <h3 className="text-white text-base font-bold">Secure Palletized Packaging</h3>
                      <p className="text-gold-light/60 text-xs mt-1">Every unit protected for international transit</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Feature cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {logistics.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <GlassCard hover3D className="h-full">
                  <div className="p-3 bg-gold/10 rounded-lg w-fit mb-4">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-black/40 text-sm leading-relaxed">{item.desc}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <AnimatedCounter target={6} label="Countries" />
            <AnimatedCounter target={48} suffix="h" label="Avg Delivery" />
            <AnimatedCounter target={99} suffix="%" label="On-Time Rate" />
            <AnimatedCounter target={50} suffix="K+" label="Units Monthly" />
          </div>
        </div>
      </section>
    </div>
  );
}