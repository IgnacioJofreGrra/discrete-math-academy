/**
 * Sistema de Badges y Logros
 * Define todos los badges disponibles y lógica para desbloquearlos
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: string;
  unlockedAt?: number;
}

export const BADGES: Record<string, Badge> = {
  // Módulos
  module_0_master: {
    id: 'module_0_master',
    name: 'Maestro de Divisibilidad',
    description: 'Completa el Módulo 0: Divisibilidad y Cimientos',
    icon: 'hash',
    color: 'bg-green-100 border-green-500',
    condition: 'Complete Module 0 with 100%',
  },
  module_1_master: {
    id: 'module_1_master',
    name: 'Experto en PBO',
    description: 'Completa el Módulo 1: Principio del Buen Orden',
    icon: 'mountain',
    color: 'bg-blue-100 border-blue-500',
    condition: 'Complete Module 1 with 100%',
  },
  module_2_master: {
    id: 'module_2_master',
    name: 'Inducción Total',
    description: 'Completa el Módulo 2: Inducción Completa',
    icon: 'link-2',
    color: 'bg-purple-100 border-purple-500',
    condition: 'Complete Module 2 with 100%',
  },
  module_3_master: {
    id: 'module_3_master',
    name: 'Teoría de Conjuntos',
    description: 'Completa el Módulo 3: Conjuntos y Funciones',
    icon: 'target',
    color: 'bg-yellow-100 border-yellow-500',
    condition: 'Complete Module 3 with 100%',
  },
  module_4_master: {
    id: 'module_4_master',
    name: 'Infinito y Más Allá',
    description: 'Completa el Módulo 4: Numerabilidad',
    icon: 'infinity',
    color: 'bg-pink-100 border-pink-500',
    condition: 'Complete Module 4 with 100%',
  },
  module_5_master: {
    id: 'module_5_master',
    name: 'Principio del Palomar',
    description: 'Completa el Módulo 5: Principio del Palomar',
    icon: 'bird',
    color: 'bg-orange-100 border-orange-500',
    condition: 'Complete Module 5 with 100%',
  },
  module_6_master: {
    id: 'module_6_master',
    name: 'Relaciones Equivalentes',
    description: 'Completa el Módulo 6: Relaciones de Equivalencia',
    icon: 'link-2',
    color: 'bg-indigo-100 border-indigo-500',
    condition: 'Complete Module 6 with 100%',
  },

  // Ejercicios
  exercise_10: {
    id: 'exercise_10',
    name: 'Primer Paso',
    description: 'Resuelve 10 ejercicios',
    icon: 'footprints',
    color: 'bg-green-100 border-green-500',
    condition: 'Complete 10 exercises',
  },
  exercise_25: {
    id: 'exercise_25',
    name: 'Cuarto de Camino',
    description: 'Resuelve 25 ejercicios',
    icon: 'person-standing',
    color: 'bg-blue-100 border-blue-500',
    condition: 'Complete 25 exercises',
  },
  exercise_50: {
    id: 'exercise_50',
    name: 'A Mitad de Camino',
    description: 'Resuelve 50 ejercicios',
    icon: 'person-running',
    color: 'bg-purple-100 border-purple-500',
    condition: 'Complete 50 exercises',
  },
  exercise_all: {
    id: 'exercise_all',
    name: 'Campeón de Ejercicios',
    description: 'Resuelve todos los ejercicios',
    icon: 'trophy',
    color: 'bg-yellow-100 border-yellow-500',
    condition: 'Complete all exercises',
  },

  // Racha
  streak_7: {
    id: 'streak_7',
    name: 'Semana Dedicada',
    description: 'Estudia 7 días consecutivos',
    icon: 'flame',
    color: 'bg-red-100 border-red-500',
    condition: 'Maintain 7-day streak',
  },
  streak_30: {
    id: 'streak_30',
    name: 'Mes de Dedicación',
    description: 'Estudia 30 días consecutivos',
    icon: 'star',
    color: 'bg-orange-100 border-orange-500',
    condition: 'Maintain 30-day streak',
  },
  streak_100: {
    id: 'streak_100',
    name: 'Leyenda del Aprendizaje',
    description: 'Estudia 100 días consecutivos',
    icon: 'crown',
    color: 'bg-pink-100 border-pink-500',
    condition: 'Maintain 100-day streak',
  },

  // Especiales
  perfect_module: {
    id: 'perfect_module',
    name: 'Perfección',
    description: 'Obtén 100% en un módulo completo',
    icon: 'badge-percent',
    color: 'bg-green-100 border-green-500',
    condition: 'Get 100% in a module',
  },
  quiz_master: {
    id: 'quiz_master',
    name: 'Maestro de Quizzes',
    description: 'Aprueba 5 quizzes con 90% o más',
    icon: 'book-open',
    color: 'bg-blue-100 border-blue-500',
    condition: 'Pass 5 quizzes with 90%+',
  },
  visualizer: {
    id: 'visualizer',
    name: 'Visualizador',
    description: 'Usa todas las herramientas de visualización',
    icon: 'eye',
    color: 'bg-purple-100 border-purple-500',
    condition: 'Use all visualization tools',
  },
};

export const getBadges = (): Badge[] => {
  try {
    const stored = localStorage.getItem('unlocked_badges');
    const unlockedIds = stored ? JSON.parse(stored) : [];
    return Object.values(BADGES).map(badge => ({
      ...badge,
      unlockedAt: unlockedIds.includes(badge.id) ? Date.now() : undefined,
    }));
  } catch {
    return Object.values(BADGES);
  }
};

export const unlockBadge = (badgeId: string): boolean => {
  try {
    const stored = localStorage.getItem('unlocked_badges');
    const unlockedIds: string[] = stored ? JSON.parse(stored) : [];

    if (!unlockedIds.includes(badgeId)) {
      unlockedIds.push(badgeId);
      localStorage.setItem('unlocked_badges', JSON.stringify(unlockedIds));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const isBadgeUnlocked = (badgeId: string): boolean => {
  try {
    const stored = localStorage.getItem('unlocked_badges');
    const unlockedIds: string[] = stored ? JSON.parse(stored) : [];
    return unlockedIds.includes(badgeId);
  } catch {
    return false;
  }
};

export const getUnlockedBadgesCount = (): number => {
  try {
    const stored = localStorage.getItem('unlocked_badges');
    return stored ? JSON.parse(stored).length : 0;
  } catch {
    return 0;
  }
};

export const checkAndUnlockBadges = (stats: {
  completedModules: number;
  completedExercises: number;
  streak: number;
  quizzesCompleted: number;
  quizzesWithHighScore: number;
  visualizationsUsed: number;
}) => {
  const newBadges: string[] = [];

  // Module badges
  if (stats.completedModules >= 1 && !isBadgeUnlocked('module_0_master')) {
    newBadges.push('module_0_master');
  }
  if (stats.completedModules >= 2 && !isBadgeUnlocked('module_1_master')) {
    newBadges.push('module_1_master');
  }
  if (stats.completedModules >= 3 && !isBadgeUnlocked('module_2_master')) {
    newBadges.push('module_2_master');
  }
  if (stats.completedModules >= 4 && !isBadgeUnlocked('module_3_master')) {
    newBadges.push('module_3_master');
  }
  if (stats.completedModules >= 5 && !isBadgeUnlocked('module_4_master')) {
    newBadges.push('module_4_master');
  }
  if (stats.completedModules >= 6 && !isBadgeUnlocked('module_5_master')) {
    newBadges.push('module_5_master');
  }
  if (stats.completedModules === 7 && !isBadgeUnlocked('module_6_master')) {
    newBadges.push('module_6_master');
  }

  // Exercise badges
  if (stats.completedExercises >= 10 && !isBadgeUnlocked('exercise_10')) {
    newBadges.push('exercise_10');
  }
  if (stats.completedExercises >= 25 && !isBadgeUnlocked('exercise_25')) {
    newBadges.push('exercise_25');
  }
  if (stats.completedExercises >= 50 && !isBadgeUnlocked('exercise_50')) {
    newBadges.push('exercise_50');
  }
  if (stats.completedExercises >= 32 && !isBadgeUnlocked('exercise_all')) {
    newBadges.push('exercise_all');
  }

  // Streak badges
  if (stats.streak >= 7 && !isBadgeUnlocked('streak_7')) {
    newBadges.push('streak_7');
  }
  if (stats.streak >= 30 && !isBadgeUnlocked('streak_30')) {
    newBadges.push('streak_30');
  }
  if (stats.streak >= 100 && !isBadgeUnlocked('streak_100')) {
    newBadges.push('streak_100');
  }

  // Quiz badges
  if (stats.quizzesWithHighScore >= 5 && !isBadgeUnlocked('quiz_master')) {
    newBadges.push('quiz_master');
  }

  // Visualization badge
  if (stats.visualizationsUsed >= 3 && !isBadgeUnlocked('visualizer')) {
    newBadges.push('visualizer');
  }

  newBadges.forEach(badgeId => unlockBadge(badgeId));
  return newBadges;
};
