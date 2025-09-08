'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import Navigation from '@/components/layout/Navigation';

export default function Home() {
  const [user, setUser] = useState<Pick<
    User,
    'id' | 'email' | 'username'
  > | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/ping')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navigation user={user} />
      {loading ? <p>Loading...</p> : <h1>Hello {user?.username || 'Guest'}</h1>}
    </>
  );
}
