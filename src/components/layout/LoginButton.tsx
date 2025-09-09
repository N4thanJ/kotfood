import { CircleUser } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isAtTop: boolean;
  recipePage: boolean;
}

export default function LoginButton({ isAtTop, recipePage }: Props) {
  return (
    <Link
      href='/login'
      className={`flex cursor-pointer items-center gap-2 text-xl ${isAtTop && !recipePage ? 'text-white' : ''} transition hover:text-green-200`}
    >
      <CircleUser size={28} />
    </Link>
  );
}
