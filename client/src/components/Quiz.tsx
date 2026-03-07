import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MathRenderer } from './MathRenderer';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface QuizQuestion {
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

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
  passingScore?: number;
  onComplete?: (score: number, totalQuestions: number) => void;
}

interface QuizResult {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  explanation: string;
}

/**
 * Quiz - Componente para cuestionarios de autoevaluación
 * 
 * Props:
 * - title: string - Título del cuestionario
 * - questions: QuizQuestion[] - Preguntas del quiz
 * - passingScore: number - Puntuación mínima para pasar (0-100)
 * - onComplete: function - Callback cuando se completa el quiz
 */
export function Quiz({ title, questions, passingScore = 70, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleSelectAnswer = (value: string) => {
    if (!submitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: value,
      });
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const newResults: QuizResult[] = questions.map((q) => {
      const userAnswer = selectedAnswers[q.id];
      const selectedOption = q.options.find(opt => opt.value === userAnswer);
      const correct = selectedOption?.correct || false;
      const explanation = selectedOption?.explanation || '';

      return {
        questionId: q.id,
        userAnswer,
        correct,
        explanation,
      };
    });

    setResults(newResults);
    setSubmitted(true);
    setShowResults(true);

    const score = Math.round((newResults.filter(r => r.correct).length / questions.length) * 100);
    onComplete?.(score, questions.length);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setResults([]);
    setShowResults(false);
  };

  if (showResults) {
    const correctAnswers = results.filter(r => r.correct).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= passingScore;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 max-[359px]:px-3">
        <Card className={`p-8 max-[359px]:p-4 mb-6 ${passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
          <div className="text-center mb-6">
            {passed ? (
              <AppIcon icon={CheckCircle2} size={64} colorClass="text-green-600 mx-auto mb-4" />
            ) : (
              <AppIcon icon={XCircle} size={64} colorClass="text-red-600 mx-auto mb-4" />
            )}
            <h2 className={`text-3xl max-[359px]:text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-red-800'}`}>
              {passed ? '¡Aprobaste!' : 'Necesitas mejorar'}
            </h2>
            <p className={`text-lg max-[359px]:text-base font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
              Puntuación: {score}% ({correctAnswers}/{questions.length} correctas)
            </p>
            {!passed && (
              <p className={`text-sm ${passed ? 'text-green-600' : 'text-red-600'}`}>
                Necesitabas {passingScore}% para pasar
              </p>
            )}
          </div>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl max-[359px]:text-lg font-bold text-gray-900">Resultados Detallados</h3>
          {questions.map((question, idx) => {
            const result = results[idx];
            const isCorrect = result.correct;

            return (
              <Card key={question.id} className={`p-4 ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                <div className="mb-3">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <AppIcon icon={CheckCircle2} size={20} colorClass="text-green-600 mt-1" />
                    ) : (
                      <AppIcon icon={XCircle} size={20} colorClass="text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-2">
                        Pregunta {idx + 1}: {question.question.includes('$') ? (
                          <MathRenderer latex={question.question} inline />
                        ) : (
                          question.question
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-8 space-y-2">
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">Tu respuesta:</p>
                    <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {question.options.find(opt => opt.value === result.userAnswer)?.label}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">Respuesta correcta:</p>
                      <p className="text-green-700">
                        {question.options.find(opt => opt.correct)?.label}
                      </p>
                    </div>
                  )}

                  <div className="text-sm bg-white p-3 rounded border border-gray-200">
                    <p className="font-medium text-gray-700 mb-1">Explicación:</p>
                    <p className="text-gray-600">{result.explanation}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={handleReset}
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <AppIcon icon={RotateCcw} size={16} colorClass="text-blue-100" />
          Intentar de Nuevo
        </Button>
      </div>
    );
  }

  if (submitted) {
    const selectedOption = currentQuestion.options.find(opt => opt.value === selectedAnswers[currentQuestion.id]);
    const isCorrect = selectedOption?.correct || false;

    return (
      <div className="w-full max-w-3xl mx-auto px-4 max-[359px]:px-3">
        <Card className={`p-8 max-[359px]:p-4 mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
          <div className="flex items-start gap-4 mb-4">
            {isCorrect ? (
              <AppIcon icon={CheckCircle2} size={32} colorClass="text-green-600" />
            ) : (
              <AppIcon icon={XCircle} size={32} colorClass="text-red-600" />
            )}
            <div className="flex-1">
              <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-gray-700 mb-3">{selectedOption?.explanation}</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Anterior
          </Button>

          {!isLastQuestion ? (
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              Ver Resultados
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 max-[359px]:px-3">
      <div className="mb-6">
        <h2 className="text-2xl max-[359px]:text-xl font-bold text-gray-900 mb-4">{title}</h2>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <Card className="p-8 max-[359px]:p-4 mb-6 bg-blue-50 border-2 border-blue-200">
        <h3 className="text-xl max-[359px]:text-lg font-semibold text-gray-900 mb-6">
          {currentQuestion.question.includes('$') ? (
            <MathRenderer latex={currentQuestion.question} />
          ) : (
            currentQuestion.question
          )}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelectAnswer(option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion.id] === option.value
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    selectedAnswers[currentQuestion.id] === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}
                />
                <span className="font-medium text-gray-900">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Anterior
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswers[currentQuestion.id]}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLastQuestion ? 'Finalizar Quiz' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
}
