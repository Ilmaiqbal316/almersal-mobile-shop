import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

/** @param {{ product: any }} props */
export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative glass-card rounded-2xl overflow-hidden gold-border-glow"
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${product.glow}15, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-navy/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <span className="text-slate-900 dark:text-gold-light font-medium font-mono text-xs tracking-[0.2em] uppercase">{product.brand}</span>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gold mt-1 mb-3">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {product.models.slice(0, 3).map((/** @type {string} */ model) => (
            <span key={model} className="text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-500/30 px-2 py-1 rounded font-mono">
              {model}
            </span>
          ))}
          {product.models.length > 3 && (
            <span className="text-sm text-slate-600 dark:text-slate-300 px-2 py-1 rounded">+{product.models.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-300 text-sm font-medium font-mono">Wholesale Pricing</span>
          <Link
            to="/contact"
            className="liquid-btn inline-flex items-center gap-2 px-5 py-2.5 border border-gold text-gold text-xs font-medium tracking-wider uppercase rounded-sm hover:text-navy-deep transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Inquire
          </Link>
        </div>
      </div>
    </motion.div>
  );
}