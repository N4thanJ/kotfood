import { LayoutDashboard, ChefHat, FileWarning } from 'lucide-react';
import AdminLink from './AdminLink';

export default function AdminSidebar() {
  return (
    <aside className='sticky top-0 flex h-screen w-64 flex-col bg-white shadow-md dark:bg-green-900'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold text-green-700 dark:text-green-200'>
            Kotfood
          </h1>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Admin
          </span>
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
