import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Topbar placeholder - se desarrolla en el paso 10 */}
        <header className="h-14 border-b border-border bg-card flex items-center px-4">
          <p className="text-muted-foreground">Topbar</p>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}