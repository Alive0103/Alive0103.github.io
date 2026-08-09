<template>
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" class="works__poster">
    <defs>
      <radialGradient id="sm-glow" cx="60%" cy="40%" r="60%">
        <stop offset="0%" stop-color="var(--seed-amber)" stop-opacity="0.85" />
        <stop offset="60%" stop-color="var(--seed-lavender)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--seed-bg)" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="sm-ink" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--seed-fg)" />
        <stop offset="50%" stop-color="var(--seed-amber)" />
        <stop offset="100%" stop-color="var(--seed-lavender)" />
      </linearGradient>
      <pattern id="sm-dots" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="var(--seed-fg)" opacity="0.5" />
      </pattern>
    </defs>

    <rect width="800" height="600" fill="var(--seed-bg-elevated)" />
    <rect width="800" height="600" fill="url(#sm-glow)" opacity="0.9" />
    <rect width="800" height="600" fill="url(#sm-dots)" opacity="0.18" />

    <text
      x="50%"
      y="400"
      text-anchor="middle"
      font-family='"Helvetica Neue", Inter, system-ui, sans-serif'
      font-weight="700"
      font-size="200"
      fill="url(#sm-ink)"
      letter-spacing="-6"
    >Ev∞lve</text>

    <g font-family="ui-monospace, monospace" font-size="12" fill="var(--seed-fg)" opacity="0.7" letter-spacing="2">
      <text x="60" y="80">ADAPTIVE SYSTEMS</text>
      <text x="60" y="560">∞ — evolving with the user</text>
    </g>
    <g stroke="var(--seed-fg)" stroke-opacity="0.6" stroke-width="1" fill="none">
      <line x1="60" y1="100" x2="740" y2="100" />
      <line x1="60" y1="540" x2="740" y2="540" />
    </g>
  </svg>
</template>

<script setup lang="ts">
// Static faithful port of iCyris/Fleur AdaptivePoster
</script>

<style scoped>
.works__poster {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
