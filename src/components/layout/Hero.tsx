import Image from 'next/image';

export default function Hero() {
  return (
    <section className='hero relative h-[85vh] w-full'>
      {/* Background image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/thumbnail/thumbnail.jpg'
          alt='Hero image'
          fill
          className='object-cover'
          priority
          style={{ filter: 'brightness(0.8)' }}
        />
      </div>
      {/* Overlay text */}
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white'>
        <h1 className='text-7xl font-extrabold drop-shadow-lg md:text-7xl'>
          Recht uit ’t hartje van Leuven.
        </h1>
      </div>
    </section>
  );
}
