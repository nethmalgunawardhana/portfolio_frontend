<template>
  <section id="skills" class="bg-gray-900 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-white mb-12 text-center" data-aos="fade-up">My Skills</h2>
      <div v-for="(skills, categoryName) in categorizedSkills" :key="categoryName" class="mb-12">
        <h3 class="text-2xl font-semibold text-white mb-6" data-aos="fade-up">{{ categoryName }}</h3>
        <div class="flex flex-wrap justify-center">
          <div 
            v-for="skill in skills"
            :key="skill.name"
            class="relative w-40 h-40 m-4 group"
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
            <div class="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
              <img :src="skill.icon" :alt="skill.name" class="w-16 h-16" />
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

const baseImageUrl = 'https://ik.imagekit.io/mskpaaeir/icons/'

const skills = ref([
  // Frontend Development
  { name: 'HTML5', percentage: 90, icon: `${baseImageUrl}html.png`, category: 'Frontend Development' },
  { name: 'CSS3', percentage: 85, icon: `${baseImageUrl}css.png`, category: 'Frontend Development' },
  { name: 'JavaScript', percentage: 80, icon: `${baseImageUrl}js.png`, category: 'Frontend Development' },
  { name: 'React.js', percentage: 80, icon: `${baseImageUrl}react.png`, category: 'Frontend Development' },
  { name: 'Vue.js', percentage: 75, icon: `${baseImageUrl}vuejs.png`, category: 'Frontend Development' },
  { name: 'Angular.js', percentage: 70, icon: `${baseImageUrl}Angular.png`, category: 'Frontend Development' },
  { name: 'Tailwind CSS', percentage: 80, icon: `${baseImageUrl}tailwind.png`, category: 'Frontend Development' },
  { name: 'Nuxt3', percentage: 80, icon: `${baseImageUrl}nuxt.png`, category: 'Frontend Development' },
  { name: 'TypeScript', percentage: 75, icon: `${baseImageUrl}typescript.png`, category: 'Frontend Development' },

  // Backend Development
  { name: 'Node.js', percentage: 80, icon: `${baseImageUrl}Nodejs.png`, category: 'Backend Development' },
  { name: 'Python', percentage: 85, icon: `${baseImageUrl}python.png`, category: 'Backend Development' },
  { name: 'PHP', percentage: 75, icon: `${baseImageUrl}php.png`, category: 'Backend Development' },
  { name: 'Java', percentage: 70, icon: `${baseImageUrl}java.png`, category: 'Backend Development' },

  // Database
  { name: 'MongoDB', percentage: 75, icon: `${baseImageUrl}mongodb.png`, category: 'Database' },
  { name: 'MySQL', percentage: 60, icon: `${baseImageUrl}mysql.png`, category: 'Database' },

  // Other Technologies
  { name: 'jQuery', percentage: 80, icon: `${baseImageUrl}jquery.png`, category: 'Others' },
  { name: 'Photoshop', percentage: 70, icon: `${baseImageUrl}photoshop.png`, category: 'Others' },
  { name: 'Figma', percentage: 70, icon: `${baseImageUrl}figma.png`, category: 'Others' },
  { name: 'C', percentage: 65, icon: `${baseImageUrl}c.png`, category: 'Others' },
  { name: 'C++', percentage: 60, icon: `${baseImageUrl}c++.png`, category: 'Others' },
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
    once: true,
  })
})

// Refresh AOS on every route change (for Nuxt)
if (process.client) {
  useNuxtApp().hook('page:finish', () => {
    AOS.refresh()
  })
}

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced resize handler
const debouncedHandleResize = debounce(() => {
  AOS.refresh()
}, 250)

onMounted(() => {
  window.addEventListener('resize', debouncedHandleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedHandleResize)
})
</script>

<style scoped>  
#skills {
  padding-top: 80px;
  margin-top: -80px;
}
</style>