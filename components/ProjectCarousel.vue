<template>
    <section class="py-16 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>
        <div class="carousel">
          <div 
            v-for="(project, index) in projects" 
            :key="index" 
            class="carousel-item"
          >
            <div 
              class="relative group overflow-hidden rounded-lg shadow-lg"
              @mouseenter="project.isHovered = true"
              @mouseleave="project.isHovered = false"
            >
              <img 
                :src="project.image" 
                :alt="project.name" 
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div 
                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              >
                <a 
                  :href="project.github" 
                  target="_blank" 
                  class="text-white text-2xl mr-4"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a 
                  :href="project.demo" 
                  target="_blank" 
                  class="text-white text-2xl"
                >
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <p class="text-center text-white mt-4">{{ project.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const projects = ref([
    {
      name: 'Project One',
      image: '/path/to/project1-image.jpg',
      github: 'https://github.com/user/project1',
      demo: 'https://user.github.io/project1',
      isHovered: false,
    },
    {
      name: 'Project Two',
      image: '/path/to/project2-image.jpg',
      github: 'https://github.com/user/project2',
      demo: 'https://user.github.io/project2',
      isHovered: false,
    },
    // Add more projects as needed
  ])
  
  </script>
  
  <style scoped>
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
  }
  
  .carousel-item {
    flex: 0 0 80%;
    scroll-snap-align: center;
  }
  
  .carousel-item img {
    border-radius: 0.5rem;
  }
  </style>
  