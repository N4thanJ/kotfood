import { User } from '@/types';
import { Quote } from 'lucide-react';

interface Props {
  user: User;
}

export default function RecipeCreator({ user }: Props) {
  return (
    <aside className='rounded-2xl bg-green-50 p-6 shadow-md'>
      {/* Avatar */}
      <div className='mb-4 flex justify-center'>
        <img
          src={user.imageUrl || '/defaults/avatar.jpg'}
          alt={user.username}
          className='h-24 w-24 rounded-full border-4 border-black object-cover shadow-lg'
        />
      </div>

      {/* Name */}
      <h2 className={`mb-2 text-center text-2xl font-bold text-gray-900`}>
        {user.username}
      </h2>

      {/* Divider */}
      <div className='mx-auto mb-4 h-1 w-16 rounded-full bg-green-500 opacity-70'></div>

      {/* Optional Info */}
      {user.bio && (
        <div className='flex flex-col items-center gap-2 text-center text-sm leading-relaxed text-gray-700'>
          <Quote fill='black' />
          <span>{user.bio}</span>
          <Quote fill='black' />
        </div>
      )}
    </aside>
  );
}
