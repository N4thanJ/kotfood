import RecipeService from '@/service/RecipeService';
import RecipeComponent from '../recipes/RecipeComponent';
import CenteredContentBlock from './CenteredContentBlock';
import Hero from './Hero';
import useSWR from 'swr';
import { User } from '@/types';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username'> | null;
}

export default function Main({ user }: Props) {
  const fetcher = async () => {
    const response = await RecipeService.getRecipes();
    return response;
  };

  const { data, error, isLoading } = useSWR('/api/recipes', fetcher);

  return (
    <>
      <Hero />
      <CenteredContentBlock
        content={
          <>
            Zet u comfortabel, pak uw koffie erbij, en scroll rustig verder.
            Ontdek smakelijke recepten en zoete dessertjes voor uw eigen
            kotkeukenavontuur.
          </>
        }
      />
      <RecipeComponent
        recipes={data ?? []}
        error={error?.message}
        isLoading={isLoading}
        user={user}
      />
    </>
  );
}
