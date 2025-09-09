'use client';
import Navigation from '@/components/layout/Navigation';
import PageHeroComponent from '@/components/layout/PageHeroComponent';
import RecipeOverviewComponent from '@/components/recipes/RecipeOverviewComponent';
import { useAuth } from '@/contexts/AuthContext';
import RecipeService from '@/service/RecipeService';
import useSWR from 'swr';

export default function Recipes() {
  const { user } = useAuth();

  const fetcher = async () => {
    const response = await RecipeService.getRecipes();
    return response;
  };

  const { data, error, isLoading } = useSWR('/api/recipes', fetcher);

  return (
    <main>
      <Navigation user={user} recipePage={false} />
      <PageHeroComponent
        title={'Lekkere recepten voor op jou kot'}
        content={
          <>
            Basisrecepten, snelle maaltijden of zoete dessertjes – bij KotFood
            vind je alles wat je nodig hebt om in uw kotkeuken aan de slag te
            gaan. Of je nu een beginnende chef bent of gewoon zin hebt in iets
            lekkers, hier vind je inspiratie en tips om uw culinaire avontuur te
            starten!
          </>
        }
        imageUrl='https://media.istockphoto.com/id/1366226691/photo/students-in-their-halls.jpg?s=612x612&w=0&k=20&c=ly4_FP947Upae4qac9hg4glJIWghVxvy2S5H1vTD9Zk='
      />

      <RecipeOverviewComponent
        recipes={data || []}
        user={user}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
