import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { ProductoResponseDto } from '@/types/producto.types';

interface ProductoTableProps {
  productos: ProductoResponseDto[];
}

export function ProductoTable({ productos }: ProductoTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right">Stock Actual</TableHead>
          <TableHead className="text-right">Stock Mínimo</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto) => (
          <TableRow key={producto.productoId}>
            <TableCell className="font-mono text-sm">{producto.codigo}</TableCell>
            <TableCell className="font-medium">{producto.nombre}</TableCell>
            <TableCell className="text-right">
              {producto.precio.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </TableCell>
            <TableCell className="text-right">{producto.stockActual}</TableCell>
            <TableCell className="text-right">{producto.stockMinimo}</TableCell>
            <TableCell>
              <Badge variant={producto.activo ? 'default' : 'secondary'}>
                {producto.activo ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}