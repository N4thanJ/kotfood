'use client';

import { useState } from 'react';
import * as z from 'zod';
import { User, Mail, Lock } from 'lucide-react';
import UserService from '@/service/UserService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegisterBody } from '@/types';

const registerSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters.' }),
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

export default function RegisterFormComponent() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    try {
      registerSchema.parse({ email, username, password });
      return {};
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const fieldErrors: {
          email?: string;
          username?: string;
          password?: string;
        } = {};
        err.issues.forEach((issue) => {
          if (issue.path[0] === 'email') fieldErrors.email = issue.message;
          if (issue.path[0] === 'username')
            fieldErrors.username = issue.message;
          if (issue.path[0] === 'password')
            fieldErrors.password = issue.message;
        });
        return fieldErrors;
      }
      return {};
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validate();
    setEmailError(errors.email || null);
    setUsernameError(errors.username || null);
    setPasswordError(errors.password || null);

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const registerBody: RegisterBody = { email, username, password };
      await UserService.register(registerBody);

      // Reset fields
      setEmail('');
      setUsername('');
      setPassword('');

      // Redirect to the default page after registration
      router.push('/login');
    } catch (err: unknown) {
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-12 shadow-lg'>
      {/* Email */}
      <div className='relative flex flex-col'>
        <label htmlFor='email' className='sr-only'>
          Email
        </label>
        <div className='relative'>
          <Mail
            className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            className={`w-full rounded-full border py-3 pr-4 pl-10 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailError && (
          <p className='mt-1 text-sm text-red-500'>{emailError}</p>
        )}
      </div>

      {/* Username */}
      <div className='relative flex flex-col'>
        <label htmlFor='username' className='sr-only'>
          Username
        </label>
        <div className='relative'>
          <User
            className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            id='username'
            placeholder='Username'
            className={`w-full rounded-full border py-3 pr-4 pl-10 ${
              usernameError ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {usernameError && (
          <p className='mt-1 text-sm text-red-500'>{usernameError}</p>
        )}
      </div>

      {/* Password */}
      <div className='relative flex flex-col'>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <div className='relative'>
          <Lock
            className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className={`w-full rounded-full border py-3 pr-4 pl-10 ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordError && (
          <p className='mt-1 text-sm text-red-500'>{passwordError}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type='submit'
        onClick={handleRegister}
        disabled={isLoading}
        className={`hover:bg-lime-600:bg-lime-500 mt-2 cursor-pointer rounded-full bg-lime-500 px-4 py-3 text-white transition-colors ${
          isLoading ? 'cursor-not-allowed opacity-60' : ''
        }`}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <small>
        Already have an account? Click{' '}
        <Link className='text-blue-500 hover:underline' href='/login'>
          here
        </Link>{' '}
        to login.
      </small>
    </form>
  );
}
