import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineMathText } from './InlineMathText';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Step {
  instruction: string;
  hint?: string;
  answer: string;
}

interface StepByStepProps {
  title: string;
  steps: Step[];
  onComplete?: () => void;
}

/**
 * StepByStep - Componente para demostraciones guiadas paso a paso
 * 
 * Props:
 * - title: string - Título del ejercicio
 * - steps: Step[] - Array de pasos con instrucción, pista y respuesta
 * - onComplete: function - Callback cuando se completa el ejercicio
 */
export function StepByStep({ title, steps, onComplete }: StepByStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(steps.length).fill(''));
  const [userInput, setUserInput] = useState('');

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserInput('');
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserInput(userAnswers[currentStep - 1]);
    }
  };

  const handleSubmitAnswer = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentStep] = userInput;
    setUserAnswers(newAnswers);
    setShowAnswer(true);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Paso {currentStep + 1} de {steps.length}
        </p>
      </div>

      <Card className="p-8 mb-6 border-2 border-blue-100 bg-blue-50">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            <InlineMathText text={step.instruction} />
          </h3>
        </div>

        {/* Input Area */}
        <div className="mb-6">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitAnswer();
              }
            }}
          />
        </div>

        {/* Hint Button */}
        {step.hint && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="w-full"
            >
              {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
            </Button>
            {showHint && (
              <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <InlineMathText text={step.hint} />
                </p>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmitAnswer}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
        >
          Enviar Respuesta
        </Button>

        {/* Answer Display */}
        {showAnswer && (
          <div className={`p-4 rounded-lg border-2 ${
            userInput.toLowerCase().trim() === step.answer.toLowerCase().trim()
              ? 'bg-green-50 border-green-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-start gap-3">
              {userInput.toLowerCase().trim() === step.answer.toLowerCase().trim() ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className="font-semibold text-gray-900 mb-2">Respuesta esperada:</p>
                <div className="text-gray-800">
                  <p>
                    <InlineMathText text={step.answer} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <Button
          size="lg"
          onClick={handleNext}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLastStep ? 'Completar' : 'Siguiente'}
          {!isLastStep && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
