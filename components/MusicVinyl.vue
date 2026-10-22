<script setup lang="ts">
defineProps<{ playing: boolean; title: string; mini?: boolean }>()
</script>

<template>
  <div class="vinyl" :class="{ spinning: playing, miniature: mini }" aria-hidden="true">
    <div class="vinyl-label"><span class="vinyl-brand">ALIVE · RECORDS</span><strong :class="{ 'long-title': title.length > 5 }">{{ title }}</strong><i /><span class="vinyl-side">SIDE A</span></div>
  </div>
</template>

<style scoped>
.vinyl { position: relative; width: 100%; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; border: 1px solid #42413e; box-sizing: border-box; background: repeating-radial-gradient(circle at center, transparent 0 2px, #ffffff0b 3px, transparent 4px), conic-gradient(from 30deg, #151515, #44433f 12%, #111 25%, #292825 46%, #55514c 62%, #171717 78%, #151515); box-shadow: 0 0 0 3px #252422, 8px 20px 30px #43312630, inset 0 0 0 5px #181818; animation: vinyl-turn 24s linear infinite paused; }
.vinyl.spinning { animation-play-state: running; }
.vinyl::before { content: ''; position: absolute; inset: 21%; border: 1px solid #d7edce1a; border-radius: 50%; box-shadow: 0 0 0 8px #00000022; }
.vinyl-label { position: relative; width: 36%; aspect-ratio: 1; border-radius: 50%; overflow: hidden; background: radial-gradient(ellipse at 10% 0, #f6d1b5, transparent 85%), var(--record-accent, #db553b); color: #512e26; border: 3px solid #f7c9ac66; box-shadow: 0 0 0 7px #191817; }
.vinyl-label strong { position: absolute; top: 23%; left: 0; width: 100%; text-align: center; font-family: 'Songti SC', 'Noto Serif SC', serif; font-size: clamp(18px, 2.2vw, 30px); font-weight: 600; letter-spacing: .18em; padding-left: .18em; }
.vinyl-label strong.long-title { top: 25%; padding: 0 7%; font-size: clamp(7px, .85vw, 12px); letter-spacing: .02em; line-height: 1.3; }
.vinyl-label i { position: absolute; left: 46%; top: 48%; width: 8%; aspect-ratio: 1; border-radius: 50%; background: #292522; box-shadow: 0 0 0 2px #f6d1b5aa; }
.vinyl-brand, .vinyl-side { position: absolute; left: 0; width: 100%; text-align: center; font-size: clamp(6px, .6vw, 9px); letter-spacing: .16em; }
.vinyl-brand { top: 13%; }
.vinyl-side { bottom: 18%; }
.miniature { box-shadow: 0 2px 5px #382a2426; }
.miniature .vinyl-label { width: 37%; border-width: 1px; box-shadow: none; }
.miniature .vinyl-label strong, .miniature .vinyl-brand, .miniature .vinyl-side { display: none; }
.miniature .vinyl-label i { width: 25%; left: 38%; top: 38%; box-shadow: none; }
@keyframes vinyl-turn { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .vinyl { animation: none; } }
</style>
