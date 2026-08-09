<template>
  <div class="fleur" :class="{ 'fleur--awake': awake }">
    <!-- Breathing Light (ambient glow) -->
    <div class="fleur__breathing-light" aria-hidden />

    <!-- Sticker Layer (falling SVG stickers) -->
    <StickerLayer
      v-if="!reducedMotion"
      ref="stickerRef"
      @count-change="stickerCount = $event"
    />

    <!-- Main content with fade-in -->
    <Transition name="fleur-fade">
      <div v-if="awake" class="fleur__main">
        <!-- N°01 Hero -->
        <HeroSection :title="heroTitle" :name="heroName" :tagline="heroTagline" />

        <!-- N°02 Intro -->
        <IntroSection />

        <!-- N°03 Works / Three Pillars -->
        <WorksSection />

        <!-- N°04 Playground (Sticker spawn zone) -->
        <PlaygroundSection
          ref="playgroundRef"
          :sticker-count="stickerCount"
          @spawn="stickerRef?.spawn($event.x, $event.y)"
        />

        <!-- N°05 Footer -->
        <FooterSection />
      </div>
    </Transition>

    <!-- Grain overlay -->
    <div class="fleur__grain" aria-hidden />

    <!-- Global Portfolio Launcher (nav button + modal) -->
    <GlobalPortfolioLauncher />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './AboutFleur/HeroSection.vue'
import IntroSection from './AboutFleur/IntroSection.vue'
import WorksSection from './AboutFleur/WorksSection.vue'
import PlaygroundSection from './AboutFleur/PlaygroundSection.vue'
import FooterSection from './AboutFleur/FooterSection.vue'
import StickerLayer from './AboutFleur/StickerLayer.vue'
import GlobalPortfolioLauncher from './GlobalPortfolioLauncher.vue'

const awake = ref(false)
const reducedMotion = ref(false)
const stickerCount = ref(0)
const playgroundRef = ref<HTMLElement>()
const stickerRef = ref()

// Source site content (iCyris/Fleur) — for 1:1 content replication
const heroTitle = 'Hi There'
const heroName = '温铮'
const heroTagline = '无尽夏日 · 光彩照人'

onMounted(() => {
  // Boot animation
  setTimeout(() => { awake.value = true }, 60)

  // Detect reduced motion preference
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mq.matches
  const handler = (e: MediaQueryListEvent) => { reducedMotion.value = e.matches }
  mq.addEventListener('change', handler)
  onUnmounted(() => mq.removeEventListener('change', handler))
})
</script>

<style scoped>
.fleur {
  /* Seed palette — Endless Summer Night */
  --seed-bg: #0B0A1E;
  --seed-bg-elevated: #141330;
  --seed-fg: #F4ECDC;
  --seed-fg-muted: #9C95B8;
  --seed-lavender: #8B7BE0;
  --seed-ocean: #1F3A8A;
  --seed-amber: #F5B461;
  --seed-neon: #A6F0A0;

  /* Derived colors */
  --color-bg: var(--seed-bg);
  --color-bg-elevated: var(--seed-bg-elevated);
  --color-fg: var(--seed-fg);
  --color-fg-muted: var(--seed-fg-muted);
  --color-divider: rgba(244, 236, 220, 0.14);
  --color-hairline: rgba(244, 236, 220, 0.22);
  --color-glass: rgba(20, 51, 48, 0.7);
  --color-glass-strong: rgba(20, 51, 48, 0.85);
  --color-halftone: rgba(139, 123, 224, 0.3);
  --color-signal-fg: var(--seed-neon);
  --color-accent: var(--seed-amber);
  --color-mid: var(--seed-ocean);
  --color-cool: var(--seed-lavender);

  /* Typography */
  --font-display: "Inter", "Helvetica Neue", "PingFang SC", system-ui, -apple-system, sans-serif;
  --font-body: "Inter", "Helvetica Neue", "PingFang SC", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", ui-monospace, "Menlo", "Consolas", monospace;

  /* Spacing tokens */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 72px;
  --space-9: 120px;

  /* Border radius */
  --seed-radius: 4px;
  --seed-radius-paper: 28px;

  /* Font sizes */
  --fs-body: 15px;
  --fs-small: 13px;
  --fs-mono: 12px;
  --fs-display: clamp(72px, 18vw, 280px);

  /* Full-screen container — parent constraints reset by html.fleur-route SCSS */
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-body);
  font-size: clamp(15px, 0.95vw + 13px, 17px);
  line-height: 1.65;
  /* NOTE: Don't use overflow:hidden here — it clips position:fixed children (PortfolioModal) */
}

/* Scoped dark theme — only affects this component tree */
.fleur :deep(a) {
  color: var(--color-cool);
  text-decoration: none;
}
.fleur :deep(a:hover) {
  color: var(--color-accent);
}

.fleur__breathing-light {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 25% 15%, rgba(139, 123, 224, 0.07), transparent),
    radial-gradient(ellipse 60% 50% at 75% 85%, rgba(245, 180, 97, 0.05), transparent);
  animation: breathe 8s ease-in-out infinite alternate;
}

@keyframes breathe {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.fleur__grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

.fleur__main {
  position: relative;
  z-index: 1;
}

/* Fade transition */
.fleur-fade-enter-active {
  transition: opacity 1.2s ease-out;
}
.fleur-fade-leave-active {
  transition: opacity 0.3s ease-in;
}
.fleur-fade-enter-from,
.fleur-fade-leave-to {
  opacity: 0;
}
</style>
