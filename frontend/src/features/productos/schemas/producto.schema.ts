import { z } from 'zod';

export const productoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  descripcion: z
    .string()
    .max(255, 'La descripción no puede superar los 255 caracteres')
    .optional()
    .or(z.literal('')),

  precio: z.coerce
    .number({ message: 'El precio debe ser un número' })
    .min(0, 'El precio no puede ser negativo'),

  stockActual: z.coerce
    .number({ message: 'El stock actual debe ser un número' })
    .int('El stock actual debe ser un número entero')
    .min(0, 'El stock actual no puede ser negativo'),

  stockMinimo: z.coerce
    .number({ message: 'El stock mínimo debe ser un número' })
    .int('El stock mínimo debe ser un número entero')
    .min(0, 'El stock mínimo no puede ser negativo'),

  activo: z.boolean(),

  codigo: z
    .string()
    .min(1, 'El código es obligatorio')
    .max(30, 'El código no puede superar los 30 caracteres'),
});

export type ProductoFormValues = z.infer<typeof productoSchema>;