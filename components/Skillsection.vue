<template>
  <section class="bg-gray-900 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white mb-12 text-center" data-aos="fade-up">My Skills</h2>
      <div v-for="(skills, categoryName) in categorizedSkills" :key="categoryName" class="mb-12">
        <h3 class="text-2xl font-semibold text-white mb-6" data-aos="fade-up">{{ categoryName }}</h3>
        <div class="flex flex-wrap justify-center">
          <div 
            v-for="skill in skills"
            :key="skill.name"
            class="relative w-40 h-40 m-4 group"
            @mouseenter="skill.isHovered = true"
            @mouseleave="skill.isHovered = false"
            data-aos="zoom-in"
          >
            <svg class="w-full h-full transform rotate-[-90deg]" viewBox="0 0 120 120">
              <circle
                class="text-gray-700"
                stroke-width="8"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
              <circle
                class="text-blue-400 transition-all duration-1000 ease-out"    
                stroke-width="8"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="getStrokeDashoffset(skill.percentage)"
                stroke-linecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
            </svg>
            <div 
              class="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out"
              :class="{ 'transform scale-110': skill.isHovered }"
            >
              <img :src="skill.icon" :alt="skill.name" class="w-16 h-16" />
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              
            </div>
            <p class="text-center mt-2 text-white font-semibold">{{ skill.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Frontend Development Icons
import htmlIcon from './assets/icons/html.png'
import cssIcon from './assets/icons/css.png'
import javascriptIcon from './assets/icons/js.png'
import reactIcon from './assets/icons/react.png'
import vueIcon from './assets/icons/vuejs.png'
import angularIcon from './assets/icons/angular.png'
import tailwindIcon from './assets/icons/tailwind.png'
import figmaIcon from './assets/icons/figma.png'
import NuxtIcon from "./assets/icons/nuxt.png"


// Backend Development Icons
import nodeIcon from './assets/icons/nodejs.png'
import pythonIcon from './assets/icons/python.png'
import phpIcon from './assets/icons/php.png'
import javaIcon from './assets/icons/java.png'
import cIcon from './assets/icons/c.png'
import cppIcon from './assets/icons/c++.png'

// Database Icons
import mongodbIcon from './assets/icons/mongodb.png'
import mysqlIcon from './assets/icons/mysql.png'

// Other Technologies
import typescriptIcon from './assets/icons/typescript.png'
import jqueryIcon from './assets/icons/jquery.png'
import photoshopIcon from './assets/icons/photoshop.png'

const skills = ref([
  // Frontend Development
  { name: 'HTML5', percentage: 90, icon: htmlIcon, category: 'Frontend Development' },
  { name: 'CSS3', percentage: 85, icon: cssIcon, category: 'Frontend Development' },
  { name: 'JavaScript', percentage: 80, icon: javascriptIcon, category: 'Frontend Development' },
  { name: 'React.js', percentage: 80, icon: reactIcon, category: 'Frontend Development' },
  { name: 'Vue.js', percentage: 75, icon: vueIcon, category: 'Frontend Development' },
  { name: 'Angular.js', percentage: 70, icon: angularIcon, category: 'Frontend Development' },
  { name: 'Tailwind CSS', percentage: 80, icon: tailwindIcon, category: 'Frontend Development' },
  { name: 'Figma', percentage: 70, icon: figmaIcon, category: 'Frontend Development' },
  { name:'Nuxt3',persentage:60,icon:NuxtIcon,category: 'Frontend Development'},

  // Backend Development
  { name: 'Node.js', percentage: 80, icon: nodeIcon, category: 'Backend Development' },
  { name: 'Python', percentage: 85, icon: pythonIcon, category: 'Backend Development' },
  { name: 'PHP', percentage: 75, icon: phpIcon, category: 'Backend Development' },
  { name: 'Java', percentage: 70, icon: javaIcon, category: 'Backend Development' },
  { name: 'C', percentage: 65, icon: cIcon, category: 'Backend Development' },
  { name: 'C++', percentage: 60, icon: cppIcon, category: 'Backend Development' },

  // Database
  { name: 'MongoDB', percentage: 75, icon: mongodbIcon, category: 'Database' },
  { name: 'Mysql', percentage: 60, icon: mysqlIcon, category: 'Database' },


  // Other Technologies
  { name: 'TypeScript', percentage: 75, icon: typescriptIcon, category: 'Other Technologies' },
  { name: 'jQuery', percentage: 80, icon: jqueryIcon, category: 'Other Technologies' },
  { name: 'Photoshop', percentage: 70, icon: photoshopIcon, category: 'Other Technologies' },
])

const categorizedSkills = computed(() => {
  return skills.value.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})
})

const circumference = 2 * Math.PI * 50

function getStrokeDashoffset(percentage) {
  return circumference - (percentage / 100) * circumference
}

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  })
})

// Refresh AOS on every route change (for Nuxt)
if (process.client) {
  useNuxtApp().hook('page:finish', () => {
    AOS.refresh()
  })
}

// Refresh AOS on window resize
let resizeTimeout
const handleResize = () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    AOS.refresh()
  }, 100)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>