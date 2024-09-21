<template>
  <section class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-8">
    <div class="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-8">
      
      <!-- Left Side -->
       <div class="space-y-4 w-full md:w-1/2" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400">Let's Connect</h2>
        <p class="text-lg md:text-lg">Don't hesitate to send me a message or an e-mail. I will get back to you as fast as I can.</p>

        <p class= "flex items-center text-sm md:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
          </svg>
          <span class="ml-2">nethmalgunawardhana@gmail.com</span>
        </p>
      </div>

      <!-- Right Side -->
      <div class="space-y-6 w-full md:w-1/2 bg-gray-800 p-6 rounded-xl border border-gray-900" data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400">Contact <span class="text-white">me</span></h2>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Your email</label>
            <input v-model="state.email" type="email" id="email" class="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="john@example.com" />
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-300">Subject</label>
            <input v-model="state.subject" type="text" id="subject" class="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="Subject of your message" />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300">Message</label>
            <textarea v-model="state.message" id="message" rows="4" class="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white text-sm md:text-base" placeholder="Let's talk about..."></textarea>
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