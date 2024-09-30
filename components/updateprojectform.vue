<!-- UpdateProjectForm.vue -->
<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold mb-4 text-white">Projects</h2>
    <div class="overflow-y-auto mb-8 bg-gray-700 rounded-lg" style="max-height: 300px;">
      <table class="min-w-full">
        <thead class="sticky top-0 bg-gray-600">
          <tr class="text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Name</th>
          </tr>
        </thead>
        <tbody class="bg-gray-700 divide-y divide-gray-600">
          <tr v-for="project in projects" :key="project._id" @click="selectProject(project)" class="hover:bg-purple-600 transition-colors duration-200 cursor-pointer">
            <td class="px-4 py-3 text-sm font-mono text-gray-300">{{ project._id }}</td>
            <td class="px-4 py-3 text-sm text-white">{{ project.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-white">Update Project</h2>
    <form @submit.prevent="confirmUpdate" class="space-y-4">
      <div>
        <label for="project-id" class="block text-sm font-medium text-gray-300">Project ID</label>
        <input type="text" id="project-id" v-model="selectedProject.id" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" readonly>
      </div>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300">Project Name</label>
        <input type="text" id="name" v-model="selectedProject.name" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
        <textarea id="description" v-model="selectedProject.description" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"></textarea>
      </div>
      <div>
        <label for="github" class="block text-sm font-medium text-gray-300">GitHub URL</label>
        <input type="url" id="github" v-model="selectedProject.github" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="demo" class="block text-sm font-medium text-gray-300">Demo URL</label>
        <input type="url" id="demo" v-model="selectedProject.demo" required class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-300">Update Project Image</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full text-gray-300">
      </div>
      <button type="submit" class="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
        Update Project
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
const config = useRuntimeConfig()
const projects = ref([])
const selectedProject = ref({
  id: '',
  name: '',
  description: '',
  github: '',
  demo: '',
  image: null
})

onMounted(async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/projectsdelete`)
    projects.value = await response.json()
  } catch (error) {
    console.error('Error fetching projects:', error)
    showErrorAlert('Failed to fetch projects')
  }
})

const handleImageUpload = (event) => {
  selectedProject.value.image = event.target.files[0]
}

const selectProject = (project) => {
  selectedProject.value = { ...project, id: project._id }
}

const confirmUpdate = () => {
  Swal.fire({
    title: 'Confirm Update',
    text: 'Are you sure you want to update this project?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      updateProject()
    }
  })
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

    const response = await fetch(`${config.public.apiBase}/projects/${selectedProject.value.id}`, {
      method: 'PATCH',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to update project')
    }

    const result = await response.json()
    console.log('Project updated:', result)

    showSuccessAlert('Project updated successfully!')

    // Reset form and refresh project list
    selectedProject.value = { id: '', name: '', description: '', github: '', demo: '', image: null }
    const projectsResponse = await fetch(`${config.public.apiBase}/projectsdelete`)
    projects.value = await projectsResponse.json()

  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to update project')
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