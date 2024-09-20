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
    <div class="chatbot-container">
      <div class="chatbot-header" @click="toggleChatbot">
        <span>Chat with us</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>
      <div v-show="isChatbotOpen" class="chatbot-body">
        <div class="chat">
          <div v-for="(message, index) in chatHistory" :key="index" class="message" :class="message.role.toLowerCase()">
            <p><strong>{{ message.role }}:</strong> {{ message.text }}</p>
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
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Aboutme from '~/components/Aboutme.vue'
import Card from '~/components/card.vue'
import Skill from '~/components/Skillsection.vue'
import ProjectCarousel from '~/components/ProjectCarousel.vue'
import Contact from '~/components/contact.vue'
import bloglist from '~/components/bloglist.vue'

const showBackToTop = ref(false)
const isNavbarFixed = ref(false)
const isChatbotOpen = ref(false)
const userInput = ref('')
const chatHistory = ref([])

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

const toggleChatbot = () => {
  isChatbotOpen.value = !isChatbotOpen.value
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  // Add user message to chat history
  chatHistory.value.push({ role: 'User', text: userInput.value })

  try {
    // Send message to backend
    const response = await fetch('/chat', {
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

    // Add bot response to chat history
    chatHistory.value.push({ role: 'Bot', text: data })
  } catch (error) {
    console.error('Error:', error)
    chatHistory.value.push({ role: 'Bot', text: 'Sorry, I encountered an error. Please try again.' })
  }

  // Clear user input
  userInput.value = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
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
  z-index: 1000;
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
  width: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
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
  height: 400px;
  display: flex;
  flex-direction: column;
}

.chat {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background-color: #e6f3ff;
  align-self: flex-end;
}

.message.bot {
  background-color: #f0f0f0;
  align-self: flex-start;
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