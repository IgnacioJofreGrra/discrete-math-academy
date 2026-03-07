import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppIconProps {
  icon: LucideIcon;
  colorClass?: string;
  size?: number;
  className?: string;
}

/**
 * AppIcon - Estilo unificado de iconos para mantener consistencia visual en toda la app.
 */
export function AppIcon({
  icon: Icon,
  colorClass = 'text-blue-500',
  size = 30,
  className,
}: AppIconProps) {
  return (
    <Icon
      size={size}
      className={cn('shrink-0 stroke-[2.25]', colorClass, className)}
      aria-hidden="true"
    />
  );
}
