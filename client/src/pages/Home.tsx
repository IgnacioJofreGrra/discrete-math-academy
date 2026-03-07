import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Zap, Target, Award, Hash, Ruler, Link2, Infinity, Bird, Sigma, type LucideIcon } from 'lucide-react';
import { AppIcon } from '@/components/AppIcon';
import { getAllModules, getTotalProgress, getCompletedModules, getCompletedExercises, getTotalExercises, getStreak, touchStudyDay } from '@/lib/courseData';

const moduleIconMap: Record<string, LucideIcon> = {
  hash: Hash,
  ruler: Ruler,
  'link-2': Link2,
  target: Target,
  infinity: Infinity,
  bird: Bird,
};

const moduleIconColorMap: Record<string, string> = {
  hash: 'text-blue-600',
  ruler: 'text-emerald-600',
  'link-2': 'text-violet-600',
  target: 'text-amber-600',
  infinity: 'text-pink-600',
  bird: 'text-orange-600',
};

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
    // Register a study day once per date.
    touchStudyDay();

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
        <div className="max-w-7xl mx-auto px-4 py-6 max-[359px]:px-3 max-[359px]:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl max-[359px]:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <AppIcon icon={Sigma} size={44} colorClass="text-blue-600" className="max-[359px]:w-8 max-[359px]:h-8" />
                DiscreMath
              </h1>
              <p className="text-gray-600 mt-2 max-[359px]:text-sm">Aprende Matemática Discreta de forma interactiva</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl max-[359px]:text-2xl font-bold text-blue-600">{stats.totalProgress}%</div>
              <p className="text-sm text-gray-600">Progreso general</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 max-[359px]:px-3 max-[359px]:py-8">
        {/* Welcome Section */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-8 max-[359px]:p-4 border-l-4 border-blue-500">
          <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-4">Bienvenido a DiscreMath</h2>
          <p className="text-gray-700 max-[359px]:text-sm mb-4">
            Esta aplicación interactiva te guiará a través de los conceptos fundamentales de la Matemática Discreta,
            desde divisibilidad y el Principio del Buen Orden, hasta inducción completa, teoría de conjuntos y más.
          </p>
          <p className="text-gray-700 max-[359px]:text-sm mb-4">
            Cada módulo incluye:
          </p>
          <ul className="list-disc list-inside space-y-2 max-[359px]:space-y-1 text-gray-700 max-[359px]:text-sm ml-2">
            <li><strong>Teoría:</strong> Explicaciones claras con definiciones y ejemplos</li>
            <li><strong>Aplicaciones:</strong> Casos de uso en ciencias de la computación</li>
            <li><strong>Ejercicios interactivos:</strong> Flashcards, demostraciones paso a paso y desafíos</li>
          </ul>
          <p className="text-gray-700 max-[359px]:text-sm mt-4">
            ¡Comienza con el Módulo 0 si eres nuevo en el tema!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={BookOpen} colorClass="text-blue-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Módulos</p>
                <p className="text-2xl max-[359px]:text-xl font-bold text-gray-900">{allModules.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Target} colorClass="text-green-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Completados</p>
                <p className="text-2xl max-[359px]:text-xl font-bold text-gray-900">{stats.completedModules}/{allModules.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Zap} colorClass="text-purple-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Ejercicios</p>
                <p className="text-2xl max-[359px]:text-xl font-bold text-gray-900">{stats.completedExercises}/{stats.totalExercises}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Award} colorClass="text-orange-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Racha</p>
                <p className="text-2xl max-[359px]:text-xl font-bold text-gray-900">{stats.streak} días</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <h2 className="text-lg max-[359px]:text-base font-semibold text-gray-900 mb-4">Filtrar por dificultad:</h2>
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
            const moduleIcon = moduleIconMap[module.icon] ?? BookOpen;
            const moduleIconColor = moduleIconColorMap[module.icon] ?? 'text-blue-600';
            return (
              <Card
                key={module.id}
                className={`${colors.bg} border-2 ${colors.border} p-6 max-[359px]:p-4 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() => setLocation(`/module/${module.id}`)}
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <AppIcon
                      icon={moduleIcon}
                      size={34}
                      colorClass={moduleIconColor}
                      className="max-[359px]:w-7 max-[359px]:h-7"
                    />
                    <span className={`px-2 py-1 max-[359px]:px-1.5 max-[359px]:py-0.5 rounded text-xs max-[359px]:text-[11px] font-semibold ${colors.badge}`}>
                      {difficultyLabels[module.difficulty as keyof typeof difficultyLabels]}
                    </span>
                  </div>
                  <h3 className="text-lg max-[359px]:text-base font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-sm max-[359px]:text-xs text-gray-700 mb-4">{module.description}</p>
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
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-8 max-[359px]:p-4 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:max-w-[70%]">
              <h2 className="text-2xl max-[359px]:text-lg font-bold mb-2">Explora Visualizaciones Interactivas</h2>
              <p className="text-purple-100 max-[359px]:text-sm">Aprende con diagramas de Venn, algoritmos animados y más</p>
            </div>
            <Button
              onClick={() => setLocation('/visualizations')}
              className="w-full sm:w-auto whitespace-normal text-center bg-white text-purple-600 hover:bg-purple-50"
            >
              Ir a Visualizaciones →
            </Button>
          </div>
        </div>

        {/* Statistics CTA */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md p-8 max-[359px]:p-4 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:max-w-[70%]">
              <h2 className="text-2xl max-[359px]:text-lg font-bold mb-2">Analiza tu Progreso</h2>
              <p className="text-orange-100 max-[359px]:text-sm">Visualiza estadísticas, desbloquea badges y obtén recomendaciones personalizadas</p>
            </div>
            <Button
              onClick={() => setLocation('/statistics')}
              className="w-full sm:w-auto whitespace-normal text-center bg-white text-orange-600 hover:bg-orange-50"
            >
              Ver Estadísticas →
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
}
