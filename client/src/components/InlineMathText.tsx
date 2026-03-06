import { Fragment } from 'react';
import { MathRenderer } from './MathRenderer';

interface InlineMathTextProps {
  text: string;
  className?: string;
}

/**
 * Renderiza texto mixto con segmentos LaTeX delimitados por $...$.
 * Ejemplo: "Si $a=b$ entonces $b=a$".
 */
export function InlineMathText({ text, className = '' }: InlineMathTextProps) {
  if (!text.includes('$')) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(/(\$[^$]+\$)/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        const isMath = part.startsWith('$') && part.endsWith('$') && part.length > 2;
        if (!isMath) {
          return <Fragment key={`text-${idx}`}>{part}</Fragment>;
        }

        return (
          <MathRenderer
            key={`math-${idx}`}
            latex={part.slice(1, -1)}
            inline
          />
        );
      })}
    </span>
  );
}
