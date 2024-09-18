<template>
  <section class="py-16 bg-gray-900 pt-28">
    <div  id="blogs" class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">My Blog Posts</h2>
      <div v-if="loading" class="text-white text-center">Loading blog posts...</div>
      <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else class="carousel">
        <div 
          v-for="(post, index) in posts" 
          :key="index" 
          class="carousel-item"
        >
          <div 
            class="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img 
              :src="post.imageUrl"
              :alt="post.title" 
              class="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div 
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
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
          <p class="text-center text-white mt-4">{{ post.title }}</p>
        </div>
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

// Fetch blog posts
const fetchBlogPosts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/blogs')
    posts.value = response.data.map(post => ({
      ...post,
      imageUrl: post.image && post.image.data
        ? `data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`
        : '/images/default-blog-image.jpg' // Fallback image
    }))
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load blog posts. Please try again later.'
    loading.value = false
  }
}

// Utility function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

onMounted(fetchBlogPosts)
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

#blogs {
  scroll-margin-top: 80px;
}
</style>