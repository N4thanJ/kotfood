import RecipeService from '@/service/RecipeService';
import RecipeComponent from '../recipes/RecipeComponent';
import CenteredContentBlock from './CenteredContentBlock';
import Hero from './Hero';
import useSWR from 'swr';

export default function Main() {
  const fetcher = async () => {
    const response = await RecipeService.getRecipes();
    return response;
  };

  const { data, error, isLoading } = useSWR('/api/recipes/getRecipes', fetcher);

  console.log(data);

  return (
    <>
      <Hero />
      <CenteredContentBlock
        content={
          <>
            Zet u, pak een taske koffie, en leun even achterover. Scroll rustig
            verder om uw volgende culinaire avontuur te ontdekken en laat je
            inspireren.
          </>
        }
      />
      <RecipeComponent
        recipes={data ?? []}
        error={error?.message}
        isLoading={isLoading}
      />
    </>
  );
}
