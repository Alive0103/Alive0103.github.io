<template>
  <section ref="sectionRef" class="fleur-playground fleur-grid-faint" id="playground">
    <div class="fleur-playground__label mono-caps">
      <span class="fleur-playground__label-index">N°03</span>
      <span class="fleur-playground__label-title">Playground</span>
      <span class="fleur-playground__label-meta mono">tap anywhere below to spawn a sticker</span>
    </div>

    <div class="fleur-playground__stage" @click="onCanvasClick">
      <h2 class="fleur-playground__headline">
        stickers /<br /><em>memory fragments</em>
      </h2>

      <div class="fleur-playground__copy">
        <p>
          Stickers drift down from beyond the page — some pass through,
          some stick around like small memories. Tap or click anywhere on
          the dark surface to leave one of your own.
        </p>
        <p class="mono">A quiet layer that lives beneath everything — just for fun.</p>
      </div>

      <div class="fleur-playground__readout mono">
        <div class="fleur-playground__readout-row">
          <span>stickers_in_flight</span>
          <span>{{ String(stickerCount).padStart(2, '0') }}</span>
        </div>
        <div class="fleur-playground__readout-row">
          <span>render_fps</span>
          <span ref="fpsRef">60</span>
        </div>
        <div class="fleur-playground__readout-row">
          <span>scroll_velocity</span>
          <span ref="velRef">0000 px/s</span>
        </div>
        <div class="fleur-playground__readout-row">
          <span>tap_to_spawn</span>
          <span class="signal">enabled</span>
        </div>
      </div>

      <p class="fleur-playground__hint mono-caps" aria-hidden>
        Click or tap anywhere in this section to spawn a sticker
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  stickerCount: number
}>()

const sectionRef = ref<HTMLElement>()
const fpsRef = ref<HTMLSpanElement>()
const velRef = ref<HTMLSpanElement>()
const lastScroll = { y: 0, t: 0 }
let rafId = 0
let last = 0
let frames = 0

const emit = defineEmits<{
  (e: 'spawn', payload: { x: number; y: number }): void
}>()

function onCanvasClick(e: MouseEvent) {
  // Emit viewport coordinates directly for StickerLayer
  emit('spawn', { x: e.clientX, y: e.clientY })
}

function tickFps() {
  frames++
  const now = performance.now()
  const elapsed = now - last
  if (elapsed >= 1000) {
    const fps = Math.round((frames * 1000) / elapsed)
    if (fpsRef.value) fpsRef.value.textContent = String(fps).padStart(2, '0')
    frames = 0
    last = now
  }
  rafId = requestAnimationFrame(tickFps)
}

function onScroll() {
  const now = performance.now()
  const dy = window.scrollY - lastScroll.y
  const dt = now - lastScroll.t || 1
  const v = Math.abs(dy / dt) * 1000
  if (velRef.value) velRef.value.textContent = `${Math.round(v).toString().padStart(4, '0')} px/s`
  lastScroll.y = window.scrollY
  lastScroll.t = now
}

onMounted(() => {
  last = performance.now()
  frames = 0
  rafId = requestAnimationFrame(tickFps)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.fleur-playground {
  padding: var(--space-9, 120px) clamp(24px, 4vw, 56px);
  position: relative;
}

.fleur-playground__label {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 11px;
  color: var(--color-cool);
  letter-spacing: 0.12em;
  margin: 0 0 28px;
}
.fleur-playground__label-index { color: var(--color-cool); }
.fleur-playground__label-title {
  color: var(--color-fg);
  text-transform: none;
  letter-spacing: 0;
  font-size: 13px;
}
.fleur-playground__label-meta {
  color: var(--color-fg-muted);
  margin-left: auto;
}

.fleur-playground__stage {
  border-radius: var(--seed-radius-paper, 28px);
  border: 1px solid var(--color-divider);
  background: rgba(11, 10, 30, 0.6);
  padding: var(--space-6, 32px);
  cursor: crosshair;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.fleur-playground__headline {
  font-family: var(--font-display);
  font-size: clamp(34px, 3vw + 18px, 56px);
  font-weight: 500;
  line-height: 1.05;
  color: var(--color-fg);
  margin: 0;
}
.fleur-playground__headline em {
  font-style: italic;
  color: var(--color-accent);
}

.fleur-playground__copy {
  font-size: var(--fs-body);
  color: rgba(244, 236, 220, 0.7);
  line-height: 1.7;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fleur-playground__copy .mono {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-fg-muted);
}

.fleur-playground__readout {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  color: var(--color-fg-muted);
  border-top: 1px solid var(--color-divider);
  padding-top: 16px;
}
.fleur-playground__readout-row {
  display: flex;
  justify-content: space-between;
}
.signal { color: var(--color-signal-fg); }

.fleur-playground__hint {
  font-size: 10px;
  color: var(--color-fg-muted);
  opacity: 0.6;
}

.fleur-grid-faint {
  background-image:
    linear-gradient(rgba(244, 236, 220, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 236, 220, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.mono {
  font-family: var(--font-mono);
}
</style>
