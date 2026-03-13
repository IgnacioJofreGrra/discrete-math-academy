import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, TrendingUp, Target, Zap, Award, ClipboardCheck } from 'lucide-react';
import { getAllModules, getTotalProgress, getCompletedModules, getCompletedExercises, getTotalExercises, getStreak, getModuleProgress, getAllExamSectionResults } from '@/lib/courseData';
import { getBadges, isBadgeUnlocked, getUnlockedBadgesCount } from '@/lib/badges';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { AppIcon } from '@/components/AppIcon';
import { useIsMobile } from '@/hooks/useMobile';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { CourseModule, CourseSection } from '@/types/course';
import type {
  DifficultyChartDatum,
  ExamPerformanceRow,
  LearningStatsSummary,
  ProgressChartDatum,
} from '@shared/types';

/**
 * Statistics - Página de estadísticas avanzadas con gráficos y recomendaciones
 */
export default function Statistics() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [stats, setStats] = useState<LearningStatsSummary>({
    totalProgress: 0,
    completedModules: 0,
    completedExercises: 0,
    totalExercises: 0,
    streak: 0,
    unlockedBadges: 0,
    totalBadges: 0,
    examAttempts: 0,
    sectionsWithExam: 0,
    averageExamScore: 0,
  });

  const [progressData, setProgressData] = useState<ProgressChartDatum[]>([]);
  const [difficultyData, setDifficultyData] = useState<DifficultyChartDatum[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [examResults, setExamResults] = useState<ExamPerformanceRow[]>([]);

  useEffect(() => {
    const allModules = getAllModules();
    const completedModules = getCompletedModules();
    const completedExercises = getCompletedExercises();
    const totalExercises = getTotalExercises();
    const unlockedBadges = getUnlockedBadgesCount();
    const examResultsData = getAllExamSectionResults();

    const sectionNames = new Map<string, { moduleTitle: string; sectionTitle: string }>();
    allModules.forEach((module) => {
      module.sections?.forEach((section: CourseSection) => {
        sectionNames.set(`${module.id}:${section.id}`, {
          moduleTitle: module.title,
          sectionTitle: section.title,
        });
      });
    });

    const examRows = examResultsData.map((result) => {
      const key = `${result.moduleId}:${result.sectionId}`;
      const names = sectionNames.get(key);

      return {
        ...result,
        moduleTitle: names?.moduleTitle || result.moduleId,
        sectionTitle: names?.sectionTitle || result.sectionId,
      };
    });

    setExamResults(examRows);

    const examAttempts = examRows.reduce((sum, row) => sum + row.attempts, 0);
    const averageExamScore = examRows.length > 0
      ? Math.round(examRows.reduce((sum, row) => sum + row.lastScore, 0) / examRows.length)
      : 0;

    setStats({
      totalProgress: getTotalProgress(),
      completedModules,
      completedExercises,
      totalExercises,
      streak: getStreak(),
      unlockedBadges,
      totalBadges: Object.keys(getBadges()).length,
      examAttempts,
      sectionsWithExam: examRows.length,
      averageExamScore,
    });

    // Build progress data from stored module progress (real user data)
    const progressChartData: ProgressChartDatum[] = allModules.map((m, idx) => ({
      id: m.id,
      moduleNumber: String(idx + 1),
      name: m.title,
      progress: getModuleProgress(m.id),
    }));
    setProgressData(progressChartData);

    // Generate difficulty data
    const difficultyMap = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    allModules.forEach((m: CourseModule) => {
      if (m.difficulty === 'beginner') difficultyMap.beginner++;
      else if (m.difficulty === 'intermediate') difficultyMap.intermediate++;
      else if (m.difficulty === 'advanced') difficultyMap.advanced++;
    });

    const difficultyChartData: DifficultyChartDatum[] = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 max-[359px]:p-3">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4 flex items-center gap-2"
          >
            <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
            Volver al Inicio
          </Button>
          <h1 className="text-4xl max-[359px]:text-[1.65rem] font-bold text-gray-900 mb-2">Estadísticas Avanzadas</h1>
          <p className="text-lg max-[359px]:text-sm text-gray-600">Analiza tu progreso y obtén recomendaciones personalizadas</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={TrendingUp} colorClass="text-blue-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Progreso General</p>
                <p className="text-3xl max-[359px]:text-2xl font-bold text-gray-900">{stats.totalProgress}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Target} colorClass="text-green-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Módulos Completados</p>
                <p className="text-3xl max-[359px]:text-2xl font-bold text-gray-900">{stats.completedModules}/{progressData.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-purple-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Zap} colorClass="text-purple-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Ejercicios Resueltos</p>
                <p className="text-3xl max-[359px]:text-2xl font-bold text-gray-900">{stats.completedExercises}/{stats.totalExercises}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-orange-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={Award} colorClass="text-orange-500" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Badges Desbloqueados</p>
                <p className="text-3xl max-[359px]:text-2xl font-bold text-gray-900">{stats.unlockedBadges}/{stats.totalBadges}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 max-[359px]:p-4 bg-white border-l-4 border-cyan-500">
            <div className="flex items-center gap-4">
              <AppIcon icon={ClipboardCheck} colorClass="text-cyan-600" />
              <div>
                <p className="text-sm max-[359px]:text-xs text-gray-600">Promedio Examen</p>
                <p className="text-3xl max-[359px]:text-2xl font-bold text-gray-900">{stats.averageExamScore || 0}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto gap-2 mb-6">
            <TabsTrigger value="progress" className="whitespace-normal text-xs sm:text-sm leading-tight py-2">Progreso</TabsTrigger>
            <TabsTrigger value="difficulty" className="whitespace-normal text-xs sm:text-sm leading-tight py-2">Dificultad</TabsTrigger>
            <TabsTrigger value="badges" className="whitespace-normal text-xs sm:text-sm leading-tight py-2">Badges</TabsTrigger>
            <TabsTrigger value="exams" className="whitespace-normal text-xs sm:text-sm leading-tight py-2">Exámenes</TabsTrigger>
            <TabsTrigger value="recommendations" className="whitespace-normal text-xs sm:text-sm leading-tight py-2">Recomendaciones</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Progreso por Módulo</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="moduleNumber" interval={0} tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" name="Progreso" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Desglose de Progreso</h2>
              <div className="space-y-4">
                {progressData.map((module) => (
                  <div key={module.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium max-[359px]:text-sm text-gray-900">{module.name}</span>
                      <span className="text-sm text-gray-600">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Difficulty Tab */}
          <TabsContent value="difficulty" className="space-y-6">
            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Distribución por Dificultad</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={isMobile ? 70 : 90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Análisis por Nivel</h2>
              <div className="space-y-4">
                {difficultyData.map((item) => (
                  <div key={item.name} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.fill }} />
                        <span className="font-medium max-[359px]:text-sm text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-lg max-[359px]:text-base font-bold text-gray-900">{item.value} módulos</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Tus Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-[359px]:gap-3">
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

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-2">Rendimiento en Exámenes</h2>
              <p className="text-sm text-gray-600 mb-6">
                Intentos totales: {stats.examAttempts || 0} · Secciones evaluadas: {stats.sectionsWithExam || 0}
              </p>

              {examResults.length === 0 ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-700 max-[359px]:text-sm">Aún no has completado exámenes de sección.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {examResults.map((result) => {
                    const passed = result.lastScore >= result.passingScore;
                    return (
                      <div key={`${result.moduleId}:${result.sectionId}`} className={`p-4 rounded-lg border ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
                          <p className="font-semibold text-gray-900 max-[359px]:text-sm">{result.sectionTitle}</p>
                          <p className="text-sm text-gray-600">{result.moduleTitle}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                          <p className="text-gray-700">Ultimo: <span className="font-semibold">{result.lastScore}%</span></p>
                          <p className="text-gray-700">Mejor: <span className="font-semibold">{result.bestScore}%</span></p>
                          <p className="text-gray-700">Intentos: <span className="font-semibold">{result.attempts}</span></p>
                          <p className="text-gray-700">Fecha: <span className="font-semibold">{new Date(result.lastTakenAt).toLocaleDateString('es-CL')}</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="p-8 max-[359px]:p-4">
              <h2 className="text-2xl max-[359px]:text-lg font-bold text-gray-900 mb-6">Recomendaciones Personalizadas</h2>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-gray-900 max-[359px]:text-sm">{rec}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-gray-900 max-[359px]:text-sm">¡Excelente trabajo! Vas muy bien en tu aprendizaje.</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-8 max-[359px]:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-xl max-[359px]:text-lg font-bold text-gray-900 mb-4">Próximos Objetivos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl max-[359px]:text-xl">🎯</span>
                  <div>
                    <p className="font-medium max-[359px]:text-sm text-gray-900">Completa todos los módulos</p>
                    <p className="text-sm text-gray-600">Progreso: {stats.completedModules}/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl max-[359px]:text-xl">💪</span>
                  <div>
                    <p className="font-medium max-[359px]:text-sm text-gray-900">Resuelve todos los ejercicios</p>
                    <p className="text-sm text-gray-600">Progreso: {stats.completedExercises}/{stats.totalExercises}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl max-[359px]:text-xl">🔥</span>
                  <div>
                    <p className="font-medium max-[359px]:text-sm text-gray-900">Mantén una racha de 30 días</p>
                    <p className="text-sm text-gray-600">Racha actual: {stats.streak || 0} días</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl max-[359px]:text-xl">👑</span>
                  <div>
                    <p className="font-medium max-[359px]:text-sm text-gray-900">Desbloquea todos los badges</p>
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
