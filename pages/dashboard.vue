<!-- DashboardLayout.vue -->
<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-purple-700 text-white">
        <nav class="p-4">
          <ul class="space-y-2">
            <li v-for="item in navItems" :key="item.name">
              <button
                @click="navigateTo(item)"
                class="flex items-center w-full p-2 rounded hover:bg-purple-600 transition-colors"
              >
                <component :is="item.icon" class="w-5 h-5 mr-2" />
                <span>{{ item.name }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <component :is="activeComponent" />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, shallowRef } from 'vue'
  import { useRouter } from 'vue-router'
  import { 
    HomeIcon, UserIcon, InformationCircleIcon, BriefcaseIcon, 
    BookOpenIcon, PhoneIcon, MapPinIcon, PlusIcon, PencilIcon, TrashIcon 
  } from '@heroicons/vue/24/outline'
  
  // Import your content components
  import CreateProjectForm from '~/components/createform.vue'
  import UpdateProjectForm from '~/components/updateprojectform.vue'
  import DeleteProjectForm from '~/components/deleteprojectform.vue'
  import Projects from '~/components/ProjectCarousel.vue'
  import Bloglist from '~/components/bloglist.vue'
  import CreateBlogForm from '~/components/Createblogform.vue'
  import UpdateBlogForm from '~/components/updateblogform.vue'
  import DeleteBlogForm from '~/components/Deleteblogform.vue'

  
  const router = useRouter()
  
  const navItems = [
    { name: 'Portfolio', content: 'portfolio', icon: UserIcon, path: '/' },
    { name: 'Projects', content: 'projects', icon: BriefcaseIcon },
    { name: 'Blogs', content: 'blogs', icon: BookOpenIcon },
    { name: 'Create Project', content: 'create', icon: PlusIcon },
    { name: 'Update Project', content: 'update', icon: PencilIcon },
    { name: 'Delete Project', content: 'delete', icon: TrashIcon },
    { name: 'Create Blog', content: 'Bcreate', icon: PlusIcon },
    { name: 'Update Blog', content: 'Bupdate', icon: PencilIcon },
    { name: 'Delete Blog', content: 'Bdelete', icon: TrashIcon },
  ]
  
  const activeContent = ref('home')
  const activeComponent = shallowRef(CreateProjectForm)
  
  const navigateTo = (item) => {
    if (item.path) {
      router.push(item.path)
    } else {
      setActiveContent(item.content)
    }
  }
  
  const setActiveContent = (content) => {
    activeContent.value = content
    switch (content) {
      case 'projects':
        activeComponent.value = Projects
        break
        case 'blogs':
        activeComponent.value = Bloglist
        break  
      case 'create':
        activeComponent.value = CreateProjectForm
        break
      case 'update':
        activeComponent.value = UpdateProjectForm
        break
      case 'delete':
        activeComponent.value = DeleteProjectForm
        break
      case 'Bcreate':
        activeComponent.value = CreateBlogForm
        break
      case 'Bupdate':
        activeComponent.value = UpdateBlogForm
        break  
      case 'Bdelete':
        activeComponent.value = DeleteBlogForm
        break
      default:
        activeComponent.value = null
    }
  }
  </script>