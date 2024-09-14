<template>
  <section class="bg-gray-900 text-white py-12">
    <div class="container mx-auto flex flex-col lg:flex-row items-center">
      <!-- Left Column: Image -->
      <div class="lg:w-1/3 lg:mr-8 ml-20 mb-8 lg:mb-0">
        <div class="image-frame" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2500">
          <img
            src="https://via.placeholder.com/400x400"
            alt="Profile Image"
            class="rounded-full shadow-lg w-80 mx-auto lg:mx-0"
          />
        </div>
      </div>

      <!-- Right Column: Content -->
      <div class="lg:w-1/3 text-center lg:text-left">
        <h2 class="text-4xl font-bold mb-4 "data-aos="zoom-in" data-aos-mirror="true" data-aos-once="false">
          About Me
        </h2>
        <div data-aos="fade-left" data-aos-mirror="true" data-aos-once="false">
          <p class="text-lg text-gray-400 mb-6">
            Hi, I'm [Your Name], a passionate web developer with a strong focus on building
            responsive and high-quality websites. I specialize in frontend development and enjoy
            creating user-friendly and efficient web applications using modern technologies like
            Vue.js, Nuxt.js, and Tailwind CSS.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-delay="200" data-aos-mirror="true" data-aos-once="false">
          <p class="text-lg text-gray-400 mb-6">
            With over [X] years of experience, I have honed my skills in JavaScript, CSS, and HTML.
            I'm always eager to learn and stay updated with the latest technologies and trends in
            the web development field.
          </p>
        </div>
        <!-- Animated Button -->
        <a
          href="#contact"
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          data-aos="zoom-in" data-aos-delay="200"
        >
          Let's Connect
        </a>
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
    mirror: true,
    once: false,
  });
});

onUnmounted(() => {
  AOS.refresh();
});
</script>

<style scoped>
@import 'animate.css/animate.min.css';

.image-frame {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 10px;
  background: linear-gradient(45deg, #3490dc, #6574cd);

}

.image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}



</style>