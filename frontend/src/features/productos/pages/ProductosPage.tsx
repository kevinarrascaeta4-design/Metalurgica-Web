import { useMemo, useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { textIncludes } from '@/utils/normalizeText';
import { useProductos } from '../hooks/useProductos';
import { ProductoTable } from '../components/ProductoTable';
import { ProductoCreateDialog } from '../components/ProductoCreateDialog';

export function ProductosPage() {
  const { data: productos, isLoading, isError } = useProductos();
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    if (!productos) return [];
    if (!busqueda) return productos;

    return productos.filter(
      (p) => textIncludes(p.nombre, busqueda) || textIncludes(p.codigo, busqueda),
    );
  }, [productos, busqueda]);

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

      <SearchInput
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por nombre o código..."
      />

      <ProductoTable productos={productosFiltrados} />
    </div>
  );
}