import React from 'react';
import { motion } from 'framer-motion';

/** @param {{ children: React.ReactNode, className?: string, hover3D?: boolean }} props */
export default function GlassCard({ children, className = '', hover3D = false }) {
  if (hover3D) {
    return (
      <motion.div
        className={`glass-card rounded-xl p-6 navy-border-glow ${className}`}
        whileHover={{
          scale: 1.02,
          rotateY: 3,
          rotateX: -2,
          transition: { duration: 0.3 }
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`glass-card rounded-xl p-6 navy-border-glow ${className}`}>
      {children}
    </div>
  );
}