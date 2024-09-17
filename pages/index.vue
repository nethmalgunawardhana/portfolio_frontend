<template>
  <div id="home" class="bg-gray-900 overflow-x-hidden">
    <Navbar/>
   
    <div><card/></div>       
    
    <div id="about">
      <Aboutme/>
    </div>
    <div id="skills">
      <Skill/>
    </div>
    <div id="projects">
      <ProjectCarousel/>
    </div>
    <div id="blogs">
      <bloglist/>
    </div>
    <div id="contact">
      <Contact/>
    </div>
    <button
      v-show="showBackToTop"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 4l8 8h-6v8h-4v-8H4z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Aboutme from '~/components/Aboutme.vue'
import Card from '~/components/card.vue'
import Skill from '~/components/Skillsection.vue'
import ProjectCarousel from '~/components/ProjectCarousel.vue'
import Contact from '~/components/contact.vue'
import bloglist from '~/components/bloglist.vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #4ade80, #3b82f6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-to-top svg {
  width: 24px;
  height: 24px;
}

/* Add this to ensure full-width on mobile */
#home {
  width: 100vw;
  max-width: 100%;
}
</style>