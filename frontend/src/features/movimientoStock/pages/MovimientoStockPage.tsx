import { useMovimientosStock } from '../hooks/useMovimientosStock';
import { MovimientoStockTable } from '../components/MovimientoStockTable';
import { MovimientoStockCreateDialog } from '../components/MovimientoStockCreateDialog';

export function MovimientoStockPage() {
  const { data: movimientos, isLoading, isError } = useMovimientosStock();

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
      <MovimientoStockTable movimientos={movimientos} />
    </div>
  );
}