import { ReactNode } from 'react';

interface Props {
  content: ReactNode;
}

export default function CenteredContentBlock({ content }: Props) {
  return (
    <section className='flex min-h-[200] items-center justify-center px-4'>
      <div className='w-full max-w-[700px] text-center'>
        <p className='text-xl leading-relaxed font-semibold text-black'>
          {content}
        </p>
      </div>
    </section>
  );
}
