<template>
  <div class="typed-output text-blue-500 lg:text-5xl" >
    <span ref="typedElement"> </span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Typed from 'typed.js'

const typedElement = ref(null)

onMounted(() => {
  const options = {
    strings: [' Developer.', " Designer.", " Freelancer."],
    typeSpeed: 40,
    backSpeed: 20,
    
    loop: true,
  }

  new Typed(typedElement.value, options)
})
</script>

<style >
.typed-output {
  
  font-weight: bold;
 
  
}
</style>
