import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePedido } from '../hooks/usePedido';
import { PedidoEstadoDropdown } from '../components/PedidoEstadoDropdown';

export function PedidoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pedidoId = Number(id);

  const { data: pedido, isLoading, isError } = usePedido(pedidoId);

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando pedido...</p>;
  }

  if (isError || !pedido) {
    return <p className="text-destructive">No se pudo encontrar el pedido solicitado.</p>;
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/pedidos')} className="-ml-3">
        <ArrowLeft className="h-4 w-4" />
        Volver a Pedidos
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Pedido N° {pedido.numeroPedido}
          </h1>
          <p className="text-muted-foreground">{pedido.clienteRazonSocial}</p>
        </div>
        <PedidoEstadoDropdown pedidoId={pedido.pedidoId} estadoActual={pedido.estado} />
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
        <div>
          <p className="text-sm text-muted-foreground">Fecha de creación</p>
          <p className="font-medium">
            {new Date(pedido.fechaCreacion).toLocaleDateString('es-AR')}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Última modificación</p>
          <p className="font-medium">
            {pedido.fechaModificacion
              ? new Date(pedido.fechaModificacion).toLocaleDateString('es-AR')
              : '—'}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-medium">
            {pedido.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-foreground">Detalle de productos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Precio Unitario</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedido.detalles.map((detalle) => (
              <TableRow key={detalle.detallePedidoId}>
                <TableCell className="font-medium">{detalle.productoNombre}</TableCell>
                <TableCell className="text-right">{detalle.cantidad}</TableCell>
                <TableCell className="text-right">
                  {detalle.precioUnitario.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {detalle.subTotal.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}