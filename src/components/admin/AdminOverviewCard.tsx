import Link from 'next/link';

interface Props {
  name: string;
  data: number;
  href?: string;
}

export default function AdminOverviewCard({ name, data, href }: Props) {
  const cardContent = (
    <article className='card bg-card-background rounded-md border border-gray-200 shadow-sm'>
      <div className='card-body p-6'>
        <h2 className='text-foreground text-sm font-medium'>{name}</h2>
        <p className='mt-2 text-2xl font-bold text-green-700'>{data}</p>
      </div>
    </article>
  );

  return href ? <Link href={href}>{cardContent}</Link> : <>{cardContent}</>;
}
