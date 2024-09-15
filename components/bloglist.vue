<!-- BlogList.vue -->
<template>
    <div class="container mx-auto px-4 py-8 bg-gray-900">
    <h2 class="text-4xl font-bold mb-8 text-white text-center">My Blog Posts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <NuxtLink :to="`/blog/${post.slug}`" class="text-blue-500 hover:underline">
              Read more
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const posts = ref([
    {
      id: 1,
      title: 'Getting Started with Nuxt 3',
      excerpt: 'Learn how to set up and create your first Nuxt 3 project.',
      image: '/images/nuxt3.jpg',
      slug: 'getting-started-with-nuxt3'
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS',
      excerpt: 'Discover tips and tricks to become a Tailwind CSS pro.',
      image: '/images/tailwind.jpg',
      slug: 'mastering-tailwind-css'
    },
    // Add more blog posts as needed
  ]);
  </script>