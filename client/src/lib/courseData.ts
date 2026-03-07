import module0 from '@/data/modules/module_0.json';
import module1 from '@/data/modules/module_1.json';
import module2 from '@/data/modules/module_2.json';
import module3 from '@/data/modules/module_3.json';
import module4 from '@/data/modules/module_4.json';
import module5 from '@/data/modules/module_5.json';
import module6 from '@/data/modules/module_6.json';

export const modules = [
  module0,
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
];

export const getModuleById = (id: string) => {
  return modules.find(m => m.id === id);
};

export const getAllModules = () => {
  return modules;
};

export const getModuleProgress = (moduleId: string): number => {
  try {
    const key = `module_progress_${moduleId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : 0;
  } catch {
    return 0;
  }
};

export const updateModuleProgress = (moduleId: string, progress: number) => {
  try {
    const key = `module_progress_${moduleId}`;
    localStorage.setItem(key, JSON.stringify(Math.min(100, Math.max(0, progress))));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

export const getTotalProgress = (): number => {
  const total = modules.reduce((sum, m) => sum + getModuleProgress(m.id), 0);
  return Math.round(total / modules.length);
};

export const getCompletedModules = (): number => {
  return modules.filter(m => getModuleProgress(m.id) === 100).length;
};

export const getTotalExercises = (): number => {
  return modules.reduce((sum, m) => {
    return sum + (m.sections?.reduce((sectionSum: number, s: any) => {
      return sectionSum + (s.content?.exercises?.length || 0);
    }, 0) || 0);
  }, 0);
};

export const getCompletedExercises = (): number => {
  try {
    const key = 'completed_exercises';
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : 0;
  } catch {
    return 0;
  }
};

export const updateCompletedExercises = (count: number) => {
  try {
    localStorage.setItem('completed_exercises', JSON.stringify(count));
  } catch (e) {
    console.error('Error saving completed exercises:', e);
  }
};

export const getStreak = (): number => {
  try {
    const key = 'study_streak';
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : 0;
  } catch {
    return 0;
  }
};

export const updateStreak = (days: number) => {
  try {
    localStorage.setItem('study_streak', JSON.stringify(days));
  } catch (e) {
    console.error('Error saving streak:', e);
  }
};

const COMPLETED_EXERCISE_IDS_KEY = 'completed_exercise_ids';
const LAST_STUDY_DATE_KEY = 'last_study_date';

const getCompletedExerciseIds = (): string[] => {
  try {
    const stored = localStorage.getItem(COMPLETED_EXERCISE_IDS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCompletedExerciseIds = (ids: string[]) => {
  try {
    localStorage.setItem(COMPLETED_EXERCISE_IDS_KEY, JSON.stringify(ids));
    updateCompletedExercises(ids.length);
  } catch (e) {
    console.error('Error saving completed exercise ids:', e);
  }
};

const getModuleTotalExercises = (moduleId: string): number => {
  const module = getModuleById(moduleId) as any;
  if (!module?.sections) return 0;

  return module.sections.reduce((sum: number, section: any) => {
    return sum + (section.content?.exercises?.length || 0);
  }, 0);
};

export const markExerciseCompleted = (moduleId: string, exerciseId: string): boolean => {
  try {
    const scopedId = `${moduleId}:${exerciseId}`;
    const completedIds = getCompletedExerciseIds();
    if (completedIds.includes(scopedId)) {
      return false;
    }

    const updatedIds = [...completedIds, scopedId];
    saveCompletedExerciseIds(updatedIds);

    const moduleExerciseTotal = getModuleTotalExercises(moduleId);
    const moduleExerciseDone = updatedIds.filter(id => id.startsWith(`${moduleId}:`)).length;
    const progress = moduleExerciseTotal > 0 ? Math.round((moduleExerciseDone / moduleExerciseTotal) * 100) : 0;
    updateModuleProgress(moduleId, progress);

    return true;
  } catch (e) {
    console.error('Error marking exercise as completed:', e);
    return false;
  }
};

export const touchStudyDay = (): number => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const lastStudyDate = localStorage.getItem(LAST_STUDY_DATE_KEY);

    if (lastStudyDate === today) {
      return getStreak();
    }

    let streak = getStreak();
    if (!lastStudyDate) {
      streak = 1;
    } else {
      const last = new Date(lastStudyDate);
      const now = new Date(today);
      const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      streak = diffDays === 1 ? streak + 1 : 1;
    }

    updateStreak(streak);
    localStorage.setItem(LAST_STUDY_DATE_KEY, today);
    return streak;
  } catch (e) {
    console.error('Error updating study streak:', e);
    return getStreak();
  }
};
