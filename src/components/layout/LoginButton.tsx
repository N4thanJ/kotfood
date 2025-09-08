import { CircleUser } from 'lucide-react';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href='/login'
      className={`flex cursor-pointer items-center gap-2 text-xl text-white transition hover:text-green-200`}
    >
      <CircleUser size={28} />
    </Link>
  );
}
