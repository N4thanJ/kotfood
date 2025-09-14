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
      className={`bg-secondary relative flex h-[70svh] w-full items-center px-12 py-16`}
    >
      <div className='z-10 flex max-w-xl flex-col justify-center'>
        <h1
          className={`text-background mb-4 text-4xl font-extrabold md:text-5xl`}
        >
          {title}
        </h1>

        <div
          className={`bg-foreground mb-4 h-1 w-16 rounded-sm opacity-80`}
        ></div>

        {content && (
          <div className={`text-background text-lg md:text-xl`}>{content}</div>
        )}
      </div>

      {imageUrl && (
        <div className='absolute top-0 right-0 h-full w-1/2 overflow-hidden'>
          <img
            src={imageUrl}
            alt={title}
            className='h-full w-full object-cover'
          />
          <div className='pointer-events-none absolute inset-0 bg-black/20' />
        </div>
      )}
    </section>
  );
}
