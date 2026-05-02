import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Globe, Handshake } from 'lucide-react';
import AnimatedSection from '../shared/AnimatedSection';
import GlassCard from '../shared/GlassCard';

const highlights = [
  { icon: Shield, title: 'Authentic Products', desc: 'Genuine smartphones directly from manufacturers' },
  { icon: Globe, title: 'Global Network', desc: 'Direct sourcing through our Hong Kong agent' },
  { icon: Handshake, title: 'Trusted Partner', desc: 'Long-term business relationships built on trust' },
];

export default function AboutPreview() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold gold-gradient-text mb-6">
              Your Trusted Wholesale Partner
            </h2>
            <p className="text-black/50 leading-relaxed mb-8 text-lg">
              We are a trusted mobile phone trading company with direct dealership partnerships
              through our Hong Kong agent. We specialize in supplying genuine smartphones from
              leading global brands including Realme, Samsung, and iPhone.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-gold hover:text-black transition-colors font-medium tracking-wider uppercase text-sm"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid gap-4">
            {highlights.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <GlassCard hover3D>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gold/10 rounded-lg">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold mb-1">{item.title}</h3>
                      <p className="text-black/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}