'use client';

import Navigation from '@/components/layout/Navigation';
import Main from '@/components/layout/Main';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navigation user={user} darkerText={false} />
      <Main user={user} />
      <Footer />
    </>
  );
}
