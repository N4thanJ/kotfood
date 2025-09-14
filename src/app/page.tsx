'use client';

import Navigation from '@/components/layout/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/layout/Footer';
import RecipeService from '@/service/RecipeService';
import useSWR from 'swr';
import Hero from '@/components/layout/Hero';
import RecipeComponent from '@/components/recipes/RecipeComponent';
import PageHeroComponent from '@/components/layout/PageHeroComponent';
import ContactForm from '@/components/contact/ContactForm';

export default function Home() {
  const { user } = useAuth();

  const fetcher = async () => {
    const response = await RecipeService.getRecipes();
    return response;
  };

  const { data, error, isLoading } = useSWR('/api/recipes', fetcher);

  return (
    <>
      <Navigation user={user} darkerText={false} />
      <Hero />

      <RecipeComponent
        recipes={data ?? []}
        error={error?.message}
        isLoading={isLoading}
        user={user}
      />

      <PageHeroComponent
        title={'Lekkere recepten voor op jouw kot'}
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
      <ContactForm />
      <Footer />
    </>
  );
}
