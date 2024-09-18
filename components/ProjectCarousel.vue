<template>
  <section id="projects" class="py-16 bg-gray-900 ">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>
      <div v-if="loading" class="text-white text-center">Loading projects...</div>
      <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else class="carousel">
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
              :src="project.imageUrl"
              :alt="project.name" 
              class="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const projects = ref([])
const loading = ref(true)
const error = ref(null)

const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:5000/projects')
    projects.value = response.data.map(project => ({
      ...project,
      isHovered: false,
      imageUrl: project.image && project.image.data
        ? `data:${project.image.contentType};base64,${arrayBufferToBase64(project.image.data.data)}`
        : ''
    }))
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load projects. Please try again later.'
    loading.value = false
  }
}

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

onMounted(fetchProjects)
</script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  scrollbar-width: none;  
  -ms-overflow-style: none; 
}

.carousel::-webkit-scrollbar { 
  display: none;  
}

.carousel-item {
  flex: 0 0 300px;
  scroll-snap-align: center;
}

.carousel-item img {
  border-radius: 0.5rem;
}

#projects {
  padding-top: 80px;
  margin-top: -80px;
}
</style>