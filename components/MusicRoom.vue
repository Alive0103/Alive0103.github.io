<script setup lang="ts">
import { ref } from 'vue'
import { musicTracks } from '../data/music'
import { formatMusicTime as formatTime, useMusicPlayer } from '../composables/useMusicPlayer'
import MusicIcon from './MusicIcon.vue'
import MusicVinyl from './MusicVinyl.vue'
import MusicLibrary from './MusicLibrary.vue'

const { track, selected, playing, buffering, elapsed, duration, volume, muted, repeat, error, progress, status, togglePlay, skip, seek } = useMusicPlayer()
const hoverTime = ref<number | null>(null)

function previewTime(event: PointerEvent) {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  hoverTime.value = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)) * duration.value
}
</script>

<template>
  <main class="listening-room" :class="{ 'is-playing': playing && !buffering }" :style="{ '--record-accent': track.accent, '--record-glow': track.glow }">
    <div class="room-ambient" aria-hidden="true" />
    <div class="room-content">
      <header class="room-heading">
        <div><p class="room-eyebrow"><span /> ALIVE'S LISTENING ROOM</p><h1>听见此刻<span>。</span></h1></div>
        <RouterLink to="/" class="room-back">回到博客 <span>↗</span></RouterLink>
      </header>

      <section class="room-player" aria-label="音乐播放器">
        <div class="turntable">
          <div class="record-stage">
            <div class="record-halo" aria-hidden="true" />
            <div class="record-sleeve" aria-hidden="true">
              <div class="sleeve-top"><span>ALIVE<br>RECORDS</span><span>精选<br>VOL. {{ String(selected + 1).padStart(2, '0') }}</span></div>
              <strong class="sleeve-title" :class="{ 'long-title': track.title.length > 6 }">{{ track.title }}</strong>
              <div class="sleeve-sun" /><div class="sleeve-landscape" />
              <div class="sleeve-bottom"><span>{{ track.artist }}<small>把日子，调成喜欢的频率。</small></span><span class="sleeve-mark">A</span></div>
            </div>
            <div class="record-disc"><MusicVinyl :playing="playing && !buffering" :title="track.title" /></div>
            <div class="record-arm" aria-hidden="true"><i /><span /></div>
            <span class="record-sticker" aria-hidden="true">a little music,<br><em>a little escape.</em></span>
          </div>
          <div class="turntable-caption"><span><i /> {{ playing ? '唱片转动中' : '为生活留一点留白' }}</span><span>33⅓ RPM <i class="caption-line" /> SIDE A</span></div>
        </div>

        <div class="player-details">
          <div class="player-kicker"><span class="player-led" /> {{ playing ? 'NOW PLAYING' : 'READY WHEN YOU ARE' }}<span class="track-edition">{{ String(selected + 1).padStart(2, '0') }} / {{ String(musicTracks.length).padStart(2, '0') }}</span></div>
          <Transition name="track-title" mode="out-in"><h2 :key="track.id" :class="{ 'long-title': track.title.length > 6 }">{{ track.title }}</h2></Transition>
          <p class="player-artist">{{ track.artist }}<span>我的私人收藏</span></p>
          <p class="player-note">一首歌的时间，刚好放空一下。</p>

          <div class="player-timeline" :class="{ previewing: hoverTime !== null }" :style="{ '--progress': `${progress}%`, '--preview': `${(hoverTime ?? elapsed) / duration * 100}%` }" @pointermove="previewTime" @pointerleave="hoverTime = null">
            <div class="timeline-track" aria-hidden="true"><div /><i /></div>
            <output class="timeline-tooltip" aria-hidden="true">{{ formatTime(hoverTime ?? elapsed) }}</output>
            <input class="progress-range" type="range" min="0" :max="duration" step="0.1" :value="elapsed" aria-label="播放进度" :aria-valuetext="`${formatTime(elapsed)} / ${formatTime(duration)}`" @input="seek">
          </div>
          <div class="player-times"><span>{{ formatTime(elapsed) }}</span><span>{{ formatTime(duration) }}</span></div>

          <div class="player-controls">
            <button class="room-icon-button repeat-button" :class="{ active: repeat }" :aria-pressed="repeat" aria-label="单曲循环" title="单曲循环" @click="repeat = !repeat"><MusicIcon name="repeat" /><small v-if="repeat">1</small></button>
            <div class="transport-controls">
              <button class="room-icon-button" :disabled="musicTracks.length < 2" aria-label="上一首" title="上一首" @click="skip(-1)"><MusicIcon name="previous" /></button>
              <button class="room-play" :class="{ buffering }" :aria-label="playing ? '暂停' : '播放'" @click="togglePlay"><MusicIcon :name="playing ? 'pause' : 'play'" /></button>
              <button class="room-icon-button" :disabled="musicTracks.length < 2" aria-label="下一首" title="下一首" @click="skip(1)"><MusicIcon name="next" /></button>
            </div>
            <div class="volume-control"><button class="room-icon-button" :aria-label="muted ? '取消静音' : '静音'" :aria-pressed="muted" :title="muted ? '取消静音' : '静音'" @click="muted = !muted"><MusicIcon :name="muted || volume === 0 ? 'muted' : 'volume'" /></button><div class="volume-popover"><input v-model.number="volume" type="range" min="0" max="1" step="0.01" aria-label="音量" @input="muted = false"></div></div>
          </div>
          <div class="player-status" :class="{ 'player-error': error }" role="status"><span class="status-bars" aria-hidden="true"><i /><i /><i /><i /></span>{{ status }}</div>
        </div>
      </section>

      <MusicLibrary />
      <footer class="room-footer"><span>音乐不停，故事继续。</span><span>A LITTLE SOUNDTRACK TO YOUR DAY <MusicIcon name="music" /></span></footer>
    </div>
  </main>
</template>

<style scoped>
.listening-room { --room-accent: var(--record-accent); --room-muted: #8a8077; position: relative; isolation: isolate; min-height: 100dvh; overflow: clip; background: #f8f5f0; color: #302b28; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; -webkit-font-smoothing: antialiased; color-scheme: light; }
.listening-room *, .listening-room *::before, .listening-room *::after { box-sizing: border-box; }
.room-ambient { position: absolute; inset: 0 0 auto; height: 850px; z-index: -1; pointer-events: none; background: radial-gradient(ellipse at 16% 35%, color-mix(in srgb, var(--record-glow) 34%, transparent), transparent 49%), radial-gradient(ellipse at 87% 4%, #ded9eb66, transparent 44%); transition: background 1s; }
.room-content { max-width: 1180px; margin: auto; padding: 96px 48px 28px; }
.room-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.room-eyebrow { display: flex; align-items: center; gap: 8px; margin: 0; color: #8e7c70; font-size: 9px; font-weight: 600; letter-spacing: 2.2px; }
.room-eyebrow > span { width: 5px; height: 5px; background: var(--room-accent); border-radius: 50%; }
.room-heading h1 { margin: 9px 0 0; font-size: 31px; font-weight: 550; letter-spacing: .06em; line-height: 1.3; }
.room-heading h1 > span { color: var(--room-accent); }
.room-back { display: inline-flex; align-items: center; gap: 15px; flex-shrink: 0; padding: 9px 0 9px 14px; color: #7e736a; text-decoration: none; font-size: 12px; }
.room-back > span { display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid #c6b9aa88; border-radius: 50%; font-size: 19px; transition: background .2s, transform .2s; }
.room-back:hover > span { background: #fff; transform: rotate(45deg); }
.room-player { display: grid; grid-template-columns: 1.15fr 1fr; align-items: center; gap: clamp(36px, 6vw, 80px); margin: 28px 0 36px; }
.turntable { min-width: 0; }
.record-stage { position: relative; height: 350px; max-width: 470px; margin-inline: auto; }
.record-halo { position: absolute; inset: 0 -4% -10%; border-radius: 50%; background: radial-gradient(ellipse, color-mix(in srgb, var(--record-glow) 36%, transparent), transparent 65%); filter: blur(20px); opacity: .5; transition: opacity 1s; }
.is-playing .record-halo { opacity: 1; }
.record-sleeve { position: absolute; top: 15px; left: 1%; z-index: 2; width: 61%; aspect-ratio: .92; overflow: hidden; transform: rotate(-7deg); border: 1px solid #fff8; border-radius: 3px; background: linear-gradient(155deg, #ebe7e5 5%, #d9ced9 39%, var(--record-glow) 80%, #efc1a6); box-shadow: -6px 12px 22px #6e4c4320, inset 4px 0 5px #fff8; transition: transform .7s cubic-bezier(.2,.8,.2,1); }
.turntable:hover .record-sleeve { transform: rotate(-10deg) translateX(-5px); }
.record-sleeve::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, #fff0 0 2px, #ffffff0a 2px 3px); box-shadow: inset 0 0 0 8px #ffffff14; }
.sleeve-top { position: relative; z-index: 1; display: flex; justify-content: space-between; padding: 22px 22px 0; color: #625650; font-size: 8px; line-height: 1.5; letter-spacing: 1px; }
.sleeve-top > span:last-child { text-align: right; font-size: 7px; }
.sleeve-title { position: absolute; z-index: 1; top: 68px; left: 23px; font-family: 'Songti SC', 'Noto Serif SC', serif; writing-mode: vertical-rl; font-size: clamp(40px, 4vw, 52px); font-weight: 400; letter-spacing: .2em; color: #504441; }
.sleeve-title.long-title { width: 72%; writing-mode: horizontal-tb; font-size: 25px; line-height: 1.5; letter-spacing: .08em; text-wrap: balance; }
.sleeve-sun { position: absolute; width: 42%; aspect-ratio: 1; top: 39%; right: 11%; border-radius: 50%; background: #ffe3b7; box-shadow: 0 0 30px #ffd6a9bb; filter: blur(2px); }
.sleeve-landscape { position: absolute; inset: 57% -35% -40%; transform: rotate(-14deg); border-radius: 50% 50% 0 0; background: linear-gradient(180deg, #c67f7077, #c57f7188 12%, #dd9b8588 20%, #e9b295); box-shadow: 0 -17px 22px #ecc7c399; }
.sleeve-bottom { position: absolute; z-index: 1; bottom: 23px; left: 22px; right: 22px; display: flex; align-items: end; justify-content: space-between; color: #664a40; font-size: 12px; letter-spacing: 2px; }
.sleeve-bottom small { display: block; margin-top: 6px; font-size: 6px; letter-spacing: .5px; }
.sleeve-mark { font-family: Georgia, serif; font-size: 24px; }
.record-disc { position: absolute; z-index: 1; width: 65%; top: 26px; right: 0; transition: transform .7s cubic-bezier(.2,.8,.2,1); }
.turntable:hover .record-disc { transform: translateX(7px); }
.record-arm { position: absolute; top: 8px; right: -5px; z-index: 3; width: 26px; height: 230px; transform-origin: 13px 13px; transform: rotate(-10deg); transition: transform .9s cubic-bezier(.4,0,.2,1); filter: drop-shadow(3px 5px 3px #33251d33); }
.is-playing .record-arm { transform: rotate(24deg); }
.record-arm::before { content: ''; position: absolute; width: 26px; height: 26px; border: 5px solid #b9b0a4; border-radius: 50%; background: #655d55; box-shadow: 0 0 0 2px #eae3d8; }
.record-arm i { position: absolute; top: 19px; left: 10px; width: 6px; height: 80%; border-radius: 4px; background: linear-gradient(90deg, #978f84, #f7eee0 45%, #a69d90); }
.record-arm > span { position: absolute; bottom: 5%; left: 4px; width: 17px; height: 29px; border-radius: 3px; background: #625b54; border-bottom: 5px solid var(--room-accent); transform: rotate(-12deg); }
.record-sticker { position: absolute; z-index: 4; bottom: 16px; right: 5%; color: #9c604c; font-family: Georgia, serif; font-size: 16px; line-height: 1.2; transform: rotate(-7deg); }
.record-sticker em { font-size: 18px; }
.turntable-caption { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: #97897d; font-size: 9px; letter-spacing: 1px; }
.turntable-caption > span { display: flex; align-items: center; gap: 8px; }
.turntable-caption i { width: 4px; height: 4px; border-radius: 50%; background: #b6a89b; }
.is-playing .turntable-caption i { background: var(--room-accent); }
.turntable-caption .caption-line { height: 1px; width: 22px; background: #c9bcae; }
.player-details { min-width: 0; padding: 0 12px 0 0; }
.player-kicker { display: flex; align-items: center; gap: 7px; font-size: 8px; font-weight: 600; letter-spacing: 1.8px; color: #9a887a; }
.player-led { width: 5px; height: 5px; border-radius: 50%; background: #b6a89b; transition: background .3s, box-shadow .3s; }
.is-playing .player-led { background: var(--room-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--room-accent) 9%, transparent); }
.track-edition { margin-left: auto; font-size: 9px; color: #b2a69b; }
.player-details h2 { margin: 21px 0 13px; font-family: 'Songti SC', 'Noto Serif SC', serif; font-size: clamp(42px, 5.3vw, 68px); font-weight: 500; line-height: 1.15; letter-spacing: .12em; overflow-wrap: anywhere; }
.player-details h2.long-title { font-size: clamp(28px, 3.3vw, 43px); line-height: 1.3; letter-spacing: .04em; text-wrap: balance; }
.player-artist { display: flex; align-items: center; gap: 14px; margin: 0; color: #72645a; font-size: 14px; letter-spacing: 1px; }
.player-artist > span { padding-left: 14px; border-left: 1px solid #d6ccc1; color: #a69a8e; font-size: 10px; letter-spacing: .5px; }
.player-note { margin: 23px 0 20px; color: #a09286; font-size: 11px; letter-spacing: 1px; }
.player-timeline { position: relative; height: 24px; cursor: pointer; }
.timeline-track { position: absolute; top: 10px; left: 0; right: 0; height: 3px; border-radius: 5px; background: #e7ded3; transition: height .2s, top .2s; }
.timeline-track > div { position: relative; height: 100%; width: var(--progress); border-radius: inherit; background: linear-gradient(90deg, var(--record-glow), var(--room-accent)); }
.timeline-track > i { position: absolute; left: var(--progress); top: 50%; width: 9px; height: 9px; border: 2px solid #fff9f1; border-radius: 50%; background: var(--room-accent); transform: translate(-50%, -50%); box-shadow: 0 1px 5px #b16a4844; transition: box-shadow .2s, width .2s, height .2s; }
.player-timeline:hover .timeline-track, .player-timeline:focus-within .timeline-track { height: 6px; top: 9px; }
.player-timeline:hover .timeline-track > i, .player-timeline:focus-within .timeline-track > i { width: 14px; height: 14px; box-shadow: 0 0 0 5px color-mix(in srgb, var(--room-accent) 10%, transparent), 0 2px 8px #b16a4844; }
.timeline-tooltip { position: absolute; bottom: 29px; left: clamp(20px, var(--preview), calc(100% - 20px)); padding: 5px 7px; border-radius: 6px; background: #3d342f; color: #fff6ed; font-size: 10px; font-variant-numeric: tabular-nums; transform: translate(-50%, 4px); opacity: 0; transition: opacity .15s, transform .15s; pointer-events: none; }
.previewing .timeline-tooltip, .player-timeline:focus-within .timeline-tooltip { opacity: 1; transform: translate(-50%, 0); }
.progress-range { position: absolute; inset: 0; width: 100%; height: 24px; margin: 0; opacity: 0; cursor: pointer; }
.player-times { display: flex; justify-content: space-between; margin: 0 0 19px; font-size: 10px; font-variant-numeric: tabular-nums; color: #9b8d7f; letter-spacing: 1px; }
.listening-room button { font: inherit; color: inherit; border: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.listening-room button:disabled { opacity: .25; cursor: default; }
.listening-room button:focus-visible, .listening-room a:focus-visible { outline: 2px solid var(--room-accent); outline-offset: 5px; }
.listening-room svg { display: block; width: 20px; height: 20px; }
.player-controls, .transport-controls { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.transport-controls { gap: 20px; }
.room-icon-button { position: relative; display: grid; place-items: center; padding: 10px; width: 40px; height: 40px; border-radius: 50%; background: transparent; color: #8c7d70 !important; transition: background .2s, transform .2s; }
.room-icon-button:hover:not(:disabled) { background: #eaded177; color: var(--room-accent) !important; transform: translateY(-2px); }
.room-icon-button:active:not(:disabled) { transform: scale(.93); }
.repeat-button.active { color: var(--room-accent) !important; background: color-mix(in srgb, var(--room-accent) 8%, transparent); }
.repeat-button small { position: absolute; font-size: 8px; left: 18px; top: 14px; }
.room-play { position: relative; display: grid; place-items: center; width: 62px; height: 62px; border-radius: 50%; background: var(--room-accent); color: #fff8f0 !important; box-shadow: 0 7px 18px color-mix(in srgb, var(--room-accent) 23%, transparent), inset 0 1px #ffffff30; transition: transform .25s, box-shadow .25s; }
.room-play svg { width: 26px; height: 26px; }
.room-play:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 10px 26px color-mix(in srgb, var(--room-accent) 30%, transparent); }
.room-play:active { transform: scale(.94); }
.room-play.buffering::after { content: ''; position: absolute; inset: -6px; border: 1px solid transparent; border-top-color: var(--room-accent); border-radius: 50%; animation: loading-turn .8s linear infinite; }
.volume-control { position: relative; }
.volume-popover { position: absolute; right: -10px; bottom: 100%; padding: 12px; border: 1px solid #eee3d7; border-radius: 20px; background: #fffcf8; box-shadow: 0 4px 15px #78614a10; opacity: 0; visibility: hidden; transform: translateY(5px); transition: opacity .2s, visibility .2s, transform .2s; }
.volume-control:hover .volume-popover, .volume-control:focus-within .volume-popover { opacity: 1; visibility: visible; transform: translateY(0); }
.volume-popover input { display: block; width: 80px; height: 4px; accent-color: var(--room-accent); cursor: pointer; }
.player-status { display: flex; align-items: center; justify-content: center; gap: 7px; min-height: 16px; margin-top: 18px; color: #a29589; font-size: 10px; letter-spacing: .5px; }
.player-error { color: var(--room-accent); }
.status-bars { display: flex; align-items: center; gap: 2px; height: 12px; }
.status-bars i { width: 2px; height: 3px; border-radius: 2px; background: #c1b1a1; }
.is-playing .status-bars i { height: 10px; background: var(--room-accent); animation: status-wave .65s ease-in-out infinite alternate; }
.is-playing .status-bars i:nth-child(2) { animation-delay: -.4s; height: 7px; }
.is-playing .status-bars i:nth-child(3) { animation-delay: -.2s; height: 12px; }
.is-playing .status-bars i:nth-child(4) { animation-delay: -.5s; height: 5px; }
.room-footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 35px; color: #a59789; font-size: 9px; letter-spacing: 1px; }
.room-footer > span:last-child { display: flex; align-items: center; gap: 12px; font-size: 7px; letter-spacing: 1.5px; }
.room-footer svg { width: 13px; height: 13px; }
.track-title-enter-active, .track-title-leave-active { transition: opacity .2s, transform .2s; }
.track-title-enter-from { opacity: 0; transform: translateY(8px); }
.track-title-leave-to { opacity: 0; transform: translateY(-8px); }
@keyframes status-wave { to { transform: scaleY(.35); } }
@keyframes loading-turn { to { transform: rotate(360deg); } }
@media (max-width: 960px) and (min-width: 761px) { .room-content { padding-inline: 32px; } .record-stage { height: 300px; } .record-arm { height: 190px; } .record-sticker { bottom: 20px; font-size: 13px; } .sleeve-top { padding: 16px 16px 0; } .sleeve-title { left: 17px; top: 58px; font-size: 36px; } .sleeve-bottom { left: 16px; right: 16px; bottom: 16px; } .sleeve-bottom small { display: none; } .player-details { padding: 0; } .transport-controls { gap: 10px; } }
@media (max-width: 760px) {
  .room-content { max-width: 560px; padding: 82px 26px 24px; }
  .room-eyebrow { font-size: 8px; letter-spacing: 1.5px; }
  .room-heading h1 { font-size: 27px; }
  .room-back { gap: 8px; font-size: 10px; }
  .room-back > span { width: 27px; height: 27px; font-size: 17px; }
  .room-player { grid-template-columns: 1fr; gap: 32px; margin: 24px 0 32px; }
  .turntable { width: min(100%, 390px); margin: auto; }
  .record-stage { height: auto; aspect-ratio: 1.4; }
  .record-sleeve { top: 12px; }
  .record-disc { top: 24px; }
  .record-arm { height: 66%; }
  .sleeve-top { padding: 16px 16px 0; font-size: 7px; }
  .sleeve-top > span:last-child { font-size: 6px; }
  .sleeve-title { top: 55px; left: 18px; font-size: 36px; }
  .sleeve-bottom { left: 16px; right: 16px; bottom: 16px; font-size: 10px; }
  .sleeve-bottom small { font-size: 5px; }
  .record-sticker { bottom: 3%; font-size: 12px; }
  .record-sticker em { font-size: 14px; }
  .turntable-caption { margin-top: 12px; font-size: 8px; }
  .player-details { padding: 0 4px; }
  .player-details h2 { font-size: 45px; margin: 16px 0 10px; }
  .player-note { margin: 16px 0 14px; }
  .player-controls { justify-content: space-between; }
  .transport-controls { gap: 24px; }
  .room-play { width: 58px; height: 58px; }
  .player-status { margin-top: 14px; }
  .room-footer > span:last-child { font-size: 6px; letter-spacing: .7px; }
}
@media (max-width: 380px) { .room-content { padding-inline: 20px; } .transport-controls { gap: 16px; } .sleeve-title { font-size: 32px; } .sleeve-bottom small { display: none; } .room-footer > span:last-child { max-width: 120px; text-align: right; } }
@media (prefers-reduced-motion: reduce) { .listening-room *, .listening-room *::before, .listening-room *::after { animation: none !important; transition: none !important; } }
</style>
