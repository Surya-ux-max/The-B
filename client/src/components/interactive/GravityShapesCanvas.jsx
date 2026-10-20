import React, { useRef, useEffect } from 'react';

/**
 * GravityShapesCanvas
 * Interactive 2D physics simulation with gravity, collisions, drag & throw mechanics
 * featuring Google Labs geometric shapes (circles, rounded squares, pills, rings).
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

  const colors = [
    '#5B95F9', // Google Blue
    '#FFCE35', // Google Yellow
    '#F6B4F0', // Google Pink
    '#34A853', // Google Green
    '#E8DED2', // Warm Beige
    '#111318'  // Near Black
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Initialize playful geometric shapes
    const shapeDefinitions = [
      { type: 'circle', radius: 46, color: '#5B95F9', x: width * 0.15, y: height * 0.25 },
      { type: 'pill', width: 110, height: 48, radius: 24, color: '#FFCE35', x: width * 0.78, y: height * 0.3 },
      { type: 'square', size: 68, radius: 18, color: '#F6B4F0', x: width * 0.22, y: height * 0.65 },
      { type: 'ring', radius: 42, strokeWidth: 10, color: '#34A853', x: width * 0.82, y: height * 0.7 },
      { type: 'circle', radius: 32, color: '#34A853', x: width * 0.35, y: height * 0.2 },
      { type: 'pill', width: 90, height: 42, radius: 21, color: '#5B95F9', x: width * 0.65, y: height * 0.78 },
      { type: 'square', size: 52, radius: 14, color: '#FFCE35', x: width * 0.1, y: height * 0.82 },
      { type: 'circle', radius: 54, color: '#F6B4F0', x: width * 0.88, y: height * 0.18 }
    ];

    stateRef.current.shapes = shapeDefinitions.map((def, idx) => ({
      ...def,
      id: idx,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2,
      angle: (Math.random() - 0.5) * 0.3,
      vAngle: (Math.random() - 0.5) * 0.02,
      isDragging: false,
      mass: def.radius || def.size || def.width || 40
    }));

    const gravity = 0.38;
    const friction = 0.985;
    const bounce = 0.72;

    // Physics update & render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const shapes = stateRef.current.shapes;

      shapes.forEach((s) => {
        if (!s.isDragging) {
          // Apply gravity
          s.vy += gravity;

          // Apply velocity
          s.x += s.vx;
          s.y += s.vy;
          s.angle += s.vAngle;

          // Air friction
          s.vx *= friction;
          s.vy *= friction;
          s.vAngle *= friction;

          // Floor collision
          const bottomBound = height - (s.radius || s.height / 2 || s.size / 2);
          if (s.y > bottomBound) {
            s.y = bottomBound;
            s.vy = -s.vy * bounce;
            s.vx *= 0.95; // floor friction
            if (Math.abs(s.vy) < 0.5) s.vy = 0;
          }

          // Ceiling collision
          const topBound = (s.radius || s.height / 2 || s.size / 2);
          if (s.y < topBound) {
            s.y = topBound;
            s.vy = -s.vy * bounce;
          }

          // Left wall collision
          const leftBound = (s.radius || s.width / 2 || s.size / 2);
          if (s.x < leftBound) {
            s.x = leftBound;
            s.vx = -s.vx * bounce;
          }

          // Right wall collision
          const rightBound = width - (s.radius || s.width / 2 || s.size / 2);
          if (s.x > rightBound) {
            s.x = rightBound;
            s.vx = -s.vx * bounce;
          }
        }

        // Draw shape with soft Google Labs tactile shadows
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        ctx.shadowColor = 'rgba(17, 19, 24, 0.08)';
        ctx.shadowBlur = s.isDragging ? 24 : 12;
        ctx.shadowOffsetY = s.isDragging ? 14 : 6;

        ctx.fillStyle = s.color;
        ctx.strokeStyle = s.color;

        if (s.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 'square') {
          ctx.beginPath();
          ctx.roundRect(-s.size / 2, -s.size / 2, s.size, s.size, s.radius);
          ctx.fill();
        } else if (s.type === 'pill') {
          ctx.beginPath();
          ctx.roundRect(-s.width / 2, -s.height / 2, s.width, s.height, s.radius);
          ctx.fill();
        } else if (s.type === 'ring') {
          ctx.lineWidth = s.strokeWidth;
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      stateRef.current.animationId = requestAnimationFrame(animate);
    };

    stateRef.current.animationId = requestAnimationFrame(animate);

    // Mouse and touch interaction handlers for drag & throw
    const getPointerPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const isInsideShape = (pos, s) => {
      const dx = pos.x - s.x;
      const dy = pos.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = s.radius || Math.max(s.width || 0, s.size || 0) / 2 || 35;
      return dist <= hitRadius + 8;
    };

    const onPointerDown = (e) => {
      const pos = getPointerPos(e);
      const shapes = stateRef.current.shapes;

      // Find top-most shape under pointer
      for (let i = shapes.length - 1; i >= 0; i--) {
        const s = shapes[i];
        if (isInsideShape(pos, s)) {
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

    const onPointerMove = (e) => {
      const pos = getPointerPos(e);
      const dragged = stateRef.current.draggedShape;

      if (dragged) {
        dragged.x = pos.x - stateRef.current.dragOffset.x;
        dragged.y = pos.y - stateRef.current.dragOffset.y;

        const now = performance.now();
        const dt = Math.max(now - stateRef.current.lastMouse.time, 10);
        stateRef.current.mouseVelocity = {
          x: (pos.x - stateRef.current.lastMouse.x) / (dt / 16),
          y: (pos.y - stateRef.current.lastMouse.y) / (dt / 16)
        };
        stateRef.current.lastMouse = { x: pos.x, y: pos.y, time: now };
      } else {
        // Change cursor to pointer if hovering over a shape
        const isHover = stateRef.current.shapes.some((s) => isInsideShape(pos, s));
        canvas.style.cursor = isHover ? 'grab' : 'default';
      }
    };

    const onPointerUp = () => {
      const dragged = stateRef.current.draggedShape;
      if (dragged) {
        dragged.isDragging = false;
        // Release with throw velocity
        dragged.vx = stateRef.current.mouseVelocity.x * 0.8;
        dragged.vy = stateRef.current.mouseVelocity.y * 0.8;
        dragged.vAngle = (stateRef.current.mouseVelocity.x || 0.1) * 0.01;
        stateRef.current.draggedShape = null;
        canvas.style.cursor = 'grab';
      }
    };

    window.addEventListener('resize', updateDimensions);
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      if (stateRef.current.animationId) {
        cancelAnimationFrame(stateRef.current.animationId);
      }
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ touchAction: 'none' }}
      title="Interactive gravity shapes — drag and toss them!"
    />
  );
};

export default GravityShapesCanvas;
