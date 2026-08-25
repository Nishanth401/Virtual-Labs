"use client";

import React, { useEffect, useRef } from "react";

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 14000), 55);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isRed: boolean;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isRed = Math.random() > 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
<<<<<<< HEAD
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isRed ? (Math.random() > 0.7 ? 3.5 : 2.5) : (Math.random() > 0.7 ? 2.5 : 1.8),
        isRed,
        baseAlpha: isRed ? 0.85 : 0.45,
=======
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() > 0.7 ? 2.5 : 1.5,
        isRed: false,
>>>>>>> 6793de657858aa0294d8065a300663c734d70490
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

<<<<<<< HEAD
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
=======
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.15;
>>>>>>> 6793de657858aa0294d8065a300663c734d70490
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].isRed || particles[j].isRed
              ? `rgba(225, 29, 72, ${alpha * 0.9})`
              : `rgba(160, 160, 175, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        if (mouseDist < mouse.radius) {
          const alpha = (1 - mouseDist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
<<<<<<< HEAD

        if (p.isRed) {
          // Glowing Red Accent Node
          ctx.fillStyle = "rgba(225, 29, 72, 0.9)";
          ctx.shadowColor = "rgba(225, 29, 72, 0.7)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Subtle Slate Node
          ctx.fillStyle = "rgba(140, 140, 160, 0.5)";
          ctx.fill();
        }
=======
        ctx.fillStyle = "rgba(140, 140, 160, 0.4)";
        ctx.fill();
>>>>>>> 6793de657858aa0294d8065a300663c734d70490
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80"
    />
  );
}
