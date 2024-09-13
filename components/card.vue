<template>
  <div class="bg-navy-900 text-white min-h-screen flex items-start pt-16"> 
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="lg:w-1/2 mb-8 lg:mb-0">
          <h1 class="text-4xl lg:text-7xl font-bold mb-4">
            <span class="text-blue-600">I'M</span> <span class="text-white">Nethmal<br>Gunawardhana</span>
          </h1>
          <h2 class="text-3xl lg:text-5xl font-bold text-white flex items-center mb-4">
            I'M A <span class="text-blue-600 ml-2"><Hello /></span>
          </h2>
          
          <p class="mb-6 text-gray-300">
            Passionate about creating beautiful and functional designs. Let's bring your ideas to life!
          </p>
          <button class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg mb-6">
            GET IN TOUCH
          </button>
          
          <div class="mt-4"> 
            <SocialIcon />
          </div>
        </div>
        
        <div class="lg:w-1/2 lg:ml-10 flex justify-center lg:justify-end">
          <div class="relative w-full max-w-md">
            <img src="https://dpwalay.net/wp-content/uploads/2023/09/bad-boy-dp-for-whatsapp-11.jpg" alt="Nethmal" class="rounded-lg w-full shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
  <bar/>
  </div>
</template>

<script setup>
import Hello from './Hello.vue';
import SocialIcon from './SocialIcon.vue';
import bar from './bar.vue'
</script>

<style scoped>

.bg-navy-900 {
  background-color: #171f30;
}

.text-blue-600 {
  color: #3182ce;
}


.example-class {
  property: value;
}

</style>