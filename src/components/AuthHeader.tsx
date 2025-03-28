'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const handleGoogleAuth = () => {
    signIn('google');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-2xl rounded-xl p-8 max-w-md w-full mx-4 shadow-xl relative top-1/4"
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-500/90">
          Sign in to time.IO
        </h3>

        <div className="space-y-6">
          <button
            onClick={handleGoogleAuth}
            className="w-full px-6 py-3 bg-white/60 hover:bg-white/80 rounded-lg text-gray-700 transition-colors flex items-center justify-center gap-3 border border-gray-200/50 text-lg"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-white/40 hover:bg-white/60 rounded-lg text-gray-500/90 transition-colors text-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export function AuthHeader() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-xl font-semibold text-gray-800 hover:text-gray-900 transition-colors flex items-center"
          >
            <span className="text-blue-500">time</span>
            <span className="text-gray-500">.IO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {status === 'authenticated' ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-1.5 text-sm text-gray-500/90 hover:text-gray-600 transition-colors bg-white/40 backdrop-blur-xl rounded-lg"
              >
                Sign out
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-1.5 text-sm text-gray-500/90 hover:text-gray-600 transition-colors bg-white/40 backdrop-blur-xl rounded-lg"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
} 