import UserService from '@/service/UserService';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await UserService.logout();
      if (!res.ok) {
        console.error('Logout failed');
        return;
      }
      console.log('Logged out successfully');
      window.location.href = '/login';
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  return (
    <span
      className={`flex cursor-pointer items-center gap-2 text-xl text-white transition hover:text-red-500`}
      onClick={handleLogout}
    >
      <LogOut size={28} />
    </span>
  );
}
