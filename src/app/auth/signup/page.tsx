import SignUpForm from '@/components/auth/SignUpForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/');
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
            <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[size:20px_20px]" />
            <div className="relative z-10 w-full max-w-md">
                <SignUpForm />
            </div>
        </div>
    );
}
