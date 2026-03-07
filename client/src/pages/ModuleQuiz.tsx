import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { AppIcon } from '@/components/AppIcon';
import { Quiz } from '@/components/Quiz';
import { quizModule0 } from '@/data/quizzes/quiz_module_0';

/**
 * ModuleQuiz - Página para mostrar quizzes de módulos
 */
export default function ModuleQuiz() {
  const params = useParams<{ moduleId: string }>();
  const [, setLocation] = useLocation();

  // Map module IDs to quizzes
  const quizzes: Record<string, any> = {
    'module_0_divisibility': quizModule0,
  };

  const quiz = quizzes[params.moduleId];

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 max-[359px]:p-3">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4 flex items-center gap-2"
          >
            <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
            Volver al Inicio
          </Button>
          <div className="bg-white rounded-lg p-8 max-[359px]:p-4 text-center">
            <p className="text-gray-600">Quiz no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 max-[359px]:p-3">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation(`/module/${params.moduleId}`)}
          className="mb-4 flex items-center gap-2"
        >
          <AppIcon icon={ChevronLeft} size={16} colorClass="text-slate-600" />
          Volver al Módulo
        </Button>

        <Quiz
          title={quiz.title}
          questions={quiz.questions}
          passingScore={quiz.passingScore}
          onComplete={(score, total) => {
            console.log(`Quiz completado: ${score}/${total * 100}%`);
          }}
        />
      </div>
    </div>
  );
}
