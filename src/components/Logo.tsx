'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 20 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-blue-600"
      >
        <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.div>
      <motion.span
        className="text-xl font-bold text-blue-600"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        Pixisphere
      </motion.span>
    </Link>
  );
};

export default Logo;
