import React, { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalX: number;
  originalY: number;
}

export const InteractiveNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();

  const initNodes = useCallback((canvas: HTMLCanvasElement) => {
    const nodes: Node[] = [];
    const spacing = 80;
    const cols = Math.ceil(canvas.width / spacing) + 1;
    const rows = Math.ceil(canvas.height / spacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + (j % 2 === 0 ? 0 : spacing / 2);
        const y = j * spacing;
        nodes.push({
          x,
          y,
          vx: 0,
          vy: 0,
          radius: 2,
          originalX: x,
          originalY: y,
        });
      }
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect theme
    const getColors = () => {
      const isLight = document.documentElement.classList.contains('light');
      return {
        dot: isLight ? 'hsla(27, 40%, 40%, ' : 'hsla(27, 40%, 50%, ',
        line: isLight ? 'hsla(27, 40%, 40%, ' : 'hsla(27, 40%, 50%, ',
      };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes(canvas);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      const nodes = nodesRef.current;
      const interactionRadius = 180;
      const connectionDistance = 120;
      const colors = getColors();

      // Update node positions
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius && distance > 0) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          node.vx -= Math.cos(angle) * force * 2;
          node.vy -= Math.sin(angle) * force * 2;
        }

        // Spring back to original position
        const returnForce = 0.03;
        node.vx += (node.originalX - node.x) * returnForce;
        node.vy += (node.originalY - node.y) * returnForce;

        // Damping
        node.vx *= 0.9;
        node.vy *= 0.9;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections - only near mouse for performance + effect
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseDistance = Math.sqrt(
              Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2)
            );

            const baseOpacity = 0.06;
            const highlightOpacity = mouseDistance < interactionRadius 
              ? 0.35 * (1 - mouseDistance / interactionRadius) + baseOpacity
              : baseOpacity;

            ctx.strokeStyle = `${colors.line}${highlightOpacity * (1 - distance / connectionDistance)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const baseOpacity = 0.2;
        const highlightOpacity = distance < interactionRadius 
          ? 0.7 * (1 - distance / interactionRadius) + baseOpacity
          : baseOpacity;
        
        const baseRadius = 1.5;
        const highlightRadius = distance < interactionRadius 
          ? 2.5 * (1 - distance / interactionRadius) + baseRadius
          : baseRadius;

        ctx.beginPath();
        ctx.arc(node.x, node.y, highlightRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.dot}${highlightOpacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};
