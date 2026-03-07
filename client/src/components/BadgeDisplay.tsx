import { Badge } from '@/lib/badges';
import {
  Lock,
  Hash,
  Mountain,
  Link2,
  Target,
  Infinity,
  Bird,
  Footprints,
  PersonStanding,
  PersonStanding as PersonRunningFallback,
  Trophy,
  Flame,
  Star,
  Crown,
  BadgePercent,
  BookOpen,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import { AppIcon } from './AppIcon';

interface BadgeDisplayProps {
  badge: Badge;
  unlocked?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * BadgeDisplay - Componente para mostrar un badge individual
 */
export function BadgeDisplay({ badge, unlocked = false, size = 'medium' }: BadgeDisplayProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const iconSize = {
    small: 22,
    medium: 30,
    large: 40,
  };

  const badgeIconMap: Record<string, LucideIcon> = {
    hash: Hash,
    mountain: Mountain,
    'link-2': Link2,
    target: Target,
    infinity: Infinity,
    bird: Bird,
    footprints: Footprints,
    'person-standing': PersonStanding,
    'person-running': PersonRunningFallback,
    trophy: Trophy,
    flame: Flame,
    star: Star,
    crown: Crown,
    'badge-percent': BadgePercent,
    'book-open': BookOpen,
    eye: Eye,
  };

  const iconColorFromBadge = (color: string) => {
    if (color.includes('green')) return 'text-green-600';
    if (color.includes('blue')) return 'text-blue-600';
    if (color.includes('purple')) return 'text-purple-600';
    if (color.includes('yellow')) return 'text-yellow-600';
    if (color.includes('orange')) return 'text-orange-600';
    if (color.includes('red')) return 'text-red-600';
    if (color.includes('pink')) return 'text-pink-600';
    if (color.includes('indigo')) return 'text-indigo-600';
    return 'text-slate-700';
  };

  const badgeIcon = badgeIconMap[badge.icon] ?? BookOpen;
  const badgeIconColor = iconColorFromBadge(badge.color);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} ${badge.color} border-2 rounded-lg flex items-center justify-center relative transition-transform hover:scale-110 ${
          !unlocked ? 'opacity-50' : ''
        }`}
      >
        <div className="text-center">
          <AppIcon icon={badgeIcon} size={iconSize[size]} colorClass={badgeIconColor} />
          {!unlocked && (
            <AppIcon icon={Lock} size={16} colorClass="text-gray-500 absolute top-1 right-1" />
          )}
        </div>
      </div>
      <div className="text-center">
        <p className={`font-semibold text-gray-900 ${textSizeClasses[size]}`}>
          {badge.name}
        </p>
        <p className={`text-gray-600 ${textSizeClasses[size]}`}>
          {badge.description}
        </p>
      </div>
    </div>
  );
}
