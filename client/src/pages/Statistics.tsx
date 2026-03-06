import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, TrendingUp, Target, Zap, Award } from 'lucide-react';
import { getAllModules, getTotalProgress, getCompletedModules, getCompletedExercises, getTotalExercises, getStreak } from '@/lib/courseData';
import { getBadges, isBadgeUnlocked, getUnlockedBadgesCount } from '@/lib/badges';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * Statistics - Página de estadísticas avanzadas con gráficos y recomendaciones
 */
export default function Statistics() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState({
    totalProgress: 0,
    completedModules: 0,
    completedExercises: 0,
    totalExercises: 0,
    streak: 0,
    unlockedBadges: 0,
    totalBadges: 0,
  });

  const [progressData, setProgressData] = useState<any[]>([]);
  const [difficultyData, setDifficultyData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const allModules = getAllModules();
    const completedModules = getCompletedModules();
    const completedExercises = getCompletedExercises();
    const totalExercises = getTotalExercises();
    const unlockedBadges = getUnlockedBadgesCount();

    setStats({
      totalProgress: getTotalProgress(),
      completedModules,
      completedExercises,
      totalExercises,
      streak: getStreak(),
      unlockedBadges,
      totalBadges: Object.keys(getBadges()).length,
    });

    // Generate progress data (simulated)
    const progressChartData = allModules.map(m => ({
      name: m.title.split(':')[0],
      progress: Math.floor(Math.random() * 100),
    }));
    setProgressData(progressChartData);

    // Generate difficulty data
    const difficultyMap = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    allModules.forEach(m => {
      if (m.difficulty === 'beginner') difficultyMap.beginner++;
      else if (m.difficulty === 'intermediate') difficultyMap.intermediate++;
      else if (m.difficulty === 'advanced') difficultyMap.advanced++;
    });

    const difficultyChartData = [
      { name: 'Principiante', value: difficultyMap.beginner, fill: '#10b981' },
      { name: 'Intermedio', value: difficultyMap.intermediate, fill: '#3b82f6' },
      { name: 'Avanzado', value: difficultyMap.advanced, fill: '#f59e0b' },
    ];
    setDifficultyData(difficultyChartData);

    // Generate recommendations
    const recs: string[] = [];
    const currentStreak = getStreak();
    if (completedModules === 0) {
      recs.push('Comienza con el Módulo 0 para entender los fundamentos de divisibilidad.');
    }
    if (completedExercises < 5) {
      recs.push('Resuelve más ejercicios para consolidar tu comprensión. Intenta con 5 ejercicios hoy.');
    }
    if (currentStreak === 0) {
      recs.push('Inicia una racha de estudio. Estudia al menos 15 minutos hoy para comenzar.');
    }
    if (currentStreak > 0 && currentStreak < 7) {
      recs.push(`¡Vas bien! Mantén tu racha de ${currentStreak} días. Solo ${7 - currentStreak} días para el badge "Semana Dedicada".`);
    }
    if (completedModules < allModules.length) {
      recs.push(`Has completado ${completedModules}/${allModules.length} módulos. Sigue adelante con el siguiente.`);
    }
    if (unlockedBadges < 5) {
      recs.push('Desbloquea más badges completando módulos y resolviendo ejercicios.');
    }

    setRecommendations(recs);
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Estadísticas Avanzadas</h1>
          <p className="text-lg text-gray-600">Analiza tu progreso y obtén recomendaciones personalizadas</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Progreso General</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProgress}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Módulos Completados</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedModules}/7</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Ejercicios Resueltos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedExercises}/{stats.totalExercises}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Badges Desbloqueados</p>
                <p className="text-3xl font-bold text-gray-900">{stats.unlockedBadges}/{stats.totalBadges}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="progress">Progreso</TabsTrigger>
            <TabsTrigger value="difficulty">Dificultad</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progreso por Módulo</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Desglose de Progreso</h2>
              <div className="space-y-4">
                {getAllModules().map((module, idx) => (
                  <div key={module.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{module.title}</span>
                      <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Difficulty Tab */}
          <TabsContent value="difficulty" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Distribución por Dificultad</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis por Nivel</h2>
              <div className="space-y-4">
                {difficultyData.map((item) => (
                  <div key={item.name} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.fill }} />
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{item.value} módulos</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getBadges().map((badge) => (
                  <BadgeDisplay
                    key={badge.id}
                    badge={badge}
                    unlocked={isBadgeUnlocked(badge.id)}
                    size="medium"
                  />
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recomendaciones Personalizadas</h2>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-gray-900">{rec}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-gray-900">¡Excelente trabajo! Vas muy bien en tu aprendizaje.</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Próximos Objetivos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-medium text-gray-900">Completa todos los módulos</p>
                    <p className="text-sm text-gray-600">Progreso: {stats.completedModules}/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💪</span>
                  <div>
                    <p className="font-medium text-gray-900">Resuelve todos los ejercicios</p>
                    <p className="text-sm text-gray-600">Progreso: {stats.completedExercises}/{stats.totalExercises}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-medium text-gray-900">Mantén una racha de 30 días</p>
                    <p className="text-sm text-gray-600">Racha actual: {stats.streak || 0} días</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <p className="font-medium text-gray-900">Desbloquea todos los badges</p>
                    <p className="text-sm text-gray-600">Progreso: {stats.unlockedBadges}/{stats.totalBadges}</p>
                  </div>
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
