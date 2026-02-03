import { CircleUser } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isAtTop: boolean;
  darkerText: boolean;
  isMenuOpen: boolean;
}

export default function LoginButton({
  isAtTop,
  darkerText,
  isMenuOpen,
}: Props) {
  const colorClass =
    isAtTop && !darkerText && !isMenuOpen ? 'text-white' : 'text-slate-900';

  return (
    <Link
      href='/login'
      className={`flex cursor-pointer items-center gap-2 text-xl font-bold transition duration-300 hover:opacity-70 ${colorClass}`}
    >
      {!isMenuOpen ? <CircleUser size={28} /> : 'Login'}
    </Link>
  );
}
