<template>
  <section class="flex flex-col items-center justify-center min-h-screen bg-[#0D1117] text-white px-4 py-8">
    <div class="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-8">
      
      <!-- Left Side -->
      <div class="space-y-4 w-full md:w-1/2" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400">Let's Connect</h2>
        <p class="text-sm md:text-base">Don't hesitate to send me a message or an e-mail. I will get back to you as fast as I can.</p>

        <div class="flex items-center space-x-4">
          <a href="#" class="text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.167c-3.338.726-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.757-1.333-1.757-1.087-.743.083-.728.083-.728 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.774.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.467-2.383 1.235-3.222-.124-.305-.535-1.526.117-3.176 0 0 1.007-.323 3.3 1.23a11.46 11.46 0 013.003-.403c1.02.005 2.045.137 3.003.403 2.29-1.553 3.295-1.23 3.295-1.23.655 1.65.244 2.871.12 3.176.77.839 1.233 1.912 1.233 3.222 0 4.61-2.803 5.623-5.475 5.92.43.372.814 1.102.814 2.222v3.293c0 .32.216.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8c2.211 0 4-1.791 4-4s-1.789-4-4-4-4 1.791-4 4 1.789 4 4 4zm0 2c-2.761 0-8 1.343-8 4v3h16v-3c0-2.657-5.239-4-8-4zm-6 7v-3.29c.69-.464 1.476-.774 2.292-1.056.003-.002.005-.004.008-.006-2.46-.562-6.3-2.709-6.3-4.648v-3h16v3c0 1.938-3.84 4.086-6.3 4.648.002.002.004.004.006.006.818.282 1.605.592 2.296 1.057v3.289c0 2.661-5.239 4-8 4s-8-1.339-8-4z"/>
            </svg>
          </a>
        </div>

        <p class="flex items-center text-sm md:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12.713l11.294-7.641-3.294-4.859-8 5.452-8-5.452-3.294 4.859zM.706 11.637l3.248 4.762 8 5.453 8-5.453 3.248-4.762-11.294 7.641-11.294-7.641z"/>
          </svg>
          <span class="ml-2">john@example.com</span>
        </p>
      </div>

    <!-- Right Side -->
    <div class="space-y-6 w-full md:w-1/2" data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400">Contact <span class="text-white">me</span></h2>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Your email</label>
            <input v-model="state.email" type="email" id="email" class="mt-1 w-full px-4 py-2 bg-[#161B22] border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="john@example.com" />
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-300">Subject</label>
            <input v-model="state.subject" type="text" id="subject" class="mt-1 w-full px-4 py-2 bg-[#161B22] border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="Subject of your message" />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300">Message</label>
            <textarea v-model="state.message" id="message" rows="4" class="mt-1 w-full px-4 py-2 bg-[#161B22] border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="Let's talk about..."></textarea>
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-gradient-to-b from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-lg text-sm md:text-base">Send Message</button>
        </form>
        <p v-if="result" :class="{ 'text-green-500': status === 'success', 'text-red-500': status === 'error' }">
          {{ result }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { z } from "zod";

const config = useRuntimeConfig()

onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    offset: 50,
  })
})

const schema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Must be at least 10 characters"),
  subject: z.string().min(1, "Subject required"),
  access_key: z.string().min(1, "Access key is required"),
});

const state = reactive({
  access_key: config.public.webFormsApiKey,
  subject: " ",
  email: "",
  message: "",
});

const result = ref("");
const status = ref("");

async function onSubmit() {
  result.value = "Please wait...";
  try {
    const validatedData = schema.parse(state);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedData),
    });

    const responseData = await response.json();
    console.log(responseData);

    result.value = responseData.message;

    if (response.status === 200) {
      status.value = "success";
    } else {
      status.value = "error";
    }
  } catch (error) {
    console.error(error);
    status.value = "error";
    result.value = "Something went wrong!";
  } finally {
    // Reset form after submission
    state.email = "";
    state.subject = "";
    state.message = "";

    // Clear result and status after 5 seconds
    setTimeout(() => {
      result.value = "";
      status.value = "";
    }, 5000);
  }
}
</script>

<style scoped>
section {
  padding-top: 80px;
  margin-top: -80px;
}
</style>