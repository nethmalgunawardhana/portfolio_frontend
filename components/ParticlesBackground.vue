<template>
  <canvas
    ref="canvasRef"
    :style="canvasStyle"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvasRef = ref(null);

const canvasStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: 1,
  background: 'transparent',
  pointerEvents: 'none'
};

const particles = ref([]);
const mouse = ref({ x: 0, y: 0 });
let animationId = null;

const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.size = Math.random() * 4 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.6 + 0.4;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.02 + 0.01;
    this.distance = Math.random() * 200 + 50;
  }

  update(canvas) {
    // Floating animation
    this.angle += this.angleSpeed;
    this.x = this.originalX + Math.cos(this.angle) * 20;
    this.y = this.originalY + Math.sin(this.angle) * 15;

    // Move particles
    this.x += this.speedX * 0.5;
    this.y += this.speedY * 0.5;

    // Mouse interaction
    const dx = mouse.value.x - this.x;
    const dy = mouse.value.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      this.x -= dx * force * 0.03;
      this.y -= dy * force * 0.03;
      this.opacity = Math.min(1, this.opacity + force * 0.3);
    } else {
      this.opacity = Math.max(0.4, this.opacity - 0.02);
    }

    // Wrap around screen
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // Add outer glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add inner bright core
    ctx.shadowBlur = 0;
    ctx.globalAlpha = Math.min(1, this.opacity + 0.3);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
};

const initParticles = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  particles.value = [];
  
  // Adjust particle count based on screen size
  const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
  const maxParticles = window.innerWidth < 768 ? 50 : 100;
  const finalCount = Math.min(particleCount, maxParticles);
  
  for (let i = 0; i < finalCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.value.push(new Particle(x, y));
  }
};

const drawConnections = (ctx) => {
  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[i].x - particles.value[j].x;
      const dy = particles.value[i].y - particles.value[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        ctx.save();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - distance / 120)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(particles.value[i].x, particles.value[i].y);
        ctx.lineTo(particles.value[j].x, particles.value[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw particles
  particles.value.forEach(particle => {
    particle.update(canvas);
    particle.draw(ctx);
  });
  
  // Draw connections between nearby particles
  drawConnections(ctx);
  
  animationId = requestAnimationFrame(animate);
};

const handleMouseMove = (event) => {
  mouse.value.x = event.clientX;
  mouse.value.y = event.clientY;
};

const handleTouchMove = (event) => {
  if (event.touches && event.touches.length > 0) {
    mouse.value.x = event.touches[0].clientX;
    mouse.value.y = event.touches[0].clientY;
  }
};

onMounted(() => {
  if (!canvasRef.value) return;
  
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  
  resizeCanvas();
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
