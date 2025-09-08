'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import Navigation from '@/components/layout/Navigation';
import Main from '@/components/layout/Main';
import RecipeCard from '@/components/recipes/RecipeCard';

export default function Home() {
  const [user, setUser] = useState<Pick<
    User,
    'id' | 'email' | 'username'
  > | null>(null);

  useEffect(() => {
    fetch('/api/auth/ping')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      });
  }, []);

  return (
    <>
      <Navigation user={user} />
      <Main />
    </>
  );
}
