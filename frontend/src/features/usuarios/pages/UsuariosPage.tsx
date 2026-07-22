import { useMemo, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SearchInput } from '@/components/SearchInput';
import { textIncludes } from '@/utils/normalizeText';
import { useUsuarios } from '../hooks/useUsuarios';
import { UsuarioTable } from '../components/UsuarioTable';
import { UsuarioCreateDialog } from '../components/UsuarioCreateDialog';

export function UsuariosPage() {
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const { data: usuarios, isLoading, isError } = useUsuarios(incluirInactivos);
  const [busqueda, setBusqueda] = useState('');

  const usuariosFiltrados = useMemo(() => {
    if (!usuarios) return [];
    if (!busqueda) return usuarios;

    return usuarios.filter(
      (u) => textIncludes(u.nombre, busqueda) || textIncludes(u.email, busqueda),
    );
  }, [usuarios, busqueda]);

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

      <div className="flex items-center justify-between">
        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar por nombre o email..."
        />
        <div className="flex items-center gap-2">
          <Switch
            id="incluir-inactivos"
            checked={incluirInactivos}
            onCheckedChange={setIncluirInactivos}
          />
          <Label htmlFor="incluir-inactivos">Mostrar usuarios inactivos</Label>
        </div>
      </div>

      <UsuarioTable usuarios={usuariosFiltrados} />
    </div>
  );
}