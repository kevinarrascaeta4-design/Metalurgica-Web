import { useState } from 'react';
import { toast } from 'sonner';
import { MoreHorizontal, Pencil, Power, PowerOff } from 'lucide-react';
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
import { ClienteEditDialog } from './ClienteEditDialog';
import { useDeactivateCliente } from '../hooks/useDeactivateCliente';
import { useReactivateCliente } from '../hooks/useReactivateCliente';
import type { ClienteResponseDto } from '@/types/cliente.types';

interface ClienteTableProps {
  clientes: ClienteResponseDto[];
}

export function ClienteTable({ clientes }: ClienteTableProps) {
  const [clienteAEditar, setClienteAEditar] = useState<ClienteResponseDto | null>(null);
  const { mutate: deactivate } = useDeactivateCliente();
  const { mutate: reactivate } = useReactivateCliente();

  const handleDeactivate = (id: number) => {
    deactivate(id, {
      onSuccess: () => toast.success('Cliente desactivado.'),
      onError: (error: any) => toast.error(error.mensaje ?? 'Error al desactivar el cliente.'),
    });
  };

  const handleReactivate = (id: number) => {
    reactivate(id, {
      onSuccess: () => toast.success('Cliente reactivado.'),
      onError: (error: any) => toast.error(error.mensaje ?? 'Error al reactivar el cliente.'),
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CUIT</TableHead>
            <TableHead>Razón Social</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.clienteId}>
              <TableCell className="font-mono text-sm">{cliente.cuit}</TableCell>
              <TableCell className="font-medium">{cliente.razonSocial}</TableCell>
              <TableCell>{cliente.email ?? '—'}</TableCell>
              <TableCell>{cliente.telefono ?? '—'}</TableCell>
              <TableCell>
                <Badge variant={cliente.activo ? 'default' : 'secondary'}>
                  {cliente.activo ? 'Activo' : 'Inactivo'}
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
                    <DropdownMenuItem onClick={() => setClienteAEditar(cliente)}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    {cliente.activo ? (
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDeactivate(cliente.clienteId)}
                      >
                        <PowerOff className="h-4 w-4" />
                        Desactivar
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleReactivate(cliente.clienteId)}>
                        <Power className="h-4 w-4" />
                        Reactivar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ClienteEditDialog
        cliente={clienteAEditar}
        onOpenChange={(open) => !open && setClienteAEditar(null)}
      />
    </>
  );
}