<template>
    <div class="bg-navy-900 text-white min-h-screen flex items-center">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-7xl font-bold text-blue-600 mb-4">
                I'M
              <span class="text-white">  Nethmal Gunawardhana </span>
            </h1>
            <h2 class="text-3xl md:text-5xl font-bold text-white flex items-center">
              I'M A &nbsp <Hello />
            </h2>
           
            <p class="mb-6 text-gray-300">
              Passionate about creating beautiful and functional designs. Let's bring your ideas to life!
            </p>
            <button class="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-[0_4px_8px_rgba(255,255,255,0.3),0_-4px_8px_rgba(255,255,255,0.3),4px_0_8px_rgba(255,255,255,0.3),-4px_0_8px_rgba(255,255,255,0.3)]">
              GET IN TOUCH
            </button>
          </div>
          
          <!-- Increased margin between text and image -->
          <div class="md:w-1/2 md:ml-10 mr-8 flex justify-end">
            <div class="relative w-3/4">
              <img src="https://dpwalay.net/wp-content/uploads/2023/09/bad-boy-dp-for-whatsapp-11.jpg" alt="Nethmal" class="rounded-lg w-full animated-border" />
              <span class="border-animation"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Hello from './Hello.vue';
  </script>
  
  <style scoped>
  .animated-border {
    position: relative;
    z-index: 1;
    border: 5px solid transparent;
    border-radius: 8px;
  }
  
  .animated-border:hover {
    animation: borderAnimation 2s linear infinite;
  }
  
  .border-animation {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 10px solid transparent;
    background: linear-gradient(90deg, rgba(67, 119, 222, 0.71) 0%, rgb(31, 107, 214) 100%);
    background-size: 200% 200%;
    z-index: 0;
  }
  
  @keyframes borderAnimation {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  </style>
  