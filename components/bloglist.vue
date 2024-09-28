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
            class="project-card inline-block mr-8 mb-5 bg-gray-800 border border-blue-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-sm transition-transform duration-300 ease-in-out"
          >
            <a :href="post.url" target="_blank" rel="noopener noreferrer">
              <img 
                :src="post.imageUrl"
                :alt="post.title" 
                class="rounded-t-lg w-full h-48 sm:h-56 object-cover"
              />
              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{{ post.title }}</h5>
              </div>
            </a>
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
  box-shadow: 0 5px 20px rgba(37, 121, 216, 0.2), 0 4px 6px rgba(22, 88, 153, 0.1);
  min-width: 250px;
  max-width: 384px; /* max-w-sm equivalent */
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

h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>