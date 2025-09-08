import RegisterFormComponent from '@/components/auth/RegisterFormComponent';

export default function Login() {
  return (
    <section className='flex min-h-screen flex-col bg-gray-50 p-8 dark:bg-gray-900'>
      {/* Logo top-left */}
      <div className='mb-12'>
        <h1 className={`text-4xl font-black`}>KotFood</h1>
      </div>

      {/* Register content */}
      <div className='flex w-full flex-col items-center'>
        {/* Heading and description */}
        <div className='mb-6 text-center'>
          <h2 className='mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100'>
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
