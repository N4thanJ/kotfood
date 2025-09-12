import { ReactNode } from 'react';

interface Props {
  content?: ReactNode;
}

export default function RecipeContent({ content }: Props) {
  return (
    <article>
      <p>{content}</p>
    </article>
  );
}
