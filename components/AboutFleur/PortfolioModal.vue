<template>
  <div>
    <!-- Toggle button (top-right hamburger → X) -->
    <button
      ref="toggleRef"
      class="portfolio-toggle"
      :class="{ 'portfolio-toggle--open': isOpen, 'portfolio-toggle--closing': closingMorph }"
      type="button"
      :aria-label="isOpen ? 'Close portfolio' : 'Open portfolio'"
      :aria-expanded="isOpen"
      aria-controls="portfolio-dialog"
      @click="toggle"
    >
      <span class="portfolio-toggle__line" />
      <span class="portfolio-toggle__line" />
      <span class="portfolio-toggle__line" />
    </button>

    <!-- Portfolio root (full-screen fixed) -->
    <Transition name="portfolio-root">
      <div v-if="isOpen" ref="panelRef" class="portfolio__root" :class="{ 'portfolio__root--closing': closing }">
        <!-- Backdrop (transparent — sheets provide visual backdrop) -->
        <div class="portfolio__backdrop" @click="toggle" aria-hidden />

        <!-- Animated sheets (page-turn effect from right edge) -->
        <div class="portfolio__sheets" aria-hidden>
          <div
            v-for="(sheet, i) in 3"
            :key="i"
            class="portfolio__sheet"
            :class="`portfolio__sheet--${['orchid', 'botanical', 'paper'][i]}`"
            :style="{ animationDelay: `${i * 0.1}s` }"
          />
        </div>

        <!-- Panel (full-screen within padding) -->
        <div
          id="portfolio-dialog"
          class="portfolio__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-title"
        >
          <!-- Title row -->
          <div class="portfolio__title-row">
            <div class="portfolio__title-copy">
              <p class="portfolio__title-meta mono-caps">
                Portfolio / {{ String(projects.length).padStart(2, '0') }} entries
              </p>
              <div class="portfolio__title-main">
                <h2 class="portfolio__title" id="portfolio-title">Works</h2>
                <!-- AFU guide placeholder (small plant emoji) -->
                <span class="portfolio__afu-guide" aria-hidden>🌱</span>
              </div>
            </div>
          </div>

          <!-- Body with scroll -->
          <div ref="bodyShellRef" class="portfolio__body-shell">
            <div ref="bodyRef" class="portfolio__body">
              <div class="portfolio__grid">
                <div
                  v-for="(project, i) in projects"
                  :key="project.id"
                  class="portfolio__card"
                  :style="{ animationDelay: `${0.02 + i * 0.04}s` }"
                >
                  <div class="portfolio__card-surface">
                    <!-- Card top bar (blue) -->
                    <div class="portfolio__card-top">
                      <span class="portfolio__card-index mono-caps">{{ project.index }}</span>
                      <!-- Colored dot indicator -->
                      <span class="portfolio__card-dot" />
                    </div>

                    <!-- Card paper body -->
                    <div class="portfolio__card-paper">
                      <div class="portfolio__card-rule" aria-hidden />

                      <h3 class="portfolio__card-name">{{ project.name }}</h3>
                      <p class="portfolio__card-desc">{{ project.description }}</p>

                      <!-- Tags with slash separators -->
                      <div class="portfolio__card-tags">
                        <template v-for="(tag, ti) in project.tags" :key="tag">
                          <span class="portfolio__card-tag mono">{{ tag }}</span>
                          <span v-if="ti < project.tags.length - 1" class="portfolio__tag-sep">/</span>
                        </template>
                      </div>

                      <!-- Links -->
                      <div class="portfolio__card-links">
                        <a
                          :href="project.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="portfolio__link"
                        >
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                          <span>GitHub</span>
                          <svg class="portfolio__link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </a>

                        <a
                          v-if="project.showcaseUrl"
                          :href="project.showcaseUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="portfolio__link"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                          <span>Showcase</span>
                          <svg class="portfolio__link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </a>

                        <a
                          v-if="project.extraUrl"
                          :href="project.extraUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="portfolio__link"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                          <span>{{ project.extraLabel || 'Extra' }}</span>
                          <svg class="portfolio__link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer (outside scroll) -->
          <div class="portfolio__footer mono">
            <span class="portfolio__sprout" aria-hidden>
              <svg viewBox="0 0 18 16" fill="none" stroke="currentColor" stroke-width="1.2">
                <path class="sprout-stem" d="M9 14.25C8.9 10.9 9.08 8.05 9.45 5.8"/>
                <path class="sprout-leaf-left" d="M8.9 10.8C6.1 10.65 4.55 9.25 4.2 7.05C6.45 7.15 8.15 8.25 8.9 10.8Z"/>
                <path class="sprout-leaf-right" d="M9.15 8.7C10.05 6.35 11.65 5.25 13.75 5.35C13.35 7.6 11.8 8.75 9.15 8.7Z"/>
              </svg>
            </span>
            every work carries a flower's name
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { usePortfolio } from '../../composables/usePortfolio'

interface Project {
  id: string
  index: string
  name: string
  description: string
  tags: string[]
  githubUrl: string
  showcaseUrl?: string
  extraUrl?: string
  extraLabel?: string
}

const portfolio = usePortfolio()
const isOpen = portfolio.isOpen
const closing = portfolio.closing
const closingMorph = ref(false)
const toggleRef = ref<HTMLButtonElement>()
const panelRef = ref<HTMLDivElement>()
const bodyRef = ref<HTMLDivElement>()
const bodyShellRef = ref<HTMLDivElement>()
const previousFocus = ref<HTMLElement | null>(null)
let closingTimer: ReturnType<typeof setTimeout> | null = null

// User's GitHub projects — Alive0103 (descriptions from actual repo data)
const projects: Project[] = [
  {
    id: 'nlp-ner',
    index: 'N°001',
    name: 'NLP-NER',
    description:
      'Continual learning for NER — solving catastrophic forgetting in large language models during class-incremental named entity recognition. Covers sequence labeling, knowledge distillation, and replay-based methods to keep models sharp on old entities while learning new ones.',
    tags: ['NLP', 'NER', 'continual learning', 'LLM'],
    githubUrl: 'https://github.com/Alive0103/NLP-NER',
  },
  {
    id: 'knowledge-graph',
    index: 'N°002',
    name: 'Knowledge-Graph',
    description:
      'Knowledge encyclopedia construction & retrieval-augmented generation — fusing internal and external data sources to build structured knowledge bases, with RAG pipelines for intelligent question answering and information retrieval.',
    tags: ['knowledge graph', 'RAG', 'NLP', 'Python'],
    githubUrl: 'https://github.com/Alive0103/Knowledge-Graph',
  },
  {
    id: 'xdu-cs-lab',
    index: 'N°003',
    name: 'XDU-CS-lab',
    description:
      'Xidian University CS course lab collection (★77) — comprehensive experiment reports, course materials, exam papers, and lab walkthroughs for Computer Science and Software Engineering tracks. Covers assembly, computer networks, operating systems, and more.',
    tags: ['Xidian', 'course labs', 'CS education', '★77'],
    githubUrl: 'https://github.com/Alive0103/XDU-CS-lab',
  },
  {
    id: 'cs336note',
    index: 'N°004',
    name: 'CS336Note',
    description:
      'Stanford CS336: Language Modeling from Scratch — detailed study notes and implementations covering tokenization, transformer architecture, training loops, and scaling laws. Building LLMs from first principles.',
    tags: ['LLM', 'transformer', 'Stanford', 'from scratch'],
    githubUrl: 'https://github.com/Alive0103/CS336Note',
  },
]

function toggle() {
  if (!isOpen.value) {
    previousFocus.value = document.activeElement as HTMLElement
    portfolio.open()
    return
  }

  // Closing: trigger morph animation + reverse sheet animation
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches

  if (!isTouch) {
    closingMorph.value = true
    if (closingTimer !== null) clearTimeout(closingTimer)
    closingTimer = setTimeout(() => {
      closingMorph.value = false
      closingTimer = null
    }, 440)
  } else {
    closingMorph.value = false
  }

  // portfolio.close() handles the closing state + delayed isOpen removal
  portfolio.close()

  if (previousFocus.value) {
    setTimeout(() => previousFocus.value?.focus(), 600)
  }
}

// Scroll lock when open
watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

// Escape key to close (with animation)
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) toggle()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ============================================================
   PortfolioModal — Full-page archive drawer (matches Fleur source)
   ============================================================ */

/* --- Root container (full-screen fixed) --- */
.portfolio__root {
  position: fixed;
  inset: 0;
  z-index: 10000;
  padding: clamp(56px, 5vw, 72px) clamp(20px, 5vw, 72px) clamp(20px, 4vw, 48px);
  isolation: isolate;
}

/* Root enter/leave transition */
.portfolio-root-enter-active {
  transition: opacity 0.2s ease-out;
}
.portfolio-root-leave-active {
  transition: opacity 0.55s ease-in; /* match sheetOut duration */
}
.portfolio-root-enter-from,
.portfolio-root-leave-to {
  opacity: 0;
}

/* --- Backdrop (transparent — sheets provide visual backdrop) --- */
.portfolio__backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 0;
}

/* --- Animated sheets (page-turn effect from right edge) --- */
.portfolio__sheets {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.portfolio__sheet {
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  transform-origin: right top;
  animation: sheetIn 0.35s ease-in-out both;
  will-change: transform;
}

.portfolio__sheet--orchid {
  background: #3b344c;
}
.portfolio__sheet--botanical {
  background: #87978e;
  animation-delay: 0.1s !important;
}
.portfolio__sheet--paper {
  background: #f0ece3;
  animation-delay: 0.2s !important;
}

@keyframes sheetIn {
  from { transform: rotate(90deg); }
  to { transform: rotate(0deg); }
}

/* Closing: same direction as opening — sheets rotate up and out */
@keyframes sheetOut {
  from { transform: rotate(0deg); }
  to { transform: rotate(-90deg); }
}

.portfolio__root--closing .portfolio__sheet {
  animation: sheetOut 0.3s ease-in both;
}
/* Reverse stagger on close: paper exits first, orchid last */
.portfolio__root--closing .portfolio__sheet--paper { animation-delay: 0s !important; }
.portfolio__root--closing .portfolio__sheet--botanical { animation-delay: 0.08s !important; }
.portfolio__root--closing .portfolio__sheet--orchid { animation-delay: 0.16s !important; }

/* Cards fade out quickly on close */
.portfolio__root--closing .portfolio__card {
  animation: cardOut 0.2s ease-in both;
}
@keyframes cardOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-8px); }
}

/* Title/footer fade out */
.portfolio__root--closing .portfolio__title-row,
.portfolio__root--closing .portfolio__footer {
  animation: fadeOutQuick 0.15s ease-in both;
}
@keyframes fadeOutQuick {
  to { opacity: 0; }
}

/* --- Panel (full-screen within root padding) --- */
.portfolio__panel {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - clamp(92px, 11vw, 144px));
  max-height: calc(100svh - clamp(92px, 11vw, 144px));
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  border-radius: 0;
  overflow: visible;
}

/* Subtle print grain overlay */
.portfolio__panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='4' cy='5' r='0.45' fill='%23151427' opacity='0.22'/><circle cx='17' cy='15' r='0.35' fill='%23151427' opacity='0.16'/></svg>");
  background-size: 24px 24px;
  opacity: 0.018;
  pointer-events: none;
  z-index: 0;
}

/* ============================================================
   Toggle button (hamburger ↔ X)
   ============================================================ */
.portfolio-toggle {
  position: fixed;
  right: clamp(20px, 4vw, 56px);
  top: var(--space-5, 48px);
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 10001;
}

.portfolio-toggle__line {
  position: absolute;
  left: 8px;
  display: block;
  height: 1.5px;
  border-radius: 1px;
  background: rgba(244, 236, 220, 0.45);
  transform-origin: center;
  transition:
    width 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.22s ease,
    background 0.28s ease,
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-toggle__line:nth-child(1) {
  top: 14.75px;
  width: 14px;
}
.portfolio-toggle__line:nth-child(2) {
  top: 21.25px;
  width: 24px;
}
.portfolio-toggle__line:nth-child(3) {
  top: 27.75px;
  width: 10px;
}

@media (hover: hover) {
  .portfolio-toggle:not(.portfolio-toggle--open):hover .portfolio-toggle__line {
    background: var(--color-fg);
  }
  .portfolio-toggle:not(.portfolio-toggle--open):hover .portfolio-toggle__line:nth-child(1) { width: 24px; }
  .portfolio-toggle:not(.portfolio-toggle--open):hover .portfolio-toggle__line:nth-child(2) {
    width: 20px;
    transform: translateX(4px);
    transition-delay: 0.05s;
  }
  .portfolio-toggle:not(.portfolio-toggle--open):hover .portfolio-toggle__line:nth-child(3) {
    width: 16px;
    transform: translateX(8px);
    transition-delay: 0.1s;
  }
  .portfolio-toggle--open:hover .portfolio-toggle__line {
    background: rgba(11, 10, 30, 0.42);
  }
}

/* Open state → X */
.portfolio-toggle--open .portfolio-toggle__line {
  width: 24px;
  background: rgba(11, 10, 30, 0.42);
}
.portfolio-toggle--open .portfolio-toggle__line:nth-child(1) {
  transform: translate(2px, 6.5px) rotate(45deg);
}
.portfolio-toggle--open .portfolio-toggle__line:nth-child(2) {
  opacity: 0;
  transform: translateX(2px) scaleX(0.35);
}
.portfolio-toggle--open .portfolio-toggle__line:nth-child(3) {
  transform: translate(2px, -6.5px) rotate(-45deg);
}

.portfolio-toggle--closing .portfolio-toggle__line {
  background: rgba(11, 10, 30, 0.42);
}

.portfolio-toggle:focus-visible {
  outline: none;
}

/* ============================================================
   Body & Scroll
   ============================================================ */
.portfolio__body-shell {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
}

.portfolio__body {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: contain;
  margin-inline: -10px;
  padding: 8px 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(21, 20, 39, 0.16) transparent;
}
.portfolio__body::-webkit-scrollbar { width: 5px; }
.portfolio__body::-webkit-scrollbar-thumb {
  background: rgba(21, 20, 39, 0.16);
  border-radius: 3px;
}

/* ============================================================
   Title row
   ============================================================ */
.portfolio__title-row {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 16px;
  flex: 0 0 auto;
  z-index: 2;
}

.portfolio__title-copy {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.portfolio__title-main {
  display: flex;
  align-items: flex-end;
  width: fit-content;
  min-height: 50px;
}

.portfolio__title-meta {
  color: rgba(21, 20, 39, 0.5);
  font-size: 10px;
  letter-spacing: 0.14em;
  line-height: 1;
  text-transform: uppercase;
}

.portfolio__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(34px, 3vw, 40px);
  letter-spacing: -0.025em;
  line-height: 0.98;
  color: #151427;
  margin: 0;
}

.portfolio__afu-guide {
  position: relative;
  width: 56px;
  height: 50px;
  flex: 0 0 auto;
  margin-left: 7px;
  margin-bottom: -3px;
  font-size: 28px;
  line-height: 50px;
  text-align: center;
  filter: none;
  transform: rotate(2deg);
}

/* ============================================================
   Grid (3 columns → 2 → 1 responsive)
   ============================================================ */
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  flex: 0 0 auto;
  gap: clamp(16px, 2.2vw, 32px);
  margin-block: auto;
}

/* ============================================================
   Cards (portrait 4:5 aspect ratio)
   ============================================================ */
.portfolio__card {
  position: relative;
  min-width: 0;
  aspect-ratio: 4 / 5;
  background: transparent;
  display: flex;
  animation: cardIn 0.3s ease-out both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.portfolio__card-surface {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 14px;
  display: flex;
  flex-direction: column;
  background: #1F3A8A; /* --seed-ocean */
  border-radius: 12px;
  box-shadow: 3px 4px 0 rgba(21, 20, 39, 0.16);
  overflow: hidden;
  transition:
    transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.28s ease,
    box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Small colored dot in card top-right */
.portfolio__card-surface::after {
  content: '';
  position: absolute;
  right: 17px;
  top: 17px;
  width: 11px;
  height: 11px;
  background: #F4ECDC; /* --seed-fg */
}
.portfolio__card:nth-child(2) .portfolio__card-surface::after { background: #5bc9d6; }
.portfolio__card:nth-child(3) .portfolio__card-surface::after { background: #8B7BE0; /* --seed-lavender */ }
.portfolio__card:nth-child(4) .portfolio__card-surface::after { background: #F5B461; /* --seed-amber */ }

@media (hover: hover) {
  .portfolio__card:hover .portfolio__card-surface {
    transform: translate(-2px, -2px);
    background: rgba(139, 123, 224, 0.84); /* mix of ocean + lavender */
    box-shadow: 7px 8px 0 rgba(21, 20, 39, 0.28);
  }
}

/* --- Card top bar --- */
.portfolio__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: 0 2px 10px;
}

.portfolio__card-index {
  color: #F4ECDC; /* --seed-fg */
  font-size: 10px;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.portfolio__card-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #F4ECDC;
}
.portfolio__card:nth-child(2) .portfolio__card-dot { background: #5bc9d6; }
.portfolio__card:nth-child(3) .portfolio__card-dot { background: #8B7BE0; }
.portfolio__card:nth-child(4) .portfolio__card-dot { background: #F5B461; }

/* --- Card paper body --- */
.portfolio__card-paper {
  position: relative;
  flex: 1;
  min-height: 0;
  padding: clamp(20px, 2.2vw, 30px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f0ece3; /* --portfolio-paper */
  color: #151427; /* --portfolio-ink */
  overflow: hidden;
}

/* Subtle halftone pattern on paper */
.portfolio__card-paper::before {
  content: '';
  position: absolute;
  right: -3px;
  top: 0;
  width: 76px;
  height: 96px;
  background-image: radial-gradient(circle, rgba(245, 180, 97, 0.72) 1.25px, transparent 1.4px);
  background-size: 7px 7px;
  opacity: 0.42;
  pointer-events: none;
}

.portfolio__card-paper > * {
  position: relative;
  z-index: 1;
}

.portfolio__card-rule {
  width: 42px;
  height: 2px;
  background: #151427;
  margin: 0 0 8px;
}

.portfolio__card-name {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(25px, 2.4vw, 38px);
  letter-spacing: -0.022em;
  color: #151427;
  margin: 0;
  line-height: 1.05;
}

.portfolio__card-desc {
  color: rgba(21, 20, 39, 0.68); /* --portfolio-paper-muted */
  font-size: 15px;
  line-height: 1.62;
  margin: 0;
  flex: 1;
}

/* Tags with slash separator */
.portfolio__card-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(21, 20, 39, 0.16);
}

.portfolio__card-tag {
  font-size: 10px;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  color: rgba(21, 20, 39, 0.7);
}

.portfolio__tag-sep {
  margin: 0 7px;
  color: #1F3A8A;
  opacity: 0.7;
  font-size: 10px;
}

/* Links */
.portfolio__card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-top: 8px;
  margin-bottom: -8px;
}

.portfolio__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 2px 0;
  border: none;
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #151427;
  text-decoration: none;
  background: transparent;
  transition: color 0.2s;
  cursor: pointer;
}

.portfolio__link-arrow {
  margin-left: -2px;
  opacity: 0;
  transform: translate(-2px, 2px);
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}

@media (hover: hover) {
  .portfolio__link:hover {
    color: #1F3A8A;
  }
  .portfolio__link:hover .portfolio__link-arrow {
    opacity: 1;
    transform: translate(1px, -1px);
  }
}

/* ============================================================
   Footer
   ============================================================ */
.portfolio__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 0;
  color: rgba(11, 10, 30, 0.38);
  font-size: 11px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.portfolio__sprout {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 18px;
  color: #507c6d;
}

.portfolio__sprout svg {
  width: 18px;
  height: 16px;
  overflow: visible;
}

.sprout-stem {
  stroke-dasharray: 10;
  stroke-dashoffset: 10;
  animation: sproutStem 0.5s 0.08s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.sprout-leaf-left, .sprout-leaf-right {
  opacity: 0;
  transform: scale(0.25) rotate(8deg);
  animation: sproutLeaf 0.48s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.sprout-leaf-left { animation-delay: 0.28s; }
.sprout-leaf-right { animation-delay: 0.38s; }

@keyframes sproutStem { to { stroke-dashoffset: 0; } }
@keyframes sproutLeaf { to { opacity: 1; transform: scale(1) rotate(0deg); } }

/* ============================================================
   Responsive breakpoints
   ============================================================ */
@media (max-width: 1100px) {
  .portfolio__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .portfolio__root {
    padding: 58px 16px 12px;
  }
  .portfolio__panel {
    max-height: calc(100vh - 78px);
    border-radius: 0;
  }
  .portfolio-toggle {
    right: 16px;
    top: 16px;
  }
  .portfolio__title {
    font-size: clamp(30px, 9vw, 36px);
  }
  .portfolio__title-meta {
    font-size: 9px;
  }
  .portfolio__card-name {
    font-size: clamp(24px, 7vw, 32px);
  }
  .portfolio__card-desc {
    font-size: 13px;
  }
}

@media (max-width: 720px) {
  .portfolio__grid {
    grid-template-columns: 1fr;
  }
  .portfolio__card {
    aspect-ratio: auto;
  }
  .portfolio__card-surface {
    min-height: min(440px, 70vw);
  }
}

/* ============================================================
   Utility classes
   ============================================================ */
.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.mono {
  font-family: var(--font-mono);
}
</style>
