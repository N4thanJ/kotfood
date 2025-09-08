import { CircleUser } from 'lucide-react';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href='/login'
      className='flex items-center gap-2 text-xl hover:text-green-200 cursor-pointer transition'
    >
      <CircleUser size={28} />
    </Link>
  );
}
