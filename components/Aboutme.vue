<template>
  <section id="about" class="bg-gray-900 text-white py-10 mt-16 sm:py-20">
    <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center">
      <!-- Left Column: Image -->
      <div class="w-full lg:w-1/3 lg:mr-8 mb-8 lg:mb-0">
        <div class="image-frame mx-auto" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2500">
          <img
            src="../public/image1.jpeg"
            alt="Profile Image"
            class="rounded-full shadow-lg w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Right Column: Content -->
      <div class="w-full lg:w-1/2 text-center lg:text-left">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4" data-aos="zoom-in">About Me</h2>
        <div data-aos="fade-left">
          <p class="text-base sm:text-lg text-gray-400 mb-6">
            Hi, I'm Nethmal, a passionate web developer with a strong focus on building
            responsive and high-quality websites. I specialize in Full Stack development and enjoy
            creating user-friendly and efficient web applications using modern technologies like
            Vue.js, Nuxt.js, React.js and Tailwind CSS.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-delay="200">
          <p class="text-base sm:text-lg text-gray-400 mb-6">
            With over 5 years of experience, I have honed my skills in JavaScript, CSS, and HTML.
            I'm always eager to learn and stay updated with the latest technologies and trends in
            the web development field.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});

onUnmounted(() => {
  AOS.refresh();
});
</script>

<style scoped>
.image-frame {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  padding: 10px;
  background: linear-gradient(45deg, #3490dc, #65f399);
}

.image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (min-width: 640px) {
  .image-frame {
    width: 320px;
    height: 320px;
  }
}

#about {
  padding-top: 80px;
  margin-top: -80px;
}
</style>