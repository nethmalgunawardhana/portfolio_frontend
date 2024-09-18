<!-- DeleteProjectForm.vue -->
<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl" ref="formContainer">
    <h2 class="text-2xl font-bold mb-4 text-white">Delete Project</h2>
    
    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-white text-center mb-4">
      Loading...
    </div>

    <!-- Projects Table -->
    <div v-else class="overflow-x-auto mb-6">
      <table class="min-w-full bg-gray-700 text-white">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project._id" class="border-t border-gray-600">
            <td class="px-4 py-2">{{ project.name }}</td>
            <td class="px-4 py-2">{{ project.description }}</td>
            <td class="px-4 py-2">
              <button @click="selectProject(project._id)" class="text-blue-400 hover:text-blue-200">
                Select
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Form -->
    <form @submit.prevent="confirmDelete" class="space-y-4">
      <div>
        <label for="delete-project-id" class="block text-sm font-medium text-gray-100">Selected Project ID</label>
        <input type="text" id="delete-project-id" v-model="selectedProjectId" readonly class="mt-1 block w-full rounded-md bg-slate-600 border-gray-400 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <button type="submit" :disabled="!selectedProjectId" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
        Delete Project
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const projects = ref([])
const selectedProjectId = ref('')
const isLoading = ref(false)
const formContainer = ref(null)
const config = useRuntimeConfig()
const fetchProjects = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`${config.public.apiBase}/projectsdelete`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    projects.value = await response.json()
  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to fetch projects')
  } finally {
    isLoading.value = false
  }
}

const selectProject = (projectId) => {
  selectedProjectId.value = projectId
}

const confirmDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProject()
    }
  })
}

const deleteProject = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/projects/${selectedProjectId.value}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete project')
    }

    showSuccessAlert('Project deleted successfully')

    // Reset form and refresh projects list
    selectedProjectId.value = ''
    await fetchProjects()
    
    // Scroll to the top of the form
    if (formContainer.value) {
      formContainer.value.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to delete project')
  }
}

const showSuccessAlert = (message) => {
  Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  })
}

const showErrorAlert = (message) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

onMounted(fetchProjects)
</script>