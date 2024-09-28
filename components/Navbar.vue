<template>
  <nav class="bg-gray-900 text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'border-b-2 border-blue-600': isScrolled }">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center">
        <NuxtLink to="#home" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-xl md:text-2xl font-semibold whitespace-nowrap">portfolio</span>
        </NuxtLink>
      </div>
     
      <div class="hidden md:flex md:items-center md:space-x-8">
        <ul class="flex flex-row space-x-4">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink
              :to="item.href"
              :class="[
                'block py-2 px-3',
                item.isActive 
                  ? 'text-blue-500' 
                  : 'text-gray-300 hover:text-blue-500'
              ]"
              :aria-current="item.isActive ? 'page' : undefined"
              @click="handleNavItemClick(item)"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
        <a href="https://github.com/nethmalgunawardhana" target="_blank" rel="noopener noreferrer" class="hidden md:inline-block px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-blue-900 transition-colors duration-300">
          Github Profile
        </a>
        <div class="relative hidden md:block">
          <button
            @click="navigateToDashboard"
            type="button"
            class="flex items-center text-sm"
            id="dashboard-button"
          >
            <span class="sr-only">Go to dashboard</span>
            <div class="flex items-center justify-center overflow-hidden">
              <img src="../public/dashboard3.png" alt="Dashboard" class="w-10 h-10" />
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
      <div :class="{ 'hidden': !isMobileMenuOpen }" class="items-center justify-between w-full md:hidden" id="navbar-user">
        <ul class="flex flex-col font-medium mt-4 mobile-menu">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink
              :to="item.href"
              :class="[
                'block py-2 px-3',
                item.isActive 
                  ? 'text-white bg-blue-700' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
              :aria-current="item.isActive ? 'page' : undefined"
              @click="handleNavItemClick(item)"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
          <li>
            <a 
              href="https://github.com/nethmalgunawardhana" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white"
              @click="closeMobileMenu"
            >
              Github Profile
            </a>
          </li>
          <li>
            <button
              @click="navigateToDashboard"
              class="w-full text-left py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Dashboard
            </button>
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
      this.$router.push('/$adminlogin')
      this.closeMobileMenu()
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
      
      const targetId = item.href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const navbarHeight = 80
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
    top: 60px;
    left: 0;
    right: 0;
    background-color: #111827;
    padding: 0;
    z-index: 40;
  }

  .mobile-menu a, .mobile-menu button {
    color: #D1D5DB;
    padding: 0.75rem 1rem;
    display: block;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #1F2937;
  }

  .mobile-menu a:hover, .mobile-menu button:hover {
    background-color: #374151;
  }

  .mobile-menu a.active {
    background-color: #2563EB;
    color: white;
  }
}
</style>

