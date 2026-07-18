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
import { RolEditDialog } from './RolEditDialog';
import { RolDeleteAlert } from './RolDeleteAlert';
import type { RolResponseDto } from '@/types/rol.types';

interface RolTableProps {
  roles: RolResponseDto[];
}

export function RolTable({ roles }: RolTableProps) {
  const [rolAEditar, setRolAEditar] = useState<RolResponseDto | null>(null);
  const [rolAEliminar, setRolAEliminar] = useState<RolResponseDto | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right">Usuarios Asignados</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((rol) => (
            <TableRow key={rol.rolId}>
              <TableCell className="font-medium">{rol.nombre}</TableCell>
              <TableCell className="text-right">
                <Badge variant={rol.cantidadUsuarios > 0 ? 'default' : 'secondary'}>
                  {rol.cantidadUsuarios}
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
                    <DropdownMenuItem onClick={() => setRolAEditar(rol)}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setRolAEliminar(rol)}
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

      <RolEditDialog
        rol={rolAEditar}
        onOpenChange={(open) => !open && setRolAEditar(null)}
      />

      <RolDeleteAlert
        rol={rolAEliminar}
        onOpenChange={(open) => !open && setRolAEliminar(null)}
      />
    </>
  );
}