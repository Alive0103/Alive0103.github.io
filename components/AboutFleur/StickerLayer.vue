<template>
  <div class="sticker-layer" aria-hidden>
    <div
      v-for="s in stickers"
      :key="s.id"
      class="sticker"
      :style="{
        left: s.x + '%',
        '--fall-dur': s.dur + 's',
        '--fall-delay': s.delay + 's',
        '--fall-rot': s.rot + 'deg',
        '--fall-scale': s.scale,
        '--fall-opacity': s.opacity,
        '--fall-drift': s.drift + 'px',
        '--fall-top': s.top !== undefined ? s.top + 'px' : undefined,
      }"
      :class="{ 'sticker--spawned': s.spawned }"
      @animationend="removeSticker(s.id)"
    >
      <component :is="s.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue'

// ── SVG sticker components ──────────────────────────────────────
// Each is a small functional component returning an inline SVG.

function makeSvg(inner: string, viewBox = '0 0 24 24') {
  return () =>
    h(
      'svg',
      {
        viewBox,
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        style: 'width:100%;height:100%;display:block;',
      },
      [h('g', { innerHTML: inner })],
    )
}

const FlowerSvg = makeSvg(
  '<circle cx="12" cy="12" r="3" fill="#F5B461"/>' +
  '<ellipse cx="12" cy="6" rx="3" ry="4" fill="#8B7BE0" opacity=".7"/>' +
  '<ellipse cx="18" cy="12" rx="4" ry="3" fill="#8B7BE0" opacity=".7"/>' +
  '<ellipse cx="12" cy="18" rx="3" ry="4" fill="#8B7BE0" opacity=".7"/>' +
  '<ellipse cx="6" cy="12" rx="4" ry="3" fill="#8B7BE0" opacity=".7"/>',
)

const LeafSvg = makeSvg(
  '<path d="M20 4C20 4 8 6 6 18c-.5 3 1 4 2 3C20 18 20 4 20 4z" fill="#87978E" opacity=".8"/>' +
  '<path d="M20 4C20 4 12 8 8 16" stroke="#5a6e60" stroke-width=".8" fill="none"/>',
)

const StarSvg = makeSvg(
  '<path d="M12 2l2.4 7.2H22l-6 4.8 2.3 7.2-6.3-4.4-6.3 4.4L8 14 2 9.2h7.6z" fill="#F5B461" opacity=".75"/>',
)

const DotSvg = makeSvg(
  '<circle cx="12" cy="12" r="5" fill="#F4ECDC" opacity=".5"/>',
)

const AsteriskSvg = makeSvg(
  '<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="#A6F0A0" stroke-width="2" stroke-linecap="round" opacity=".6"/>',
)

const MoonSvg = makeSvg(
  '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="#9C95B8" opacity=".6"/>',
)

const SquareSvg = makeSvg(
  '<rect x="5" y="5" width="14" height="14" rx="2" stroke="#8B7BE0" stroke-width="1.5" fill="none" opacity=".5"/>',
)

const EyeSvg = makeSvg(
  '<ellipse cx="12" cy="12" rx="9" ry="5.5" stroke="#5bc9d6" stroke-width="1.2" fill="none" opacity=".5"/>' +
  '<circle cx="12" cy="12" r="2.5" fill="#5bc9d6" opacity=".5"/>',
)

const TagSvg = makeSvg(
  '<path d="M20.6 13.4L11 3.8A2 2 0 0 0 9.6 3H4a1 1 0 0 0-1 1v5.6c0 .5.2 1 .6 1.4l9.6 9.6a2 2 0 0 0 2.8 0l4.6-4.6a2 2 0 0 0 0-2.8z" stroke="#F5B461" stroke-width="1.2" fill="none" opacity=".5"/>' +
  '<circle cx="7.5" cy="7.5" r="1.5" fill="#F5B461" opacity=".5"/>',
)

const SlashSvg = makeSvg(
  '<path d="M17 5L7 19" stroke="#F4ECDC" stroke-width="2.5" stroke-linecap="round" opacity=".4"/>',
)

const stickerSvgs = [
  FlowerSvg, LeafSvg, StarSvg, DotSvg, AsteriskSvg,
  MoonSvg, SquareSvg, EyeSvg, TagSvg, SlashSvg,
]

// ── State ───────────────────────────────────────────────────────
interface Sticker {
  id: number
  x: number        // percentage
  dur: number      // seconds
  delay: number    // seconds
  rot: number      // degrees
  scale: number
  opacity: number
  drift: number    // px horizontal drift
  svg: ReturnType<typeof makeSvg>
  top?: number     // px — for click-spawned stickers
  spawned?: boolean
}

let nextId = 0
const stickers = ref<Sticker[]>([])
const emit = defineEmits<{ countChange: [number] }>()

const MAX_STICKERS = 20
let dripTimer: ReturnType<typeof setInterval> | null = null

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function addSticker(x?: number, top?: number) {
  if (stickers.value.length >= MAX_STICKERS) return

  const s: Sticker = {
    id: nextId++,
    x: x ?? rand(5, 90),
    dur: rand(14, 26),
    delay: x !== undefined ? 0 : rand(0, 1.5),
    rot: rand(-200, 200),
    scale: rand(0.5, 1.0),
    opacity: rand(0.4, 0.85),
    drift: rand(-40, 40),
    svg: pick(stickerSvgs),
    top,
    spawned: x !== undefined,
  }

  stickers.value.push(s)
  emit('countChange', stickers.value.length)
}

function removeSticker(id: number) {
  const idx = stickers.value.findIndex(s => s.id === id)
  if (idx !== -1) {
    stickers.value.splice(idx, 1)
    emit('countChange', stickers.value.length)
  }
}

// Called from PlaygroundSection click
function spawn(x: number, y: number) {
  // x, y are viewport pixel coordinates
  const pct = (x / window.innerWidth) * 100
  addSticker(pct, y)
}

defineExpose({ spawn })

onMounted(() => {
  // Opening burst: 5 stickers staggered 200ms apart
  for (let i = 0; i < 5; i++) {
    setTimeout(() => addSticker(), 800 + i * 200)
  }

  // Drip: add a sticker every 4-8 seconds
  function scheduleDrip() {
    dripTimer = setTimeout(() => {
      addSticker()
      scheduleDrip()
    }, rand(4000, 8000))
  }
  scheduleDrip()
})

onUnmounted(() => {
  if (dripTimer !== null) clearTimeout(dripTimer)
})
</script>

<style scoped>
.sticker-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.sticker {
  position: absolute;
  top: -60px;
  width: 32px;
  height: 32px;
  will-change: transform, opacity;
  animation: sticker-fall var(--fall-dur) linear var(--fall-delay) forwards;
}

.sticker--spawned {
  /* Click-spawned stickers start at the click position */
  top: var(--fall-top, -60px);
  animation-name: sticker-fall-spawned;
}

@keyframes sticker-fall {
  0% {
    transform: translateY(-12vh) translateX(0) rotate(0deg) scale(var(--fall-scale));
    opacity: 0;
  }
  8% {
    opacity: var(--fall-opacity);
  }
  50% {
    transform: translateY(50vh) translateX(var(--fall-drift)) rotate(calc(var(--fall-rot) * 0.5)) scale(var(--fall-scale));
  }
  92% {
    opacity: var(--fall-opacity);
  }
  100% {
    transform: translateY(112vh) translateX(calc(var(--fall-drift) * 1.5)) rotate(var(--fall-rot)) scale(var(--fall-scale));
    opacity: 0;
  }
}

@keyframes sticker-fall-spawned {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fall-scale));
    opacity: var(--fall-opacity);
  }
  92% {
    opacity: var(--fall-opacity);
  }
  100% {
    transform: translateY(112vh) translateX(var(--fall-drift)) rotate(var(--fall-rot)) scale(var(--fall-scale));
    opacity: 0;
  }
}
</style>
