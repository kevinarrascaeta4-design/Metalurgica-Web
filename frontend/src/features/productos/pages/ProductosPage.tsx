import { useProductos } from '../hooks/useProductos';
import { ProductoTable } from '../components/ProductoTable';
import { ProductoCreateDialog } from '../components/ProductoCreateDialog';

export function ProductosPage() {
  const { data: productos, isLoading, isError } = useProductos();

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando productos...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Ocurrió un error al cargar los productos.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Productos</h1>
        <ProductoCreateDialog />
      </div>
      <ProductoTable productos={productos} />
    </div>
  );
}