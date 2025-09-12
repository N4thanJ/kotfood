import { playfair } from '@/app/fonts';
import { User } from '@/types';

interface Props {
  user: User;
}

export default function RecipeCreator({ user }: Props) {
  return (
    <aside>
      <h2 className={`mb-2 text-2xl font-bold ${playfair.className}`}>
        Het brein achter dit recept
      </h2>

      {/* Avatar */}
      <div className='relative mb-4 flex justify-center'>
        <img
          src={user.imageUrl || '/defaults/avatar.jpg'}
          alt={user.username}
          className='object-cover'
        />
      </div>

      {/* Name */}
      <div>
        {/* Username */}
        <span className='block text-lg font-bold text-gray-900 dark:text-gray-100'>
          {user.username}
        </span>

        {/* Divider */}
        <div className='mb-4 h-1 w-16 rounded-full bg-green-500 opacity-80 dark:bg-green-400'></div>

        {/* Bio */}
        {user.bio && (
          <span className='mt-1 block text-sm text-gray-600 italic dark:text-gray-300'>
            {user.bio}
          </span>
        )}
      </div>
    </aside>
  );
}
