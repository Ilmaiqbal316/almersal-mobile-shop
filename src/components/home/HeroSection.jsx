import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Hero3D from './Hero3D';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      
      {/* Gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 10}%` }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content — always first on mobile */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-gold font-mono text-xs tracking-[0.3em] uppercase mb-6 border border-gold/20 px-4 py-1.5 rounded-full">
                Dubai • Hong Kong • Africa
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="gold-gradient-text">ALMERSAL</span>
              <br />
              <span className="text-gold-light">ALSAREE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-gold-light max-w-lg leading-relaxed"
            >
              Trusted Global Mobile Trading Partner. Delivering authentic smartphones from world-leading brands to international markets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="liquid-btn inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold font-medium tracking-wider uppercase text-sm rounded-sm hover:text-navy-deep transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold/10 border border-gold/20 text-gold font-medium tracking-wider uppercase text-sm rounded-sm hover:bg-gold/20 transition-colors"
              >
                View Products
                <Phone className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Custom 3D Scene — always second on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-2 relative flex items-center justify-center w-full"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto" style={{ height: '360px', minHeight: '320px' }}>
              <div className="absolute inset-0 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <Hero3D />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent" />
    </section>
  );
}