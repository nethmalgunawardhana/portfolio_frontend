<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold mb-6 text-white">Update Blog Post</h2>
      <form @submit.prevent="updateBlog" class="space-y-4">
        <div>
          <label for="blog-id" class="block text-sm font-medium text-gray-300">Blog ID</label>
          <input type="text" id="blog-id" v-model="selectedBlog.id" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" id="title" v-model="selectedBlog.title" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label for="url" class="block text-sm font-medium text-gray-300">URL</label>
          <input type="url" id="url" v-model="selectedBlog.url" required class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://example.com/blog-post">
        </div>
        <div>
          <label for="image" class="block text-sm font-medium text-gray-300">Update Blog Image</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700">
        </div>
        <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Blog Post
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const selectedBlog = ref({
    id: '',
    title: '',
    url: '',
    image: null
  })
  
  const handleImageUpload = (event) => {
    selectedBlog.value.image = event.target.files[0]
  }
  
  const updateBlog = async () => {
    try {
      const formData = new FormData()
      formData.append('title', selectedBlog.value.title)
      formData.append('url', selectedBlog.value.url)
      if (selectedBlog.value.image) {
        formData.append('image', selectedBlog.value.image)
      }
  
      const response = await fetch(`http://localhost:5000/blogs/${selectedBlog.value.id}`, {
        method: 'PATCH',
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error('Failed to update blog')
      }
  
      const result = await response.json()
      console.log('Blog updated:', result)
  
      // Reset form
      selectedBlog.value = { id: '', title: '', url: '', image: null }
  
      
    } catch (error) {
      console.error('Error updating blog post:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }
  </script>