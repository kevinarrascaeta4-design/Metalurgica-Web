import { z } from 'zod';

export const entregaSchema = z.object({
  pedidoId: z.coerce.number().min(1, 'Debe seleccionar un pedido'),
  usuarioId: z.coerce.number().min(1, 'Debe seleccionar un usuario responsable'),
  observaciones: z.string().max(255, 'Máximo 255 caracteres').optional().or(z.literal('')),
});

export type EntregaFormValues = z.infer<typeof entregaSchema>;