import React from 'react';
import AnimatedSection from './AnimatedSection';

/** @param {{ label?: string, title: string, subtitle?: string }} props */
export default function SectionTitle({ label, title, subtitle }) {
  return (
    <AnimatedSection className="text-center mb-16">
      {label && (
        <span className="inline-block text-gold font-mono text-xs tracking-[0.3em] uppercase mb-3 border border-gold/20 px-4 py-1.5 rounded-full">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 gold-gradient-text tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-black/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </AnimatedSection>
  );
}