'use client';

import UserService from '@/service/UserService';
import { LoginBody } from '@/types';
import { useState } from 'react';
import * as z from 'zod';
import { User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(64, { message: 'Password must be at most 64 characters.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});

export default function LoginFormComponent() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validate = (data: LoginBody) => {
    try {
      formSchema.parse(data);
      return {};
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        err.issues.forEach((e) => {
          if (e.path[0] === 'email') fieldErrors.email = e.message;
          if (e.path[0] === 'password') fieldErrors.password = e.message;
        });
        return fieldErrors;
      }
      return {};
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const data: LoginBody = { email, password };
    const errors = validate(data);

    setUsernameError(errors.email || null);
    setPasswordError(errors.password || null);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await UserService.login(data);
      console.log('Login successful:', response);
      setIsLoading(false);
      router.push('/');
    } catch (err: any) {
      console.log('Error logging in:', err.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-4 max-w-md w-full bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg'>
      {/* Email */}
      <div className='flex flex-col relative'>
        <label htmlFor='email' className='sr-only'>
          Email
        </label>
        <div className='relative'>
          <User
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300'
            size={20}
          />
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Enter Email Address'
            className={`pl-10 pr-4 py-3 w-full rounded-full border ${
              usernameError
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400`}
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {usernameError && (
          <p className='text-red-500 text-sm mt-1'>{usernameError}</p>
        )}
      </div>

      {/* Password */}
      <div className='flex flex-col relative'>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <div className='relative'>
          <Lock
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300'
            size={20}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className={`pl-10 pr-4 py-3 w-full rounded-full border ${
              passwordError
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordError && (
          <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        onClick={handleLogin}
        disabled={isLoading}
        className={`mt-2 px-4 py-3 cursor-pointer bg-lime-500 dark:bg-lime-600 text-white rounded-full transition-colors
          hover:bg-lime-600 dark:hover:bg-lime-500
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {/* Register */}
      <small>
        Don't have an account? Click{' '}
        <Link className='text-blue-500 hover:underline' href='/register'>
          here
        </Link>{' '}
        to register a new account.
      </small>
    </form>
  );
}
