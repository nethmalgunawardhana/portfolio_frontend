<template>
  <section id="projects" class="py-16 bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white text-center mb-8">My Projects</h2>
      <div v-if="loading" class="text-white text-center">Loading projects...</div>
      <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          class="project-card bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <div class="relative aspect-video">
            <img 
              :src="project.imageUrl"
              :alt="project.name" 
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-xl font-semibold text-white mb-2">{{ project.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-green-500 font-semibold">{{ project.status }}</span>
              <div>
                <a 
                  :href="project.github" 
                  target="_blank" 
                  class="text-white mr-3 hover:text-gray-300"
                >
                    <i class="fab fa-github text-4xl"></i>
                </a>
                <a 
                  :href="project.demo" 
                  target="_blank" 
                  class="text-white hover:text-gray-300"
                >
                  <i class="fas fa-external-link-alt text-4xl ml-2"></i>
                </a>
              </div>
            </div>
          </div>
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
const config = useRuntimeConfig()

const fetchProjects = async () => {
  try {
    const response = await axios.get(`${config.public.apiBase}/projects`)
    projects.value = response.data.map(project => ({
      ...project,
      imageUrl: project.image && project.image.data
        ? `data:${project.image.contentType};base64,${arrayBufferToBase64(project.image.data.data)}`
        : '',
      
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
#projects {
  padding-top: 80px;
  margin-top: -80px;
  
}

.project-card {
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 20px rgba(37, 121, 216, 0.897), 0 6px 6px rgb(22, 88, 153);
}

.project-card:hover {
  transform: translateY(-20px);
}
</style>