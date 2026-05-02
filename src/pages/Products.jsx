import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SectionTitle from '../components/shared/SectionTitle';
import ProductCard from '../components/products/ProductCard';

const products = [
  { brand: 'Apple', name: 'iPhone Series', models: ['iPhone 17', 'iPhone 17 Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', glow: '#A2AAAD' },
  { brand: 'Samsung', name: 'Galaxy Series', models: ['Galaxy S26', 'Galaxy S26+', 'Galaxy S26 Ultra'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', glow: '#1428A0' },
  { brand: 'Realme', name: 'Realme Series', models: ['Realme 16 5G', 'Realme Narzo 100 Lite 5G'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/29b5ef1fa_generated_48f43daa.png', glow: '#FFB800' },
  { brand: 'Redmi', name: 'Redmi Series', models: ['Redmi K90 Max', 'Redmi A7 Pro', 'Redmi Note 15', 'Redmi 15A 5G'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', glow: '#FF6900' },
  { brand: 'Itel', name: 'Itel Series', models: ['Itel Vision 3', 'Itel Zeno 100'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a9a3b416f_generated_83e1d498.png', glow: '#00B140' },
  { brand: 'Nokia', name: 'Nokia Series', models: ['Nokia C12 Pro'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', glow: '#005AFF' },
  { brand: 'Huawei', name: 'Huawei Series', models: ['Huawei Pura 90', 'Pura 90 Pro', 'Pura 90 Pro Max', 'Pura X Max'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/0db9e43e9_generated_2891579a.png', glow: '#CF0A2C' },
  { brand: 'Sony', name: 'Xperia Series', models: ['Sony Xperia 1 VII'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/82384e538_generated_c2138552.png', glow: '#00A1E0' },
  { brand: 'Honor', name: 'Honor Series', models: ['Honor Magic8 Pro Air', 'Honor Magic V6', 'Honor 600', 'Honor 600 Pro'], image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/ae96e3ff5_generated_ebbb1e61.png', glow: '#00B4D8' },
];
export default function Products() {
  const [filter, setFilter] = useState('All');
  const brands = ['All', ...products.map(p => p.brand)];

  const filtered = filter === 'All' ? products : products.filter(p => p.brand === filter);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy-deep" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Product Catalog</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gold-gradient-text mb-4">
              The Product Vault
            </h1>
            <p className="text-gold-light text-lg max-w-xl mx-auto">
              Genuine smartphones from the world's leading manufacturers, available for wholesale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  filter === b
                    ? 'bg-gold text-navy-deep'
                    : 'border border-gold/20 text-black/50 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.brand}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}