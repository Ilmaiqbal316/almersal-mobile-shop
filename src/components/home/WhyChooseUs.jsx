import React from 'react';
import { Shield, Truck, DollarSign, Clock, Award, Headphones } from 'lucide-react';
import AnimatedSection from '../shared/AnimatedSection';
import SectionTitle from '../shared/SectionTitle';
import GlassCard from '../shared/GlassCard';

const reasons = [
  { icon: Shield, title: 'Genuine Products', desc: 'Only authentic, factory-sealed smartphones' },
  { icon: DollarSign, title: 'Competitive Pricing', desc: 'Direct sourcing ensures best wholesale rates' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Efficient logistics to North African markets' },
  { icon: Clock, title: 'Reliable Supply', desc: 'Consistent availability across all brands' },
  { icon: Award, title: 'Direct Partnerships', desc: 'Official dealership through Hong Kong agent' },
  { icon: Headphones, title: 'Dedicated Support', desc: '24/7 customer service for wholesale partners' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-3 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Why Us"
          title="The Almersal Advantage"
          subtitle="What sets us apart in the global mobile trading industry"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <GlassCard hover3D className="h-full">
                <div className="p-3 bg-gold/10 rounded-lg w-fit mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed">{item.desc}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}