import { LayoutDashboard, ChefHat, FileWarning } from 'lucide-react';
import AdminLink from './AdminLink';

export default function AdminSidebar() {
  return (
    <aside className='sticky top-0 flex h-screen w-64 flex-col bg-white shadow-md dark:bg-green-900'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-black'>KotFood</h1>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Admin
          </span>
          {/* Divider */}
          <div
            className={`mt-2 h-1 w-16 rounded-sm bg-green-500 opacity-80 dark:bg-yellow-200`}
          ></div>
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
