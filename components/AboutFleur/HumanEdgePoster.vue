<template>
  <div class="human-edge-poster">
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" class="works__poster">
      <defs>
        <radialGradient id="ng-moon" cx="80%" cy="20%" r="22%">
          <stop offset="0%" stop-color="var(--seed-amber)" stop-opacity="1" />
          <stop offset="80%" stop-color="var(--seed-amber)" stop-opacity="0.2" />
          <stop offset="100%" stop-color="var(--seed-amber)" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ng-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a1547" />
          <stop offset="100%" stop-color="#06061a" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#ng-sky)" />
      <rect width="800" height="600" fill="url(#ng-moon)" opacity="0.95" />
      <circle cx="640" cy="120" r="36" fill="var(--seed-amber)" opacity="0.95" />

      <g fill="var(--seed-fg)" opacity="0.7">
        <circle cx="100" cy="110" r="1.4" />
        <circle cx="220" cy="80" r="1.2" />
        <circle cx="360" cy="140" r="1.6" />
        <circle cx="460" cy="60" r="1.2" />
        <circle cx="540" cy="220" r="1.6" />
      </g>

      <g transform="translate(240 0)" opacity="0.95">
        <path
          d="M -240 460 Q -60 380 120 440 T 560 420 Q 760 396 920 430 Q 1015 452 1080 510 Q 1010 570 900 600 L -240 600 Z"
          fill="var(--seed-ocean)"
          opacity="0.64"
        />
        <path
          d="M -240 510 Q -40 450 160 500 T 560 480 Q 760 458 920 492 Q 1015 514 1080 552 Q 1005 590 900 610 L -240 610 Z"
          fill="#0a0a25"
        />
      </g>

      <text x="60" y="430" font-family='"Helvetica Neue", Inter, system-ui, sans-serif' font-weight="500" font-size="76" fill="var(--seed-fg)" letter-spacing="-2">the human</text>
      <text x="60" y="495" font-family='"Helvetica Neue", Inter, system-ui, sans-serif' font-weight="300" font-style="italic" font-size="46" fill="var(--seed-amber)" letter-spacing="-1">edge.</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
// Static faithful port of iCyris/Fleur HumanEdgePoster
</script>

<style scoped>
.human-edge-poster {
  width: 100%;
  height: 100%;
}
.works__poster {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
