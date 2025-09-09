import { LoginBody, RegisterBody } from '@/types';

const login = async (data: LoginBody) => {
  try {
    return await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('UserService login error:', err);
    throw err;
  }
};

const register = async (data: RegisterBody) => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error || 'Registration failed');
    }

    return resData;
  } catch (err) {
    console.error('UserService register error:', err);
    throw err;
  }
};

export const logout = async (): Promise<Response> => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    return res; // return the Response object
  } catch (err) {
    console.error('UserService logout error:', err);
    throw err;
  }
};

const UserService = { login, register, logout };

export default UserService;
