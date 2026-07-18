import { useRoles } from '../hooks/useRoles';
import { RolTable } from '../components/RolTable';
import { RolCreateDialog } from '../components/RolCreateDialog';

export function RolesPage() {
  const { data: roles, isLoading, isError } = useRoles();

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando roles...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los roles.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Roles</h1>
        <RolCreateDialog />
      </div>
      <RolTable roles={roles} />
    </div>
  );
}