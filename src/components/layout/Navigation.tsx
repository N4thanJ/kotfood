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
            <li className='group relative'>
              <Link href={'/recipes'}>
                <span className='cursor-pointer text-xl font-semibold transition-colors hover:underline focus:outline-none'>
                  Recepten
                </span>
              </Link>
              <ul className='absolute left-0 z-10 hidden min-w-[160px] overflow-hidden rounded-md bg-white shadow-lg group-hover:block group-focus:block'>
                <li>
                  <Link
                    href='/recipes'
                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    Alle recepten
                  </Link>
                </li>
                <li>
                  <Link
                    href='/recipes/mine'
                    className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    Mijn recepten
                  </Link>
                </li>
              </ul>
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
