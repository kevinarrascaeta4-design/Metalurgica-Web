import { useEntregas } from '../hooks/useEntregas';
import { EntregaTable } from '../components/EntregaTable';
import { EntregaCreateDialog } from '../components/EntregaCreateDialog';

export function EntregasPage() {
  const { data: entregas, isLoading, isError } = useEntregas();

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando entregas...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar las entregas.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Entregas</h1>
        <EntregaCreateDialog />
      </div>
      <EntregaTable entregas={entregas} />
    </div>
  );
}