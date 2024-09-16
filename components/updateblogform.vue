<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-white">Update Blog Post</h2>
      <form @submit.prevent="updateBlog" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" id="title" v-model="title" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-300">Content</label>
          <textarea id="content" v-model="content" rows="4" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"></textarea>
        </div>
        <div>
          <label for="image" class="block text-sm font-medium text-gray-300">Image</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700">
        </div>
        <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Blog Post
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    blogId: {
      type: String,
      required: true
    }
  })
  
  const title = ref('')
  const content = ref('')
  const image = ref(null)
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${props.blogId}`)
      title.value = response.data.title
      content.value = response.data.content
    } catch (error) {
      console.error('Error fetching blog post:', error)
    }
  })
  
  const handleImageUpload = (event) => {
    image.value = event.target.files[0]
  }
  
  const updateBlog = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('content', content.value)
      if (image.value) {
        formData.append('image', image.value)
      }
  
      await axios.patch(`http://localhost:5000/blogs/${props.blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
    
    } catch (error) {
      console.error('Error updating blog post:', error)
    }
  }
  </script>