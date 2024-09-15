<template>
  <nav :class="['bg-gray-900 text-white sticky top-0 z-50 transition-all duration-300', { 'border-b-2 border-blue-600': isScrolled }]">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
      </NuxtLink>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div class="relative">
          <button
            @click="toggleUserMenu"
            type="button"
            class="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            :aria-expanded="isUserMenuOpen"
          >
            <span class="sr-only">Open user menu</span>
            <div class="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center overflow-hidden">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md overflow-hidden shadow-xl z-10">
            <div class="px-4 py-3">
              <span class="block text-sm">Bonnie Green</span>
              <span class="block text-sm text-gray-400 truncate">name@flowbite.com</span>
            </div>
            <ul>
              <li v-for="item in userMenuItems" :key="item.text">
                <NuxtLink
                  :to="item.href"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
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
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
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
      isUserMenuOpen: false,
      isMobileMenuOpen: false,
      isScrolled: false,
      userMenuItems: [
        { text: 'Dashboard', href: '/adminlogin' },
        { text: 'Settings', href: '#' },
        { text: 'Earnings', href: '#' },
        { text: 'Sign out', href: '#' }
      ],
      navItems: [
        { text: 'Home', href: '#', isActive: true },
        { text: 'About', href: '#', isActive: false },
        { text: 'Services', href: '#', isActive: false },
        { text: 'Pricing', href: '#', isActive: false },
        { text: 'Contact', href: '#', isActive: false }
      ]
    }
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0
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