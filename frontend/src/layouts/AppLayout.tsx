import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar placeholder - se desarrolla en el paso 9 */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4">
        <p className="font-bold text-lg">Metalúrgica Web</p>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Topbar placeholder - se desarrolla en el paso 10 */}
        <header className="h-14 border-b border-border bg-card flex items-center px-4">
          <p className="text-muted-foreground">Topbar</p>
        </header>

        {/* Acá se renderiza la página según la ruta actual */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}