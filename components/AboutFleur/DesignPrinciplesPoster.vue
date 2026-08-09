<template>
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" class="works__poster">
    <defs>
      <pattern id="hd-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.4" fill="var(--seed-amber)" />
      </pattern>
      <linearGradient id="hd-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--seed-fg)" stop-opacity="0.96" />
        <stop offset="100%" stop-color="var(--seed-fg)" stop-opacity="0.78" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="var(--seed-ocean)" opacity="0.95" />

    <g>
      <rect x="60" y="60" width="500" height="480" fill="url(#hd-paper)" opacity="0.95" />
      <rect x="60" y="60" width="500" height="480" fill="url(#hd-pattern)" opacity="0.6" style="mix-blend-mode: multiply" />
      <g>
        <polygon points="560,60 560,140 480,60" fill="var(--seed-bg)" opacity="0.6" />
        <polyline points="560,60 480,60 560,140" stroke="var(--seed-bg)" stroke-width="1" fill="none" />
      </g>
      <g fill="var(--seed-bg)" opacity="0.9">
        <text x="80" y="460" font-family='"Helvetica Neue", Inter, system-ui, sans-serif' font-weight="700" font-size="92" letter-spacing="-4">Design</text>
        <text x="80" y="510" font-family='"Helvetica Neue", Inter, system-ui, sans-serif' font-style="italic" font-size="32" letter-spacing="-1">/ principles over features</text>
      </g>
    </g>

    <g font-family="ui-monospace, monospace" font-size="11" fill="var(--seed-fg)" letter-spacing="2">
      <g>
        <rect x="600" y="108" width="14" height="14" fill="var(--seed-fg)" />
        <text x="620" y="120">SIMPLICITY</text>
      </g>
      <g>
        <rect x="600" y="128" width="14" height="14" fill="#5BC9D6" />
        <text x="620" y="140">TRUST</text>
      </g>
      <g>
        <rect x="600" y="148" width="14" height="14" fill="var(--seed-lavender)" />
        <text x="620" y="160">CRAFT</text>
      </g>
      <g>
        <rect x="600" y="168" width="14" height="14" fill="var(--seed-amber)" />
        <text x="620" y="180">SPEED</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
// Static faithful port of iCyris/Fleur DesignPrinciplesPoster
</script>

<style scoped>
.works__poster {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
