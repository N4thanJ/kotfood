'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-background flex min-h-screen'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className='bg-background flex-1 p-6'>{children}</main>
    </div>
  );
}
