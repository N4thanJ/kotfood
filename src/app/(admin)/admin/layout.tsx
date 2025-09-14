'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-green-950'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className='flex-1 p-6'>{children}</main>
    </div>
  );
}
