export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export interface TheoryExample {
  text: string;
  latex?: string;
}

export interface DivisibilityCriterion {
  divisor: number;
  criterion: string;
  example?: string;
  explanation?: string;
}

export interface TheoryContent {
  definition: string;
  examples?: TheoryExample[];
  criterios?: DivisibilityCriterion[];
  [key: string]: unknown;
}

export interface ApplicationItem {
  area: string;
  description: string;
  example: string;
}

export interface StepByStepItem {
  instruction: string;
  hint?: string;
  answer: string;
}

export interface ChallengeOption {
  value: string;
  correct: boolean;
  explanation: string;
}

interface BaseExercise {
  id: string;
  difficulty?: ExerciseDifficulty;
}

export interface FlashcardExercise extends BaseExercise {
  type: 'flashcard';
  question: string;
  answer: string;
}

export interface StepByStepExercise extends BaseExercise {
  type: 'step_by_step';
  title: string;
  steps: StepByStepItem[];
}

export interface ChallengeExercise extends BaseExercise {
  type: 'challenge';
  title: string;
  problem: string;
  options?: ChallengeOption[];
  userInput?: boolean;
  expectedAnswer?: string;
}

export type Exercise = FlashcardExercise | StepByStepExercise | ChallengeExercise;

export interface SectionContent {
  theory: TheoryContent;
  para_que_sirve: {
    title: string;
    applications: ApplicationItem[];
  };
  exercises: Exercise[];
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  order: number;
  content: SectionContent;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: Difficulty;
  estimatedHours: number;
  icon?: string;
  sections: CourseSection[];
}
