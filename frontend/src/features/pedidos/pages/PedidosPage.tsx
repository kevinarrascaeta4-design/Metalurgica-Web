import { usePedidos } from '../hooks/usePedidos';
import { PedidoTable } from '../components/PedidoTable';
import { PedidoCreateDialog } from '../components/PedidoCreateDialog';

export function PedidosPage() {
  const { data: pedidos, isLoading, isError } = usePedidos();

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando pedidos...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los pedidos.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
        <PedidoCreateDialog />
      </div>
      <PedidoTable pedidos={pedidos} />
    </div>
  );
}