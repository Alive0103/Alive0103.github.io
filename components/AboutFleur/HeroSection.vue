<template>
  <section ref="heroRef" class="fleur-hero" :class="{ 'fleur-hero--revealed': revealed }" id="hero">
    <!-- Constellation / ambient pattern -->
    <div class="fleur-hero__constellation" aria-hidden />

    <!-- Cursor glow (desktop only) -->
    <div
      v-if="!reduced && hasHover"
      class="fleur-hero__cursor-glow"
      :style="{ transform: `translate(${glowX}px, ${glowY}px)` }"
      aria-hidden
    />

    <!-- Top bar -->
    <div class="fleur-hero__topbar mono-caps" />

    <!-- Title area: 温铮 outlined behind, Fleur gradient on top -->
    <div class="fleur-hero__title-wrap">
      <div class="fleur-hero__title-stack">
        <!-- Background layer: 温铮 — shimmer only (glowing effect) -->
        <span class="fleur-hero__name-outline" aria-hidden>
          <span class="fleur-hero__name-shimmer" aria-hidden>{{ name }}</span>
        </span>

        <!-- Foreground: Hi There — gradient text, no shimmer -->
        <h1 class="fleur-hero__title" :aria-label="title">
          <span
            v-for="(ch, i) in titleChars"
            :key="'main-' + i"
            class="fleur-hero__letter"
          >
            <span
              ref="letterEls"
              class="fleur-hero__letter-inner"
              :style="getLetterStyle(i)"
              v-html="ch === ' ' ? '&nbsp;' : ch"
            />
          </span>
        </h1>
      </div>

      <!-- Gold Chinese tagline -->
      <div class="fleur-hero__tagline">
        <span class="fleur-hero__tagline-dash" aria-hidden />
        <span class="fleur-hero__tagline-text">{{ tagline }}</span>
        <span class="fleur-hero__tagline-dash" aria-hidden />
      </div>
    </div>

    <!-- Bottom bar / scroll affordance -->
    <div class="fleur-hero__bottombar">
      <div class="fleur-hero__scroll mono-caps">
        <span class="fleur-hero__bounce">scroll ↓</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  name?: string
  tagline?: string
}>(), {
  name: '温铮',
  tagline: '无尽夏日 · 光彩照人',
})

const heroRef = ref<HTMLElement>()
const letterEls = ref<HTMLSpanElement[]>([])
const reduced = ref(false)
const hasHover = ref(window.matchMedia('(hover: hover)').matches)
const revealed = ref(false)

// Magnetic effect — only active after entrance animation completes
const magneticReady = ref(false)
const glowX = ref(-620)
const glowY = ref(-620)
const letterOffsets = ref<Array<{ x: number; y: number; rot: number }>>([])

const titleChars = computed(() => props.title.split(''))

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches

  // Initialize offsets
  letterOffsets.value = titleChars.value.map(() => ({ x: 0, y: 0, rot: 0 }))

  // Safety net: force-reveal the title shortly after the entrance window
  setTimeout(() => { revealed.value = true }, 2400)

  // Enable magnetic effect after CSS entrance animation completes
  setTimeout(() => {
    magneticReady.value = true
    if (!reduced.value) setupMagneticEffect()
  }, 2200)
})

function getLetterStyle(i: number) {
  if (!magneticReady.value || reduced.value) return {}
  const offset = letterOffsets.value[i] || { x: 0, y: 0, rot: 0 }
  return {
    transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rot}deg)`,
  }
}

function setupMagneticEffect() {
  let pending = false
  let lastX = 0
  let lastY = 0
  const RADIUS = 520
  const centers: Array<{ cx: number; cy: number }> = []

  const recalcCenters = () => {
    const els = letterEls.value
    if (!els) return
    els.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      centers[i] = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
    })
  }

  const apply = () => {
    pending = false
    if (hasHover.value) {
      glowX.value = lastX - 310
      glowY.value = lastY - 310
    }
    recalcCenters()

    for (let i = 0; i < titleChars.value.length; i++) {
      const c = centers[i]
      if (!c || (!c.cx && !c.cy)) continue
      const dx = lastX - c.cx
      const dy = lastY - c.cy
      const dist = Math.hypot(dx, dy)
      const t = dist >= RADIUS ? 0 : 1 - dist / RADIUS
      if (t === 0) {
        letterOffsets.value[i] = { x: 0, y: 0, rot: 0 }
        continue
      }
      const pull = 18 * t
      const inv = 1 / Math.max(1, dist)
      letterOffsets.value[i] = {
        x: dx * inv * pull,
        y: dy * inv * pull * 0.7,
        rot: (dx / 80) * t * -1.2,
      }
    }
  }

  const onMove = (e: PointerEvent) => {
    lastX = e.clientX
    lastY = e.clientY
    if (pending) return
    pending = true
    requestAnimationFrame(apply)
  }

  window.addEventListener('pointermove', onMove, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onMove)
  })
}
</script>

<style scoped>
.fleur-hero {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  isolation: isolate;
}

.fleur-hero__constellation {
  position: absolute;
  inset: -10%;
  opacity: 0.08;
  mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 75%);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(139, 123, 224, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245, 180, 97, 0.1) 0%, transparent 40%);
  pointer-events: none;
}

.fleur-hero__cursor-glow {
  position: fixed;
  left: 0;
  top: 0;
  width: 620px;
  height: 620px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(245, 180, 97, 0.32) 0%,
    rgba(245, 180, 97, 0.12) 35%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: screen;
  will-change: transform;
}

.fleur-hero__topbar {
  position: absolute;
  top: 24px;
  left: clamp(24px, 4vw, 48px);
  right: clamp(24px, 4vw, 48px);
  height: 1px;
  background: var(--color-hairline);
  z-index: 2;
}

/* ===== TITLE WRAP: centered ===== */
.fleur-hero__title-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* ===== TITLE STACK: overlapping layers ===== */
.fleur-hero__title-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== BACKGROUND LAYER: 温铮 shimmer glow ===== */
.fleur-hero__name-outline {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-body);
  font-size: clamp(70px, 12vw, 180px);
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  z-index: 0;
}

/* Glowing aura behind 温铮 */
.fleur-hero__name-outline::before {
  content: '';
  position: absolute;
  inset: -40% -20%;
  background: radial-gradient(
    ellipse 70% 60% at 50% 55%,
    rgba(245, 180, 97, 0.25) 0%,
    rgba(139, 123, 224, 0.14) 45%,
    transparent 70%
  );
  filter: blur(45px);
  pointer-events: none;
  z-index: -1;
  animation: nameGlow 5s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

@keyframes nameGlow {
  0% { opacity: 0.5; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1.06); }
}

/*
 * Shimmer on 温铮: animated gradient sweep with visible outline.
 * Self-positioned since parent has no intrinsic size.
 */
.fleur-hero__name-shimmer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: 1;
  white-space: nowrap;
  /* Subtle base outline */
  -webkit-text-stroke: 1px rgba(244, 236, 220, 0.35);
  /* Animated gradient sweep — barely visible */
  background: linear-gradient(105deg,
    rgba(244, 236, 220, 0.02) 0%,
    rgba(245, 180, 97, 0.1) 35%,
    rgba(244, 236, 220, 0.14) 50%,
    rgba(245, 180, 97, 0.1) 65%,
    rgba(244, 236, 220, 0.02) 100%
  );
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: heroShimmer 6s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  will-change: background-position;
}

@keyframes heroShimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* ===== MAIN TITLE: Fleur — gradient text + shimmer (ON TOP of outline) ===== */
.fleur-hero__title {
  font-family: var(--font-display);
  font-weight: 200;
  font-synthesis: none;
  font-optical-sizing: none;
  font-size: clamp(80px, 20vw, 320px);
  line-height: 0.86;
  letter-spacing: -0.04em;
  color: var(--color-fg);
  margin: 0;
  text-align: center;
  position: relative;
  z-index: 1; /* above the outline layer */
  user-select: none;
  -webkit-user-select: none;
  -webkit-text-stroke: 0.25px rgba(244, 236, 220, 0.24);
}

/* Ambient glow behind title */
.fleur-hero__title::before {
  content: '';
  position: absolute;
  inset: -30% -15%;
  background: radial-gradient(
    ellipse 70% 60% at 50% 55%,
    rgba(245, 180, 97, 0.28) 0%,
    rgba(139, 123, 224, 0.16) 40%,
    transparent 70%
  );
  filter: blur(50px);
  pointer-events: none;
  z-index: -1;
  will-change: transform;
}

/*
 * Each letter: gradient background clipped to text shape.
 * This creates the signature "hollow" multi-color gradient text.
 */
.fleur-hero__letter {
  display: inline-block;
  will-change: transform, opacity;
  opacity: 0;
  transform: translateY(28px);
  animation: letterIn 1s cubic-bezier(0.16, 0.84, 0.24, 1) forwards;
  background: linear-gradient(168deg,
    rgba(245, 180, 97, 0.85) 0%,
    var(--seed-fg, #F4ECDC) 22%,
    rgba(244, 236, 220, 0.92) 45%,
    rgba(139, 123, 224, 0.55) 72%,
    rgba(245, 180, 97, 0.50) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.fleur-hero__letter:nth-child(1) { animation-delay: 0.3s; }
.fleur-hero__letter:nth-child(2) { animation-delay: 0.42s; }
.fleur-hero__letter:nth-child(3) { animation-delay: 0.54s; }
.fleur-hero__letter:nth-child(4) { animation-delay: 0.66s; }
.fleur-hero__letter:nth-child(5) { animation-delay: 0.78s; }

.fleur-hero__letter-inner {
  display: inline-block;
  will-change: transform;
}

/* Safety net */
.fleur-hero--revealed .fleur-hero__letter {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
}

@keyframes letterIn {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== GOLD TAGLINE: 无尽夏日 · 光彩照人 ===== */
.fleur-hero__tagline {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 0.9s ease-out 1.4s forwards;
}

.fleur-hero__tagline-dash {
  width: 24px;
  height: 1px;
  background: rgba(245, 180, 97, 0.5);
}

.fleur-hero__tagline-text {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.28em;
  color: rgba(245, 180, 97, 0.6);
  text-transform: none;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .fleur-hero__letter,
  .fleur-hero__name-shimmer,
  .fleur-hero__tagline,
  .fleur-hero__bottombar {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  .fleur-hero__name-shimmer {
    animation: none !important;
    opacity: 0;
  }
}

/* Bottom bar */
.fleur-hero__bottombar {
  position: absolute;
  bottom: 32px;
  left: clamp(24px, 4vw, 48px);
  right: clamp(24px, 4vw, 48px);
  z-index: 2;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.8s forwards;
}

.fleur-hero__scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-fg-muted);
  letter-spacing: 0.04em;
}

.fleur-hero__bounce {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Mobile: left-align title like source */
@media (max-width: 768px) {
  .fleur-hero__title-wrap {
    align-items: flex-start;
  }
  .fleur-hero__title {
    text-align: left;
    font-size: clamp(120px, 36vw, 240px);
    letter-spacing: 0.04em;
  }
}
</style>
