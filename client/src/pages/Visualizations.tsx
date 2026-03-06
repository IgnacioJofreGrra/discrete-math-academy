import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import { VennDiagram } from '@/components/VennDiagram';
import { EuclidAlgorithm } from '@/components/EuclidAlgorithm';
import { FactorVisualization } from '@/components/FactorVisualization';

/**
 * Visualizations - Página con demostraciones visuales interactivas
 */
export default function Visualizations() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al Inicio
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Visualizaciones Interactivas</h1>
          <p className="text-lg text-gray-600">Explora conceptos matemáticos con demostraciones visuales</p>
        </div>

        {/* Visualizations Tabs */}
        <Tabs defaultValue="venn" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="venn">Diagramas de Venn</TabsTrigger>
            <TabsTrigger value="euclid">Algoritmo de Euclides</TabsTrigger>
            <TabsTrigger value="factors">Factorización</TabsTrigger>
          </TabsList>

          {/* Venn Diagrams */}
          <TabsContent value="venn" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Diagramas de Venn</h2>
              <p className="text-gray-700 mb-6">
                Los diagramas de Venn son representaciones visuales de conjuntos y sus relaciones.
                Aquí puedes ver cómo se visualizan diferentes operaciones entre conjuntos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Union Example */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Unión: A ∪ B</h3>
                  <VennDiagram
                    setA={['1', '2', '3', '4']}
                    setB={['3', '4', '5', '6']}
                    title="A ∪ B = {1, 2, 3, 4, 5, 6}"
                  />
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Todos los elementos que están en A o en B (o en ambos)
                  </p>
                </div>

                {/* Intersection Example */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Intersección: A ∩ B</h3>
                  <VennDiagram
                    setA={['1', '2', '3', '4']}
                    setB={['3', '4', '5', '6']}
                    title="A ∩ B = {3, 4}"
                  />
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Solo los elementos que están en A y en B simultáneamente
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Nota:</strong> Los diagramas de Venn son especialmente útiles para visualizar
                  relaciones entre conjuntos. Puedes ver cómo los elementos se distribuyen en diferentes
                  regiones según sus pertenencia a los conjuntos.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Euclid Algorithm */}
          <TabsContent value="euclid" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Algoritmo de Euclides</h2>
              <p className="text-gray-700 mb-6">
                El Algoritmo de Euclides es un método eficiente para encontrar el Máximo Común Divisor (MCD)
                de dos números. Ingresa dos números y observa cómo el algoritmo calcula el MCD paso a paso.
              </p>

              <EuclidAlgorithm initialA={48} initialB={18} />

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>¿Cómo funciona?</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Divide el número mayor por el menor</li>
                  <li>Reemplaza el mayor con el menor y el menor con el residuo</li>
                  <li>Repite hasta que el residuo sea 0</li>
                  <li>El MCD es el último divisor (cuando residuo = 0)</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          {/* Factorization */}
          <TabsContent value="factors" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Factorización en Primos</h2>
              <p className="text-gray-700 mb-6">
                Todo número entero mayor que 1 puede expresarse como producto de números primos.
                Ingresa un número para ver su factorización completa.
              </p>

              <FactorVisualization number={60} />

              <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Teorema Fundamental de la Aritmética:</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Todo número entero mayor que 1 se puede expresar de forma única (salvo el orden)
                  como producto de números primos. Esta es una de las propiedades más fundamentales
                  de los números enteros.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <Card className="mt-8 p-6 bg-white border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Aplicaciones en Ciencias de la Computación</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Criptografía:</strong> El algoritmo de Euclides es fundamental en RSA y otros sistemas criptográficos.
            </li>
            <li>
              <strong>Compresión de datos:</strong> La factorización en primos ayuda a optimizar algoritmos de compresión.
            </li>
            <li>
              <strong>Teoría de grafos:</strong> Los diagramas de Venn se usan para visualizar relaciones en grafos.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
