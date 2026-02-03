import AdminSidebar from '@/components/admin/AdminSidebar';
import Head from 'next/head';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-background flex min-h-screen'>
      <Head>
        <title>Kotfood | Admin</title>
      </Head>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className='bg-background flex-1 p-6'>{children}</main>
    </div>
  );
}
