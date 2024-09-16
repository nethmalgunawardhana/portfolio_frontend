<!-- UpdateProjectForm.vue -->
<template>
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Update Project</h2>
      <form @submit.prevent="updateProject" class="space-y-4">
        <div>
          <label for="project-id" class="block text-sm font-medium text-gray-700">Project ID</label>
          <input type="text" id="project-id" v-model="selectedProject.id" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Project Name</label>
          <input type="text" id="name" v-model="selectedProject.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" v-model="selectedProject.description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <div>
          <label for="github" class="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input type="url" id="github" v-model="selectedProject.github" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="demo" class="block text-sm font-medium text-gray-700">Demo URL</label>
          <input type="url" id="demo" v-model="selectedProject.demo" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700">Update Project Image</label>
          <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full">
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Project
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const selectedProject = ref({
    id: '',
    name: '',
    description: '',
    github: '',
    demo: '',
    image: null
  })
  
  const handleImageUpload = (event) => {
    selectedProject.value.image = event.target.files[0]
  }
  
  const updateProject = async () => {
    try {
      const formData = new FormData()
      formData.append('name', selectedProject.value.name)
      formData.append('description', selectedProject.value.description)
      formData.append('github', selectedProject.value.github)
      formData.append('demo', selectedProject.value.demo)
      if (selectedProject.value.image) {
        formData.append('image', selectedProject.value.image)
      }
  
      
      const response = await fetch(`http://localhost:5000/projects/${selectedProject.value.id}`, {
        method: 'PATCH',
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error('Failed to update project')
      }
  
      const result = await response.json()
      console.log('Project updated:', result)
  
      // Reset form
      selectedProject.value = { id: '', name: '', description: '', github: '', demo: '', image: null }
  
    } catch (error) {
      console.error('Error:', error)
      // Handle the error 
    }
  }
  </script>