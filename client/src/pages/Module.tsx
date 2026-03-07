import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathRenderer } from '@/components/MathRenderer';
import { Flashcard } from '@/components/Flashcard';
import { StepByStep } from '@/components/StepByStep';
import { Challenge } from '@/components/Challenge';
import { Quiz } from '@/components/Quiz';
import { getModuleById, markExerciseCompleted } from '@/lib/courseData';
import { ChevronLeft, BookOpen, Lightbulb, Zap, ClipboardCheck } from 'lucide-react';
import { AppIcon } from '@/components/AppIcon';
import { InlineMathText } from '@/components/InlineMathText';

interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  content: {
    theory: {
      definition: string;
      examples?: Array<{ text: string; latex: string }>;
      [key: string]: any;
    };
    para_que_sirve: {
      title: string;
      applications: Array<{
        area: string;
        description: string;
        example: string;
      }>;
    };
    exercises: Array<{
      id: string;
      type: 'flashcard' | 'step_by_step' | 'challenge';
      [key: string]: any;
    }>;
  };
}

interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    correct: boolean;
    explanation: string;
  }>;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Module - Página que muestra un módulo completo con secciones y ejercicios
 */
export default function Module() {
  const { moduleId } = useParams();
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);
  const [exerciseType, setExerciseType] = useState<'theory' | 'application' | 'exercises' | 'exam'>('theory');

  const normalizedModuleId = useMemo(() => {
    if (!moduleId) return '';
    try {
      return decodeURIComponent(moduleId);
    } catch {
      return moduleId;
    }
  }, [moduleId]);

  const module = getModuleById(normalizedModuleId) as any;

  useEffect(() => {
    // Reset UI state when changing module route.
    setActiveSection(0);
    setActiveExercise(0);
    setExerciseType('theory');
  }, [normalizedModuleId]);

  if (!module || !Array.isArray(module.sections) || module.sections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 max-[359px]:p-3">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-6 flex items-center gap-2"
          >
            <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
            Volver al Inicio
          </Button>
          <Card className="p-8 max-[359px]:p-4 text-center">
            <p className="text-gray-600">Módulo no encontrado</p>
          </Card>
        </div>
      </div>
    );
  }

  const sectionIndex = Math.min(activeSection, module.sections.length - 1);
  const section: Section = module.sections[sectionIndex];
  const exercise = section?.content?.exercises?.[activeExercise];

  const sectionExercises = useMemo(() => {
    return Array.isArray(section?.content?.exercises) ? section.content.exercises : [];
  }, [section]);

  const examQuestions = useMemo<GeneratedQuizQuestion[]>(() => {
    const fallbackDistractors = [
      'Se verifica unicamente con la ultima cifra del numero.',
      'Solo depende de que la suma de cifras sea un numero par.',
      'Basta con que el numero sea mayor que el divisor.',
    ];

    const extractPrimaryAnswer = (item: any): string | null => {
      if (item?.type === 'flashcard' && typeof item.answer === 'string') {
        return item.answer.trim();
      }

      if (item?.type === 'step_by_step' && Array.isArray(item.steps) && item.steps.length > 0) {
        const lastStepAnswer = item.steps[item.steps.length - 1]?.answer;
        return typeof lastStepAnswer === 'string' ? lastStepAnswer.trim() : null;
      }

      if (item?.type === 'challenge') {
        if (Array.isArray(item.options) && item.options.length > 0) {
          const correctOption = item.options.find((option: any) => option?.correct);
          if (correctOption?.value != null) {
            return String(correctOption.value).trim();
          }
        }

        if (typeof item.expectedAnswer === 'string') {
          return item.expectedAnswer.trim();
        }
      }

      return null;
    };

    const answerPool = Array.from(
      new Set(
        sectionExercises
          .map(extractPrimaryAnswer)
          .filter((value): value is string => Boolean(value)),
      ),
    );

    return sectionExercises
      .map((item, index): GeneratedQuizQuestion | null => {
        const baseQuestion =
          typeof item.question === 'string'
            ? item.question
            : typeof item.problem === 'string'
              ? item.problem
              : typeof item.title === 'string'
                ? item.title
                : null;

        if (!baseQuestion) {
          return null;
        }

        let correctLabel: string | null = null;
        let optionBlueprint: Array<{ label: string; correct: boolean; explanation: string }> = [];

        if (item.type === 'flashcard' && typeof item.answer === 'string') {
          correctLabel = item.answer.trim();
        }

        if (item.type === 'step_by_step' && Array.isArray(item.steps) && item.steps.length > 0) {
          const finalAnswer = item.steps[item.steps.length - 1]?.answer;
          if (typeof finalAnswer === 'string') {
            correctLabel = finalAnswer.trim();
          }
        }

        if (item.type === 'challenge' && Array.isArray(item.options) && item.options.length > 1) {
          const challengeOptions = item.options
            .map((option: any) => ({
              label: option?.value != null ? String(option.value) : '',
              correct: Boolean(option?.correct),
              explanation:
                typeof option?.explanation === 'string'
                  ? option.explanation
                  : option?.correct
                    ? 'Correcto. Esta es la respuesta esperada para el desafio.'
                    : 'Incorrecto. Esa alternativa no satisface el desafio.',
            }))
            .filter((option: any) => option.label.trim().length > 0);

          if (challengeOptions.some((option: any) => option.correct)) {
            optionBlueprint = challengeOptions;
          }
        }

        if (!optionBlueprint.length && item.type === 'challenge' && typeof item.expectedAnswer === 'string') {
          correctLabel = item.expectedAnswer.trim();
        }

        if (!optionBlueprint.length) {
          if (!correctLabel) {
            return null;
          }

          const candidateDistractors = answerPool.filter((value) => value !== correctLabel);
          const rotateFrom = candidateDistractors.length > 0 ? index % candidateDistractors.length : 0;
          const rotatedPool = [
            ...candidateDistractors.slice(rotateFrom),
            ...candidateDistractors.slice(0, rotateFrom),
          ];

          const distractors = rotatedPool.slice(0, 2);

          for (const fallback of fallbackDistractors) {
            if (distractors.length >= 2) break;
            if (fallback !== correctLabel && !distractors.includes(fallback)) {
              distractors.push(fallback);
            }
          }

          optionBlueprint = [
            {
              label: correctLabel,
              correct: true,
              explanation: 'Correcto. Esta es la respuesta esperada para el enunciado.',
            },
            ...distractors.map((distractor) => ({
              label: distractor,
              correct: false,
              explanation: 'Incorrecto. Ese enunciado corresponde a otra regla o no aplica aqui.',
            })),
          ];
        }

        const optionRotateFrom = index % optionBlueprint.length;
        const orderedOptions = [
          ...optionBlueprint.slice(optionRotateFrom),
          ...optionBlueprint.slice(0, optionRotateFrom),
        ];

        const questionPrompt =
          item.type === 'step_by_step' && typeof item.title === 'string'
            ? `En "${item.title}", cual es el resultado final correcto?`
            : baseQuestion;

        return {
          id: `exam_${item.id}`,
          question: questionPrompt,
          options: orderedOptions.map((option, optionIndex) => ({
            value: String.fromCharCode(97 + optionIndex),
            label: option.label,
            correct: option.correct,
            explanation: option.explanation,
          })),
          difficulty: item.difficulty,
        };
      })
      .filter((question): question is GeneratedQuizQuestion => Boolean(question));
  }, [sectionExercises]);

  useEffect(() => {
    if (exerciseType !== 'exercises') return;
    const currentExercise = section?.content?.exercises?.[activeExercise];
    if (!currentExercise?.id || !normalizedModuleId) return;

    // Persist progress as soon as the learner reaches an exercise.
    markExerciseCompleted(normalizedModuleId, currentExercise.id);
  }, [exerciseType, activeExercise, section, normalizedModuleId]);

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 max-[359px]:p-3">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-6 flex items-center gap-2"
          >
            <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
            Volver al Inicio
          </Button>
          <Card className="p-8 max-[359px]:p-4 text-center">
            <p className="text-gray-600">Módulo no encontrado</p>
          </Card>
        </div>
      </div>
    );
  }

  const renderExercise = () => {
    if (!exercise) return null;

    switch (exercise.type) {
      case 'flashcard':
        return (
          <Flashcard
            question={exercise.question}
            answer={exercise.answer}
            difficulty={exercise.difficulty}
            canGoNext={activeExercise < section.content.exercises.length - 1}
            canGoPrevious={activeExercise > 0}
            onNext={() => setActiveExercise(activeExercise + 1)}
            onPrevious={() => setActiveExercise(activeExercise - 1)}
          />
        );
      case 'step_by_step':
        return (
          <StepByStep
            title={exercise.title}
            steps={exercise.steps}
            onComplete={() => {
              if (activeExercise < section.content.exercises.length - 1) {
                setActiveExercise(activeExercise + 1);
              }
            }}
          />
        );
      case 'challenge':
        return (
          <Challenge
            title={exercise.title}
            problem={exercise.problem}
            options={exercise.options}
            userInput={exercise.userInput}
            expectedAnswer={exercise.expectedAnswer}
            difficulty={exercise.difficulty}
            onComplete={() => {
              if (activeExercise < section.content.exercises.length - 1) {
                setActiveExercise(activeExercise + 1);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-4 max-[359px]:p-3">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4 flex items-center gap-2"
          >
            <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
            Volver al Inicio
          </Button>
          <div className="mb-4">
            <h1 className="text-4xl max-[359px]:text-2xl font-bold text-gray-900 mb-2">{module.title}</h1>
            <p className="text-lg max-[359px]:text-sm text-gray-600">{module.description}</p>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {module.sections.map((sec: Section, idx: number) => (
              <Button
                key={sec.id}
                variant={activeSection === idx ? 'default' : 'outline'}
                onClick={() => {
                  setActiveSection(idx);
                  setActiveExercise(0);
                  setExerciseType('theory');
                }}
                className="whitespace-nowrap"
              >
                {sec.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-[359px]:gap-4">
          {/* Left Sidebar - Section Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 max-[359px]:p-4 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-sm text-gray-600 mb-6">{section.description}</p>

              <div className="space-y-3">
                <Button
                  variant={exerciseType === 'theory' ? 'default' : 'outline'}
                  onClick={() => setExerciseType('theory')}
                  className="w-full justify-start gap-2"
                >
                  <AppIcon icon={BookOpen} size={16} colorClass="text-blue-600" />
                  Teoría
                </Button>
                <Button
                  variant={exerciseType === 'application' ? 'default' : 'outline'}
                  onClick={() => setExerciseType('application')}
                  className="w-full justify-start gap-2"
                >
                  <AppIcon icon={Lightbulb} size={16} colorClass="text-emerald-600" />
                  Aplicaciones
                </Button>
                <Button
                  variant={exerciseType === 'exercises' ? 'default' : 'outline'}
                  onClick={() => setExerciseType('exercises')}
                  className="w-full justify-start gap-2"
                >
                  <AppIcon icon={Zap} size={16} colorClass="text-violet-600" />
                  Ejercicios ({section.content.exercises.length})
                </Button>
                <Button
                  variant={exerciseType === 'exam' ? 'default' : 'outline'}
                  onClick={() => setExerciseType('exam')}
                  className="w-full justify-start gap-2"
                  disabled={examQuestions.length === 0}
                >
                  <AppIcon icon={ClipboardCheck} size={16} colorClass="text-amber-600" />
                  Examen ({examQuestions.length})
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Content - Main Area */}
          <div className="lg:col-span-2">
            {exerciseType === 'theory' && (
              <Card className="p-8 max-[359px]:p-4">
                <h3 className="text-2xl max-[359px]:text-xl font-bold text-gray-900 mb-6">Teoría</h3>
                <div className="prose prose-sm max-w-none">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Definición:</h4>
                    <div className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p>
                        <InlineMathText text={section.content.theory.definition} />
                      </p>
                    </div>
                  </div>

                  {section.content.theory.examples && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Ejemplos:</h4>
                      <div className="space-y-3">
                        {section.content.theory.examples.map((example: any, idx: number) => (
                          <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700 mb-2">
                              <InlineMathText text={example.text} />
                            </p>
                            {example.latex && <MathRenderer latex={example.latex} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.content.theory.criterios && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Criterios de divisibilidad:</h4>
                      <div className="space-y-3">
                        {section.content.theory.criterios.map((item: any) => (
                          <div key={item.divisor} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                            <p className="text-gray-800 font-semibold mb-1">Divisor {item.divisor}</p>
                            <p className="text-gray-700">
                              <InlineMathText text={item.criterion} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {exerciseType === 'application' && (
              <Card className="p-8 max-[359px]:p-4">
                <h3 className="text-2xl max-[359px]:text-xl font-bold text-gray-900 mb-6">¿Para qué sirve?</h3>
                <div className="space-y-6">
                  {section.content.para_que_sirve.applications.map((app: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-green-500 pl-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{app.area}</h4>
                      <p className="text-gray-700 mb-3">
                        <InlineMathText text={app.description} />
                      </p>
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Ejemplo:</span>{' '}
                          <InlineMathText text={app.example} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {exerciseType === 'exercises' && (
              <div>
                {renderExercise()}
                
                {/* Exercise Counter */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  Ejercicio {activeExercise + 1} de {section.content.exercises.length}
                </div>
              </div>
            )}

            {exerciseType === 'exam' && (
              examQuestions.length > 0 ? (
                <Quiz
                  title={`Examen de ${section.title}`}
                  questions={examQuestions}
                  passingScore={70}
                />
              ) : (
                <Card className="p-8 max-[359px]:p-4 text-center">
                  <p className="text-gray-600">Esta seccion todavia no tiene preguntas para el examen.</p>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
