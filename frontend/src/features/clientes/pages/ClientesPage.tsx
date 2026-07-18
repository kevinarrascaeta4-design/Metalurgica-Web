import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useClientes } from '../hooks/useClientes';
import { ClienteTable } from '../components/ClienteTable';
import { ClienteCreateDialog } from '../components/ClienteCreateDialog';

export function ClientesPage() {
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const { data: clientes, isLoading, isError } = useClientes(incluirInactivos);

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando clientes...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los clientes.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
        <ClienteCreateDialog />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="incluir-inactivos"
          checked={incluirInactivos}
          onCheckedChange={setIncluirInactivos}
        />
        <Label htmlFor="incluir-inactivos">Mostrar clientes inactivos</Label>
      </div>

      <ClienteTable clientes={clientes} />
    </div>
  );
}