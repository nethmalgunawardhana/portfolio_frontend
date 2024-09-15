<template>
  
    

    <div>
      <Navbar/>
      <NuxtPage />
      <div class="-mt-0"><card/> </div>       
    
      <div>
          <Aboutme/>
      </div>
      <div>
        <Skill/>
      </div>
      <div>
        <ProjectCarousel/>
      </div>

      <div>
      <Contact/>
      </div>
      <button
      v-show="showBackToTop"
      class="back-to-top"
      @click="scrollToTop"
    >
      ⬆️ Back to Top
    </button>
      
    
    </div>
  
</template>

<script setup>
// Import the GridDotBackground component

import Navbar from '~/components/Navbar.vue';
import Aboutme from '~/components/Aboutme.vue';
import Card from '~/components/card.vue';
import Skill from '~/components/Skillsection.vue';
import ProjectCarousel from '~/components/ProjectCarousel.vue';
import Contact from '~/components/contact.vue';


const showBackToTop = ref(false);

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 200;  // Show button after scrolling down 200px
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',  // Smooth scroll to top
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Same styles from your original CSS */

.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  display: none;
  z-index: 1000;
  transition: opacity 0.3s;
}

.back-to-top:hover {
  background-color: #45a049;
}

.back-to-top[style*="display: block;"] {
  opacity: 1;
}

</style>
