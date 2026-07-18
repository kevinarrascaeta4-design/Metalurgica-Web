import { z } from 'zod';

export const rolSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
});

export type RolFormValues = z.infer<typeof rolSchema>;