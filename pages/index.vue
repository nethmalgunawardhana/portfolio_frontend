<template>
  <div id="home" class="bg-gray-900 overflow-x-hidden">
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
     <div class="chatbot-container" :class="{ 'chatbot-open': isChatbotOpen }">
      <div class="chatbot-header" @click="toggleChatbot">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
</svg>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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
  chatHistory.value.push({ role: 'User', text: userInput.value })
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
      body: JSON.stringify({ message: userInput.value }),
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
  background-color: #202543;
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
  right: 80px;
  width: 48px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.chatbot-open {
  height: 500px;
  width:400px
}

.chatbot-header {
  background: linear-gradient(to right, #4ade80, #3b82f6);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.chatbot-body {
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
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
  background-color: #f0f0f0;
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
  background-color: #e6f3ff;
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
  background: linear-gradient(to right, #4ade80, #3b82f6);
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
</style>