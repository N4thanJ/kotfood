import Link from 'next/link';
import type { User } from '@/types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  darkerText: boolean;
}

export default function Navigation({ user, darkerText }: Props) {
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
      className={`fixed top-0 right-0 left-0 z-50 border-slate-200 px-4 transition-all ${
        !isAtTop
          ? `${!darkerText ? 'bg-background/30' : 'bg-white/30'} shadow-md backdrop-blur-md`
          : ''
      }`}
    >
      <div className='mx-auto flex h-20 max-w-[1440px] items-center justify-between'>
        {/* Logo */}
        <Link href={'/'}>
          <h1
            className={`text-4xl font-black ${isAtTop && !darkerText ? 'text-white' : ''}`}
          >
            Kotfood
          </h1>
        </Link>

        <div className='flex items-center'>
          {/* Links */}
          <ul
            className={`hidden space-x-8 pr-6 font-medium ${isAtTop && !darkerText ? 'text-white' : ''} md:flex`}
          >
            <li>
              <Link
                href='/recipes'
                className='text-xl font-semibold transition-colors hover:underline'
              >
                Recepten
              </Link>
            </li>

            {user && (
              <li>
                <Link
                  href='/new'
                  className='text-xl font-semibold transition-colors hover:underline'
                >
                  Nieuw recept
                </Link>
              </li>
            )}
          </ul>

          {/* Auth buttons */}
          <div className='flex items-center pl-6'>
            {!user ? (
              <LoginButton isAtTop={isAtTop} darkerText={darkerText} />
            ) : (
              <LogoutButton isAtTop={isAtTop} darkerText={darkerText} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
