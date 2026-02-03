import DOMPurify from 'dompurify';

interface RecipeContentProps {
  content: string;
}

export default function RecipeContent({ content }: RecipeContentProps) {
  return (
    <article className={`recipe-content`}>
      <div
        className='prose prose-slate mt-8 max-w-none'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </article>
  );
}
