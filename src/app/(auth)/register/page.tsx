import RegisterFormComponent from '@/components/auth/RegisterFormComponent';
import Link from 'next/link';

export default function Login() {
  return (
    <section className='flex min-h-screen flex-col bg-gray-50 p-8'>
      {/* Logo top-left */}
      <div className='mb-12'>
        <Link href='/'>
          <h1 className={`text-4xl font-black`}>KotFood</h1>
        </Link>
      </div>

      {/* Register content */}
      <div className='flex w-full flex-col items-center'>
        {/* Heading and description */}
        <div className='mb-6 text-center'>
          <h2 className='mb-2 text-3xl font-bold text-gray-900'>Register</h2>
          <p className='text-gray-600'>
            Maak een account aan om eenvoudig recepten op te slaan en je te
            abonneren op onze nieuwsbrief.
          </p>
        </div>

        {/* Register Form Card */}
        <RegisterFormComponent />
      </div>
    </section>
  );
}
