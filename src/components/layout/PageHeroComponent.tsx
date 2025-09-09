import { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  content?: ReactNode;
  bgColor?: string;
  textColor?: string;
  imageUrl?: string; // optioneel
}

export default function PageHeroComponent({
  title,
  content,
  bgColor = 'bg-gray-800',
  textColor = 'text-yellow-100',
  imageUrl,
}: PageHeroProps) {
  return (
    <section
      className={`${bgColor} relative flex h-[70svh] w-full items-center px-12 py-16`}
    >
      {/* Tekstblok links */}
      <div className='z-10 flex max-w-xl flex-col justify-center'>
        <h1 className={`mb-4 text-4xl font-extrabold md:text-5xl ${textColor}`}>
          {title}
        </h1>

        <div
          className={`bg-background mb-4 h-1 w-16 rounded-sm ${textColor} opacity-50`}
        ></div>

        {content && (
          <div className={`text-lg md:text-xl ${textColor}`}>{content}</div>
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
          <div className='pointer-events-none absolute inset-0 bg-black opacity-40' />
        </div>
      )}
    </section>
  );
}
