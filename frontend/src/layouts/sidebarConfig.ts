import {
  LayoutDashboard,
  Users,
  Package,
  ShieldCheck,
  UserCog,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
  type LucideIcon,
} from 'lucide-react';

export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Clientes', path: '/clientes', icon: Users },
  { label: 'Productos', path: '/productos', icon: Package },
  { label: 'Roles', path: '/roles', icon: ShieldCheck },
  { label: 'Usuarios', path: '/usuarios', icon: UserCog },
  { label: 'Pedidos', path: '/pedidos', icon: ShoppingCart },
  { label: 'Entregas', path: '/entregas', icon: Truck },
  { label: 'Movimiento de Stock', path: '/movimiento-stock', icon: ArrowLeftRight },
];