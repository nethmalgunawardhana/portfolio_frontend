<template>
  <div class="typed-output text-white">
    <span ref="typedElement"></span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Typed from 'typed.js'

const typedElement = ref(null)

onMounted(() => {
  const options = {
    strings: ['Hello!', "I'm Nethmal Gunawardhana"],
    typeSpeed: 40,
    backSpeed: 20,
    
    loop: true,
  }

  new Typed(typedElement.value, options)
})
</script>

<style scoped>
.typed-output {
  font-size: 50px;
  color: white;
  
}
</style>
