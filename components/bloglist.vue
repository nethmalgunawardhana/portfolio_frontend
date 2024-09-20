<template>
  <section class="py-8 sm:py-16 bg-gray-900 mb-8 sm:mb-14">
    <div id="blogs" class="container mx-auto px-4">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">My Blog Posts</h2>
      <div v-if="loading" class="text-white text-center">Loading blog posts...</div>
      <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else class="relative">
        <div class="horizontal-carousel overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div 
            v-for="(post, index) in posts" 
            :key="index" 
            class="project-card inline-block mr-8 mb-5 bg-gray-800 rounded-lg overflow-hidden shadow-lg w-80 sm:w-96 md:w-96 h-96 transition-transform duration-300 ease-in-out"
          >
            <div class="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                :src="post.imageUrl"
                :alt="post.title" 
                class="h-72 sm:h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  :href="post.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white text-2xl hover:text-indigo-400 transition-colors duration-300"
                >
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <p class="text-center text-white mt-4 p-4 text-sm sm:text-base whitespace-normal">{{ post.title }}</p>
          </div>
        </div>
        <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-r">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-l">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const config = useRuntimeConfig()

const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(`${config.public.apiBase}/blogs`)
    posts.value = response.data.map(post => ({
      ...post,
      imageUrl: post.image && post.image.data
        ? `data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`
        : '/images/default-blog-image.jpg'
    }))
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load blog posts. Please try again later.'
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

const scrollLeft = () => {
  const carousel = document.querySelector('.horizontal-carousel')
  carousel.scrollBy({ left: -300, behavior: 'smooth' })
}

const scrollRight = () => {
  const carousel = document.querySelector('.horizontal-carousel')
  carousel.scrollBy({ left: 300, behavior: 'smooth' })
}

onMounted(fetchBlogPosts)
</script>

<style scoped>
#blogs {
  padding-top: 80px;
  margin-top: -80px;
}

.project-card {
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 10px rgba(37, 121, 216, 0.897), 0 6px 6px rgb(22, 88, 153);
}

.project-card:hover {
  transform: translateY(-10px);
}

.horizontal-carousel {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.horizontal-carousel::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

@media (min-width: 640px) {
  .project-card:hover {
    transform: translateY(-20px);
  }
}
</style>