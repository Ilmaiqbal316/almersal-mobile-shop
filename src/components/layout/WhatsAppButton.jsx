import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/+971523222928"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-full shadow-lg shadow-green-900/30 transition-colors group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-medium">Direct Wholesale Line</span>
    </motion.a>
  );
}