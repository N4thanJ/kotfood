interface Props {
  name: string;
  data: number;
}

export default function AdminOverviewCard({ name, data }: Props) {
  return (
    <article className='card bg-background rounded-md shadow-sm dark:bg-green-900'>
      <div className='card-body p-6'>
        <h2 className='text-sm font-medium text-gray-600 dark:text-gray-300'>
          {name}
        </h2>
        <p className='mt-2 text-2xl font-bold text-green-700 dark:text-green-200'>
          {data}
        </p>
      </div>
    </article>
  );
}
