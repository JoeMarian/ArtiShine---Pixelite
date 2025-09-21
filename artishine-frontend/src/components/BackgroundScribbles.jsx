import React, { useEffect, useRef } from 'react';

const BackgroundScribbles = () => {
  const canvasRef = useRef(null);
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrame;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: 20 + Math.random() * 30,
      alpha: 0.07 + Math.random() * 0.08,
      size: 1 + Math.random() * 1.5,
    }));

    const scribbles = Array.from({ length: 6 }).map(() => ({
      points: Array.from({ length: 12 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })),
      offset: Math.random() * 1000,
      hue: 18 + Math.random() * 35,
      alpha: 0.05 + Math.random() * 0.06,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Soft background vignette
      const grd = ctx.createRadialGradient(
        window.innerWidth * 0.6,
        window.innerHeight * 0.2,
        50,
        window.innerWidth * 0.5,
        window.innerHeight * 0.6,
        Math.max(window.innerWidth, window.innerHeight)
      );
      grd.addColorStop(0, 'hsla(22, 77%, 60%, 0.06)');
      grd.addColorStop(1, 'hsla(35, 20%, 98%, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Scribble lines
      scribbles.forEach((s, si) => {
        ctx.strokeStyle = `hsla(${s.hue}, 60%, 45%, ${s.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        s.points.forEach((p, i) => {
          const nx = p.x + Math.sin((performance.now() * 0.0004 + s.offset + i) * 1.2) * 12;
          const ny = p.y + Math.cos((performance.now() * 0.0003 + s.offset + i) * 1.1) * 12;
          if (i === 0) ctx.moveTo(nx, ny);
          else ctx.lineTo(nx, ny);
        });
        ctx.stroke();
      });

      // Particles
      particles.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0 || pt.x > window.innerWidth) pt.vx *= -1;
        if (pt.y < 0 || pt.y > window.innerHeight) pt.vy *= -1;
        ctx.fillStyle = `hsla(${pt.hue}, 70%, 45%, ${pt.alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      aria-hidden="true"
    />
  );
};

export default BackgroundScribbles;



