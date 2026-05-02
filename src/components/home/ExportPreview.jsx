import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../shared/AnimatedSection';
import SectionTitle from '../shared/SectionTitle';
import AnimatedCounter from '../shared/AnimatedCounter';
import Flag from '../shared/Flag.jsx';

const countries = [
  { name: 'Libya', code: 'ly' },
  { name: 'Algeria', code: 'dz' },
  { name: 'Egypt', code: 'eg' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Mauritania', code: 'mr' },
  { name: 'Morocco', code: 'ma' },
];

export default function ExportPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle logistics background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&q=60"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.04]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.015] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Export Markets"
          title="Connecting Dubai to Africa"
          subtitle="Reliable wholesale supply to North African markets with fast international shipping"
        />

        {/* Countries */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {countries.map((country, i) => (
            <AnimatedSection key={country.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card gold-border-glow rounded-xl p-8 text-center group cursor-pointer"
              >
                <div className="flex justify-center mb-6">
                  <Flag code={country.code} size="lg" />
                </div>
                <h3 className="text-xl font-semibold text-black group-hover:text-gold transition-colors">
                  {country.name}
                </h3>
                <div className="mt-3 w-12 h-px bg-gold/30 mx-auto group-hover:w-20 transition-all" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <AnimatedCounter target={9} suffix="+" label="Brands" />
          <AnimatedCounter target={6} suffix="" label="Export Countries" />
          <AnimatedCounter target={500} suffix="+" label="Clients" />
          <AnimatedCounter target={50} suffix="K+" label="Units Shipped" />
        </div>
      </div>
    </section>
  );
}