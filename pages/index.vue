<template>
  <div id="home" class="bg-gray-900/95 overflow-x-hidden relative">
    <!-- Particles Background -->
    <ParticlesBackground />
    
    <Navbar :class="{ 'navbar-fixed': isNavbarFixed }" />
   
    <div><card/></div>       
    
    <div id="about">
      <Aboutme/>
    </div>
    <div id="skills">
      <Skill/>
    </div>
    <div id="projects">
      <ProjectCarousel/>
    </div>
    <div id="blogs">
      <bloglist/>
    </div>
    <div id="contact">
      <Contact/>
    </div>

    <!-- Chatbot Interface -->
    <div class="chatbot-container" :class="{ 'chatbot-open': isChatbotOpen, 'shift-left': showBackToTop }">
      <div class="chatbot-header" @click="toggleChatbot">
        <img src="../public/chat.png" alt="Chatbot" />
      </div>
      <div v-show="isChatbotOpen" class="chatbot-body">
        <div class="chat" ref="chatContainer">
          <div v-for="(message, index) in chatHistory" :key="index" class="message" :class="message.role.toLowerCase()">
            <div class="message-icon" :class="message.role.toLowerCase()">
              <img v-if="message.role === 'User'" src="../public/user.png" alt="User" />
              <img v-else src="../public/bot.png" alt="Bot" />
            </div>
            <p>{{ message.text }}</p>
          </div>
          <div v-if="isLoading" class="loading-animation">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="chatbot-input">
          <input v-model="userInput" placeholder="Type a message..." @keyup.enter="sendMessage" />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>

    <button
      v-show="showBackToTop"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 4l8 8h-6v8h-4v-8H4z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Aboutme from '~/components/Aboutme.vue'
import Card from '~/components/card.vue'
import Skill from '~/components/Skillsection.vue'
import ProjectCarousel from '~/components/ProjectCarousel.vue'
import Contact from '~/components/contact.vue'
import bloglist from '~/components/bloglist.vue'

const config = useRuntimeConfig()
const showBackToTop = ref(false)
const isNavbarFixed = ref(false)
const isChatbotOpen = ref(false)
const userInput = ref('')
const isLoading = ref(false)
const chatHistory = ref([
  { role: 'Bot', text: 'Hello! How can I assist you today?' }
])
const chatContainer = ref(null)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 200
  isNavbarFixed.value = window.scrollY > 0
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const toggleChatbot = () => {
  isChatbotOpen.value = !isChatbotOpen.value
  if (isChatbotOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  scrollToBottom()
  const message = userInput.value.trim()
  chatHistory.value.push({ role: 'User', text: message })
  userInput.value = ''
  nextTick(() => {
    scrollToBottom()
  })

  isLoading.value = true

  try {
    const response = await fetch(`${config.public.apiBase}/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    chatHistory.value.push({ role: 'Bot', text: data })
  } catch (error) {
    console.error('Error:', error)
    chatHistory.value.push({ role: 'Bot', text: 'Sorry, I encountered an error. Please try again.' })
  } finally {
    isLoading.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

watch(chatHistory, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #2d7c30;
  border-radius: 50%;
  margin: 0 4px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #4ade80, #3b82f6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 998;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-to-top svg {
  width: 24px;
  height: 24px;
}

#home {
  width: 100vw;
  max-width: 100%;
}

.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.chatbot-open {
  width: 350px;
  height: 500px;
  border-radius: 10px;
}

.shift-left {
  right: 80px;
}

.chatbot-header {
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #174469, #3b82f6);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chatbot-header img {
  width: 30px;
  height: 30px;
}

.chatbot-body {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
}

.chat {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.message-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message p {
  background-color: #163464;
  color: white;
  padding: 8px;
  border-radius: 8px;
  max-width: calc(100% - 40px);
}

.message.user {
  flex-direction: row-reverse;
}

.message.user .message-icon {
  margin-right: 0;
  margin-left: 10px;
}

.message.user p {
  background-color: #043b4f;
}

.chatbot-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}

.chatbot-input input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
}

.chatbot-input button {
  background: linear-gradient(to right, #222f5b, #3b82f6);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chatbot-input button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .chatbot-container {
    right: 10px;
    bottom: 10px;
  }

  .chatbot-open {
    width: calc(100% - 20px);
    height: 60vh;
    max-height: 500px;
  }

  .shift-left {
    right: 10px;
    bottom: 70px;
  }

  .back-to-top {
    right: 10px;
    bottom: 10px;
  }
}
</style>