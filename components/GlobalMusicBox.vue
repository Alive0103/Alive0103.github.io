<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMusicPlayer } from '../composables/useMusicPlayer'
import { musicTracks } from '../data/music'
import MusicIcon from './MusicIcon.vue'
import MusicVinyl from './MusicVinyl.vue'

const route = useRoute()
const router = useRouter()
const isMusicPage = computed(() => route.path.replace(/\/$/, '') === '/music')
const { audio, track, playing, buffering, elapsed, duration, volume, muted, repeat, error, progress, status, togglePlay, skip, ended } = useMusicPlayer()

onMounted(() => {
  if (route.query.music === 'open')
    void router.replace('/music/')
})
</script>

<template>
  <audio
    ref="audio" :src="track.src" :volume="volume" :muted="muted" :loop="repeat" preload="metadata"
    @loadedmetadata="duration = ($event.currentTarget as HTMLAudioElement).duration"
    @timeupdate="elapsed = ($event.currentTarget as HTMLAudioElement).currentTime"
    @play="playing = true" @playing="buffering = false" @canplay="buffering = false" @waiting="buffering = true"
    @pause="playing = false; buffering = false" @ended="ended"
    @error="error = '暂时无法播放，请点击播放重试'; buffering = false; playing = false"
  />

  <RouterLink to="/music/" class="music-nav" title="音乐空间" aria-label="打开音乐页" :aria-current="isMusicPage ? 'page' : undefined">
    <MusicIcon name="music" />
    <span v-if="playing" class="music-nav-dot" />
  </RouterLink>

  <Teleport to="body">
    <Transition name="music-mini">
      <aside v-if="!isMusicPage" class="music-mini" :class="{ 'is-playing': playing && !buffering }" aria-label="悬浮音乐播放器" :style="{ '--progress': `${progress}%`, '--record-accent': track.accent, '--record-glow': track.glow }">
        <RouterLink to="/music/" class="music-mini-open" aria-label="进入音乐页">
          <span class="music-mini-record"><MusicVinyl :playing="playing && !buffering" :title="track.title" mini /></span>
          <span class="music-mini-info"><strong>{{ track.title }}<span v-if="playing" class="mini-equalizer" aria-hidden="true"><i /><i /><i /></span></strong><span>{{ error ? status : track.artist }} <span class="mini-hint">· 打开音乐馆 ↗</span></span></span>
        </RouterLink>
        <div class="music-mini-more"><button :disabled="musicTracks.length < 2" aria-label="上一首" title="上一首" @click="skip(-1)"><MusicIcon name="previous" /></button><button :disabled="musicTracks.length < 2" aria-label="下一首" title="下一首" @click="skip(1)"><MusicIcon name="next" /></button></div>
        <button class="music-mini-play" :aria-label="playing ? '暂停' : '播放'" @click="togglePlay"><MusicIcon :name="playing ? 'pause' : 'play'" /></button>
        <div class="music-mini-progress" aria-hidden="true" />
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.music-nav { position: fixed; top: 0; right: 0; z-index: 101; display: grid; place-items: center; width: 44px; height: var(--yun-nav-height, 50px); color: var(--va-c-text); text-decoration: none; transition: color .2s, background .2s; }
.music-nav svg { width: 19px; height: 19px; transition: transform .25s; }
.music-nav:hover, .music-nav[aria-current] { color: #db553b; background: #db553b0b; }
.music-nav:hover svg { transform: rotate(-12deg); }
.music-nav-dot { position: absolute; top: 11px; right: 9px; width: 5px; height: 5px; border-radius: 50%; background: #db553b; box-shadow: 0 0 0 3px #db553b14; }
:global(.yun-nav-menu > .justify-end) { padding-right: 44px; }
.music-mini { position: fixed; left: 24px; bottom: max(24px, env(safe-area-inset-bottom)); z-index: 101; display: flex; align-items: center; gap: 10px; box-sizing: border-box; max-width: calc(100vw - 32px); padding: 9px 10px; overflow: hidden; border: 1px solid #eee1d3; border-radius: 40px; background: #fffaf3ee; color: #574437; backdrop-filter: blur(24px); box-shadow: 0 7px 28px #674c3520, inset 0 1px #fff; transition: box-shadow .35s, background .35s, transform .35s; }
.music-mini:hover, .music-mini:focus-within { box-shadow: 0 10px 35px #674c352b; transform: translateY(-3px); background: #fffcf7f5; }
.music-mini-open { display: flex; align-items: center; gap: 12px; width: 175px; min-width: 0; color: inherit; text-decoration: none; transition: width .4s cubic-bezier(.2,.8,.2,1); }
.music-mini-record { width: 40px; flex-shrink: 0; }
.music-mini-info { display: grid; gap: 3px; min-width: 0; }
.music-mini-info strong { display: flex; align-items: center; gap: 9px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 550; }
.music-mini-info > span { display: flex; align-items: center; gap: 4px; color: #ac927d; font-size: 10px; white-space: nowrap; }
.mini-hint { max-width: 0; overflow: hidden; opacity: 0; transition: max-width .4s, opacity .3s; font-size: 8px; }
.music-mini button { display: grid; place-items: center; border: 0; border-radius: 50%; cursor: pointer; transition: transform .2s, background .2s; }
.music-mini button:active:not(:disabled) { transform: scale(.9); }
.music-mini-play { width: 34px; height: 34px; flex-shrink: 0; padding: 8px; background: var(--record-accent); color: #fff8f0; box-shadow: 0 3px 8px color-mix(in srgb, var(--record-accent) 20%, transparent); }
.music-mini-play svg { width: 16px; height: 16px; }
.music-mini-play:hover { transform: scale(1.07); }
.music-mini-more { display: flex; width: 0; margin-left: -10px; opacity: 0; visibility: hidden; overflow: hidden; transition: width .4s cubic-bezier(.2,.8,.2,1), opacity .25s, visibility .25s, margin .4s; }
.music-mini-more button { flex-shrink: 0; width: 29px; height: 29px; padding: 7px; background: transparent; color: #a28268; }
.music-mini-more button:hover:not(:disabled) { background: #f1e3d5; }
.music-mini-more button:disabled { opacity: .3; cursor: default; }
.music-mini-more svg { width: 15px; height: 15px; }
.music-mini:hover .music-mini-open, .music-mini:focus-within .music-mini-open { width: 205px; }
.music-mini:hover .music-mini-more, .music-mini:focus-within .music-mini-more { width: 58px; margin-left: -5px; opacity: 1; visibility: visible; }
.music-mini:hover .mini-hint, .music-mini:focus-within .mini-hint { max-width: 100px; opacity: 1; }
.music-mini-progress { position: absolute; height: 2px; bottom: 0; left: 0; width: var(--progress); background: linear-gradient(90deg, var(--record-glow), var(--record-accent)); opacity: .75; transition: width .2s linear; }
.mini-equalizer { display: flex; align-items: center; gap: 2px; height: 10px; }
.mini-equalizer i { width: 2px; height: 7px; border-radius: 2px; background: var(--record-accent); animation: mini-wave .7s ease-in-out infinite alternate; animation-play-state: paused; }
.is-playing .mini-equalizer i { animation-play-state: running; }
.mini-equalizer i:nth-child(2) { height: 10px; animation-delay: -.4s; }
.mini-equalizer i:nth-child(3) { height: 5px; animation-delay: -.2s; }
.music-mini a:focus-visible, .music-mini button:focus-visible, .music-nav:focus-visible { outline: 2px solid #db553b; outline-offset: 3px; }
.music-mini-enter-active, .music-mini-leave-active { transition: opacity .3s, transform .4s cubic-bezier(.2,.8,.2,1); }
.music-mini-enter-from, .music-mini-leave-to { opacity: 0; transform: translateY(18px) scale(.95); }
@keyframes mini-wave { to { transform: scaleY(.35); } }
@media (max-width: 480px) { .music-mini { left: 14px; bottom: max(16px, env(safe-area-inset-bottom)); } .music-mini:hover .music-mini-open, .music-mini:focus-within .music-mini-open { width: 180px; } }
@media (prefers-reduced-motion: reduce) { .music-mini, .music-mini *, .music-nav, .music-nav svg { animation: none !important; transition: none !important; } }
</style>
