<template>
  <!-- Button teleported into nav right group (right of search) -->
  <Teleport to=".yun-nav-menu .justify-end" :disabled="!ready">
    <button
      class="fleur-nav-portfolio"
      :title="$t ? $t('menu.projects') || 'Projects' : 'Projects'"
      @click="portfolio.open()"
      aria-label="Open Projects"
    >
      <!-- Sparkle grid icon: elegant 2×2 composition symbol -->
      <svg class="fleur-nav-portfolio__icon" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.45"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.45"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.7"/>
        <!-- Subtle sparkle -->
        <circle cx="18" cy="6" r="1" fill="var(--seed-amber, #F5B461)" opacity="0.8"/>
      </svg>
    </button>
  </Teleport>

  <!-- Modal teleported to body -->
  <Teleport to="body">
    <PortfolioModal v-if="portfolio.isOpen.value" @close="portfolio.close()" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'
import PortfolioModal from './AboutFleur/PortfolioModal.vue'

const portfolio = usePortfolio()
const ready = ref(false)

onMounted(async () => {
  await nextTick()
  // Poll for nav right group existence (nav renders globally)
  for (let i = 0; i < 30; i++) {
    if (document.querySelector('.yun-nav-menu .justify-end')) {
      ready.value = true
      break
    }
    await new Promise(r => setTimeout(r, 100))
  }
})
</script>

<style scoped>
.fleur-nav-portfolio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  margin-left: 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--va-c-text, inherit);
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.25s, transform 0.25s;
}
.fleur-nav-portfolio:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(1.1);
}
.fleur-nav-portfolio:active {
  transform: scale(0.95);
}

.fleur-nav-portfolio__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transition: color 0.25s;
}
.fleur-nav-portfolio:hover .fleur-nav-portfolio__icon {
  color: var(--seed-lavender, #8B7BE0);
}
</style>
