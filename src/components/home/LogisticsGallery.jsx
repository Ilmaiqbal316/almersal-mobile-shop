import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Truck, Package, Container } from 'lucide-react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionTitle from '../shared/SectionTitle';

const logisticsImages = [
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    title: 'Warehouse Operations',
    description: 'State-of-the-art warehousing with automated storage systems',
    icon: Warehouse,
    tag: 'Storage',
  },
  {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    title: 'Cargo Handling',
    description: 'Professional forklift operations for efficient cargo movement',
    icon: Package,
    tag: 'Handling',
  },
  {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    title: 'International Shipping',
    description: 'Express shipping via air and sea freight to North Africa',
    icon: Truck,
    tag: 'Shipping',
  },
  {
    url: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80',
    title: 'Port & Container Logistics',
    description: 'Dubai port container handling for bulk export shipments',
    icon: Container,
    tag: 'Export',
  },
];

export default function LogisticsGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(/** @type {number | null} */ (null));

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Our Operations"
          title="End-to-End Logistics Excellence"
          subtitle="From Dubai warehouses to your doorstep — precision handling at every step"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {logisticsImages.map((item, i) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === i;

            return (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  style={{ height: '320px' }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent transition-opacity duration-300 group-hover:from-navy-deep/95" />

                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold bg-navy-deep/80 border border-gold/30 px-2.5 py-1 rounded-sm backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>

                  <motion.div
                    className="absolute top-4 right-4 p-2 bg-gold/10 border border-gold/30 rounded-full backdrop-blur-sm"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-4 h-4 text-gold" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-base mb-1.5 leading-tight">
                      {item.title}
                    </h3>
                    <motion.p
                      className="text-gold-light/70 text-xs leading-relaxed"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.description}
                    </motion.p>
                    <motion.div
                      className="mt-3 h-px bg-gold/40"
                      initial={{ scaleX: 0.2 }}
                      animate={{ scaleX: isHovered ? 1 : 0.2 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Wide feature banner */}
        <AnimatedSection delay={0.4}>
          <div className="mt-4 relative rounded-xl overflow-hidden" style={{ height: '220px' }}>
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
              alt="Large scale warehouse with palletized cargo"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 sm:px-16">
              <div className="max-w-lg">
                <span className="text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
                  Full-Scale Operations
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-2">
                  Bulk Export Warehousing
                </h3>
                <p className="text-gold-light/60 text-sm leading-relaxed">
                  Our Dubai facility manages thousands of units monthly — palletized, secured, and ready for international dispatch.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
