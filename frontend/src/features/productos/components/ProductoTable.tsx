import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductoEditDialog } from './ProductoEditDialog';
import { ProductoDeleteAlert } from './ProductoDeleteAlert';
import type { ProductoResponseDto } from '@/types/producto.types';

interface ProductoTableProps {
  productos: ProductoResponseDto[];
}

export function ProductoTable({ productos }: ProductoTableProps) {
  const [productoAEditar, setProductoAEditar] = useState<ProductoResponseDto | null>(null);
  const [productoAEliminar, setProductoAEliminar] = useState<ProductoResponseDto | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead className="text-right">Stock Actual</TableHead>
            <TableHead className="text-right">Stock Mínimo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-12"></TableHead>
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setProductoAEditar(producto)}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductoEditDialog
        producto={productoAEditar}
        onOpenChange={(open) => !open && setProductoAEditar(null)}
      />

      <ProductoDeleteAlert
        producto={productoAEliminar}
        onOpenChange={(open) => !open && setProductoAEliminar(null)}
      />
    </>
  );
}