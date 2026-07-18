import { z } from 'zod';

export const usuarioCreateSchema = z.object({
  rolId: z.coerce.number({ message: 'Debe seleccionar un rol' }).min(1, 'Debe seleccionar un rol'),

  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('El email no tiene un formato válido')
    .max(100, 'El email no puede superar los 100 caracteres'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const usuarioUpdateSchema = z.object({
  rolId: z.coerce.number({ message: 'Debe seleccionar un rol' }).min(1, 'Debe seleccionar un rol'),

  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('El email no tiene un formato válido')
    .max(100, 'El email no puede superar los 100 caracteres'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional()
    .or(z.literal('')),
});

export type UsuarioCreateFormValues = z.infer<typeof usuarioCreateSchema>;
export type UsuarioUpdateFormValues = z.infer<typeof usuarioUpdateSchema>;