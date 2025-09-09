'use client';

import Navigation from '@/components/layout/Navigation';
import Main from '@/components/layout/Main';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navigation user={user} recipePage={false} />
      <Main user={user} />
    </>
  );
}
