import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineMathText } from './InlineMathText';
import { CheckCircle2, XCircle } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface ChallengeOption {
  value: string;
  correct: boolean;
  explanation: string;
}

interface ChallengeProps {
  title: string;
  problem: string;
  options?: ChallengeOption[];
  userInput?: boolean;
  expectedAnswer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  onComplete?: (correct: boolean) => void;
}

/**
 * Challenge - Componente para ejercicios de desafío
 * 
 * Props:
 * - title: string - Título del desafío
 * - problem: string - Enunciado del problema
 * - options: ChallengeOption[] - Opciones de respuesta (si no es userInput)
 * - userInput: boolean - Si el usuario debe ingresar la respuesta
 * - expectedAnswer: string - Respuesta esperada (para userInput)
 * - difficulty: string - Nivel de dificultad
 * - onComplete: function - Callback cuando se completa el desafío
 */
export function Challenge({
  title,
  problem,
  options,
  userInput = false,
  expectedAnswer,
  difficulty = 'medium',
  onComplete,
}: ChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-50 border-green-200',
    medium: 'bg-blue-50 border-blue-200',
    hard: 'bg-red-50 border-red-200',
  };

  const difficultyBadgeColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-blue-100 text-blue-800',
    hard: 'bg-red-100 text-red-800',
  };

  const handleSelectOption = (value: string) => {
    if (!submitted) {
      setSelectedOption(value);
    }
  };

  const handleSubmit = () => {
    let wasCorrect = false;

    if (userInput) {
      wasCorrect = userAnswer.toLowerCase().trim() === expectedAnswer?.toLowerCase().trim();
    } else if (selectedOption) {
      const option = options?.find(opt => opt.value === selectedOption);
      wasCorrect = option?.correct || false;
    }

    setIsCorrect(wasCorrect);
    setSubmitted(true);
    onComplete?.(wasCorrect);
  };

  const selectedOptionData = options?.find(opt => opt.value === selectedOption);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 max-[359px]:px-3">
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl max-[359px]:text-xl font-bold text-gray-900">{title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyBadgeColors[difficulty]}`}>
            {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'}
          </span>
        </div>
      </div>

      <Card className={`${difficultyColors[difficulty]} p-8 max-[359px]:p-4 mb-6 border-2`}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Problema:</h3>
          <div className="text-gray-800">
            <p className="text-lg max-[359px]:text-base">
              <InlineMathText text={problem} />
            </p>
          </div>
        </div>

        {/* Multiple Choice Options */}
        {!userInput && options && (
          <div className="space-y-3 mb-6">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                disabled={submitted}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedOption === option.value
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                } ${submitted && option.correct ? 'border-green-500 bg-green-100' : ''} ${
                  submitted && selectedOption === option.value && !option.correct
                    ? 'border-red-500 bg-red-100'
                    : ''
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 ${
                      selectedOption === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{option.value}</p>
                    {submitted && (
                      <p className="text-sm text-gray-700 mt-2">{option.explanation}</p>
                    )}
                  </div>
                  {submitted && option.correct && (
                    <AppIcon icon={CheckCircle2} size={20} colorClass="text-green-600" />
                  )}
                  {submitted && selectedOption === option.value && !option.correct && (
                    <AppIcon icon={XCircle} size={20} colorClass="text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* User Input */}
        {userInput && (
          <div className="mb-6">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              disabled={submitted}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !submitted) {
                  handleSubmit();
                }
              }}
            />
            {submitted && (
              <div className={`mt-3 p-4 rounded-lg border-2 ${
                isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <p className="font-semibold text-gray-900 mb-2">
                  Respuesta esperada: {expectedAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        {!submitted && (
          <Button
            onClick={handleSubmit}
            disabled={userInput ? !userAnswer : !selectedOption}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            Enviar Respuesta
          </Button>
        )}

        {/* Result Message */}
        {submitted && (
          <div className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
            isCorrect
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            {isCorrect ? (
              <>
                <AppIcon icon={CheckCircle2} size={24} colorClass="text-green-600" />
                <p className="font-semibold text-green-800">¡Correcto! Excelente trabajo.</p>
              </>
            ) : (
              <>
                <AppIcon icon={XCircle} size={24} colorClass="text-red-600" />
                <p className="font-semibold text-red-800">Incorrecto. Intenta de nuevo.</p>
              </>
            )}
          </div>
        )}
      </Card>

      {submitted && (
        <Button
          onClick={() => {
            setSubmitted(false);
            setSelectedOption(null);
            setUserAnswer('');
          }}
          variant="outline"
          className="w-full"
        >
          Intentar de Nuevo
        </Button>
      )}
    </div>
  );
}
