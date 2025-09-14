import Link from 'next/link';

interface Props {
  isOpen: boolean;
  icon: React.ElementType<{ size?: number; className?: string }>;
  text: string;
  href: string;
}

export default function AdminLink({ isOpen, icon: Icon, text, href }: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700 dark:text-gray-300 dark:hover:bg-green-800 ${
        isOpen ? 'gap-3 px-3' : 'justify-center px-2'
      }`}
      title={!isOpen ? text : undefined}
    >
      <Icon size={20} className='flex-shrink-0' />
      {isOpen && <span>{text}</span>}
    </Link>
  );
}
