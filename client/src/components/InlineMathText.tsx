import { Fragment, type ReactNode } from 'react';
import { MathRenderer } from './MathRenderer';

interface InlineMathTextProps {
  text: string;
  className?: string;
}

/**
 * Renderiza texto mixto con segmentos LaTeX delimitados por $...$.
 * Tambien interpreta negritas en formato Markdown: **texto**.
 * Ejemplo: "Si $a=b$ entonces $b=a$".
 */
export function InlineMathText({ text, className = '' }: InlineMathTextProps) {
  const renderBoldText = (value: string, keyPrefix: string): ReactNode[] => {
    const textParts = value.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

    return textParts.map((textPart, textIdx) => {
      const isBold = textPart.startsWith('**') && textPart.endsWith('**') && textPart.length > 4;
      if (!isBold) {
        return <Fragment key={`${keyPrefix}-text-${textIdx}`}>{textPart}</Fragment>;
      }

      return <strong key={`${keyPrefix}-bold-${textIdx}`}>{textPart.slice(2, -2)}</strong>;
    });
  };

  if (!text.includes('$')) {
    return <span className={className}>{renderBoldText(text, 'plain')}</span>;
  }

  const parts = text.split(/(\$[^$]+\$)/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        const isMath = part.startsWith('$') && part.endsWith('$') && part.length > 2;
        if (!isMath) {
          return <Fragment key={`text-${idx}`}>{renderBoldText(part, `part-${idx}`)}</Fragment>;
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
