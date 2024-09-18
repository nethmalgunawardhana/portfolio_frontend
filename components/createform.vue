<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-4 text-white">Create a New Project</h2>
    <form @submit.prevent="createProject" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-100">Project Name</label>
        <input type="text" id="name" v-model="newProject.name" required class="mt-1 block w-full rounded-md border-gray-800 bg-slate-500 text-white shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-100">Description</label>
        <textarea id="description" v-model="newProject.description" required class="mt-1 block w-full rounded-md border-gray-800 bg-slate-500  text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>
      <div>
        <label for="github" class="block text-sm font-medium text-gray-100">GitHub URL</label>
        <input type="url" id="github" v-model="newProject.github" required class="mt-1 block w-full rounded-md border-gray-800 bg-slate-500  text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="demo" class="block text-sm font-medium text-gray-100">Demo URL</label>
        <input type="url" id="demo" v-model="newProject.demo" required class="mt-1 block w-full rounded-md border-gray-800 bg-slate-500  text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-100">Project Image</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" required class="mt-1 block w-full">
      </div>
      <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Project
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const emit = defineEmits(['projectCreated'])
const config = useRuntimeConfig()
const newProject = ref({
  name: '',
  description: '',
  github: '',
  demo: '',
  image: null
})

const handleImageUpload = (event) => {
  newProject.value.image = event.target.files[0]
}

const createProject = async () => {
  // Show loading alert
  Swal.fire({
    title: 'Creating Project',
    html: 'Please wait...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const formData = new FormData()
    formData.append('name', newProject.value.name)
    formData.append('description', newProject.value.description)
    formData.append('github', newProject.value.github)
    formData.append('demo', newProject.value.demo)
    formData.append('image', newProject.value.image)

    // Replace with your actual API endpoint
    const response = await fetch(`${config.public.apiBase}/projects`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to create project')
    }

    const result = await response.json()
    console.log('Project created:', result)

    // Close loading alert
    Swal.close()

    // Show success message
    await Swal.fire({
      icon: 'success',
      title: 'Project created successfully!',
      text: 'Redirecting to project carousel...',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })

    // Emit event to parent component to show project carousel
    emit('projectCreated')

    // Reset form
    newProject.value = { name: '', description: '', github: '', demo: '', image: null }

  } catch (error) {
    console.error('Error:', error)
    // Close loading alert
    Swal.close()
    // Show error message
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to create project. Please try again.',
    })
  }
}
</script>