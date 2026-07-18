import { useState } from 'react';
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
import { UsuarioEditDialog } from './UsuarioEditDialog';
import { useDeactivateUsuario } from '../hooks/useDeactivateUsuario';
import { useReactivateUsuario } from '../hooks/useReactivateUsuario';
import type { UsuarioResponseDto } from '@/types/usuario.types';

interface UsuarioTableProps {
  usuarios: UsuarioResponseDto[];
}

export function UsuarioTable({ usuarios }: UsuarioTableProps) {
  const [usuarioAEditar, setUsuarioAEditar] = useState<UsuarioResponseDto | null>(null);
  const { mutate: deactivate } = useDeactivateUsuario();
  const { mutate: reactivate } = useReactivateUsuario();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.usuarioId}>
              <TableCell className="font-medium">{usuario.nombre}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.rolNombre ?? '—'}</TableCell>
              <TableCell>
                <Badge variant={usuario.activo ? 'default' : 'secondary'}>
                  {usuario.activo ? 'Activo' : 'Inactivo'}
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
                    <DropdownMenuItem onClick={() => setUsuarioAEditar(usuario)}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    {usuario.activo ? (
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deactivate(usuario.usuarioId)}
                      >
                        <PowerOff className="h-4 w-4" />
                        Desactivar
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => reactivate(usuario.usuarioId)}>
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

      <UsuarioEditDialog
        usuario={usuarioAEditar}
        onOpenChange={(open) => !open && setUsuarioAEditar(null)}
      />
    </>
  );
}