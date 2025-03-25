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
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = () => {
    setLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-2xl rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-500/90">
          Sign in to time.io
        </h3>

        <div className="space-y-4">
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full px-4 py-2.5 bg-white/60 hover:bg-white/80 rounded-lg text-gray-700 transition-colors flex items-center justify-center gap-2 border border-gray-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-white/40 hover:bg-white/60 rounded-lg text-gray-500/90 transition-colors"
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
          <Link href="/" className="text-xl font-semibold text-gray-800">
            TimeIO
          </Link>
          
          <div className="flex items-center space-x-4">
            {status === 'authenticated' ? (
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-gray-600 hover:text-gray-900"
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