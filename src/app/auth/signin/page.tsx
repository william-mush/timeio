import SignInForm from '@/components/auth/SignInForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[size:20px_20px]" />
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<div className="flex justify-center p-8"><div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div></div>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}