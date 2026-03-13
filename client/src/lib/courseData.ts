import module0 from '@/data/modules/module_0.json';
import module1 from '@/data/modules/module_1.json';
import module2 from '@/data/modules/module_2.json';
import module3 from '@/data/modules/module_3.json';
import module4 from '@/data/modules/module_4.json';
import module5 from '@/data/modules/module_5.json';
import module6 from '@/data/modules/module_6.json';
import type { CourseModule } from '@/types/course';

export const modules: CourseModule[] = [
  module0 as CourseModule,
  module1 as CourseModule,
  module2 as CourseModule,
  module3 as CourseModule,
  module4 as CourseModule,
  module5 as CourseModule,
  module6 as CourseModule,
];

export const getModuleById = (id: string): CourseModule | undefined => {
  return modules.find(m => m.id === id);
};

export const getAllModules = (): CourseModule[] => {
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
    return sum + (m.sections?.reduce((sectionSum, s) => {
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
const EXAM_RESULTS_KEY = 'exam_results';

export interface ExamSectionResult {
  moduleId: string;
  sectionId: string;
  attempts: number;
  bestScore: number;
  lastScore: number;
  lastTakenAt: string;
  lastTotalQuestions: number;
  passingScore: number;
}

type ExamResultsRecord = Record<string, ExamSectionResult>;

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
  const module = getModuleById(moduleId);
  if (!module?.sections) return 0;

  return module.sections.reduce((sum, section) => {
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

const getExamResultsRecord = (): ExamResultsRecord => {
  try {
    const raw = localStorage.getItem(EXAM_RESULTS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const saveExamResultsRecord = (record: ExamResultsRecord) => {
  try {
    localStorage.setItem(EXAM_RESULTS_KEY, JSON.stringify(record));
  } catch (e) {
    console.error('Error saving exam results:', e);
  }
};

export const saveExamSectionResult = (
  moduleId: string,
  sectionId: string,
  score: number,
  totalQuestions: number,
  passingScore = 70,
) => {
  try {
    const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
    const normalizedTotalQuestions = Math.max(0, Math.round(totalQuestions));
    const scopedId = `${moduleId}:${sectionId}`;
    const record = getExamResultsRecord();
    const previous = record[scopedId];

    record[scopedId] = {
      moduleId,
      sectionId,
      attempts: (previous?.attempts || 0) + 1,
      bestScore: Math.max(previous?.bestScore || 0, normalizedScore),
      lastScore: normalizedScore,
      lastTakenAt: new Date().toISOString(),
      lastTotalQuestions: normalizedTotalQuestions,
      passingScore,
    };

    saveExamResultsRecord(record);
  } catch (e) {
    console.error('Error updating exam section result:', e);
  }
};

export const getExamSectionResult = (moduleId: string, sectionId: string): ExamSectionResult | null => {
  try {
    const scopedId = `${moduleId}:${sectionId}`;
    const record = getExamResultsRecord();
    return record[scopedId] || null;
  } catch {
    return null;
  }
};

export const getAllExamSectionResults = (): ExamSectionResult[] => {
  const record = getExamResultsRecord();
  return Object.values(record).sort((a, b) => {
    return new Date(b.lastTakenAt).getTime() - new Date(a.lastTakenAt).getTime();
  });
};
