<!-- UpdateBlogForm.vue -->
<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-4 text-white">Blogs</h2>
    <div class="overflow-y-auto mb-8 bg-gray-700 rounded-lg" style="max-height: 300px;">
      <table class="min-w-full">
        <thead class="sticky top-0 bg-gray-600">
          <tr class="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Title</th>
          </tr>
        </thead>
        <tbody class="bg-gray-700 divide-y divide-gray-600">
          <tr v-for="blog in blogs" :key="blog._id" @click="selectBlog(blog)" class="hover:bg-purple-600 transition-colors duration-200 cursor-pointer">
            <td class="px-4 py-3 text-sm font-mono text-gray-300">{{ blog._id }}</td>
            <td class="px-4 py-3 text-sm text-white">{{ blog.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-white">Update Blog Post</h2>
    <form @submit.prevent="confirmUpdate" class="space-y-4">
      <div>
        <label for="blog-id" class="block text-sm font-medium text-gray-300">Blog ID</label>
        <input type="text" id="blog-id" v-model="selectedBlog.id" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" readonly>
      </div>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
        <input type="text" id="title" v-model="selectedBlog.title" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="url" class="block text-sm font-medium text-gray-300">URL</label>
        <input type="url" id="url" v-model="selectedBlog.url" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="https://example.com/blog-post">
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-300">Update Blog Image</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700">
      </div>
      <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
        Update Blog Post
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
const config = useRuntimeConfig()
const blogs = ref([])
const selectedBlog = ref({
  id: '',
  title: '',
  url: '',
  image: null
})

onMounted(async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/blogsdelete`)
    blogs.value = await response.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    showErrorAlert('Failed to fetch blogs')
  }
})

const handleImageUpload = (event) => {
  selectedBlog.value.image = event.target.files[0]
}

const selectBlog = (blog) => {
  selectedBlog.value = { ...blog, id: blog._id }
}

const confirmUpdate = () => {
  Swal.fire({
    title: 'Confirm Update',
    text: 'Are you sure you want to update this blog post?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      updateBlog()
    }
  })
}

const updateBlog = async () => {
  try {
    const formData = new FormData()
    formData.append('title', selectedBlog.value.title)
    formData.append('url', selectedBlog.value.url)
    if (selectedBlog.value.image) {
      formData.append('image', selectedBlog.value.image)
    }

    const response = await fetch(`${config.public.apiBase}/blogs/${selectedBlog.value.id}`, {
      method: 'PATCH',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to update blog')
    }

    const result = await response.json()
    console.log('Blog updated:', result)

    showSuccessAlert('Blog post updated successfully!')

    // Reset form and refresh blog list
    selectedBlog.value = { id: '', title: '', url: '', image: null }
    const blogsResponse = await fetch('http://localhost:5000/blogs')
    blogs.value = await blogsResponse.json()

  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to update blog post')
  }
}

const showSuccessAlert = (message) => {
  Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonColor: '#3085d6'
  })
}

const showErrorAlert = (message) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
    confirmButtonColor: '#3085d6'
  })
}
</script>

<style scoped>
/* Custom scrollbar styles */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 20px;
  border: 2px solid #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #6B7280;
}

/* Sticky header styles */
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>