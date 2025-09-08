import Link from 'next/link';
import type { User } from '@/types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username'> | null;
}

export default function Navigation({ user }: Props) {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const onscroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);
    };
    window.addEventListener('scroll', onscroll);
    onscroll();
    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 border-slate-200 transition-all ${
        !isAtTop ? 'bg-background/30 shadow-md backdrop-blur-md' : ''
      }`}
    >
      <div className='mx-auto flex h-20 max-w-[1440px] items-center justify-between'>
        {/* Logo */}
        <h1 className={`text-4xl font-black ${isAtTop ? 'text-white' : ''}`}>
          Kotfood
        </h1>

        <div className='flex items-center'>
          {/* Links */}
          <ul
            className={`hidden space-x-8 pr-6 font-medium ${isAtTop ? 'text-white' : ''} md:flex`}
          >
            <li>
              <Link
                href='/'
                className='text-xl font-semibold transition-colors hover:underline'
              >
                Recepten
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='text-xl font-semibold transition-colors hover:underline'
              >
                Dessertjes
              </Link>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className='flex items-center pl-6'>
            {!user ? (
              <LoginButton isAtTop={isAtTop} />
            ) : (
              <LogoutButton isAtTop={isAtTop} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
