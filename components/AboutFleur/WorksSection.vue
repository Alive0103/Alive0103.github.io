<template>
  <section class="fleur-works" id="works">
    <div class="fleur-works__label mono-caps">
      <span class="fleur-works__label-index">N°02</span>
      <span class="fleur-works__label-title">Good AI Product</span>
      <span class="fleur-works__label-meta mono">three pillars</span>
    </div>

    <div class="fleur-works__pagination mono">
      <span>CHORD</span>
      <span>·</span>
      <span>01 ↔ 03</span>
    </div>

    <ul class="fleur-works__list">
      <li
        v-for="(work, i) in works"
        :key="work.index"
        class="fleur-works__card"
        :class="{ 'fleur-works__card--reverse': i % 2 === 1 }"
        :style="{ animationDelay: `${0.1 + i * 0.15}s` }"
      >
        <div class="fleur-works__media">
          <div class="fleur-works__media-inner">
            <component :is="work.poster" />
          </div>
          <div class="fleur-works__index mono-caps">N°{{ work.index }}</div>
        </div>

        <div class="fleur-works__caption">
          <h3 class="fleur-works__title">{{ work.title }}</h3>
          <ul class="fleur-works__blurb">
            <li v-for="item in work.items" :key="item.term">
              <strong>{{ item.term }}:</strong> {{ item.desc }}
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="fleur-works__footnote mono">
      <span class="signal">●</span>
      tools evolve, principles endure — the human edge is what stays.
    </div>
  </section>
</template>

<script setup lang="ts">
import AdaptivePoster from './AdaptivePoster.vue'
import DesignPrinciplesPoster from './DesignPrinciplesPoster.vue'
import HumanEdgePoster from './HumanEdgePoster.vue'

interface WorkItem { term: string; desc: string }
interface Work {
  index: string
  title: string
  items: WorkItem[]
  poster: any
}

const works: Work[] = [
  {
    index: '001',
    title: 'Good AI Product',
    poster: AdaptivePoster,
    items: [
      { term: 'Adaptive', desc: 'evolving with user behavior, not just responding to it.' },
      { term: 'Observable', desc: 'letting people see and understand what the AI is doing.' },
      { term: 'Context-aware', desc: 'reading the situation, not just the input.' },
    ],
  },
  {
    index: '002',
    title: 'Good Design Principles',
    poster: DesignPrinciplesPoster,
    items: [
      { term: 'Simplicity', desc: 'simple surface, deep power.' },
      { term: 'Trust', desc: 'earned by design, not assumed by default.' },
      { term: 'Craft', desc: 'knowing what to leave out matters.' },
      { term: 'Speed', desc: 'responsiveness shapes perception.' },
    ],
  },
  {
    index: '003',
    title: 'The Human Edge',
    poster: HumanEdgePoster,
    items: [
      { term: 'Taste', desc: 'telling good from bad; irreplaceable by AI.' },
      { term: 'Judgment', desc: 'making decisions in chaos.' },
      { term: 'Questioning', desc: 'asking the right question beats finding the answer.' },
      { term: 'Synthesis', desc: 'assembling fragments into a whole.' },
      { term: 'Creativity', desc: 'born from lived experience and happy accidents.' },
    ],
  },
]
</script>

<style scoped>
.fleur-works {
  padding: var(--space-9, 120px) clamp(24px, 4vw, 56px);
}

.fleur-works__label {
  display: flex;
  align-items: baseline;
  gap: 16px;
  font-size: 11px;
  color: var(--color-cool);
  letter-spacing: 0.14em;
  margin: 0 0 16px;
}
.fleur-works__label-index { color: var(--color-cool); }
.fleur-works__label-title {
  color: var(--color-fg);
  text-transform: none;
  letter-spacing: 0;
  font-size: 15px;
}
.fleur-works__label-meta {
  color: var(--color-fg-muted);
  margin-left: auto;
}

.fleur-works__pagination {
  font-size: 11px;
  color: var(--color-fg-muted);
  margin-bottom: var(--space-6, 48px);
  display: flex;
  gap: 8px;
}

.fleur-works__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(96px, 10vw, 160px);
}

/*
 * Alternating layout — BIGGER media area
 *   Card 0 (even): [media] [caption]  — image on LEFT
 *   Card 1 (odd):  [caption] [media]  — image on RIGHT (.card--reverse)
 *   Card 2 (even): [media] [caption]  — image on LEFT again
 */
.fleur-works__card {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(60px, 8vw, 120px);
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  animation: cardIn 0.85s ease-out forwards;
}

.fleur-works__card--reverse {
  grid-template-columns: 0.85fr 1.15fr;
}
.fleur-works__card--reverse .fleur-works__media { order: 2; }
.fleur-works__card--reverse .fleur-works__caption { order: 1; }

@keyframes cardIn {
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .fleur-works__card,
  .fleur-works__card--reverse {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .fleur-works__card--reverse .fleur-works__media,
  .fleur-works__card--reverse .fleur-works__caption { order: unset; }
}

/* Media area (BIGGER posters) */
.fleur-works__media {
  position: relative;
  border-radius: var(--seed-radius-paper, 28px);
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-divider);
  box-shadow: 0 16px 40px rgba(0,0,0,0.25);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
}
@media (hover: hover) {
  .fleur-works__media:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 28px 60px rgba(0,0,0,0.35);
  }
}

.fleur-works__media-inner {
  width: 100%;
  height: 100%;
}

.fleur-works__index {
  position: absolute;
  top: 18px;
  left: 18px;
  font-size: 11px;
  color: var(--color-fg-muted);
  letter-spacing: 0.12em;
}

/* Caption area */
.fleur-works__caption {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-3, 12px) 0;
}

/* Title: VARIED size per card via nth-child */
.fleur-works__title {
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--color-fg);
  margin: 0 0 20px;
  letter-spacing: -0.015em;
  line-height: 1.15;
}
.fleur-works__card:nth-child(1) .fleur-works__title {
  font-size: clamp(28px, 2vw + 18px, 42px);
}
.fleur-works__card:nth-child(2) .fleur-works__title {
  font-size: clamp(24px, 1.6vw + 14px, 34px);
}
.fleur-works__card:nth-child(3) .fleur-works__title {
  font-size: clamp(26px, 1.8vw + 16px, 38px);
}

.fleur-works__blurb {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fleur-works__blurb li {
  font-size: clamp(14px, 0.6vw + 13px, 16px);
  color: var(--color-fg-muted);
  line-height: 1.6;
}
.fleur-works__blurb strong {
  color: var(--color-fg);
  font-weight: 500;
}

.fleur-works__footnote {
  margin-top: var(--space-8, 72px);
  font-size: 11px;
  color: var(--color-fg-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}
.signal {
  color: var(--color-signal-fg);
  font-size: 8px;
}

.mono {
  font-family: var(--font-mono);
}
.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
</style>
