import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { textIncludes } from '@/utils/normalizeText';
import { useMovimientosStock } from '../hooks/useMovimientosStock';
import { MovimientoStockTable } from '../components/MovimientoStockTable';
import { MovimientoStockCreateDialog } from '../components/MovimientoStockCreateDialog';

export function MovimientoStockPage() {
  const { data: movimientos, isLoading, isError } = useMovimientosStock();
  const [busqueda, setBusqueda] = useState('');

  const movimientosFiltrados = useMemo(() => {
    if (!movimientos) return [];
    if (!busqueda) return movimientos;

    return movimientos.filter(
      (m) =>
        textIncludes(m.productoNombre, busqueda) ||
        textIncludes(m.usuarioNombre, busqueda) ||
        (m.motivo ? textIncludes(m.motivo, busqueda) : false),
    );
  }, [movimientos, busqueda]);

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando movimientos...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los movimientos.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Movimiento de Stock</h1>
        <MovimientoStockCreateDialog />
      </div>

      <SearchInput
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por producto, usuario o motivo..."
      />

      <MovimientoStockTable movimientos={movimientosFiltrados} />
    </div>
  );
}