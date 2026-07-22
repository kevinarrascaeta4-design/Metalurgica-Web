import { Link } from 'react-router-dom';
import { Users, PackageX, Clock, Truck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClientes } from '@/features/clientes/hooks/useClientes';
import { useProductos } from '@/features/productos/hooks/useProductos';
import { usePedidos } from '@/features/pedidos/hooks/usePedidos';
import { useEntregas } from '@/features/entregas/hooks/useEntregas';
import { estadoPedidoConfig } from '@/features/pedidos/estadoPedidoConfig';
import { MetricCard } from '../components/MetricCard';

export function DashboardPage() {
  const { data: clientes, isLoading: loadingClientes } = useClientes(false);
  const { data: productos, isLoading: loadingProductos } = useProductos();
  const { data: pedidos, isLoading: loadingPedidos } = usePedidos();
  const { data: entregas, isLoading: loadingEntregas } = useEntregas();

  const isLoading = loadingClientes || loadingProductos || loadingPedidos || loadingEntregas;

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando dashboard...</p>;
  }

  const productosStockBajo =
    productos?.filter((p) => p.stockActual <= p.stockMinimo).length ?? 0;

  const pedidosPendientes =
    pedidos?.filter((p) => p.estado === 'Pendiente').length ?? 0;

  const entregasEnCamino =
    entregas?.filter((e) => e.estadoEntrega === 'En Camino').length ?? 0;

  const ultimosPedidos = pedidos
    ? [...pedidos]
        .sort(
          (a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime(),
        )
        .slice(0, 5)
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard titulo="Clientes Activos" valor={clientes?.length ?? 0} icon={Users} />
        <MetricCard
          titulo="Stock Bajo"
          valor={productosStockBajo}
          icon={PackageX}
          descripcion="Productos por debajo del mínimo"
        />
        <MetricCard titulo="Pedidos Pendientes" valor={pedidosPendientes} icon={Clock} />
        <MetricCard titulo="Entregas en Camino" valor={entregasEnCamino} icon={Truck} />
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-foreground">Últimos Pedidos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ultimosPedidos.map((pedido) => {
              const config = estadoPedidoConfig[pedido.estado];

              return (
                <TableRow key={pedido.pedidoId}>
                  <TableCell>
                    <Link
                      to={`/pedidos/${pedido.pedidoId}`}
                      className="font-mono text-sm text-primary hover:underline"
                    >
                      {pedido.numeroPedido}
                    </Link>
                  </TableCell>
                  <TableCell>{pedido.clienteRazonSocial}</TableCell>
                  <TableCell>
                    {new Date(pedido.fechaCreacion).toLocaleDateString('es-AR')}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${config.badgeClassName}`}
                    >
                      {config.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {pedido.total.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}