import UserService from '@/service/UserService';
import { LogOut } from 'lucide-react';

interface Props {
  isAtTop: boolean;
  darkerText: boolean;
  isMenuOpen: boolean;
}

export default function LogoutButton({
  isAtTop,
  darkerText,
  isMenuOpen,
}: Props) {
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

  const colorClass =
    isAtTop && !darkerText && !isMenuOpen ? 'text-white' : 'text-red-500';

  return (
    <span
      className={`flex cursor-pointer items-center gap-2 text-xl font-bold transition hover:text-red-700 ${colorClass}`}
      onClick={handleLogout}
    >
      {!isMenuOpen ? <LogOut size={28} /> : 'Logout'}
    </span>
  );
}
