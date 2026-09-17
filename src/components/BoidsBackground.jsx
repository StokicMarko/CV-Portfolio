import { useEffect, useRef } from "react";

/**
 * A small decentralized flocking simulation (Reynolds, 1987) drawn on a
 * full-bleed canvas behind the hero. Each agent steers by three local
 * rules: separation, alignment, cohesion. No leader, no global state.
 * Pauses when the tab is hidden, and renders a single static frame for
 * prefers-reduced-motion users instead of animating.
 */
export default function BoidsBackground({ accent = "165, 180, 252" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const COUNT = window.innerWidth < 640 ? 22 : 42;
    const PERCEPTION = 70;
    const MAX_SPEED = 1.3;
    const MAX_FORCE = 0.035;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let boids = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      boids = [];
      for (let i = 0; i < COUNT; i++) {
        const a = Math.random() * Math.PI * 2;
        boids.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(a) * MAX_SPEED * 0.7,
          vy: Math.sin(a) * MAX_SPEED * 0.7,
        });
      }
    }

    function limit(vx, vy, max) {
      const m = Math.hypot(vx, vy);
      if (m > max && m > 0) return [(vx / m) * max, (vy / m) * max];
      return [vx, vy];
    }

    function step() {
      for (const b of boids) {
        let sepX = 0,
          sepY = 0,
          aliX = 0,
          aliY = 0,
          cohX = 0,
          cohY = 0,
          n = 0;

        for (const o of boids) {
          if (o === b) continue;
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < PERCEPTION) {
            n++;
            sepX -= dx / (d * d);
            sepY -= dy / (d * d);
            aliX += o.vx;
            aliY += o.vy;
            cohX += o.x;
            cohY += o.y;
          }
        }

        let ax = 0,
          ay = 0;
        if (n > 0) {
          [sepX, sepY] = limit(sepX * 18, sepY * 18, MAX_FORCE * 1.5);
          [aliX, aliY] = limit(aliX / n - b.vx, aliY / n - b.vy, MAX_FORCE);
          [cohX, cohY] = limit(
            (cohX / n - b.x) * 0.01,
            (cohY / n - b.y) * 0.01,
            MAX_FORCE * 0.8,
          );
          ax = sepX + aliX + cohX;
          ay = sepY + aliY + cohY;
        }

        if (pointer.active) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < 110) {
            ax += (dx / d) * 0.12 * (1 - d / 110);
            ay += (dy / d) * 0.12 * (1 - d / 110);
          }
        }

        b.vx += ax;
        b.vy += ay;
        [b.vx, b.vy] = limit(b.vx, b.vy, MAX_SPEED);
        const sp = Math.hypot(b.vx, b.vy);
        if (sp < 0.4 && sp > 0) {
          b.vx = (b.vx / sp) * 0.4;
          b.vy = (b.vy / sp) * 0.4;
        }
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -10) b.x = w + 10;
        if (b.x > w + 10) b.x = -10;
        if (b.y < -10) b.y = h + 10;
        if (b.y > h + 10) b.y = -10;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      for (let i = 0; i < boids.length; i++) {
        for (let j = i + 1; j < boids.length; j++) {
          const a = boids[i];
          const o = boids[j];
          const d = Math.hypot(a.x - o.x, a.y - o.y);
          if (d < 55) {
            ctx.strokeStyle = `rgba(${accent}, ${0.08 * (1 - d / 55)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }

      for (const b of boids) {
        const ang = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(ang);
        ctx.fillStyle = `rgba(${accent}, 0.35)`;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(-4, 3);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    let raf = 0;
    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    spawn();

    if (reduceMotion) {
      step();
      draw();
    } else {
      loop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        raf = requestAnimationFrame(loop);
      }
    };
    const onResize = () => resize();
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= h;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
