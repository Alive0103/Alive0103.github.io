<template>
  <footer class="fleur-footer" id="footer">
    <div class="fleur-footer__label mono-caps">
      <span class="fleur-footer__label-index">N°04</span>
      <span class="fleur-footer__label-title">Contact</span>
      <span class="fleur-footer__label-meta mono">reach me by...</span>
    </div>

    <div class="fleur-footer__terminal">
      <div class="fleur-footer__terminal-chrome mono-caps">
        <span class="fleur-footer__terminal-dot" data-color="amber" aria-hidden />
        <span class="fleur-footer__terminal-dot" data-color="lavender" aria-hidden />
        <span class="fleur-footer__terminal-dot" data-color="neon" aria-hidden />
        <span class="fleur-footer__terminal-title">wenzheng@blog — bash · 80×24</span>
        <span class="fleur-footer__terminal-meta">∞</span>
      </div>

      <div class="fleur-footer__terminal-body mono">
        <div class="fleur-footer__line">
          <span class="fleur-footer__prompt">wenzheng@blog:~$</span>
          <span class="fleur-footer__cmd">contact --help</span>
        </div>
        <div class="fleur-footer__line fleur-footer__line--out">
          <span class="fleur-footer__prompt-sm">↳</span>
          <span class="fleur-footer__cmd-sm">whoami</span>
          <span class="fleur-footer__out">wenzheng</span>
        </div>
        <div class="fleur-footer__line fleur-footer__line--out">
          <span class="fleur-footer__prompt-sm">↳</span>
          <span class="fleur-footer__cmd-sm">cat ./contact.txt</span>
        </div>
        <div class="fleur-footer__line fleur-footer__line--out">
          <span class="fleur-footer__prompt-sm">↳</span>
          <span class="fleur-footer__cmd-sm">  email</span>
          <span class="fleur-footer__out">972477867@qq.com</span>
        </div>
        <div class="fleur-footer__line fleur-footer__line--out">
          <span class="fleur-footer__prompt-sm">↳</span>
          <span class="fleur-footer__cmd-sm">  github</span>
          <span class="fleur-footer__out">github.com/Alive0103</span>
        </div>
        <div class="fleur-footer__line">
          <span class="fleur-footer__prompt">wenzheng@blog:~$</span>
          <span class="fleur-footer__caret" aria-hidden />
        </div>
      </div>
    </div>

    <div class="fleur-footer__signature">
      <div class="fleur-footer__sig-block mono">
        <div>FLEUR · 2026 — ∞</div>
      </div>
      <div class="fleur-footer__sig-spacer" aria-hidden />
      <div class="fleur-footer__sig-block mono fleur-footer__sig-right">
        <div class="fleur-footer__cultivated">
          <span class="fleur-footer__sprout" aria-hidden>
            <svg viewBox="0 0 18 16" focusable="false">
              <path d="M8.5 9.4C5.2 9.2 2.4 7 2 2.5c4.4.2 7 2.6 6.5 6.9Z" />
              <path d="M9 9.4c.1-3.4 2.4-6.1 6.8-6.6-.2 4.5-2.7 7.2-6.8 6.6Z" />
              <path class="fleur-footer__sprout-stem" d="M8.8 8.8c-.1 1.8.2 3.4.9 4.7" />
            </svg>
          </span>
          <span>cultivated by wenzheng</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Static content component — contact terminal
</script>

<style scoped>
.fleur-footer {
  padding: var(--space-9, 120px) clamp(24px, 4vw, 56px) var(--space-9, 120px);
}

.fleur-footer__label {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 11px;
  color: var(--color-cool);
  letter-spacing: 0.12em;
  margin: 0 0 28px;
}
.fleur-footer__label-index { color: var(--color-cool); }
.fleur-footer__label-title {
  color: var(--color-fg);
  text-transform: none;
  letter-spacing: 0;
  font-size: 13px;
}
.fleur-footer__label-meta {
  color: var(--color-fg-muted);
  margin-left: auto;
}

.fleur-footer__terminal {
  border: 1px solid var(--color-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-bg-elevated);
  max-width: 640px;
}

.fleur-footer__terminal-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-divider);
  font-size: 10px;
  color: var(--color-fg-muted);
}
.fleur-footer__terminal-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.fleur-footer__terminal-dot[data-color="amber"] { background: var(--seed-amber); }
.fleur-footer__terminal-dot[data-color="lavender"] { background: var(--seed-lavender); }
.fleur-footer__terminal-dot[data-color="neon"] { background: var(--seed-neon); }
.fleur-footer__terminal-title { margin-left: 6px; }
.fleur-footer__terminal-meta { margin-left: auto; }

.fleur-footer__terminal-body {
  padding: 18px 16px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--color-fg-muted);
}
.fleur-footer__line {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.fleur-footer__prompt {
  color: var(--color-cool);
  white-space: nowrap;
}
.fleur-footer__cmd { color: var(--color-fg); }
.fleur-footer__prompt-sm { color: var(--color-cool); }
.fleur-footer__cmd-sm { color: rgba(244,236,220,0.65); }
.fleur-footer__out { color: var(--color-fg); }
.fleur-footer__caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--color-fg);
  animation: blink 1.1s step-end infinite;
  vertical-align: middle;
}
@keyframes blink { 50% { opacity: 0; } }

.fleur-footer__signature {
  display: flex;
  align-items: center;
  margin-top: var(--space-6, 32px);
  font-size: 11px;
  color: var(--color-fg-muted);
}
.fleur-footer__sig-spacer { flex: 1; }
.fleur-footer__cultivated {
  display: flex;
  align-items: center;
  gap: 6px;
}
.fleur-footer__sprout svg {
  width: 16px;
  height: 14px;
  fill: var(--seed-neon);
}
.fleur-footer__sprout-stem {
  fill: none;
  stroke: var(--seed-neon);
  stroke-width: 1.4;
}

.mono-caps {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.mono {
  font-family: var(--font-mono);
}
</style>
