import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw } from 'lucide-react';

interface EuclidStep {
  a: number;
  b: number;
  q: number;
  r: number;
  explanation: string;
}

interface EuclidAlgorithmProps {
  initialA?: number;
  initialB?: number;
}

/**
 * EuclidAlgorithm - Componente para visualizar el Algoritmo de Euclides paso a paso
 * 
 * Props:
 * - initialA: number - Primer número
 * - initialB: number - Segundo número
 */
export function EuclidAlgorithm({ initialA = 48, initialB = 18 }: EuclidAlgorithmProps) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [steps, setSteps] = useState<EuclidStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [gcd, setGcd] = useState<number | null>(null);

  const calculateGCD = () => {
    const newSteps: EuclidStep[] = [];
    let tempA = Math.max(a, b);
    let tempB = Math.min(a, b);

    while (tempB !== 0) {
      const q = Math.floor(tempA / tempB);
      const r = tempA % tempB;
      newSteps.push({
        a: tempA,
        b: tempB,
        q,
        r,
        explanation: `${tempA} = ${tempB} × ${q} + ${r}`,
      });
      tempA = tempB;
      tempB = r;
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setGcd(tempA);
  };

  const reset = () => {
    setSteps([]);
    setCurrentStep(0);
    setGcd(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Algoritmo de Euclides</h3>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número A</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(parseInt(e.target.value) || 0)}
              disabled={steps.length > 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número B</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(parseInt(e.target.value) || 0)}
              disabled={steps.length > 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={calculateGCD}
            disabled={steps.length > 0}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Play className="w-4 h-4" />
            Calcular MCD
          </Button>
          {steps.length > 0 && (
            <Button
              onClick={reset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </Button>
          )}
        </div>
      </div>

      {/* Steps Display */}
      {steps.length > 0 && (
        <div className="space-y-4">
          {/* Current Step */}
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Paso {currentStep + 1} de {steps.length}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].explanation}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded border border-gray-300">
                  <p className="text-xs text-gray-600">a</p>
                  <p className="text-lg font-bold text-gray-900">{steps[currentStep].a}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-300">
                  <p className="text-xs text-gray-600">b</p>
                  <p className="text-lg font-bold text-gray-900">{steps[currentStep].b}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-300">
                  <p className="text-xs text-gray-600">q</p>
                  <p className="text-lg font-bold text-gray-900">{steps[currentStep].q}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-300">
                  <p className="text-xs text-gray-600">r</p>
                  <p className="text-lg font-bold text-gray-900">{steps[currentStep].r}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-2 justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              variant="outline"
            >
              Siguiente
            </Button>
          </div>

          {/* Result */}
          {currentStep === steps.length - 1 && gcd !== null && (
            <Card className="p-6 bg-green-50 border-2 border-green-200">
              <p className="text-center text-lg font-semibold text-green-800">
                MCD({a}, {b}) = {gcd}
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
