<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import MusicRoom from '../components/MusicRoom.vue'

onMounted(() => document.documentElement.classList.add('music-route'))
onUnmounted(() => document.documentElement.classList.remove('music-route'))
</script>

<template>
  <ClientOnly><MusicRoom /></ClientOnly>
</template>

<style>
html.music-route { background: #f8f5f0; color-scheme: light; }
html.music-route .yun-bg, html.music-route .yun-page-header-gradient, html.music-route .yun-footer { display: none; }
html.music-route .yun-nav-menu { background: #f8f5f0e8 !important; color: #39332f; border-bottom: 1px solid #79635412; }
html.music-route .yun-nav-menu, html.music-route .music-nav { --va-c-text: #39332f; }
</style>
