import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../shared/AnimatedSection';
import SectionTitle from '../shared/SectionTitle';

// Import logos
import apple from '../../assets/logos/apple.svg';
import samsung from '../../assets/logos/samsung.svg';
import realme from '../../assets/logos/realme.svg';
import redmi from '../../assets/logos/redmi.svg';
import itel from '../../assets/logos/itel.png';
import nokia from '../../assets/logos/nokia-3.svg';
import huawei from '../../assets/logos/huawei.svg';
import sony from '../../assets/logos/sony.svg';
import honor from '../../assets/logos/honor.svg';

const brands = [
  { name: 'Apple', logo: apple },
  { name: 'Samsung', logo: samsung },
  { name: 'Realme', logo: realme },
  { name: 'Redmi', logo: redmi },
  { name: 'Itel', logo: itel },
  { name: 'Nokia', logo: nokia },
  { name: 'Huawei', logo: huawei },
  { name: 'Sony', logo: sony },
  { name: 'Honor', logo: honor },
];

export default function BrandShowcase() {
  return (
    <section className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Our Partners"
          title="Global Brand Portfolio"
          subtitle="Direct dealership partnerships with the world's leading smartphone manufacturers"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {brands.map((brand, i) => (
            <AnimatedSection key={brand.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card navy-border-glow rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer group"
              >
                {/* Logo */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 sm:h-12 object-contain mb-2"
                />

                {/* Name */}
                <span className="text-black/70 group-hover:text-gold font-semibold text-sm tracking-wider uppercase transition-colors duration-300">
                  {brand.name}
                </span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}