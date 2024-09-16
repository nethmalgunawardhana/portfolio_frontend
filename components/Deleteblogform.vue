<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-white">Delete Blog Post</h2>
      <div class="mb-4">
        <label for="blogId" class="block text-sm font-medium text-gray-300">Blog Post ID</label>
        <input 
          type="text" 
          id="blogId" 
          v-model="blogIdToDelete" 
          required 
          class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter blog post ID"
        >
      </div>
      <p class="text-red-500 mb-4">Are you sure you want to delete this blog post? This action cannot be undone.</p>
      <div class="flex justify-between">
        <button @click="cancelDelete" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Cancel
        </button>
        <button @click="deleteBlog" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete Blog Post
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const emit = defineEmits(['blogDeleted', 'cancelDelete'])
  
  const blogIdToDelete = ref('')
  
  const deleteBlog = async () => {
    if (!blogIdToDelete.value) {
      alert('Please enter a blog post ID')
      return
    }
  
    try {
      await axios.delete(`http://localhost:5000/blogs/${blogIdToDelete.value}`)
      emit('blogDeleted', blogIdToDelete.value)
      blogIdToDelete.value = '' // Clear the input after successful deletion
    } catch (error) {
      console.error('Error deleting blog post:', error)
      alert('Error deleting blog post. Please check the ID and try again.')
    }
  }
  
  const cancelDelete = () => {
    blogIdToDelete.value = '' // Clear the input
    emit('cancelDelete')
  }
  </script>