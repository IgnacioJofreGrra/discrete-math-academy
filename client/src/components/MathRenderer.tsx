import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

/**
 * MathRenderer - Renderiza fórmulas LaTeX usando KaTeX
 * 
 * Props:
 * - latex: string - La fórmula LaTeX a renderizar
 * - inline: boolean - Si es true, renderiza inline; si es false, renderiza como bloque
 * - className: string - Clases CSS adicionales
 */
export function MathRenderer({ latex, inline = false, className = '' }: MathRendererProps) {
  const inlineRef = useRef<HTMLSpanElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const containerRef = inline ? inlineRef : blockRef;

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: !inline,
        });
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
  }, [latex, inline]);

  return (
    inline ? (
      <span
        ref={inlineRef}
        className={`math-renderer inline ${className}`}
        style={{ display: 'inline', margin: 0 }}
      />
    ) : (
      <div
        ref={blockRef}
        className={`math-renderer block ${className}`}
        style={{ display: 'block', margin: '1rem 0' }}
      />
    )
  );
}
