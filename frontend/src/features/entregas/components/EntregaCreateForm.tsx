import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { usePedidos } from '@/features/pedidos/hooks/usePedidos';
import { useUsuarios } from '@/features/usuarios/hooks/useUsuarios';
import { entregaSchema, type EntregaFormValues } from '../schemas/entrega.schema';

interface EntregaCreateFormProps {
  onSubmit: (values: EntregaFormValues) => void;
  isSubmitting?: boolean;
}

export function EntregaCreateForm({ onSubmit, isSubmitting }: EntregaCreateFormProps) {
  const { data: pedidos } = usePedidos();
  const { data: usuarios } = useUsuarios(false);

  const pedidosDisponibles = pedidos?.filter(
    (p) => p.estado === 'Pendiente' || p.estado === 'Confirmado',
  );

  const form = useForm<EntregaFormValues>({
    resolver: zodResolver(entregaSchema),
    defaultValues: {
      pedidoId: 0,
      usuarioId: 0,
      observaciones: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="pedidoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pedido</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccioná un pedido" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pedidosDisponibles?.map((pedido) => (
                    <SelectItem key={pedido.pedidoId} value={String(pedido.pedidoId)}>
                      N° {pedido.numeroPedido} — {pedido.clienteRazonSocial}
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
              <FormLabel>Usuario Responsable</FormLabel>
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
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea placeholder="Observaciones opcionales" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creando entrega...' : 'Crear Entrega'}
        </Button>
      </form>
    </Form>
  );
}