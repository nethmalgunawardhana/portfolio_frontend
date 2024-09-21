<template>
  <ul class="flex flex-wrap justify-center sm:justify-start items-center m-0 p-0">
    <li v-for="(icon, index) in icons" :key="index" class="list-none mr-4">
      <a 
        :href="icon.link" 
        class="relative block text-center rounded-full p-1.5 box-border no-underline shadow-md bg-gradient-to-b from-white to-gray-200 transition duration-500 hover:shadow-sm"
        :class="[
          'w-10 h-10 sm:w-12 sm:h-12', // Smaller on mobile, larger on desktop
          icon.hoverColor
        ]"
      >
        <i 
          :class="[
            'fab', 
            icon.class, 
            'w-full h-full block rounded-full text-gray-800 transition duration-500',
            'text-lg sm:text-xl', // Smaller text on mobile, larger on desktop
          ]" 
          :style="{ 
            background: 'linear-gradient(0deg, #fff, #ddd)',
            lineHeight: '32px', // Adjust line height for mobile
          }"
        ></i>
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

/* Use more specific selectors to ensure styles are applied */
ul li:nth-child(1) a:hover i { @apply text-[#3b5998]; }
ul li:nth-child(2) a:hover i { @apply text-[#00aced]; }
ul li:nth-child(3) a:hover i { @apply text-[#007bb6]; }
ul li:nth-child(4) a:hover i { @apply text-[#e4405f]; }

@media (min-width: 640px) {
  a i {
    line-height: 40px !important; /* Adjust line height for desktop */
  }
}
</style>