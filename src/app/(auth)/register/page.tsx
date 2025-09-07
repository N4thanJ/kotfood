import RegisterFormComponent from '@/components/auth/RegisterFormComponent';
import { londrina } from '../../fonts';

export default function Login() {
  return (
    <section className='min-h-screen flex flex-col p-8 bg-gray-50 dark:bg-gray-900'>
      {/* Logo top-left */}
      <div className='mb-12'>
        <h1
          className={`${londrina.className} text-5xl text-lime-500 logo-text`}
        >
          KotFood
        </h1>
      </div>

      {/* Register content */}
      <div className='flex flex-col items-center w-full'>
        {/* Heading and description */}
        <div className='text-center mb-6'>
          <h2 className='text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100'>
            Register
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
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
