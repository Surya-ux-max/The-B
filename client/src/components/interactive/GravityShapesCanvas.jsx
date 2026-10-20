import React, { useRef, useEffect } from 'react';

/**
 * GravityShapesCanvas
 * Interactive 2D physics canvas featuring the EXACT shapes, sizes, and colors
 * from the Google Labs reference composition:
 * 1. Bright Green Rounded Square (150x150)
 * 2. Bright Green Rounded Hexagon (~150)
 * 3. Pastel Pink Rounded Square (150x150)
 * 4. Bright Orange Rounded Hexagon (~155)
 * 5. Google Blue Solid Circle (152 diameter)
 * 6. Golden Yellow 4-Petal Clover / Quatrefoil (~156)
 * 7. Google Blue Solid Circle (156 diameter)
 * Plus the subtle top outline rings and floor baseline.
 */
export const GravityShapesCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    shapes: [],
    draggedShape: null,
    dragOffset: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0, time: 0 },
    mouseVelocity: { x: 0, y: 0 },
    animationId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Exact color palette sampled directly from the user's reference image
    const palette = {
      green: '#32D77D',
      orange: '#FF7E36',
      pink: '#F9B7F9',
      blue: '#5490F8',
      yellow: '#F9BD38',
      line: '#D7D1C7'
    };

    // Calculate responsive base scale (around 150-160px on desktop)
    const baseScale = Math.min(Math.max(width / 1200, 0.72), 1.05);

    // Initial positions modeled directly after the user's reference layout
    const floorBaseline = height * 0.88;
    const shapeSize = 150 * baseScale;
    const halfSize = shapeSize / 2;

    const shapeDefs = [
      // 1. Bottom Left: Bright Green Rounded Square
      {
        type: 'square',
        size: shapeSize,
        cornerRadius: 36 * baseScale,
        hitRadius: halfSize,
        color: palette.green,
        x: Math.max(halfSize + 20, width * 0.14),
        y: floorBaseline - halfSize,
        mass: 3.2
      },
      // 2. Top Left: Bright Green Rounded Hexagon
      {
        type: 'hexagon',
        radius: 76 * baseScale,
        cornerRadius: 22 * baseScale,
        hitRadius: 76 * baseScale,
        color: palette.green,
        x: Math.max(halfSize + 20, width * 0.14),
        y: floorBaseline - shapeSize - (76 * baseScale) - 6,
        mass: 2.8
      },
      // 3. Bottom Second: Pastel Pink Rounded Square
      {
        type: 'square',
        size: shapeSize,
        cornerRadius: 38 * baseScale,
        hitRadius: halfSize,
        color: palette.pink,
        x: Math.max(halfSize + 20, width * 0.14) + shapeSize + 8,
        y: floorBaseline - halfSize,
        mass: 3.2
      },
      // 4. Top Middle: Bright Orange Rounded Hexagon
      {
        type: 'hexagon',
        radius: 78 * baseScale,
        cornerRadius: 24 * baseScale,
        hitRadius: 78 * baseScale,
        color: palette.orange,
        x: Math.max(halfSize + 20, width * 0.14) + shapeSize * 0.88,
        y: floorBaseline - shapeSize - (78 * baseScale) - 10,
        mass: 2.9
      },
      // 5. Bottom Third: Google Blue Solid Circle
      {
        type: 'circle',
        radius: 76 * baseScale,
        hitRadius: 76 * baseScale,
        color: palette.blue,
        x: Math.max(halfSize + 20, width * 0.14) + shapeSize * 2 + 18,
        y: floorBaseline - (76 * baseScale),
        mass: 3.0
      },
      // 6. Bottom Fourth: Golden Yellow 4-Petal Clover
      {
        type: 'clover',
        size: 156 * baseScale,
        hitRadius: 78 * baseScale,
        color: palette.yellow,
        x: Math.max(halfSize + 20, width * 0.14) + shapeSize * 3 + 26,
        y: floorBaseline - (78 * baseScale),
        mass: 3.1
      },
      // 7. Far Right: Google Blue Solid Circle
      {
        type: 'circle',
        radius: 78 * baseScale,
        hitRadius: 78 * baseScale,
        color: palette.blue,
        x: Math.max(halfSize + 20, width * 0.14) + shapeSize * 4 + 40,
        y: floorBaseline - (78 * baseScale) - 40,
        mass: 3.0
      }
    ];

    stateRef.current.shapes = shapeDefs.map((def, idx) => ({
      ...def,
      id: idx,
      vx: 0,
      vy: 0,
      angle: 0,
      vAngle: 0,
      isDragging: false,
      restitution: 0.8
    }));

    const gravity = 0.38;
    const friction = 0.985;
    const floorBounce = 0.68;

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

    // Helper: Draw 4-Petal Clover / Quatrefoil
    const drawClover = (c, s) => {
      const r = s * 0.3;
      const d = s * 0.24;
      c.beginPath();
      c.arc(0, -d, r, 0, Math.PI * 2);
      c.arc(d, 0, r, 0, Math.PI * 2);
      c.arc(0, d, r, 0, Math.PI * 2);
      c.arc(-d, 0, r, 0, Math.PI * 2);
      c.roundRect(-d, -d, d * 2, d * 2, 16 * baseScale);
      c.fill();
    };

    // Simulation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle top outline rings (like in the screenshot)
      ctx.save();
      ctx.strokeStyle = palette.line;
      ctx.lineWidth = 1.2;
      const topRingR = 26 * baseScale;
      const topCenter = width * 0.49;
      [-1, 0, 1].forEach((offset) => {
        ctx.beginPath();
        ctx.arc(topCenter + offset * (topRingR * 1.8), 24 * baseScale, topRingR, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      // Draw subtle baseline floor (like in the screenshot)
      ctx.save();
      ctx.strokeStyle = palette.line;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, floorBaseline);
      ctx.lineTo(width, floorBaseline);
      ctx.stroke();
      ctx.restore();

      const shapes = stateRef.current.shapes;

      // 1. Move & Wall / Floor Bounds
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

          // Floor baseline
          if (s.y + r > floorBaseline) {
            s.y = floorBaseline - r;
            s.vy = -s.vy * floorBounce;
            s.vx *= 0.94;
            if (Math.abs(s.vy) < 0.4) s.vy = 0;
          }

          // Ceiling
          if (s.y - r < 0) {
            s.y = r;
            s.vy = -s.vy * floorBounce;
          }

          // Left Wall
          if (s.x - r < 0) {
            s.x = r;
            s.vx = -s.vx * floorBounce;
          }

          // Right Wall
          if (s.x + r > width) {
            s.x = width - r;
            s.vx = -s.vx * floorBounce;
          }
        }
      });

      // 2. Object-to-Object Collisions & Dispersion
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
              const dispersionMultiplier = 1.2;
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

      // 3. Render exact shapes
      shapes.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        ctx.fillStyle = s.color;
        ctx.shadowColor = 'rgba(17, 19, 24, 0.08)';
        ctx.shadowBlur = s.isDragging ? 26 : 10;
        ctx.shadowOffsetY = s.isDragging ? 14 : 4;

        if (s.type === 'circle') {
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
          drawClover(ctx, s.size);
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

    window.addEventListener('resize', updateDimensions);
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
      window.removeEventListener('resize', updateDimensions);
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
