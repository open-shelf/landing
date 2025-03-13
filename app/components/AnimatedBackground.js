"use client";

import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Hexagon {
      constructor() {
        this.size = Math.random() * 40 + 20;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = Math.random() * 0.2 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() * 60 + 220; // Blue to purple range
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Pulse effect
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        ctx.strokeStyle = `hsla(${this.hue}, 70%, 60%, ${
          this.opacity * pulse
        })`;
        ctx.lineWidth = 1;

        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 * i) / 6;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Add inner details
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const angle1 = (Math.PI * 2 * i) / 3;
          const angle2 = (Math.PI * 2 * ((i + 1) % 3)) / 3;
          const x1 = Math.cos(angle1) * (this.size * 0.5);
          const y1 = Math.sin(angle1) * (this.size * 0.5);
          const x2 = Math.cos(angle2) * (this.size * 0.5);
          const y2 = Math.sin(angle2) * (this.size * 0.5);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = `hsla(${this.hue + 30}, 70%, 60%, ${
          this.opacity * 0.5 * pulse
        })`;
        ctx.stroke();

        ctx.restore();
      }

      update() {
        this.y += this.velocity;
        this.x += Math.sin(this.angle) * 0.2;
        this.angle += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;

        if (this.y - this.size > canvas.height) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    // Create data stream effect
    class DataStream {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = -20;
        this.speed = Math.random() * 3 + 2;
        this.length = Math.random() * 20 + 10;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      draw() {
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x + this.length,
          this.y
        );
        gradient.addColorStop(0, `hsla(252, 100%, 67%, ${this.opacity})`);
        gradient.addColorStop(1, "hsla(252, 100%, 67%, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.length, 1);
      }

      update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
          this.reset();
          this.y = Math.random() * canvas.height;
        }
      }
    }

    const hexagons = Array.from({ length: 15 }, () => new Hexagon());
    const dataStreams = Array.from({ length: 50 }, () => new DataStream());

    function animate() {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "hsla(229, 27%, 10%, 1)");
      gradient.addColorStop(1, "hsla(229, 27%, 5%, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update data streams
      dataStreams.forEach((stream) => {
        stream.update();
        stream.draw();
      });

      // Draw and update hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update();
        hexagon.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: "hsl(229, 27%, 8%)" }}
    />
  );
};

export default AnimatedBackground;
