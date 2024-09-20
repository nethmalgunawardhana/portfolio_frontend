<template>
    <ul class="flex justify-start items-center m-0 p-0">
      <li v-for="(icon, index) in icons" :key="index" class="list-none">
        <a :href="icon.link" class="relative w-12 h-12 block text-center mx-2 rounded-full p-1.5 box-border no-underline shadow-md bg-gradient-to-b from-white to-gray-200 transition duration-500 hover:shadow-sm">
          <i :class="['fab', icon.class, 'w-full h-full block rounded-full leading-[36px] text-xl text-gray-800 transition duration-500']" :style="{ background: 'linear-gradient(0deg, #fff, #ddd)' }"></i>
        </a>
      </li>
    </ul>
  </template>
  
  <script setup>
  const icons = [
    { link: '#', class: 'fa-facebook', hoverColor: 'hover:text-[#3b5998]' },
    { link: '#', class: 'fa-twitter', hoverColor: 'hover:text-[#00aced]' },
    { link: 'https://www.linkedin.com/in/nethmal-gunawardhana-12a9b8272/', class: 'fa-linkedin', hoverColor: 'hover:text-[#007bb6]' },
    { link: '#', class: 'fa-instagram', hoverColor: 'hover:text-[#e4405f]' },
  ];
  </script>
  
  <style scoped>
  a:hover i {
    @apply shadow-sm;
  }
  
  li:nth-child(1) a:hover i { @apply text-[#3b5998]; }
  li:nth-child(2) a:hover i { @apply text-[#00aced]; }
  li:nth-child(3) a:hover i { @apply text-[#dd4b39]; }
  li:nth-child(4) a:hover i { @apply text-[#007bb6]; }
  li:nth-child(5) a:hover i { @apply text-[#e4405f]; }
  </style>