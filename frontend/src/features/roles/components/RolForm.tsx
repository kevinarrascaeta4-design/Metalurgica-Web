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
import { rolSchema, type RolFormValues } from '../schemas/rol.schema';

interface RolFormProps {
  defaultValues?: RolFormValues;
  onSubmit: (values: RolFormValues) => void;
  isSubmitting?: boolean;
}

export function RolForm({ defaultValues, onSubmit, isSubmitting }: RolFormProps) {
  const form = useForm<RolFormValues>({
    resolver: zodResolver(rolSchema),
    defaultValues: defaultValues ?? { nombre: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Rol</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Supervisor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </Form>
  );
}