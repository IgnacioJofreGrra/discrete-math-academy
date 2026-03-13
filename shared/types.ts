export interface AppUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface ModuleProgressSnapshot {
  moduleId: string;
  progress: number;
  completedExercises: number;
  totalExercises: number;
  updatedAt: string;
}

export interface LearningStatsSummary {
  totalProgress: number;
  completedModules: number;
  completedExercises: number;
  totalExercises: number;
  streak: number;
  unlockedBadges: number;
  totalBadges: number;
  examAttempts: number;
  sectionsWithExam: number;
  averageExamScore: number;
}

export interface ProgressChartDatum {
  id: string;
  moduleNumber: string;
  name: string;
  progress: number;
}

export interface DifficultyChartDatum {
  name: string;
  value: number;
  fill: string;
}

export interface ExamPerformanceRow {
  moduleId: string;
  sectionId: string;
  attempts: number;
  bestScore: number;
  lastScore: number;
  lastTakenAt: string;
  lastTotalQuestions: number;
  passingScore: number;
  moduleTitle: string;
  sectionTitle: string;
}
