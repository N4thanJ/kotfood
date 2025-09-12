'use client';

import CreateComponent from '@/components/creation/CreateComponent';
import Navigation from '@/components/layout/Navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function New() {
  const { user } = useAuth();

  return (
    <main>
      <Navigation user={user} darkerText />
      <CreateComponent user={user} />
    </main>
  );
}
