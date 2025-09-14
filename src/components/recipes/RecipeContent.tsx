import DOMPurify from 'dompurify';

interface RecipeContentProps {
  content: string;
}

export default function RecipeContent({ content }: RecipeContentProps) {
  return (
    <article className={`recipe-content`}>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
    </article>
  );
}
