'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-12 relative">
      {/* Animated Logo in Corner */}
      <header className="absolute top-6 left-6 z-50">
        <Logo />
      </header>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Capture Your Moments <br className="hidden md:block" />
            with Top Photographers
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Find and book the best maternity, wedding, birthday, and portrait photographers in your city.
          </p>
          <Link
            href="/photographers"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Browse Photographers
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full"
        >
          <Image
            src="/images/landing1.jpg"
            alt="Photographer shooting"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>
    </main>
  );
}

