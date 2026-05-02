import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Globe, ShieldCheck, TrendingUp, Package, Truck, Warehouse } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SectionTitle from '../components/shared/SectionTitle';
import GlassCard from '../components/shared/GlassCard';
import AnimatedCounter from '../components/shared/AnimatedCounter';

// Import local operational images
import img2 from '../assets/image/img2.jpeg';

const operationImages = [
  {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',
    label: 'Forklift Operations',
    icon: Warehouse,
  },
  {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',
    label: 'International Shipping',
    icon: Truck,
  },
  {
    url: img2,
    label: 'Secure Packaging',
    icon: Package,
  },
];

const DUBAI_IMG = "https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/44b2b34e8_generated_1c676c29.png";

const values = [
  { icon: ShieldCheck, title: 'Trust', desc: 'Building trust through transparency and consistency in every transaction.' },
  { icon: Globe, title: 'Global Reach', desc: 'Connecting manufacturers to international markets with seamless logistics.' },
  { icon: TrendingUp, title: 'Efficiency', desc: 'Streamlined operations for fast delivery and competitive pricing.' },
  { icon: Users, title: 'Relationships', desc: 'Long-term partnerships built on mutual respect and reliability.' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero banner */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={DUBAI_IMG} alt="Dubai Skyline" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 block">About Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gold-gradient-text mb-6">
              Our Story
            </h1>
            <p className="text-gold-light text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Delivering authentic mobile technology to the world from the heart of Dubai
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold gold-gradient-text mb-8">
                Who We Are
              </h2>
              <div className="space-y-6 text-black/60 leading-relaxed text-lg">
                <p>
                  We are a trusted mobile phone trading company with direct dealership partnerships
                  through our Hong Kong agent. We specialize in supplying genuine smartphones from
                  leading global brands including Realme, Samsung, and iPhone.
                </p>
                <p>
                  Our strong sourcing network allows us to provide competitive pricing, reliable
                  availability, and authentic products to our international clients.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gold/10 rounded-lg">
                    <Target className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Our Mission</h3>
                </div>
                <p className="text-black/60 text-lg leading-relaxed">
                  To build long-term business relationships by delivering quality mobile devices
                  with trust, transparency, and efficiency.
                </p>
                <div className="mt-8 pt-8 border-t border-gold/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gold/10 rounded-lg">
                      <Eye className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-black">Our Vision</h3>
                  </div>
                  <p className="text-black/60 text-lg leading-relaxed">
                    To become the most trusted and preferred wholesale mobile trading company
                    connecting Asia, the Middle East, and Africa.
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Our Values" title="What Drives Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <GlassCard hover3D className="h-full text-center">
                  <div className="p-4 bg-gold/10 rounded-full w-fit mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{v.title}</h3>
                  <p className="text-black/40 text-sm leading-relaxed">{v.desc}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Operations imagery strip */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-10 text-center">
              <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-3 block">Our Operations</span>
              <h2 className="text-2xl sm:text-3xl font-bold gold-gradient-text">
                From Warehouse to Worldwide
              </h2>
            </div>
          </AnimatedSection>

          {/* Full-width hero image */}
          <AnimatedSection delay={0.1}>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80"
                alt="Modern warehouse operations"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-0 flex items-end px-8 pb-8">
                <div>
                  <span className="text-gold font-mono text-[10px] tracking-[0.25em] uppercase mb-2 block">Dubai Facility</span>
                  <h3 className="text-white text-xl font-bold">Industry-Grade Storage & Dispatch</h3>
                  <p className="text-gold-light/60 text-sm mt-1 max-w-sm">
                    Our Dubai logistics hub ensures every order is stored, packed, and shipped with precision.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Three-column smaller images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {operationImages.map((img, i) => {
              const Icon = img.icon;
              return (
                <AnimatedSection key={img.label} delay={0.2 + i * 0.1}>
                  <motion.div
                    className="relative rounded-xl overflow-hidden group cursor-default"
                    style={{ height: '200px' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2.5">
                      <div className="p-1.5 bg-gold/20 rounded-md backdrop-blur-sm border border-gold/20">
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span className="text-white text-sm font-medium">{img.label}</span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <AnimatedCounter target={9} suffix="+" label="Brands" />
            <AnimatedCounter target={6} label="Markets" />
            <AnimatedCounter target={500} suffix="+" label="Clients" />
            <AnimatedCounter target={5} suffix="+" label="Years" />
          </div>
        </div>
      </section>
    </div>
  );
}