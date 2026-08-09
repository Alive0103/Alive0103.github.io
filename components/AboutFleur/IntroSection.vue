<template>
  <section class="fleur-intro" id="intro">
    <div class="fleur-intro__label mono-caps">
      <span class="fleur-intro__label-index">N°01</span>
      <span class="fleur-intro__label-title">About</span>
      <span class="fleur-intro__label-meta mono">hi, there</span>
    </div>

    <div class="fleur-intro__grid">
      <!-- Copy: pushed to LEFT edge -->
      <div class="fleur-intro__copy">
        <p class="fleur-intro__lead lead">
          我是<strong>温铮</strong>，<em>AI 应用开发工程师</em> — Turning models into reality.
        </p>
        <p class="fleur-intro__quote lead">和有意思的人，做有意义的事。</p>
        <p class="fleur-intro__body">
          专注 <span class="fleur-intro__hl">NLP</span> 与 <span class="fleur-intro__hl">知识图谱</span> 的应用落地，期待碰撞出模型<span class="fleur-intro__hl">「涌现」</span>的火花。
        </p>
        <p class="fleur-intro__body fleur-intro__body--life">
          喜爱多彩的生活和鲜活的人，相信你能找到感兴趣的话题，很高兴认识你～
        </p>

        <!-- Annotation lines (like source site) -->
        <div class="fleur-intro__annotations" aria-hidden>
          <div class="fleur-intro__annotation fleur-intro__annotation--agents">
            <svg class="fleur-intro__annotation-line" viewBox="0 0 140 50" fill="none">
              <path d="M0 25 Q45 10 90 30 T140 40" stroke="var(--color-cool)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
              <circle cx="140" cy="40" r="3.5" fill="var(--seed-amber)" opacity="0.85"/>
            </svg>
            <span class="fleur-intro__annotation-label mono-caps">AGENTS</span>
          </div>
          <div class="fleur-intro__annotation fleur-intro__annotation--human">
            <svg class="fleur-intro__annotation-line" viewBox="0 0 100 24" fill="none">
              <path d="M0 12 Q35 6 70 14 T100 12" stroke="var(--color-fg-muted)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
              <circle cx="100" cy="12" r="3.5" fill="var(--seed-neon)" opacity="0.85"/>
            </svg>
            <span class="fleur-intro__annotation-label mono-caps">HUMAN</span>
          </div>
          <div class="fleur-intro__annotation fleur-intro__annotation--design">
            <svg class="fleur-intro__annotation-line" viewBox="0 0 120 55" fill="none">
              <path d="M0 48 Q35 38 65 18 T120 8" stroke="var(--color-fg-muted)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
              <circle cx="120" cy="8" r="3.5" fill="var(--seed-lavender)" opacity="0.85"/>
            </svg>
            <span class="fleur-intro__annotation-label mono-caps">DESIGN</span>
          </div>
        </div>
      </div>

      <!-- Portrait: pushed to RIGHT edge -->
      <div class="fleur-intro__portrait">
        <!-- Ambient glow behind polaroid -->
        <div class="fleur-intro__glow" aria-hidden />

        <div class="fleur-intro__polaroid">
          <div class="fleur-intro__polaroid-image">
            <img
              src="https://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/avatar.png"
              alt="Portrait of 温铮"
              loading="lazy"
              @error="avatarFailed = true"
              v-if="!avatarFailed"
            />
            <div v-else class="fleur-intro__fallback">WZ / OFFLINE</div>
            <div class="fleur-intro__halftone" aria-hidden />
          </div>
          <div class="fleur-intro__polaroid-caption mono-caps">
            <span>wenzheng · 2026</span>
            <span class="fleur-intro__polaroid-frame">N°001</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatarFailed = ref(false)
</script>

<style scoped>
.fleur-intro {
  padding: var(--space-9, 120px) clamp(24px, 4vw, 56px);
}

.fleur-intro__label {
  display: flex;
  align-items: baseline;
  gap: 16px;
  font-size: 11px;
  color: var(--color-cool);
  letter-spacing: 0.14em;
  margin: 0 0 40px;
}
.fleur-intro__label-index { color: var(--color-cool); }
.fleur-intro__label-title {
  color: var(--color-fg);
  text-transform: none;
  letter-spacing: 0;
  font-size: 15px;
}
.fleur-intro__label-meta {
  color: var(--color-fg-muted);
  margin-left: auto;
}

/* Wide grid: copy left, portrait right, big center gap */
.fleur-intro__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(80px, 10vw, 140px);
  align-items: center;
}
@media (max-width: 900px) {
  .fleur-intro__grid { grid-template-columns: 1fr; gap: 48px; }
  .fleur-intro__portrait { order: -1; } /* portrait first on mobile */
}

/* Copy area */
.fleur-intro__copy {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.2s forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fleur-intro__lead {
  font-size: clamp(26px, 2vw + 16px, 36px);
  color: var(--color-fg);
  line-height: 1.35;
  margin: 0 0 20px;
}
.fleur-intro__lead strong { font-weight: 500; }
.fleur-intro__lead em { font-style: italic; color: var(--color-accent); }

.fleur-intro__quote {
  font-style: italic;
  font-size: clamp(17px, 1vw + 13px, 22px);
  color: var(--color-fg-muted);
  margin: 0 0 28px;
  padding-left: 18px;
  border-left: 2px solid var(--color-accent);
}

.fleur-intro__body {
  font-size: clamp(15px, 0.7vw + 13px, 17px);
  line-height: 1.8;
  color: rgba(244, 236, 220, 0.76);
  margin: 0 0 12px;
  max-width: 520px;
}

/* Keyword highlight — amber glow */
.fleur-intro__hl {
  color: var(--color-accent);
  font-weight: 500;
}

/* Life paragraph — softer, warmer */
.fleur-intro__body--life {
  color: rgba(244, 236, 220, 0.52);
  font-size: clamp(14px, 0.6vw + 12px, 16px);
}

/* --- Annotations (inside copy area, bottom-right of text) --- */
.fleur-intro__annotations {
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}

.fleur-intro__annotation {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: annotationIn 0.7s ease-out forwards;
}

.fleur-intro__annotation--agents { animation-delay: 1.0s; }
.fleur-intro__annotation--human { animation-delay: 1.3s; }
.fleur-intro__annotation--design { animation-delay: 1.6s; }

@keyframes annotationIn {
  from { opacity: 0; transform: translateX(12px); }
  to { opacity: 1; transform: translateX(0); }
}

.fleur-intro__annotation-label {
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--color-fg-muted);
  white-space: nowrap;
}

.fleur-intro__annotation-line {
  width: 100px;
  height: 44px;
  flex-shrink: 0;
}
.fleur-intro__annotation--agents .fleur-intro__annotation-line { width: 130px; height: 52px; }
.fleur-intro__annotation--human .fleur-intro__annotation-line { width: 80px; height: 20px; }
.fleur-intro__annotation--design .fleur-intro__annotation-line { width: 110px; height: 48px; }

/* Hide annotations on mobile */
@media (max-width: 900px) {
  .fleur-intro__annotations { display: none; }
}

/* --- Portrait area --- */
.fleur-intro__portrait {
  position: relative;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.4s forwards;
  display: flex;
  justify-content: center;
}

/* Warm glow behind polaroid */
.fleur-intro__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 180, 97, 0.18) 0%, rgba(139, 123, 224, 0.1) 50%, transparent 70%);
  pointer-events: none;
  animation: glowPulse 6s ease-in-out infinite alternate;
}
@keyframes glowPulse {
  0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.95); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
}

/* --- Polaroid (BIGGER) --- */
.fleur-intro__polaroid {
  position: relative;
  z-index: 1;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-divider);
  border-radius: 20px;
  padding: 18px 18px 0;
  transform: rotate(-2.5deg);
  box-shadow:
    0 28px 64px rgba(0,0,0,0.45),
    0 10px 24px rgba(0,0,0,0.28);
  max-width: 400px;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (hover: hover) {
  .fleur-intro__polaroid:hover {
    transform: rotate(0deg) translateY(-6px);
    box-shadow:
      0 38px 72px rgba(0,0,0,0.50),
      0 14px 32px rgba(0,0,0,0.30);
  }
}

.fleur-intro__polaroid-image {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: var(--seed-ocean);
}
.fleur-intro__polaroid-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fleur-intro__halftone {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 30% 30%, rgba(139,123,224,0.25), transparent 60%);
  mix-blend-mode: overlay;
}
.fleur-intro__fallback {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--color-fg-muted);
}
.fleur-intro__polaroid-caption {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--color-fg-muted);
  padding: 12px 2px 14px;
  letter-spacing: 0.08em;
}

.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.mono { font-family: var(--font-mono); }
.lead { font-family: var(--font-display); }
</style>
