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
  zIndex: -1,
  backgroundColor: '#000', 
};

const dots = ref([]);

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDots();
};

const initDots = () => {
  const canvas = canvasRef.value;
  dots.value = [];
  
  // Adjust spacing based on screen width for better responsiveness
  const spacing = window.innerWidth < 600 ? 50 : 30;
  
  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      dots.value.push({ x, y, radius: 2, alpha: 0.5 });
    }
  }
};

const drawDots = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.value.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 200, ${dot.alpha})`;
    ctx.fill();
  });
};

// For both mouse and touch move events
const handlePointerMove = (event) => {
  const mouseX = event.clientX || event.touches?.[0]?.clientX;
  const mouseY = event.clientY || event.touches?.[0]?.clientY;

  dots.value.forEach((dot) => {
    const dx = mouseX - dot.x;
    const dy = mouseY - dot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      dot.alpha = Math.max(0.1, 1 - distance / 100);
    } else {
      dot.alpha = 0.5;
    }
  });
  drawDots();
};

onMounted(() => {
  window.addEventListener('resize', resizeCanvas);
  canvasRef.value.addEventListener('mousemove', handlePointerMove);
  canvasRef.value.addEventListener('touchmove', handlePointerMove, { passive: true });

  resizeCanvas();
  drawDots();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  canvasRef.value.removeEventListener('mousemove', handlePointerMove);
  canvasRef.value.removeEventListener('touchmove', handlePointerMove);
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
