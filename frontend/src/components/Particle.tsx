import React, { useRef, useEffect } from 'react';

import '../styles/particle-system.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];
  const colors = ['#FFFFFF', '#EDF0F2', '#FDFAFF', '#F6F5FF'];

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() - 0.33,
        vy: Math.random() + 0.33,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        particle.x += particle.vx;

        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fillRect(particle.y, particle.x, 3, 6);

        if (particle.x > canvas.width) {
          particle.x = 5;
        }
      }

      requestAnimationFrame(render);
    };

    render();
  }, [colors, particles]);

  return (
    <canvas ref={canvasRef} width={1000} height={1000} className="canvas" />
  );
};

export default ParticleSystem;
