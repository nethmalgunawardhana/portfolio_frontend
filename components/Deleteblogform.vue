<!-- DeleteBlogForm.vue -->
<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl" ref="formContainer">
    <h2 class="text-2xl font-bold mb-4 text-white">Delete Blog Post</h2>
    
    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-white text-center mb-4">
      Loading...
    </div>
    
    <!-- Blogs Table -->
    <div v-else class="overflow-x-auto mb-6">
      <table class="min-w-full bg-gray-700 text-white">
        <thead>
          <tr>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">URL</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="blog in blogs" :key="blog._id" class="border-t border-gray-600">
            <td class="px-4 py-2">{{ blog.title }}</td>
            <td class="px-4 py-2">{{ blog.url }}</td>
            <td class="px-4 py-2">
              <button @click="selectBlog(blog._id)" class="text-blue-400 hover:text-blue-200">
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
        <label for="delete-blog-id" class="block text-sm font-medium text-gray-100">Selected Blog Post ID</label>
        <input type="text" id="delete-blog-id" v-model="selectedBlogId" readonly class="mt-1 block w-full rounded-md bg-slate-600 border-gray-400 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <button type="submit" :disabled="!selectedBlogId" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">
        Delete Blog Post
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const blogs = ref([])
const selectedBlogId = ref('')
const isLoading = ref(false)
const formContainer = ref(null)

const fetchBlogs = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:5000/blogsdelete')
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }
    blogs.value = await response.json()
  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to fetch blog posts')
  } finally {
    isLoading.value = false
  }
}

const selectBlog = (blogId) => {
  selectedBlogId.value = blogId
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
      deleteBlog()
    }
  })
}

const deleteBlog = async () => {
  try {
    const response = await fetch(`http://localhost:5000/blogs/${selectedBlogId.value}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete blog post')
    }

    showSuccessAlert('Blog post deleted successfully')

    // Reset form and refresh blogs list
    selectedBlogId.value = ''
    await fetchBlogs()
    
    // Scroll to the top of the form
    if (formContainer.value) {
      formContainer.value.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error:', error)
    showErrorAlert('Failed to delete blog post')
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

onMounted(fetchBlogs)
</script>