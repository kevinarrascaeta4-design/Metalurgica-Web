import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  titulo: string;
  valor: number | string;
  icon: LucideIcon;
  descripcion?: string;
}

export function MetricCard({ titulo, valor, icon: Icon, descripcion }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{titulo}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{valor}</div>
        {descripcion && <p className="text-xs text-muted-foreground">{descripcion}</p>}
      </CardContent>
    </Card>
  );
}