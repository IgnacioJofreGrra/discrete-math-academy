import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Zap, Target, Award } from 'lucide-react';
import { getAllModules, getTotalProgress, getCompletedModules, getCompletedExercises, getTotalExercises, getStreak } from '@/lib/courseData';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  progress?: number;
}

const modules: Module[] = [
  {
    id: 'module_0',
    title: 'Módulo 0: Desde 0 (Divisibilidad)',
    description: 'Aprende los fundamentos de divisibilidad, factorización en primos y fracciones irreducibles.',
    icon: '🔢',
    difficulty: 'beginner',
    estimatedHours: 8,
    progress: 0,
  },
  {
    id: 'module_1',
    title: 'Módulo 1: Principio del Buen Orden',
    description: 'Domina el PBO y las pruebas por absurdo, herramientas fundamentales de la matemática discreta.',
    icon: '📐',
    difficulty: 'intermediate',
    estimatedHours: 10,
    progress: 0,
  },
  {
    id: 'module_2',
    title: 'Módulo 2: Inducción Completa',
    description: 'Aprende inducción simple y fuerte, y cómo aplicarlas a relaciones de recurrencia.',
    icon: '🔗',
    difficulty: 'intermediate',
    estimatedHours: 12,
    progress: 0,
  },
  {
    id: 'module_3',
    title: 'Módulo 3: Conjuntos y Funciones',
    description: 'Explora la teoría de conjuntos, funciones inyectivas, sobreyectivas y biyectivas.',
    icon: '🎯',
    difficulty: 'intermediate',
    estimatedHours: 10,
    progress: 0,
  },
  {
    id: 'module_4',
    title: 'Módulo 4: Numerabilidad',
    description: 'Entiende cardinalidad, conjuntos numerables y el Problema de la Parada de Turing.',
    icon: '♾️',
    difficulty: 'advanced',
    estimatedHours: 8,
    progress: 0,
  },
  {
    id: 'module_5',
    title: 'Módulo 5: Principio del Palomar',
    description: 'Aprende a aplicar este principio fundamental en problemas de combinatoria.',
    icon: '🐦',
    difficulty: 'intermediate',
    estimatedHours: 6,
    progress: 0,
  },
];

const difficultyColors = {
  beginner: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800' },
  intermediate: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' },
  advanced: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800' },
};

const difficultyLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

/**
 * Home - Dashboard principal de la aplicación
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [stats, setStats] = useState({
    totalProgress: 0,
    completedModules: 0,
    completedExercises: 0,
    totalExercises: 0,
    streak: 0,
  });

  useEffect(() => {
    setStats({
      totalProgress: getTotalProgress(),
      completedModules: getCompletedModules(),
      completedExercises: getCompletedExercises(),
      totalExercises: getTotalExercises(),
      streak: getStreak(),
    });
  }, []);

  const allModules = getAllModules();
  const filteredModules = selectedDifficulty === 'all'
    ? allModules
    : allModules.filter((m: any) => m.difficulty === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-5xl">📚</span>
                Discrete Math Academy
              </h1>
              <p className="text-gray-600 mt-2">Aprende Matemática Discreta de forma interactiva</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{stats.totalProgress}%</div>
              <p className="text-sm text-gray-600">Progreso general</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 bg-white border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Módulos</p>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedModules}/{allModules.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Ejercicios</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedExercises}/{stats.totalExercises}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Racha</p>
                <p className="text-2xl font-bold text-gray-900">{stats.streak} días</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por dificultad:</h2>
          <div className="flex gap-3 flex-wrap">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <Button
                key={level}
                variant={selectedDifficulty === level ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty(level)}
                className="capitalize"
              >
                {level === 'all' ? 'Todos' : difficultyLabels[level]}
              </Button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module: any) => {
            const colors = difficultyColors[module.difficulty as keyof typeof difficultyColors];
            return (
              <Card
                key={module.id}
                className={`${colors.bg} border-2 ${colors.border} p-6 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() => setLocation(`/module/${module.id}`)}
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{module.icon}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${colors.badge}`}>
                      {difficultyLabels[module.difficulty as keyof typeof difficultyLabels]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{module.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">Progreso</span>
                      <span className="text-xs font-bold text-gray-900">{getTotalProgress()}%</span>
                    </div>
                    <Progress value={getTotalProgress() || 0} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>⏱️ {module.estimatedHours} horas estimadas</span>
                  </div>

                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(`/module/${module.id}`);
                    }}
                  >
                    Comenzar →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Visualizations CTA */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Explora Visualizaciones Interactivas</h2>
              <p className="text-purple-100">Aprende con diagramas de Venn, algoritmos animados y más</p>
            </div>
            <Button
              onClick={() => setLocation('/visualizations')}
              className="bg-white text-purple-600 hover:bg-purple-50"
            >
              Ir a Visualizaciones →
            </Button>
          </div>
        </div>

        {/* Statistics CTA */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analiza tu Progreso</h2>
              <p className="text-orange-100">Visualiza estadísticas, desbloquea badges y obtén recomendaciones personalizadas</p>
            </div>
            <Button
              onClick={() => setLocation('/statistics')}
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              Ver Estadísticas →
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bienvenido a Discrete Math Academy</h2>
          <p className="text-gray-700 mb-4">
            Esta aplicación interactiva te guiará a través de los conceptos fundamentales de la Matemática Discreta,
            desde divisibilidad y el Principio del Buen Orden, hasta inducción completa, teoría de conjuntos y más.
          </p>
          <p className="text-gray-700 mb-4">
            Cada módulo incluye:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
            <li><strong>Teoría:</strong> Explicaciones claras con definiciones y ejemplos</li>
            <li><strong>Aplicaciones:</strong> Casos de uso en ciencias de la computación</li>
            <li><strong>Ejercicios interactivos:</strong> Flashcards, demostraciones paso a paso y desafíos</li>
          </ul>
          <p className="text-gray-700 mt-4">
            ¡Comienza con el Módulo 0 si eres nuevo en el tema!
          </p>
        </div>
      </main>
    </div>
  );
}
