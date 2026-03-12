# Contribuir a DiscreMath

Gracias por contribuir.

## Entorno de Desarrollo

1. Instala dependencias:

```bash
pnpm install
```

2. Crea el archivo de entorno local:

```bash
cp .env.example .env
```

En Windows PowerShell también puedes usar:

```powershell
Copy-Item .env.example .env
```

3. Ejecuta la aplicación:

```bash
pnpm dev
```

4. Valida tus cambios:

```bash
pnpm check
pnpm format
```

## Guía de Ramas y Commits

- Crea ramas enfocadas por funcionalidad o corrección.
- Mantén commits pequeños y descriptivos.
- Usa mensajes de commit en presente.

Ejemplos:
- `fix: corregir renderizado de progreso por módulo`
- `docs: agregar guía de contribución open source`

## Estándares de Calidad

Antes de abrir un Pull Request, toda contribución debe cumplir estos controles mínimos:

1. Ejecutar validación de tipos:

```bash
pnpm check
```

2. Ejecutar build de producción:

```bash
pnpm build
```

Si alguno de estos comandos falla, corrige los errores antes de solicitar revisión.

## Path Aliases (Imports)

El proyecto usa aliases de rutas para mantener imports consistentes:

- `@/` apunta a `client/src/`
- `@shared/` apunta a `shared/`

Ejemplos:

```ts
import { Button } from "@/components/ui/button";
import type { LearningStatsSummary } from "@shared/types";
```

Si tu IDE marca errores de importación con estos aliases, verifica que esté usando el `tsconfig.json` del proyecto y reinicia el TypeScript Server.

## Checklist de Pull Request

- El cambio resuelve un problema concreto.
- El type-check pasa con `pnpm check`.
- La documentación se actualiza cuando cambia el comportamiento.
- No se suben secretos ni valores sensibles de entorno.

## Alcance de Contribuciones

Buenas primeras contribuciones:
- Correcciones de contenido en modulos y quizzes.
- Mejoras de UX en flujos de aprendizaje.
- Mejoras de tipado y seguridad de tipos.
- Cobertura de tests y actualización de documentación.

Los cambios grandes deben comenzar con una discusión en un issue antes de implementarse.
