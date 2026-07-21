import { z } from 'zod';
import type { ProductoResponseDto } from '@/types/producto.types';

export function createMovimientoStockSchema(productos: ProductoResponseDto[]) {
  return z
    .object({
      productoId: z.coerce.number().min(1, 'Debe seleccionar un producto'),
      usuarioId: z.coerce.number().min(1, 'Debe seleccionar un usuario'),
      tipoMovimiento: z.enum(['Entrada', 'Salida'], {
        message: 'Debe seleccionar un tipo de movimiento',
      }),
      cantidad: z.coerce.number().int().min(1, 'La cantidad debe ser mayor a 0'),
      motivo: z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
      observaciones: z.string().max(255, 'Máximo 255 caracteres').optional().or(z.literal('')),
    })
    .superRefine((data, ctx) => {
      if (data.tipoMovimiento === 'Salida') {
        const producto = productos.find((p) => p.productoId === data.productoId);
        if (producto && data.cantidad > producto.stockActual) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Stock insuficiente (disponible: ${producto.stockActual})`,
            path: ['cantidad'],
          });
        }
      }
    });
}

export type MovimientoStockFormValues = z.infer<
  ReturnType<typeof createMovimientoStockSchema>
>;