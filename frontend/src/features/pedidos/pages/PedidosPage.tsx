import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { textIncludes } from '@/utils/normalizeText';
import { usePedidos } from '../hooks/usePedidos';
import { PedidoTable } from '../components/PedidoTable';
import { PedidoCreateDialog } from '../components/PedidoCreateDialog';

export function PedidosPage() {
  const { data: pedidos, isLoading, isError } = usePedidos();
  const [busqueda, setBusqueda] = useState('');

  const pedidosFiltrados = useMemo(() => {
    if (!pedidos) return [];
    if (!busqueda) return pedidos;

    return pedidos.filter(
      (p) =>
        textIncludes(p.numeroPedido, busqueda) || textIncludes(p.clienteRazonSocial, busqueda),
    );
  }, [pedidos, busqueda]);

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

      <SearchInput
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por N° de pedido o cliente..."
      />

      <PedidoTable pedidos={pedidosFiltrados} />
    </div>
  );
}