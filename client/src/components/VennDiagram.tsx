import { useEffect, useRef } from 'react';

interface VennDiagramProps {
  setA?: string[];
  setB?: string[];
  setC?: string[];
  title?: string;
  width?: number;
  height?: number;
}

/**
 * VennDiagram - Componente para visualizar diagramas de Venn
 * 
 * Props:
 * - setA: string[] - Elementos del conjunto A
 * - setB: string[] - Elementos del conjunto B
 * - setC: string[] - Elementos del conjunto C (opcional)
 * - title: string - Título del diagrama
 * - width: number - Ancho del canvas
 * - height: number - Alto del canvas
 */
export function VennDiagram({
  setA = [],
  setB = [],
  setC = [],
  title = 'Diagrama de Venn',
  width = 400,
  height = 300,
}: VennDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);

    // Draw circles
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    // Circle A (left)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX - 40, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();

    // Circle B (right)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX + 40, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
    ctx.fill();

    // Labels
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('A', centerX - 80, centerY - 70);
    ctx.fillText('B', centerX + 70, centerY - 70);

    // Draw elements
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Elements in A only
    setA.forEach((elem, idx) => {
      if (!setB.includes(elem)) {
        ctx.fillText(elem, centerX - 60, centerY + idx * 20);
      }
    });

    // Elements in B only
    setB.forEach((elem, idx) => {
      if (!setA.includes(elem)) {
        ctx.fillText(elem, centerX + 60, centerY + idx * 20);
      }
    });

    // Elements in intersection
    const intersection = setA.filter(elem => setB.includes(elem));
    intersection.forEach((elem, idx) => {
      ctx.fillText(elem, centerX, centerY + idx * 20);
    });
  }, [setA, setB, setC, width, height]);

  return (
    <div className="flex flex-col items-center gap-4">
      {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg bg-white"
      />
    </div>
  );
}
