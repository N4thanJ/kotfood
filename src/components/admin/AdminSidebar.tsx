import { LayoutDashboard, ChefHat, FileWarning } from 'lucide-react';
import AdminLink from './AdminLink';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className='bg-sidebar sticky top-0 flex h-screen w-64 flex-col shadow-md'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex flex-col'>
          <Link href='/'>
            <div className='flex items-center gap-2'>
              <h1 className='text-3xl font-black text-green-800'>KotFood</h1>
            </div>
          </Link>
          <span className='text-sm text-gray-500'>Admin</span>
          <div className='mt-2 h-1 w-16 rounded-sm bg-green-500 opacity-80'></div>
        </div>
      </div>

      <nav className='flex flex-1 flex-col gap-2 p-2'>
        <AdminLink
          isOpen={true}
          icon={LayoutDashboard}
          text='Dashboard'
          href='/admin'
        />
        <AdminLink
          isOpen={true}
          icon={ChefHat}
          text='Recepten'
          href='/admin/recipes'
        />
        <AdminLink
          isOpen={true}
          icon={FileWarning}
          text='Inactieve Recepten'
          href='/admin/recipes/inactive'
        />
      </nav>
    </aside>
  );
}
