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

En Windows PowerShell tambien puedes usar:

```powershell
Copy-Item .env.example .env
```

3. Ejecuta la aplicacion:

```bash
pnpm dev
```

4. Valida tus cambios:

```bash
pnpm check
pnpm format
```

## Guia de Ramas y Commits

- Crea ramas enfocadas por funcionalidad o correccion.
- Mantén commits pequenos y descriptivos.
- Usa mensajes de commit en presente.

Ejemplos:
- `fix: corregir renderizado de progreso por modulo`
- `docs: agregar guia de contribucion open source`

## Checklist de Pull Request

- El cambio resuelve un problema concreto.
- El type-check pasa con `pnpm check`.
- La documentacion se actualiza cuando cambia el comportamiento.
- No se suben secretos ni valores sensibles de entorno.

## Alcance de Contribuciones

Buenas primeras contribuciones:
- Correcciones de contenido en modulos y quizzes.
- Mejoras de UX en flujos de aprendizaje.
- Mejoras de tipado y seguridad de tipos.
- Cobertura de tests y actualizacion de documentacion.

Los cambios grandes deben comenzar con una discusion en un issue antes de implementarse.
