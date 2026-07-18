import { z } from 'zod';

export const clienteSchema = z.object({
  cuit: z
    .string()
    .length(11, 'El CUIT debe tener exactamente 11 dígitos')
    .regex(/^\d+$/, 'El CUIT debe contener solo números'),

  razonSocial: z
    .string()
    .min(1, 'La razón social es obligatoria')
    .max(150, 'La razón social no puede superar los 150 caracteres'),

  email: z
    .string()
    .email('El email no tiene un formato válido')
    .max(100, 'El email no puede superar los 100 caracteres')
    .optional()
    .or(z.literal('')),

  telefono: z
    .string()
    .max(20, 'El teléfono no puede superar los 20 caracteres')
    .optional()
    .or(z.literal('')),

  direccion: z
    .string()
    .max(150, 'La dirección no puede superar los 150 caracteres')
    .optional()
    .or(z.literal('')),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;