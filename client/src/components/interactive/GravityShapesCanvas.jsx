import React, { useRef, useEffect } from 'react';

/**
 * GravityShapesCanvas
 * Interactive 2D physics canvas featuring the exact Google shapes from the reference:
 * - Bright Green Rounded Square
 * - Bright Green Rounded Hexagon
 * - Pastel Pink Rounded Square
 * - Bright Orange Rounded Hexagon
 * - Google Blue Solid Circles
 * - Golden Yellow 4-Petal Clover
 *
 * Fully responsive across all devices (mobile, tablet, desktop) with:
 * - Dynamic scaling and bounds checking on resize
 * - Zero extra decorative lines or logos
 * - Physics momentum, object-to-object collisions, and dispersion
 */
export const GravityShapesCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    shapes: [],
    draggedShape: null,
    dragOffset: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0, time: 0 },
    mouseVelocity: { x: 0, y: 0 },
    animationId: null,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Sampling colors directly from reference
    const palette = {
      green: '#32D77D',
      orange: '#FF7E36',
      pink: '#F9B7F9',
      blue: '#5490F8',
      yellow: '#F9BD38'
    };

    const initOrResizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      stateRef.current.width = w;
      stateRef.current.height = h;

      // Responsive scale:
      // Mobile (<600px): ~0.38 - 0.5 (shape ~55-75px)
      // Tablet (600-900px): ~0.55 - 0.75 (shape ~85-115px)
      // Desktop (>900px): ~0.85 - 1.0 (shape ~130-155px)
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;
      const baseScale = isMobile
        ? Math.max(w / 700, 0.38)
        : isTablet
        ? Math.max(w / 1100, 0.6)
        : Math.min(Math.max(w / 1350, 0.8), 1.0);

      const shapeSize = 150 * baseScale;
      const halfSize = shapeSize / 2;
      const floorBaseline = h * 0.94; // natural ground near bottom

      if (stateRef.current.shapes.length === 0) {
        // Initialize shapes with positions adapted for screen width
        const count = 7;
        const spacing = isMobile ? (w - 40) / count : shapeSize + 12;
        const startX = isMobile ? 30 : Math.max(halfSize + 20, (w - shapeSize * 5) / 2);

        const shapeDefs = [
          // 0. Huge Organic Green Shape (Colossal, interactive, and movable)
          {
            type: 'huge-blob',
            width: 580 * baseScale,
            height: 500 * baseScale,
            hitRadius: 260 * baseScale,
            color: palette.green,
            x: isMobile ? w * 0.5 : w * 0.74,
            y: isMobile ? h * 0.38 : h * 0.42,
            mass: 12.0
          },
          // 1. Bright Green Rounded Square
          {
            type: 'square',
            size: shapeSize,
            cornerRadius: 36 * baseScale,
            hitRadius: halfSize,
            color: palette.green,
            x: isMobile ? w * 0.15 : startX,
            y: floorBaseline - halfSize,
            mass: 3.2
          },
          // 2. Bright Green Rounded Hexagon
          {
            type: 'hexagon',
            radius: 76 * baseScale,
            cornerRadius: 22 * baseScale,
            hitRadius: 76 * baseScale,
            color: palette.green,
            x: isMobile ? w * 0.18 : startX,
            y: isMobile ? floorBaseline - halfSize * 2 - 20 : floorBaseline - shapeSize - (76 * baseScale) - 8,
            mass: 2.8
          },
          // 3. Pastel Pink Rounded Square
          {
            type: 'square',
            size: shapeSize,
            cornerRadius: 38 * baseScale,
            hitRadius: halfSize,
            color: palette.pink,
            x: isMobile ? w * 0.42 : startX + spacing,
            y: floorBaseline - halfSize,
            mass: 3.2
          },
          // 4. Bright Orange Rounded Hexagon
          {
            type: 'hexagon',
            radius: 78 * baseScale,
            cornerRadius: 24 * baseScale,
            hitRadius: 78 * baseScale,
            color: palette.orange,
            x: isMobile ? w * 0.45 : startX + spacing * 0.9,
            y: isMobile ? floorBaseline - halfSize * 2 - 30 : floorBaseline - shapeSize - (78 * baseScale) - 10,
            mass: 2.9
          },
          // 5. Google Blue Solid Circle
          {
            type: 'circle',
            radius: 76 * baseScale,
            hitRadius: 76 * baseScale,
            color: palette.blue,
            x: isMobile ? w * 0.72 : startX + spacing * 2,
            y: floorBaseline - (76 * baseScale),
            mass: 3.0
          },
          // 6. Golden Yellow 4-Petal Clover
          {
            type: 'clover',
            size: 156 * baseScale,
            hitRadius: 78 * baseScale,
            color: palette.yellow,
            x: isMobile ? w * 0.82 : startX + spacing * 3,
            y: floorBaseline - (78 * baseScale),
            mass: 3.1
          },
          // 7. Right Google Blue Solid Circle
          {
            type: 'circle',
            radius: 78 * baseScale,
            hitRadius: 78 * baseScale,
            color: palette.blue,
            x: isMobile ? w * 0.9 : startX + spacing * 4,
            y: isMobile ? floorBaseline - (78 * baseScale) - 40 : floorBaseline - (78 * baseScale) - 30,
            mass: 3.0
          }
        ];

        stateRef.current.shapes = shapeDefs.map((def, idx) => ({
          ...def,
          id: idx,
          baseScale,
          vx: 0,
          vy: 0,
          angle: 0,
          vAngle: 0,
          isDragging: false,
          restitution: 0.82
        }));
      } else {
        // Update shape sizes and hitRadii on screen resize
        stateRef.current.shapes.forEach((s) => {
          s.baseScale = baseScale;
          if (s.type === 'huge-blob') {
            s.width = 580 * baseScale;
            s.height = 500 * baseScale;
            s.hitRadius = 260 * baseScale;
          } else if (s.type === 'square') {
            s.size = shapeSize;
            s.cornerRadius = 36 * baseScale;
            s.hitRadius = halfSize;
          } else if (s.type === 'hexagon') {
            s.radius = 76 * baseScale;
            s.cornerRadius = 22 * baseScale;
            s.hitRadius = 76 * baseScale;
          } else if (s.type === 'circle') {
            s.radius = 76 * baseScale;
            s.hitRadius = 76 * baseScale;
          } else if (s.type === 'clover') {
            s.size = 156 * baseScale;
            s.hitRadius = 78 * baseScale;
          }
          // Clamp within new screen boundaries
          s.x = Math.max(s.hitRadius, Math.min(w - s.hitRadius, s.x));
          s.y = Math.max(s.hitRadius, Math.min(h - s.hitRadius, s.y));
        });
      }
    };

    initOrResizeCanvas();

    const gravity = 0.36;
    const friction = 0.985;
    const floorBounce = 0.7;

    // Helper: Draw rounded hexagon
    const drawRoundedHexagon = (c, r, cr) => {
      const sides = 6;
      const angle = (Math.PI * 2) / sides;
      const vertices = [];
      for (let i = 0; i < sides; i++) {
        const a = i * angle - Math.PI / 2;
        vertices.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
      }
      c.beginPath();
      for (let i = 0; i < sides; i++) {
        const current = vertices[i];
        const next = vertices[(i + 1) % sides];
        const prev = vertices[(i - 1 + sides) % sides];

        const v1 = { x: prev.x - current.x, y: prev.y - current.y };
        const v2 = { x: next.x - current.x, y: next.y - current.y };
        const len1 = Math.hypot(v1.x, v1.y);
        const len2 = Math.hypot(v2.x, v2.y);

        const p1 = { x: current.x + (v1.x / len1) * cr, y: current.y + (v1.y / len1) * cr };
        const p2 = { x: current.x + (v2.x / len2) * cr, y: current.y + (v2.y / len2) * cr };

        if (i === 0) c.moveTo(p1.x, p1.y);
        else c.lineTo(p1.x, p1.y);
        c.quadraticCurveTo(current.x, current.y, p2.x, p2.y);
      }
      c.closePath();
      c.fill();
    };

    // Helper: Draw 4-Petal Clover
    const drawClover = (c, s, baseScale) => {
      const r = s * 0.3;
      const d = s * 0.24;
      c.beginPath();
      c.arc(0, -d, r, 0, Math.PI * 2);
      c.arc(d, 0, r, 0, Math.PI * 2);
      c.arc(0, d, r, 0, Math.PI * 2);
      c.arc(-d, 0, r, 0, Math.PI * 2);
      c.roundRect(-d, -d, d * 2, d * 2, 16 * (baseScale || 1));
      c.fill();
    };

    // Physics render loop
    const animate = () => {
      const w = stateRef.current.width;
      const h = stateRef.current.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const shapes = stateRef.current.shapes;

      // 1. Move & Canvas Edge Bounds
      shapes.forEach((s) => {
        if (!s.isDragging) {
          s.vy += gravity;

          s.x += s.vx;
          s.y += s.vy;
          s.angle += s.vAngle;

          s.vx *= friction;
          s.vy *= friction;
          s.vAngle *= friction;

          const r = s.hitRadius;

          // Bottom floor
          if (s.y + r > h) {
            s.y = h - r;
            s.vy = -s.vy * floorBounce;
            s.vx *= 0.94;
            if (Math.abs(s.vy) < 0.4) s.vy = 0;
          }

          // Top ceiling
          if (s.y - r < 0) {
            s.y = r;
            s.vy = -s.vy * floorBounce;
          }

          // Left wall
          if (s.x - r < 0) {
            s.x = r;
            s.vx = -s.vx * floorBounce;
          }

          // Right wall
          if (s.x + r > w) {
            s.x = w - r;
            s.vx = -s.vx * floorBounce;
          }
        }
      });

      // 2. Object-to-Object Collisions & Momentum Dispersion
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const s1 = shapes[i];
          const s2 = shapes[j];

          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = s1.hitRadius + s2.hitRadius;

          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist;
            const ny = dy / dist;

            const overlap = minDist - dist;
            const totalMass = s1.mass + s2.mass;

            if (!s1.isDragging && !s2.isDragging) {
              s1.x -= nx * overlap * (s2.mass / totalMass);
              s1.y -= ny * overlap * (s2.mass / totalMass);
              s2.x += nx * overlap * (s1.mass / totalMass);
              s2.y += ny * overlap * (s1.mass / totalMass);
            } else if (s1.isDragging && !s2.isDragging) {
              s2.x += nx * overlap;
              s2.y += ny * overlap;
            } else if (!s1.isDragging && s2.isDragging) {
              s1.x -= nx * overlap;
              s1.y -= ny * overlap;
            }

            const vRelX = s2.vx - s1.vx;
            const vRelY = s2.vy - s1.vy;
            const velAlongNormal = vRelX * nx + vRelY * ny;

            if (velAlongNormal < 0) {
              const restitution = 0.82;
              const impulse = -(1 + restitution) * velAlongNormal / (1 / s1.mass + 1 / s2.mass);
              const dispersionMultiplier = 1.25;
              const finalImpulse = impulse * dispersionMultiplier;

              const ix = finalImpulse * nx;
              const iy = finalImpulse * ny;

              if (!s1.isDragging) {
                s1.vx -= ix / s1.mass;
                s1.vy -= iy / s1.mass;
                s1.vAngle -= (nx * vRelY - ny * vRelX) * 0.012;
              }

              if (!s2.isDragging) {
                s2.vx += ix / s2.mass;
                s2.vy += iy / s2.mass;
                s2.vAngle += (nx * vRelY - ny * vRelX) * 0.012;
              }
            }
          }
        }
      }

      // 3. Render Shapes
      shapes.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        ctx.fillStyle = s.color;
        ctx.shadowColor = 'rgba(17, 19, 24, 0.08)';
        ctx.shadowBlur = s.isDragging ? 26 : 10;
        ctx.shadowOffsetY = s.isDragging ? 14 : 4;

        if (s.type === 'huge-blob') {
          // Draw the Huge Organic Green Shape with smooth organic contours
          ctx.beginPath();
          const hw = s.width / 2;
          const hh = s.height / 2;
          ctx.roundRect(-hw, -hh, s.width, s.height, [hw * 0.45, hw * 0.65, hw * 0.4, hw * 0.55]);
          ctx.fill();
        } else if (s.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 'square') {
          ctx.beginPath();
          ctx.roundRect(-s.size / 2, -s.size / 2, s.size, s.size, s.cornerRadius);
          ctx.fill();
        } else if (s.type === 'hexagon') {
          drawRoundedHexagon(ctx, s.radius, s.cornerRadius);
        } else if (s.type === 'clover') {
          drawClover(ctx, s.size, s.baseScale);
        }

        ctx.restore();
      });

      stateRef.current.animationId = requestAnimationFrame(animate);
    };

    stateRef.current.animationId = requestAnimationFrame(animate);

    // Pointer handlers
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };

    const isHit = (pos, s) => {
      const dx = pos.x - s.x;
      const dy = pos.y - s.y;
      return Math.sqrt(dx * dx + dy * dy) <= s.hitRadius + 6;
    };

    const handlePointerDown = (e) => {
      const pos = getPos(e);
      const shapes = stateRef.current.shapes;

      for (let i = shapes.length - 1; i >= 0; i--) {
        const s = shapes[i];
        if (isHit(pos, s)) {
          s.isDragging = true;
          s.vx = 0;
          s.vy = 0;
          stateRef.current.draggedShape = s;
          stateRef.current.dragOffset = { x: pos.x - s.x, y: pos.y - s.y };
          stateRef.current.lastMouse = { x: pos.x, y: pos.y, time: performance.now() };
          canvas.style.cursor = 'grabbing';
          break;
        }
      }
    };

    const handlePointerMove = (e) => {
      const pos = getPos(e);
      const dragged = stateRef.current.draggedShape;

      if (dragged) {
        dragged.x = pos.x - stateRef.current.dragOffset.x;
        dragged.y = pos.y - stateRef.current.dragOffset.y;

        const now = performance.now();
        const dt = Math.max(now - stateRef.current.lastMouse.time, 8);
        stateRef.current.mouseVelocity = {
          x: (pos.x - stateRef.current.lastMouse.x) / (dt / 16),
          y: (pos.y - stateRef.current.lastMouse.y) / (dt / 16)
        };
        stateRef.current.lastMouse = { x: pos.x, y: pos.y, time: now };
      } else {
        const isHover = stateRef.current.shapes.some((s) => isHit(pos, s));
        canvas.style.cursor = isHover ? 'grab' : 'default';
      }
    };

    const handlePointerUp = () => {
      const dragged = stateRef.current.draggedShape;
      if (dragged) {
        dragged.isDragging = false;
        dragged.vx = stateRef.current.mouseVelocity.x * 0.85;
        dragged.vy = stateRef.current.mouseVelocity.y * 0.85;
        dragged.vAngle = (stateRef.current.mouseVelocity.x || 0.1) * 0.015;
        stateRef.current.draggedShape = null;
        canvas.style.cursor = 'grab';
      }
    };

    window.addEventListener('resize', initOrResizeCanvas);
    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      if (stateRef.current.animationId) {
        cancelAnimationFrame(stateRef.current.animationId);
      }
      window.removeEventListener('resize', initOrResizeCanvas);
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      canvas.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ touchAction: 'none' }}
    />
  );
};

export default GravityShapesCanvas;
