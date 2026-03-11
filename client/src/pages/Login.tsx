import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Sigma } from 'lucide-react';
import { AppIcon } from '@/components/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

const extractAuthErrorCode = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return undefined;
  }

  const value = (error as { code?: unknown }).code;
  return typeof value === 'string' ? value : undefined;
};

export default function Login() {
  const { signInWithGoogle, signInWithGithub, authAvailable, authSetupError } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const activeError = authError || authSetupError;

  const handleGoogleLogin = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (error: unknown) {
      const code = extractAuthErrorCode(error);
      if (code === 'auth/operation-not-allowed') {
        setAuthError('Google no esta habilitado en Firebase Authentication.');
        return;
      }
      if (code === 'auth/popup-closed-by-user') {
        setAuthError('Cerraste la ventana de inicio de sesion antes de completar el acceso.');
        return;
      }
      setAuthError('No se pudo iniciar sesion con Google. Revisa la configuracion del proveedor.');
    }
  };

  const handleGithubLogin = async () => {
    try {
      setAuthError(null);
      await signInWithGithub();
    } catch (error: unknown) {
      const code = extractAuthErrorCode(error);
      if (code === 'auth/operation-not-allowed') {
        setAuthError('GitHub no esta habilitado en Firebase Authentication.');
        return;
      }
      if (code === 'auth/popup-closed-by-user') {
        setAuthError('Cerraste la ventana de inicio de sesion antes de completar el acceso.');
        return;
      }
      setAuthError('No se pudo iniciar sesion con GitHub. Verifica Client ID/Secret y callback URL.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 max-[359px]:p-4 shadow-lg border-2 border-blue-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl max-[359px]:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <AppIcon icon={Sigma} size={34} colorClass="text-blue-600" />
            DiscreMath
          </h1>
          <p className="text-gray-600 mt-2">Inicia sesion para acceder al contenido</p>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full gap-2"
            disabled={!authAvailable}
          >
            <span className="text-sm font-bold text-blue-600">G</span>
            Continuar con Google
          </Button>

          <Button
            variant="outline"
            onClick={handleGithubLogin}
            className="w-full gap-2"
            disabled={!authAvailable}
          >
            <AppIcon icon={Github} size={16} colorClass="text-slate-700" />
            Continuar con GitHub
          </Button>
        </div>

        {activeError && (
          <p className="text-xs text-red-600 mt-4 text-center">
            {activeError}
            {!authAvailable && (
              <>
                {' '}
                Configura estas variables en Vercel Project Settings, seccion Environment Variables.
              </>
            )}
          </p>
        )}
      </Card>
    </div>
  );
}
