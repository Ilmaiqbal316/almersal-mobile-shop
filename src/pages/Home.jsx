import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import BrandShowcase from '../components/home/BrandShowcase';
import ExportPreview from '../components/home/ExportPreview';
import LogisticsGallery from '../components/home/LogisticsGallery';
import WhyChooseUs from '../components/home/WhyChooseUs';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <BrandShowcase />
      <ExportPreview />
      <LogisticsGallery />
      <WhyChooseUs />
    </div>
  );
}