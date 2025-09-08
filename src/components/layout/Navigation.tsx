import { londrina } from '@/app/fonts';
import Link from 'next/link';
import type { User } from '@/types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username'> | null;
}

export default function Navigation({ user }: Props) {
  return (
    <nav className='flex items-center justify-between bg-background  border-b border-slate-300'>
      <h1
        className={`${londrina.className} pl-8 text-5xl text-green-600 logo-text`}
      >
        KotFood
      </h1>

      <div className='flex items-center dark:text-white h-16'>
        <ul className='flex justify-between items-stretch font-medium '>
          <li className='flex items-center justify-center px-4'>
            <Link
              href='/'
              className='flex items-center gap-2 text-md font-bold hover:text-green-200 cursor-pointer transition'
            >
              Recepten
            </Link>
          </li>

          <li className='flex items-center justify-center px-4'>
            <Link
              href='/'
              className='flex items-center gap-2 text-md font-bold hover:text-green-200 cursor-pointer transition'
            >
              Dessertjes
            </Link>
          </li>
        </ul>

        <div className='h-16 w-px bg-slate-300'></div>

        <li className='flex items-center justify-center px-8'>
          {!user ? <LoginButton /> : <LogoutButton />}
        </li>
      </div>
    </nav>
  );
}
