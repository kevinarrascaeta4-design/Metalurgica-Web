import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { textIncludes } from '@/utils/normalizeText';
import { useEntregas } from '../hooks/useEntregas';
import { EntregaTable } from '../components/EntregaTable';
import { EntregaCreateDialog } from '../components/EntregaCreateDialog';

export function EntregasPage() {
  const { data: entregas, isLoading, isError } = useEntregas();
  const [busqueda, setBusqueda] = useState('');

  const entregasFiltradas = useMemo(() => {
    if (!entregas) return [];
    if (!busqueda) return entregas;

    return entregas.filter(
      (e) => textIncludes(e.numeroPedido, busqueda) || textIncludes(e.usuarioNombre, busqueda),
    );
  }, [entregas, busqueda]);

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

      <SearchInput
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por N° de pedido o responsable..."
      />

      <EntregaTable entregas={entregasFiltradas} />
    </div>
  );
}