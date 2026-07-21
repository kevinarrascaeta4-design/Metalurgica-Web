import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { MovimientoStockResponseDto } from '@/types/movimientoStock.types';

interface MovimientoStockTableProps {
  movimientos: MovimientoStockResponseDto[];
}

export function MovimientoStockTable({ movimientos }: MovimientoStockTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
          <TableHead className="text-right">Stock Resultante</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Motivo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movimientos.map((movimiento) => (
          <TableRow key={movimiento.movimientoId}>
            <TableCell>{new Date(movimiento.fecha).toLocaleDateString('es-AR')}</TableCell>
            <TableCell className="font-medium">{movimiento.productoNombre}</TableCell>
            <TableCell>
              <Badge
                className={
                  movimiento.tipoMovimiento === 'Entrada'
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                }
              >
                {movimiento.tipoMovimiento}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{movimiento.cantidad}</TableCell>
            <TableCell className="text-right">{movimiento.stockResultante}</TableCell>
            <TableCell>{movimiento.usuarioNombre}</TableCell>
            <TableCell className="text-muted-foreground">
              {movimiento.motivo ?? '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}