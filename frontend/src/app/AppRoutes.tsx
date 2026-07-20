import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { ClientesPage } from '@/features/clientes/pages/ClientesPage';
import { ProductosPage } from '@/features/productos/pages/ProductosPage';
import { RolesPage } from '@/features/roles/pages/RolesPage';
import { UsuariosPage } from '@/features/usuarios/pages/UsuariosPage';
import { PedidosPage } from '@/features/pedidos/pages/PedidosPage';
import { PedidoDetallePage } from '@/features/pedidos/pages/PedidoDetallePage';
import { EntregasPage } from '@/features/entregas/pages/EntregasPage';
import { MovimientoStockPage } from '@/features/movimientoStock/pages/MovimientoStockPage';
import { NotFoundPage } from '@/components/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/pedidos" element={<PedidosPage />} />
        <Route path="/pedidos/:id" element={<PedidoDetallePage />} />
        <Route path="/entregas" element={<EntregasPage />} />
        <Route path="/movimiento-stock" element={<MovimientoStockPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}