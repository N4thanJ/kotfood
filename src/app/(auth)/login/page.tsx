import LoginFormComponent from '@/components/auth/LoginFormComponent';
import Link from 'next/link';

export default function Login() {
  return (
    <section className='flex min-h-screen flex-col bg-gray-50 p-8 dark:bg-gray-900'>
      {/* Logo top-left */}
      <div className='mb-12'>
        <Link href='/'>
          <h1 className={`text-4xl font-black`}>KotFood</h1>
        </Link>
      </div>

      {/* Login content */}
      <div className='flex w-full flex-col items-center'>
        {/* Heading and description */}
        <div className='mb-6 text-center'>
          <h2 className='mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Login
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            Log in om toegang te krijgen tot je opgeslagen recepten en je
            persoonlijke instellingen.
          </p>
        </div>

        {/* Login Form Card */}
        <LoginFormComponent />
      </div>
    </section>
  );
}
