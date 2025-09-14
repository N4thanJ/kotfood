'use client';

import AdminOverviewCard from '@/components/admin/AdminOverviewCard';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  const { data, error } = useSWR('/api/recipes/stats', fetcher);

  if (error) return <div>Failed to load recipe stats</div>;
  if (!data) return <div>Loading...</div>;

  const { total, approved, pending } = data;

  return (
    <section className='px-8 pt-20'>
      <h1 className='mb-6 text-2xl font-extrabold text-green-800 dark:text-green-200'>
        Admin Dashboard
      </h1>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Total Recipes */}
        <AdminOverviewCard name={'Totaal recepten'} data={total} />

        {/* Approved Recipes */}
        <AdminOverviewCard name={'Goedgekeurd'} data={approved} />

        {/* Pending Recipes */}
        <AdminOverviewCard name={'In afwachting'} data={pending} />
      </div>
    </section>
  );
}
