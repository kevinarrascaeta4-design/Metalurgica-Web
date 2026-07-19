import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
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
import { useClientes } from '@/features/clientes/hooks/useClientes';
import { useProductos } from '@/features/productos/hooks/useProductos';
import { createPedidoSchema, type PedidoFormValues } from '../schemas/pedido.schema';

interface PedidoCreateFormProps {
  onSubmit: (values: PedidoFormValues) => void;
  isSubmitting?: boolean;
}

export function PedidoCreateForm({ onSubmit, isSubmitting }: PedidoCreateFormProps) {
  const { data: clientes } = useClientes(false);
  const { data: productos } = useProductos();

  const form = useForm<PedidoFormValues>({
    resolver: zodResolver(createPedidoSchema(productos ?? [])),
    defaultValues: {
      clienteId: 0,
      detalles: [{ productoId: 0, cantidad: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'detalles',
  });

  const detallesActuales = form.watch('detalles');

  const total = detallesActuales.reduce((acumulado, item) => {
    const producto = productos?.find((p) => p.productoId === item.productoId);
    if (!producto) return acumulado;
    return acumulado + producto.precio * (item.cantidad || 0);
  }, 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clienteId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccioná un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientes?.map((cliente) => (
                    <SelectItem key={cliente.clienteId} value={String(cliente.clienteId)}>
                      {cliente.razonSocial}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Productos</FormLabel>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2 rounded-md border p-3">
              <FormField
                control={form.control}
                name={`detalles.${index}.productoId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                          <SelectItem
                            key={producto.productoId}
                            value={String(producto.productoId)}
                          >
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
                name={`detalles.${index}.cantidad`}
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {form.formState.errors.detalles?.message && (
            <p className="text-sm text-destructive">
              {form.formState.errors.detalles.message}
            </p>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ productoId: 0, cantidad: 1 })}
            className="w-full"
          >
            <Plus className="h-4 w-4" />
            Agregar producto
          </Button>
        </div>

        <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>
            {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
          </span>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creando pedido...' : 'Crear Pedido'}
        </Button>
      </form>
    </Form>
  );
}