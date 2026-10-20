import React, { useRef, useEffect } from 'react';

/**
 * GravityShapesCanvas
 * 2D rigid-body physics canvas with object-to-object collision resolution,
 * momentum transfer, impact scattering (dispersion), and interactive drag/fling.
 * Features stylized Bats, Balls, and vibrant geometric objects in eye-catching colors.
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

    // Vibrant eye-catching color palette
    const colors = {
      electricBlue: '#2979FF',
      solarYellow: '#FFD600',
      neonPink: '#FF1776',
      emeraldGreen: '#00E676',
      electricViolet: '#7C4DFF',
      sunsetOrange: '#FF5722',
      crimsonRed: '#D50000',
      warmWood: '#D7A76E',
      nearBlack: '#111318'
    };

    // Initialize shapes: Bats, Balls, and Geometric items
    const shapeDefs = [
      // 1. Cricket/Baseball Bat (draggable & swingable!)
      {
        type: 'bat',
        width: 30,
        height: 140,
        radius: 46, // collision hit radius
        color: colors.warmWood,
        accentColor: colors.electricBlue,
        x: width * 0.22,
        y: height * 0.45,
        mass: 3.5,
        restitution: 0.92
      },
      // 2. Red Cricket Ball with white seams
      {
        type: 'ball',
        radius: 28,
        color: colors.crimsonRed,
        seamColor: '#FFFFFF',
        x: width * 0.32,
        y: height * 0.3,
        mass: 1.2,
        restitution: 0.88
      },
      // 3. Tennis / Neon Green Ball
      {
        type: 'ball',
        radius: 25,
        color: colors.emeraldGreen,
        seamColor: '#FFFFFF',
        x: width * 0.45,
        y: height * 0.2,
        mass: 1.0,
        restitution: 0.9
      },
      // 4. Electric Blue Sports Ball
      {
        type: 'ball',
        radius: 34,
        color: colors.electricBlue,
        seamColor: '#FFD600',
        x: width * 0.65,
        y: height * 0.35,
        mass: 1.5,
        restitution: 0.85
      },
      // 5. Solar Yellow Pill
      {
        type: 'pill',
        width: 100,
        height: 44,
        radius: 38,
        color: colors.solarYellow,
        x: width * 0.78,
        y: height * 0.28,
        mass: 2.0,
        restitution: 0.8
      },
      // 6. Neon Pink Rounded Square
      {
        type: 'square',
        size: 64,
        radius: 34,
        color: colors.neonPink,
        x: width * 0.15,
        y: height * 0.65,
        mass: 2.2,
        restitution: 0.78
      },
      // 7. Electric Violet Hollow Ring
      {
        type: 'ring',
        radius: 38,
        strokeWidth: 9,
        color: colors.electricViolet,
        x: width * 0.84,
        y: height * 0.62,
        mass: 1.8,
        restitution: 0.82
      },
      // 8. Sunset Orange Star / Polygon
      {
        type: 'star',
        radius: 32,
        color: colors.sunsetOrange,
        x: width * 0.38,
        y: height * 0.72,
        mass: 1.4,
        restitution: 0.84
      },
      // 9. Extra bouncy small ball
      {
        type: 'ball',
        radius: 20,
        color: colors.neonPink,
        seamColor: '#FFFFFF',
        x: width * 0.55,
        y: height * 0.6,
        mass: 0.8,
        restitution: 0.95
      }
    ];

    stateRef.current.shapes = shapeDefs.map((def, idx) => ({
      ...def,
      id: idx,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3,
      angle: (Math.random() - 0.5) * 0.8,
      vAngle: (Math.random() - 0.5) * 0.04,
      isDragging: false
    }));

    const gravity = 0.35;
    const airFriction = 0.988;
    const wallBounce = 0.75;

    // Main physics simulation & render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const shapes = stateRef.current.shapes;

      // 1. Physics update & Wall Collisions
      shapes.forEach((s) => {
        if (!s.isDragging) {
          s.vy += gravity;

          s.x += s.vx;
          s.y += s.vy;
          s.angle += s.vAngle;

          s.vx *= airFriction;
          s.vy *= airFriction;
          s.vAngle *= airFriction;

          const r = s.radius;

          // Floor
          if (s.y + r > height) {
            s.y = height - r;
            s.vy = -s.vy * wallBounce;
            s.vx *= 0.94; // floor roll friction
            if (Math.abs(s.vy) < 0.4) s.vy = 0;
          }

          // Ceiling
          if (s.y - r < 0) {
            s.y = r;
            s.vy = -s.vy * wallBounce;
          }

          // Left Wall
          if (s.x - r < 0) {
            s.x = r;
            s.vx = -s.vx * wallBounce;
          }

          // Right Wall
          if (s.x + r > width) {
            s.x = width - r;
            s.vx = -s.vx * wallBounce;
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
          const minDist = s1.radius + s2.radius;

          if (dist < minDist && dist > 0.001) {
            // Collision normal
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate overlapping objects so they don't stick
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

            // Relative velocity
            const vRelX = s2.vx - s1.vx;
            const vRelY = s2.vy - s1.vy;
            const velAlongNormal = vRelX * nx + vRelY * ny;

            // Only collide if moving towards each other
            if (velAlongNormal < 0) {
              const restitution = Math.max(s1.restitution, s2.restitution);
              const impulseMag = -(1 + restitution) * velAlongNormal / (1 / s1.mass + 1 / s2.mass);

              // Extra dispersion kick on high impact (e.g. bat hit)
              const dispersionMultiplier = (s1.type === 'bat' || s2.type === 'bat') ? 1.45 : 1.1;
              const finalImpulse = impulseMag * dispersionMultiplier;

              const ix = finalImpulse * nx;
              const iy = finalImpulse * ny;

              if (!s1.isDragging) {
                s1.vx -= ix / s1.mass;
                s1.vy -= iy / s1.mass;
                s1.vAngle -= (nx * vRelY - ny * vRelX) * 0.01;
              }

              if (!s2.isDragging) {
                s2.vx += ix / s2.mass;
                s2.vy += iy / s2.mass;
                s2.vAngle += (nx * vRelY - ny * vRelX) * 0.01;
              }
            }
          }
        }
      }

      // 3. Render all shapes with shadows and eye-catching styling
      shapes.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        // Soft drop shadow
        ctx.shadowColor = 'rgba(17, 19, 24, 0.12)';
        ctx.shadowBlur = s.isDragging ? 26 : 14;
        ctx.shadowOffsetY = s.isDragging ? 16 : 8;

        if (s.type === 'bat') {
          // Render Cricket/Baseball Bat
          // Handle
          ctx.fillStyle = '#111318';
          ctx.beginPath();
          ctx.roundRect(-7, -65, 14, 45, 6);
          ctx.fill();

          // Grip wrap marks
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          for (let gy = -55; gy <= -25; gy += 8) {
            ctx.beginPath();
            ctx.moveTo(-6, gy);
            ctx.lineTo(6, gy + 3);
            ctx.stroke();
          }

          // Bat Blade (Main wood paddle with color accent)
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.roundRect(-15, -20, 30, 85, 12);
          ctx.fill();

          // Center accent stripe
          ctx.fillStyle = s.accentColor;
          ctx.beginPath();
          ctx.roundRect(-5, -12, 10, 70, 4);
          ctx.fill();

        } else if (s.type === 'ball') {
          // Render Ball with 3D spherical gradient & seam stitches
          const radGrad = ctx.createRadialGradient(-s.radius * 0.3, -s.radius * 0.3, 2, 0, 0, s.radius);
          radGrad.addColorStop(0, '#FFFFFF');
          radGrad.addColorStop(0.3, s.color);
          radGrad.addColorStop(1, s.color);

          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();

          // Ball seam curve
          ctx.strokeStyle = s.seamColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 2]);
          ctx.beginPath();
          ctx.arc(s.radius * 0.25, 0, s.radius * 0.85, Math.PI * 0.6, Math.PI * 1.4);
          ctx.stroke();
          ctx.setLineDash([]);

        } else if (s.type === 'pill') {
          // Rounded pill/capsule
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.roundRect(-s.width / 2, -s.height / 2, s.width, s.height, s.height / 2);
          ctx.fill();

          // Accent ring inside pill
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.arc(s.width * 0.22, 0, s.height * 0.28, 0, Math.PI * 2);
          ctx.fill();

        } else if (s.type === 'square') {
          // Rounded square
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.roundRect(-s.size / 2, -s.size / 2, s.size, s.size, 18);
          ctx.fill();

          // Inner cutout detail
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.beginPath();
          ctx.roundRect(-s.size * 0.25, -s.size * 0.25, s.size * 0.5, s.size * 0.5, 8);
          ctx.fill();

        } else if (s.type === 'ring') {
          // Hollow ring
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.strokeWidth;
          ctx.beginPath();
          ctx.arc(0, 0, s.radius - s.strokeWidth / 2, 0, Math.PI * 2);
          ctx.stroke();

        } else if (s.type === 'star') {
          // Playful 5-point star
          ctx.fillStyle = s.color;
          ctx.beginPath();
          const points = 5;
          const outerR = s.radius;
          const innerR = s.radius * 0.5;
          for (let p = 0; p < points * 2; p++) {
            const r = p % 2 === 0 ? outerR : innerR;
            const a = (p * Math.PI) / points - Math.PI / 2;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      stateRef.current.animationId = requestAnimationFrame(animate);
    };

    stateRef.current.animationId = requestAnimationFrame(animate);

    // Pointer events for drag, swing & throw
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };

    const isHit = (pos, s) => {
      const dx = pos.x - s.x;
      const dy = pos.y - s.y;
      return Math.sqrt(dx * dx + dy * dy) <= s.radius + 10;
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
        // Fling with velocity
        dragged.vx = stateRef.current.mouseVelocity.x * 0.9;
        dragged.vy = stateRef.current.mouseVelocity.y * 0.9;
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
