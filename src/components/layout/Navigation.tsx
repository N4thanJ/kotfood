import Link from 'next/link';
import type { User } from '@/types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useEffect, useState } from 'react';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  darkerText: boolean;
}

export default function Navigation({ user, darkerText }: Props) {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onscroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', onscroll);
    onscroll();
    return () => window.removeEventListener('scroll', onscroll);
  }, []);

  // Shared text color logic for the bar and hamburger
  const textClass =
    isAtTop && !darkerText && !isMenuOpen ? 'text-white' : 'text-slate-900';

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        !isAtTop || isMenuOpen
          ? `shadow-md backdrop-blur-md ${!darkerText ? 'bg-background/80' : 'bg-white/90'}`
          : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6'>
        {/* Logo */}
        <Link href={'/'} className='z-50'>
          <h1
            className={`text-3xl font-black transition-colors duration-300 ${textClass}`}
          >
            Kotfood
          </h1>
        </Link>

        <div className='flex items-center'>
          {/* Desktop Links */}
          <ul
            className={`hidden items-center space-x-8 pr-6 font-medium md:flex ${textClass}`}
          >
            <li>
              <Link
                href='/recipes'
                className='text-lg font-bold transition-opacity hover:opacity-70'
              >
                Recepten
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href='/new'
                  className='text-lg font-bold transition-opacity hover:opacity-70'
                >
                  Nieuw recept
                </Link>
              </li>
            )}
          </ul>

          <div className='hidden items-center border-l border-slate-300/30 pl-6 md:flex'>
            {!user ? (
              <LoginButton
                isAtTop={isAtTop}
                darkerText={darkerText}
                isMenuOpen={isMenuOpen}
              />
            ) : (
              <LogoutButton
                isAtTop={isAtTop}
                darkerText={darkerText}
                isMenuOpen={isMenuOpen}
              />
            )}
          </div>

          {/* Morphing Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='relative z-50 flex h-10 w-10 items-center justify-center focus:outline-none md:hidden'
            aria-label='Toggle Menu'
          >
            <div className='relative h-6 w-8'>
              <span
                className={`absolute left-0 block h-1 w-8 bg-current transition-all duration-300 ease-in-out ${textClass} ${isMenuOpen ? 'top-3 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 block h-1 w-8 bg-current transition-all duration-300 ease-in-out ${textClass} ${isMenuOpen ? 'opacity-0' : 'top-2.5 opacity-100'}`}
              />
              <span
                className={`absolute left-0 block h-1 w-8 bg-current transition-all duration-300 ease-in-out ${textClass} ${isMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute inset-x-0 top-0 -z-10 w-full bg-white px-6 pt-24 pb-10 shadow-2xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className='flex flex-col space-y-6'>
          <Link
            href='/recipes'
            className='text-xl font-bold text-slate-900 transition hover:opacity-70'
            onClick={() => setIsMenuOpen(false)}
          >
            Recepten
          </Link>

          {user && (
            <>
              <Link
                href='/recipes/mine'
                className='text-xl font-bold text-slate-900 transition hover:opacity-70'
                onClick={() => setIsMenuOpen(false)}
              >
                Mijn recepten
              </Link>
              <Link
                href='/new'
                className='text-xl font-bold text-slate-900 transition hover:opacity-70'
                onClick={() => setIsMenuOpen(false)}
              >
                Nieuw recept
              </Link>
            </>
          )}

          <div className='mt-2 h-1 w-24 rounded-sm bg-green-500 opacity-80'></div>

          {!user ? (
            <LoginButton isAtTop={false} darkerText={true} isMenuOpen={true} />
          ) : (
            <LogoutButton isAtTop={false} darkerText={true} isMenuOpen={true} />
          )}
        </div>
      </div>
    </nav>
  );
}
