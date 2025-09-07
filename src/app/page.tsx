'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  exp?: number;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/ping')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      });
  }, []);

  return <h1>Hello {user?.username || 'Guest'}</h1>;
}
