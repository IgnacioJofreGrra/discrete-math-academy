import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MathRenderer } from './MathRenderer';

interface FactorVisualizationProps {
  number?: number;
}

/**
 * FactorVisualization - Componente para visualizar la factorización en primos
 * 
 * Props:
 * - number: number - Número a factorizar
 */
export function FactorVisualization({ number = 60 }: FactorVisualizationProps) {
  const [inputNumber, setInputNumber] = useState(number);
  const [factors, setFactors] = useState<number[]>([]);
  const [factorization, setFactorization] = useState<{ prime: number; count: number }[]>([]);

  const factorize = (n: number) => {
    if (n < 2) return;

    const newFactors: number[] = [];
    let temp = n;

    for (let i = 2; i * i <= temp; i++) {
      while (temp % i === 0) {
        newFactors.push(i);
        temp /= i;
      }
    }
    if (temp > 1) {
      newFactors.push(temp);
    }

    setFactors(newFactors);

    // Count occurrences
    const factorMap = new Map<number, number>();
    newFactors.forEach(f => {
      factorMap.set(f, (factorMap.get(f) || 0) + 1);
    });

    const factorArray = Array.from(factorMap.entries())
      .map(([prime, count]) => ({ prime, count }))
      .sort((a, b) => a.prime - b.prime);

    setFactorization(factorArray);
  };

  const getLatexFactorization = () => {
    if (factorization.length === 0) return '';
    return factorization
      .map(({ prime, count }) => (count > 1 ? `${prime}^${count}` : prime.toString()))
      .join(' \\times ');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 max-[359px]:px-3">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factorización en Primos</h3>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(parseInt(e.target.value) || 0)}
            placeholder="Ingresa un número"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={() => factorize(inputNumber)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Factorizar
          </Button>
        </div>
      </div>

      {factors.length > 0 && (
        <div className="space-y-4">
          {/* Factors List */}
          <Card className="p-6 max-[359px]:p-4 bg-blue-50 border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-3">Factores primos encontrados:</p>
            <div className="flex flex-wrap gap-2">
              {factors.map((factor, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold"
                >
                  {factor}
                </span>
              ))}
            </div>
          </Card>

          {/* Factorization */}
          <Card className="p-6 max-[359px]:p-4 bg-green-50 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-3">Factorización:</p>
            <div className="text-center">
              <p className="text-lg max-[359px]:text-base text-gray-900 mb-2">
                {inputNumber} = {factors.join(' × ')}
              </p>
              {getLatexFactorization() && (
                <div className="mt-3">
                  <MathRenderer latex={`${inputNumber} = ${getLatexFactorization()}`} />
                </div>
              )}
            </div>
          </Card>

          {/* Factorization Summary */}
          <Card className="p-6 max-[359px]:p-4">
            <p className="text-sm text-gray-600 mb-3">Resumen:</p>
            <div className="space-y-2">
              {factorization.map(({ prime, count }) => (
                <div key={prime} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium text-gray-900">
                    {prime}
                    {count > 1 && <sup className="text-sm">{count}</sup>}
                  </span>
                  <span className="text-sm text-gray-600">aparece {count} vez{count > 1 ? 'es' : ''}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Verification */}
          <Card className="p-6 max-[359px]:p-4 bg-purple-50 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-2">Verificación:</p>
            <p className="text-center text-lg max-[359px]:text-base font-semibold text-purple-800">
              {factors.reduce((a, b) => a * b, 1)} = {inputNumber} ✓
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
