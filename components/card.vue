<template>
  <div class="bg-navy-900 text-white min-h-screen flex flex-col">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-24">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="w-full lg:w-1/2 order-2 lg:order-1 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 class="text-4xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            <span class="text-white-600">Hi,</span> 
            <span class="text-blue-600">I'M</span> <span class="text-white">Nethmal<br>Gunawardhana</span>
          </h1>
          
          <h2 class="text-4xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center justify-center lg:justify-start mb-4">
            I'M A <span class="text-blue-600 ml-2"><Hello /></span>
          </h2>
          <span class="text-gray-400 text-base sm:text-lg">Passionate IT undergraduate skilled in web development, design, and programming, seeking a software engineering internship. Eager to explore AI and machine learning while contributing to innovative projects</span>
          <div class="mt-4"> 
            <SocialIcon />
          </div>
          <button class="bg-gradient-to-b from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg mt-6">
            Download CV
          </button>
        </div>
        
        <div class="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animated-frame">
            <img src="../public/image2.jpeg" alt="Nethmal" class="rounded-lg w-full shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 py-8 mt-8">
      <AnimatedCounter />
    </div>
  </div>
</template>

<script setup>
import Hello from './Hello.vue';
import SocialIcon from './SocialIcon.vue';
import AnimatedCounter from './bar.vue'
</script>

<style scoped>
.bg-navy-900 {
  background-color: #171f30;
}

.text-blue-600 {
  color: #3182ce;
}

@media (max-width: 640px) {
  .container {
    margin-top: 10px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 1024px) {
  .lg\:ml-4 {
    margin-left: 1rem;
  }
  
  .container > div {
    margin-left: 4rem;
  }
  
  .lg\:w-1\/2:last-child {
    margin-right: 10rem;
  }
}

.animated-frame {
  position: relative;
  padding: 10px;
  overflow: hidden;
}

.animated-frame::before,
.animated-frame::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(transparent, rgba(0, 208, 255, 0.977), transparent 40%);
  animation: rotate 2s linear infinite;
  border-radius: 50%;
}

.animated-frame::after {
  background: conic-gradient(transparent, rgba(0, 255, 221, 0.636), transparent 50%);
  animation-duration: 3s;
  animation-direction: reverse;
}

.animated-frame img {
  position: relative;
  z-index: 1;
  border-radius: 8px;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>