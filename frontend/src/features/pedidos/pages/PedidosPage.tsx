import { usePedidos } from '../hooks/usePedidos';
import { PedidoTable } from '../components/PedidoTable';

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
      <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
      <PedidoTable pedidos={pedidos} />
    </div>
  );
}