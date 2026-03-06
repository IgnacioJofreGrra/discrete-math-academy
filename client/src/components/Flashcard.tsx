import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineMathText } from './InlineMathText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardProps {
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  onNext?: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

/**
 * Flashcard - Componente interactivo de tarjeta de estudio
 * 
 * Props:
 * - question: string - La pregunta a mostrar
 * - answer: string - La respuesta (mostrada al voltear)
 * - difficulty: string - Nivel de dificultad (easy, medium, hard)
 * - onNext: function - Callback para ir a la siguiente tarjeta
 * - onPrevious: function - Callback para ir a la tarjeta anterior
 * - canGoNext: boolean - Si se puede ir a la siguiente
 * - canGoPrevious: boolean - Si se puede ir a la anterior
 */
export function Flashcard({
  question,
  answer,
  difficulty = 'easy',
  onNext,
  onPrevious,
  canGoNext = true,
  canGoPrevious = true,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    hard: 'bg-red-50 border-red-200',
  };

  const difficultyBadgeColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-4 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyBadgeColors[difficulty]}`}>
          {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'}
        </span>
      </div>

      <Card
        className={`${difficultyColors[difficulty]} cursor-pointer transition-all duration-300 transform hover:scale-105 min-h-96 flex flex-col justify-center items-center p-8 border-2`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4 uppercase tracking-wide">
            {isFlipped ? 'Respuesta' : 'Pregunta'}
          </p>
          <div className="mb-6">
            {isFlipped ? (
              <div className="text-lg text-gray-800">
                <p>
                  <InlineMathText text={answer} />
                </p>
              </div>
            ) : (
              <div className="text-2xl font-semibold text-gray-900">
                <p>
                  <InlineMathText text={question} />
                </p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">Haz clic para voltear</p>
        </div>
      </Card>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1"
        >
          {isFlipped ? 'Ver Pregunta' : 'Ver Respuesta'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
