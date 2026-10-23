<template>
  <aside class="podcast-thought" aria-label="AI 延伸思考">
    <p class="podcast-thought__label">延伸思考 · AI</p>
    <slot />
  </aside>
</template>

<style scoped>
.podcast-thought {
  margin: 1.75rem 0;
  padding: 0.75rem 1.25rem;
  border-inline-start: 3px solid currentColor;
  color: #7950b8;
}

.podcast-thought__label {
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.podcast-thought :deep(p:last-child) {
  margin-bottom: 0;
}

:global(html.dark) .podcast-thought {
  color: #c4a2ed;
}
</style>
