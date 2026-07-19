import { z } from 'zod';
import type { ProductoResponseDto } from '@/types/producto.types';

const detalleItemSchema = z.object({
  productoId: z.coerce.number().min(1, 'Debe seleccionar un producto'),
  cantidad: z.coerce.number().int().min(1, 'La cantidad debe ser mayor a 0'),
});

export function createPedidoSchema(productos: ProductoResponseDto[]) {
  return z.object({
    clienteId: z.coerce.number().min(1, 'Debe seleccionar un cliente'),
    detalles: z
      .array(detalleItemSchema)
      .min(1, 'Debe agregar al menos un producto')
      .superRefine((detalles, ctx) => {
        detalles.forEach((detalle, index) => {
          const producto = productos.find((p) => p.productoId === detalle.productoId);

          if (producto && detalle.cantidad > producto.stockActual) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Stock insuficiente (disponible: ${producto.stockActual})`,
              path: [index, 'cantidad'],
            });
          }
        });
      }),
  });
}

export type PedidoFormValues = z.infer<ReturnType<typeof createPedidoSchema>>;