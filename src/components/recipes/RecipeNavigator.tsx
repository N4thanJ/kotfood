import { User } from '@/types';
import Link from 'next/link';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export default function RecipeNavigator({ user }: Props) {
  return (
    <>
      {user ? (
        <p className='mt-4 text-center'>
          Wil je graag zelf eentje publiceren?{' '}
          <Link href='/new' className='underline dark:text-green-300'>
            <span className='text-green-700'>Klik dan hier!</span>
          </Link>
        </p>
      ) : (
        <p className='mt-4 text-center'>
          <Link
            href='/login'
            className='text-green-700 underline dark:text-green-300'
          >
            <span>Log in</span>
          </Link>{' '}
          om zelf een recept te publiceren.
        </p>
      )}
    </>
  );
}
