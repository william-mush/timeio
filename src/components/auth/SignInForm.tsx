'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const errorMessages: Record<string, string> = {
    OAuthSignin: 'There was a problem starting the sign-in process. Please try again.',
    OAuthCallback: 'There was a problem completing the sign-in. Please try again.',
    OAuthCreateAccount: 'Could not create your account. Please try again.',
    EmailCreateAccount: 'Could not create your account. Please try again.',
    Callback: 'There was an authentication error. Please try again.',
    OAuthAccountNotLinked: 'This email is already associated with a different sign-in method.',
    EmailSignin: 'The sign-in link could not be sent. Please try again.',
    CredentialsSignin: 'Sign in failed. Please check your credentials.',
    SessionRequired: 'Please sign in to access this page.',
    Default: 'An unexpected error occurred. Please try again.',
};

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const errorParam = searchParams.get('error');
    const errorMessage = errorParam ? (errorMessages[errorParam] || errorMessages.Default) : null;

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl });
        } catch (error) {
            console.error('Login failed:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    Time.io
                </h1>
                <p className="text-gray-600">
                    Sign in to access your personalized clock
                </p>
            </div>

            <div className="space-y-4">
                {errorMessage && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium">Sign-in failed</p>
                            <p className="mt-1 opacity-90">{errorMessage}</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                    )}
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                        {isLoading ? 'Connecting...' : 'Continue with Google'}
                    </span>
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white/0 text-gray-500 bg-white">or</span>
                    </div>
                </div>

                {/* Demo/Fallback option if needed, currently disabled or just styled */}
                <div className="text-center text-sm text-gray-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div>
    );
}
