import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { estadoPedidoConfig } from '../estadoPedidoConfig';
import type { PedidoResponseDto } from '@/types/pedido.types';

interface PedidoTableProps {
  pedidos: PedidoResponseDto[];
}

export function PedidoTable({ pedidos }: PedidoTableProps) {
  return (
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
        {pedidos.map((pedido) => {
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
              <TableCell className="font-medium">{pedido.clienteRazonSocial}</TableCell>
              <TableCell>
                {new Date(pedido.fechaCreacion).toLocaleDateString('es-AR')}
              </TableCell>
              <TableCell>
                <Badge className={config.badgeClassName}>{config.label}</Badge>
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
  );
}