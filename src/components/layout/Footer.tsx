export default function Footer() {
  return (
    <footer className='dark:bg-background bg-foreground border-border'>
      <div className='text-background mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-sm md:flex-row'>
        <p>&copy; {new Date().getFullYear()} KotFood. All rights reserved.</p>
        <p>
          Designed by{' '}
          <a
            href='https://n4thanj.vercel.app/'
            className='font-bold text-green-400 hover:underline'
          >
            N4thanJ
          </a>
        </p>
      </div>
    </footer>
  );
}
