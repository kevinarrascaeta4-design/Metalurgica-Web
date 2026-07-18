import { useProductos } from '../hooks/useProductos';
import { ProductoTable } from '../components/ProductoTable';

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
      <h1 className="text-2xl font-bold text-foreground">Productos</h1>
      <ProductoTable productos={productos} />
    </div>
  );
}