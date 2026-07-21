import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProductos } from '@/features/productos/hooks/useProductos';
import { useUsuarios } from '@/features/usuarios/hooks/useUsuarios';
import {
  createMovimientoStockSchema,
  type MovimientoStockFormValues,
} from '../schemas/movimientoStock.schema';

interface MovimientoStockCreateFormProps {
  onSubmit: (values: MovimientoStockFormValues) => void;
  isSubmitting?: boolean;
}

export function MovimientoStockCreateForm({
  onSubmit,
  isSubmitting,
}: MovimientoStockCreateFormProps) {
  const { data: productos } = useProductos();
  const { data: usuarios } = useUsuarios(false);

  const form = useForm<MovimientoStockFormValues>({
    resolver: zodResolver(createMovimientoStockSchema(productos ?? [])),
    defaultValues: {
      productoId: 0,
      usuarioId: 0,
      tipoMovimiento: 'Entrada',
      cantidad: 1,
      motivo: '',
      observaciones: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Producto</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccioná un producto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productos?.map((producto) => (
                    <SelectItem key={producto.productoId} value={String(producto.productoId)}>
                      {producto.nombre} (stock: {producto.stockActual})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usuarioId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccioná un usuario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {usuarios?.map((usuario) => (
                    <SelectItem key={usuario.usuarioId} value={String(usuario.usuarioId)}>
                      {usuario.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoMovimiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Movimiento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Entrada">Entrada</SelectItem>
                  <SelectItem value="Salida">Salida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Compra, Venta, Ajuste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Input placeholder="Observaciones opcionales" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Registrando...' : 'Registrar Movimiento'}
        </Button>
      </form>
    </Form>
  );
}