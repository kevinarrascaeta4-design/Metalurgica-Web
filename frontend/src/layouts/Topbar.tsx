import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/AuthContext';
import { sidebarItems } from './sidebarConfig';

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const currentItem = sidebarItems.find((item) => item.path === location.pathname);
  const title = currentItem?.label ?? 'Página no encontrada';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{usuario?.nombre}</p>
          <p className="text-xs text-muted-foreground">{usuario?.rolNombre}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar sesión">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}