import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EntregaEstadoDropdown } from './EntregaEstadoDropdown';
import type { EntregaResponseDto } from '@/types/entrega.types';

interface EntregaTableProps {
  entregas: EntregaResponseDto[];
}

export function EntregaTable({ entregas }: EntregaTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N° Pedido</TableHead>
          <TableHead>Responsable</TableHead>
          <TableHead>Fecha de Entrega</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entregas.map((entrega) => (
          <TableRow key={entrega.entregaId}>
            <TableCell className="font-mono text-sm">{entrega.numeroPedido}</TableCell>
            <TableCell className="font-medium">{entrega.usuarioNombre}</TableCell>
            <TableCell>
              {entrega.fechaEntrega
                ? new Date(entrega.fechaEntrega).toLocaleDateString('es-AR')
                : '—'}
            </TableCell>
            <TableCell>
              <EntregaEstadoDropdown
                entregaId={entrega.entregaId}
                estadoActual={entrega.estadoEntrega}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}