import RecipeService from '@/service/RecipeService';
import RecipeComponent from '../recipes/RecipeComponent';
import Hero from './Hero';
import useSWR from 'swr';
import { User } from '@/types';
import PageHeroComponent from './PageHeroComponent';
import ContactForm from '../contact/ContactForm';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
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

      <RecipeComponent
        recipes={data ?? []}
        error={error?.message}
        isLoading={isLoading}
        user={user}
      />

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
      <ContactForm />
    </>
  );
}
