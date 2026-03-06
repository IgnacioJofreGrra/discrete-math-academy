import { Badge } from '@/lib/badges';
import { Lock } from 'lucide-react';

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

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} ${badge.color} border-2 rounded-lg flex items-center justify-center relative transition-transform hover:scale-110 ${
          !unlocked ? 'opacity-50' : ''
        }`}
      >
        <div className="text-center">
          <div className="text-3xl">{badge.icon}</div>
          {!unlocked && (
            <Lock className="w-4 h-4 absolute top-1 right-1 text-gray-500" />
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
