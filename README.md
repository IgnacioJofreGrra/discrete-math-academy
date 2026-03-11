# Discrete Math Academy

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

Plataforma educativa interactiva optimizada para aprendizaje de Matematica Discreta, con enfoque pedagogico basado en progreso verificable y arquitectura de software desacoplada. El proyecto combina una experiencia didactica de alto rendimiento con decisiones tecnicas orientadas a escalabilidad, integridad de datos y mantenibilidad a largo plazo.

## Value Proposition

Discrete Math Academy integra teoria, aplicaciones y evaluaciones interactivas en una experiencia guiada por resultados. A nivel tecnico, el MVP esta disenado para evolucionar con bajo costo de cambio: contenido desacoplado por dominio, tipado compartido para consistencia transversal y reglas de persistencia orientadas a eventos de exito en lugar de navegacion superficial.

## Architecture & Design Decisions

### Domain-Driven Content

El contenido academico se modela de forma desacoplada en archivos JSON bajo `client/src/data/modules`, separados de la logica de presentacion y de la capa de estado.

Esto habilita:
- Evolucion curricular sin reescribir componentes de UI.
- Versionado de contenido por modulo/seccion con trazabilidad clara.
- Escalado hacia internacionalizacion o pipelines editoriales sin acoplar el dominio al framework.

### Shared Type System

La integridad de datos se asegura mediante un sistema de tipos compartido:
- Tipos de dominio educativo en `client/src/types/course.ts`.
- Tipos transversales de progreso/estadisticas en `shared/types.ts`.

Este enfoque reduce deriva de contratos entre capas y permite refactors seguros, especialmente en:
- Progreso por modulo.
- Resultados de evaluacion.
- Estructuras de usuario y metricas agregadas.

### Success-Based Persistence

La completitud no se dispara por visita de pantalla, sino por eventos de aprobacion verificables.

Regla arquitectonica:
- `Challenge`: persiste solo si la respuesta es correcta.
- `Quiz`: persiste solo al cumplir el umbral de aprobacion.
- Navegar entre ejercicios no incrementa progreso por si mismo.

Razon tecnica y de producto:
- Evita inflar metricas de aprendizaje.
- Aumenta la calidad de analitica y recomendaciones.
- Alinea la persistencia con evidencia real de dominio adquirido.

### Flujo de Persistencia (Mermaid)

```mermaid
flowchart TD
    A[Usuario completa Challenge/Quiz] --> B{Evento de exito?}
    B -- No --> C[No persiste progreso]
    C --> D[UI mantiene estado local de intento]

    B -- Si --> E[Module.tsx dispara markExerciseCompleted/saveExamSectionResult]
    E --> F[Progress Service - courseData]
    F --> G[Calcula progreso por modulo y seccion]
    G --> H[AuthContext valida sesion de usuario]
    H --> I[Persistencia por usuario en Firebase]
    I --> J[Snapshot de progreso actualizado]
    J --> K[Home/Statistics renderizan progreso consistente]
```

## Tech Stack

- React 19
- Vite 7
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- KaTeX
- Recharts
- Firebase Authentication

## Local Setup & Quality Gates

### Requisitos

- Node.js 20+
- pnpm 10+

### Instalacion

1. Instalar dependencias.

```bash
pnpm install
```

2. Crear archivo de entorno local desde plantilla.

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Configurar valores en `.env`.

4. Iniciar entorno de desarrollo.

```bash
pnpm dev
```

5. Ejecutar validacion de calidad tipada.

```bash
pnpm check
```

## Variables de Entorno

El proyecto incluye un `.env.example` completo para acelerar onboarding tecnico.

| Variable | Requerida | Proposito |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Si | Credencial publica del proyecto Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Si | Dominio de autenticacion Firebase |
| `VITE_FIREBASE_PROJECT_ID` | Si | Identificador del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Si | Bucket para almacenamiento asociado |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Si | Identificador de mensajeria |
| `VITE_FIREBASE_APP_ID` | Si | Identificador de aplicacion Firebase |
| `VITE_FIREBASE_MEASUREMENT_ID` | No | Integracion de medicion/analytics Firebase |
| `VITE_ANALYTICS_ENDPOINT` | No | Endpoint de analitica (Umami compatible) |
| `VITE_ANALYTICS_WEBSITE_ID` | No | Sitio objetivo para analitica |
| `VITE_FRONTEND_FORGE_API_URL` | No | URL base para integracion de mapas/forge |
| `VITE_FRONTEND_FORGE_API_KEY` | No | API key para servicios de mapas/forge |

## Security

- Los secretos no se versionan; se gestionan mediante variables de entorno por entorno de ejecucion.
- El repositorio mantiene plantilla segura en `.env.example` sin exponer credenciales productivas.
- En Firebase, las reglas deben restringir lectura/escritura por identidad autenticada y alcance de datos de usuario.
- Se recomienda auditar historial Git antes de releases para prevenir exposicion accidental de secretos.

## Author

**Ignacio Jofré Guerra**
*Full-Stack Architect & CTO*
[LinkedIn](https://www.linkedin.com/in/ignacio-jofre-guerra/) | [GitHub](https://github.com/IgnacioJofreGuerra)