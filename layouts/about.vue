<script setup lang="ts">
// Full-screen layout for /about/ — no sidebar, no wrapper, just pure content
// All theme chrome hidden via fleur-route class on <html>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // Route-scoped class: lets global SCSS hide theme chrome elements
  document.documentElement.classList.add('fleur-route')

  // Inject Inter + JetBrains Mono fonts only for this route
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
  link.id = 'fleur-fonts'
  document.head.appendChild(link)
})

onUnmounted(() => {
  document.documentElement.classList.remove('fleur-route')
  document.getElementById('fleur-fonts')?.remove()
})
</script>

<template>
  <div class="about-fullscreen">
    <RouterView />
  </div>
</template>

<style>
.about-fullscreen {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  /* Don't use overflow:hidden — it clips position:fixed children like PortfolioModal */
}

/* Ensure the Fleur component fills the entire viewport */
.about-fullscreen > div {
  width: 100%;
  min-height: 100vh;
}
</style>
