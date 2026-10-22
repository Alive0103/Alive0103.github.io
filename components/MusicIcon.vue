<script setup lang="ts">
defineProps<{ name: keyof typeof paths }>()

const paths = {
  music: 'M9 18V5l12-2v13 M9 8l12-2 M9 18c0 1.7-1.8 3-4 3s-3-1-3-2.5S3.8 16 6 16c1.2 0 2.2.3 3 1 M21 16c0 1.7-1.8 3-4 3s-3-1-3-2.5 1.8-2.5 4-2.5c1.2 0 2.2.3 3 1',
  play: 'm9 5 11 7-11 7Z',
  pause: 'M8 5v14 M16 5v14',
  previous: 'M5 5v14 M19 5 8 12l11 7Z',
  next: 'M19 5v14 M5 5l11 7-11 7Z',
  close: 'm6 6 12 12 M18 6 6 18',
  repeat: 'm17 2 4 4-4 4 M3 11V8a2 2 0 0 1 2-2h16 M7 22l-4-4 4-4 M21 13v3a2 2 0 0 1-2 2H3',
  volume: 'M11 5 6 9H3v6h3l5 4Z M15 8a6 6 0 0 1 0 8 M18 5a10 10 0 0 1 0 14',
  muted: 'M11 5 6 9H3v6h3l5 4Z m5 4 5 6 m0-6-5 6',
  search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" />
  </svg>
</template>
