<template>
  <nav class="bg-gray-900 text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'border-b-2 border-blue-600': isScrolled }">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="#home" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap">portfolio</span>
      </NuxtLink>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div class="relative">
          <button
            @click="navigateToDashboard"
            type="button"
            class="flex items-center text-sm "
            id="dashboard-button"
          >
            <span class="sr-only">Go to dashboard</span>
            <div class=" flex items-center justify-center overflow-hidden">
              <img src="../public/dashboard2.png" alt="Dashboard" class="w-12 h-10 " />
            </div>
          </button>
        </div>
        <button
          @click="toggleMobileMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-user"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isMobileMenuOpen }" class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 mobile-menu">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink
              :to="item.href"
              :class="[
                'block py-2 px-3 rounded md:p-0',
                item.isActive 
                  ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-500' 
                  : 'text-gray-300 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500'
              ]"
              :aria-current="item.isActive ? 'page' : undefined"
              @click="handleNavItemClick(item)"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
      isScrolled: false,
      navItems: [
        { text: 'Home', href: '#home', isActive: true },
        { text: 'About', href: '#about', isActive: false },
        { text: 'Skills', href: '#skills', isActive: false },
        { text: 'Projects', href: '#projects', isActive: false },
        { text: 'Blogs', href: '#blogs', isActive: false },
        { text: 'Contact', href: '#contact', isActive: false }
      ]
    }
  },
  methods: {
    navigateToDashboard() {
      // Replace with your actual dashboard route
      this.$router.push('/$adminlogin')
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    handleNavItemClick(item) {
      this.navItems.forEach(navItem => {
        navItem.isActive = navItem === item
      })
      this.closeMobileMenu()
      
      // Smooth scroll to the target section
      const targetId = item.href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const navbarHeight = 80 // This should match the navbar height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
nav {
  height: 80px; 
}

@media (max-width: 768px) {
  .mobile-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background-color: #111827;
    padding: 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
    z-index: 40;
  }

  .mobile-menu a {
    color: #D1D5DB;
    padding: 0.5rem;
    display: block;
    border-radius: 0.25rem;
  }

  .mobile-menu a:hover {
    background-color: #374151;
  }

  .mobile-menu a.active {
    background-color: #2563EB;
    color: white;
  }
}
</style>