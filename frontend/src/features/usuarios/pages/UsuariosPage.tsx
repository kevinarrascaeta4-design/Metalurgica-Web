import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUsuarios } from '../hooks/useUsuarios';
import { UsuarioTable } from '../components/UsuarioTable';
import { UsuarioCreateDialog } from '../components/UsuarioCreateDialog';

export function UsuariosPage() {
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const { data: usuarios, isLoading, isError } = useUsuarios(incluirInactivos);

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando usuarios...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los usuarios.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Usuarios</h1>
        <UsuarioCreateDialog />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="incluir-inactivos"
          checked={incluirInactivos}
          onCheckedChange={setIncluirInactivos}
        />
        <Label htmlFor="incluir-inactivos">Mostrar usuarios inactivos</Label>
      </div>

      <UsuarioTable usuarios={usuarios} />
    </div>
  );
}