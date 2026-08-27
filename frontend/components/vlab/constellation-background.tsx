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
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isRed: boolean;
      baseAlpha: number;
      pulseSpeed: number;
      pulseVal: number;
    }

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      const validW = Math.max(w, window.innerWidth || 1200);
      const validH = Math.max(h, window.innerHeight || 800);
      const count = Math.max(Math.min(Math.floor((validW * validH) / 18000), 65), 35);

      particles = [];
      for (let i = 0; i < count; i++) {
        const isRed = Math.random() > 0.45;
        particles.push({
          x: Math.random() * validW,
          y: Math.random() * validH,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: isRed ? (Math.random() > 0.6 ? 4.5 : 3.2) : (Math.random() > 0.6 ? 3.5 : 2.2),
          isRed,
          baseAlpha: isRed ? 0.9 : 0.65,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateSize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = canvas.width = (rect?.width && rect.width > 0) ? rect.width : window.innerWidth;
      height = canvas.height = (rect?.height && rect.height > 0) ? rect.height : (window.innerHeight * 0.85);

      if (particles.length === 0) {
        initParticles(width, height);
      }
    };

    updateSize();

    const handleResize = () => {
      updateSize();
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

    const render = () => {
      if (width === 0 || height === 0) {
        updateSize();
      }

      ctx.clearRect(0, 0, width, height);

      // Check if dark mode is active
      const isDark = document.documentElement.classList.contains("dark");

      // Draw connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            if (particles[i].isRed || particles[j].isRed) {
              ctx.strokeStyle = `rgba(225, 29, 72, ${alpha * 0.4})`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(160, 160, 185, ${alpha * 0.25})`
                : `rgba(100, 116, 139, ${alpha * 0.28})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        if (mouseDist < mouse.radius) {
          const alpha = (1 - mouseDist / mouse.radius);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(225, 29, 72, ${alpha * 0.6})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      // Draw particle nodes / bubbles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentRadius = p.radius + Math.sin(p.pulseVal) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(currentRadius, 1), 0, Math.PI * 2);

        if (p.isRed) {
          // Glowing Vibrant Crimson Bubble
          ctx.fillStyle = "rgba(225, 29, 72, 0.95)";
          ctx.shadowColor = "rgba(225, 29, 72, 0.8)";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Sleek Slate Bubble
          ctx.fillStyle = isDark
            ? "rgba(148, 163, 184, 0.65)"
            : "rgba(71, 85, 105, 0.65)";
          ctx.shadowColor = isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(0, 0, 0, 0.15)";
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
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
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-90"
    />
  );
}
