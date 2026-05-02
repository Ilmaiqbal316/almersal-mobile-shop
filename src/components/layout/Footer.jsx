import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_69f3a128d23131a0cb9931b6/b01f72be8_1c6a76d0-bcce-47ab-bbf9-8f9a196ee624.jpeg";

export default function Footer() {
  return (
    <footer className="relative bg-navy-deep border-t border-gold/10 overflow-hidden">
      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={LOGO_URL} alt="" className="w-[50vw] max-w-2xl opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={LOGO_URL} alt="Almersal Logo" className="h-12 mb-4 rounded" />
            <p className="text-gold-light text-sm leading-relaxed font-mono">
              Trusted Global Mobile Trading Partner. Direct dealership partnerships delivering authentic smartphones worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-gold font-medium tracking-wider uppercase text-sm mb-4">Quick Links</h4>
            <div className="space-y-3">
              {['Home', 'About', 'Products', 'Markets', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-gold-light/80 hover:text-gold text-sm transition-colors font-mono"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-medium tracking-wider uppercase text-sm mb-4">Brands</h4>
            <div className="space-y-3">
              {['Apple', 'Samsung', 'Realme', 'Redmi', 'Nokia', 'Huawei'].map((brand) => (
                <span key={brand} className="block text-gold-light/80 text-sm font-mono">{brand}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-medium tracking-wider uppercase text-sm mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <p className="text-gold-light/80 text-sm font-mono">
                  Property Investment Office 4, Dubai Investment Park First, Office S-200, Dubai - UAE
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+971565688566" className="text-gold-light/80 hover:text-gold text-sm font-mono transition-colors">
                  +971 56 568 8566
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:Info@almersalalsareeuae.com" className="text-gold-light/80 hover:text-gold text-sm font-mono transition-colors break-all">
                  Info@almersalalsareeuae.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gold-light/60 text-xs font-mono tracking-wider">
            © 2024 ALMERSAL ALSAREE ELECTRONIS TRADING L.L.C. All Rights Reserved.
          </p>
          <p className="text-gold-light/60 text-xs font-mono tracking-wider">
            Dubai, United Arab Emirates
          </p>
        </div>
      </div>
    </footer>
  );
}