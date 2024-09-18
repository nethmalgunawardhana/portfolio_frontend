<template>
  <div class="bg-navy-900 text-white min-h-screen flex flex-col">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span class="text-blue-600">I'M</span> <span class="text-white">Nethmal<br>Gunawardhana</span>
          </h1>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white flex items-center justify-center lg:justify-start mb-4">
            I'M A <span class="text-blue-600 ml-2"><Hello /></span>
          </h2>
          
          <p class="mb-6 text-gray-300 text-sm sm:text-base">
            Passionate about creating beautiful and functional designs. Let's bring your ideas to life!
          </p>
          <button class="bg-gradient-to-b from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg mb-6">
            GET IN TOUCH
          </button>
          
          <div class="mt-4"> 
            <SocialIcon />
          </div>
        </div>
        
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <img src="https://dpwalay.net/wp-content/uploads/2023/09/bad-boy-dp-for-whatsapp-11.jpg" alt="Nethmal" class="rounded-lg w-full shadow-2xl" />
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
</style>