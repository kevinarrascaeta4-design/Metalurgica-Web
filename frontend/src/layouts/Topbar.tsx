import { useLocation } from 'react-router-dom';
import { sidebarItems } from './sidebarConfig';

export function Topbar() {
  const location = useLocation();

  const currentItem = sidebarItems.find((item) => item.path === location.pathname);
  const title = currentItem?.label ?? 'Página no encontrada';

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      {/* Espacio reservado para usuario logueado / notificaciones (paso 19) */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Usuario</span>
      </div>
    </header>
  );
}