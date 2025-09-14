import { playfair } from '@/app/fonts';
import { Recipe } from '@/types';

interface Props {
  recipe: Recipe;
}

export default function RecipeHero({ recipe }: Props) {
  return (
    <article>
      {/* Title */}
      <h1
        className={`mb-4 text-5xl font-bold text-gray-900 ${playfair.className}`}
      >
        {recipe.name}
      </h1>

      {/* Created At / Updated At */}
      <div className='mb-6 flex gap-4 text-sm text-gray-500'>
        <span>
          Gepost op:{' '}
          {new Date(recipe.createdAt).toLocaleDateString('nl-NL', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <span>
          Laatst bewerkt op:{' '}
          {new Date(recipe.updatedAt).toLocaleDateString('nl-NL', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Image */}
      {recipe.imageUrl && (
        <div className='mb-6'>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className='h-auto w-full rounded-lg object-cover shadow-sm'
          />
        </div>
      )}

      {/* Description */}
      <p className='text-lg leading-relaxed text-gray-700'>
        {recipe.description}
      </p>

      {/* Divider */}
      <div className='mt-2 mb-4 h-1 w-48 rounded-sm bg-green-500 opacity-80'></div>
    </article>
  );
}
