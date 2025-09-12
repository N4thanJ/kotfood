import { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  content?: ReactNode;
  imageUrl?: string;
}

export default function PageHeroComponent({
  title,
  content,
  imageUrl,
}: PageHeroProps) {
  return (
    <section
      className={`relative flex h-[70svh] w-full items-center bg-gray-100 px-12 py-16 dark:bg-gray-900`}
    >
      {/* Tekstblok links */}
      <div className='z-10 flex max-w-xl flex-col justify-center'>
        <h1
          className={`mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-yellow-100`}
        >
          {title}
        </h1>

        {/* Divider */}
        <div
          className={`mb-4 h-1 w-16 rounded-sm bg-green-500 opacity-80 dark:bg-yellow-200`}
        ></div>

        {/* Content */}
        {content && (
          <div
            className={`text-lg text-gray-700 md:text-xl dark:text-yellow-100`}
          >
            {content}
          </div>
        )}
      </div>

      {/* Optionele afbeelding rechts */}
      {imageUrl && (
        <div className='absolute top-0 right-0 h-full w-1/2 overflow-hidden'>
          <img
            src={imageUrl}
            alt={title}
            className='h-full w-full object-cover'
          />
          <div className='pointer-events-none absolute inset-0 bg-black/40 dark:bg-black/50' />
        </div>
      )}
    </section>
  );
}
