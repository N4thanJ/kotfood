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
          <Link href='/new' className='hover:underline'>
            <span className='text-secondary hover:text-primary'>
              Klik dan hier!
            </span>
          </Link>
        </p>
      ) : (
        <p className='mt-4 text-center'>
          <Link href='/login' className='text-green-700 underline'>
            <span>Log in</span>
          </Link>{' '}
          om zelf een recept te publiceren.
        </p>
      )}
    </>
  );
}
