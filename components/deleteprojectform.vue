<!-- DeleteProjectForm.vue -->
<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold mb-4 text-white">Delete Project</h2>
      <form @submit.prevent="deleteProject" class="space-y-4">
        <div>
          <label for="delete-project-id" class="block text-sm font-medium text-gray-100">Project ID</label>
          <input type="text" id="delete-project-id" v-model="deleteProjectId" required class="mt-1 block w-full rounded-md bg-slate-500 border-gray-400 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete Project
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const deleteProjectId = ref('')
  
  const deleteProject = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:5000/projects/${deleteProjectId.value}`, {
        method: 'DELETE',
      })
  
      if (!response.ok) {
        throw new Error('Failed to delete project')
      }
  
      console.log('Project deleted successfully')
  
      // Reset form
      deleteProjectId.value = ''
  
      // You might want to show a success message or update the project list
    } catch (error) {
      console.error('Error:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }
  </script>