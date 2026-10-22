<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import favorites from '../data/qq-favorites.json'
import { musicTracks } from '../data/music'
import { formatMusicTime as formatTime, useMusicPlayer } from '../composables/useMusicPlayer'
import MusicIcon from './MusicIcon.vue'

const { track, playing, duration, selectTrack } = useMusicPlayer()
const query = ref('')
const playableOnly = ref(false)
const page = ref(1)
const pageSize = 24
const playable = new Map(musicTracks.map((song, index) => [song.qqId, index]))
const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()
  return favorites.tracks.filter(song => (!playableOnly.value || playable.has(song.qqId))
    && `${song.title} ${song.artists.join(' ')}`.toLowerCase().includes(term))
})
const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const pageCount = computed(() => Math.ceil(filtered.value.length / pageSize))
watch([query, playableOnly], () => { page.value = 1 })
</script>

<template>
  <section class="room-library" aria-labelledby="library-title">
    <header class="library-heading"><div><p>THE COLLECTION</p><h2 id="library-title">我的私人唱片架<span>总有一首，刚好是此刻的心情。</span></h2></div><span class="library-count">{{ favorites.tracks.length }} <span>首收藏</span></span></header>
    <div class="library-toolbar">
      <div class="library-filters" aria-label="歌曲筛选">
        <button :class="{ active: !playableOnly }" :aria-pressed="!playableOnly" @click="playableOnly = false">全部收藏</button>
        <button :class="{ active: playableOnly }" :aria-pressed="playableOnly" @click="playableOnly = true">本站可播放 <span>{{ musicTracks.length }}</span></button>
      </div>
      <label class="library-search"><MusicIcon name="search" /><input v-model="query" type="search" placeholder="找一首喜欢的歌…" aria-label="搜索歌名或歌手"></label>
    </div>
    <p class="library-note">{{ musicTracks.length }} 首可在本站播放，标有「QQ 音乐」的歌曲将在新窗口打开。</p>
    <div class="library-columns" aria-hidden="true"><span>#</span><span>歌曲</span><span>歌手</span><span>时长</span><span>收听</span></div>
    <ol class="library-tracks" :start="(page - 1) * pageSize + 1">
      <li v-for="song in visible" :key="song.qqId" :class="{ selected: song.qqId === track.qqId }">
        <span class="song-number"><span v-if="song.qqId === track.qqId && playing" class="song-equalizer" aria-label="正在播放"><i /><i /><i /></span><template v-else>{{ String(song.index).padStart(2, '0') }}</template></span>
        <span class="song-main"><span class="song-cover" :class="{ available: playable.has(song.qqId) }" :style="{ '--cover-hue': `${song.index * 47 % 360}` }" aria-hidden="true">{{ song.title.slice(0, 1) }}</span><span><strong>{{ song.title }}</strong><small>{{ song.artists.join(' / ') }}</small></span></span>
        <span class="song-artist">{{ song.artists.join(' / ') }}</span>
        <span class="song-duration">{{ song.qqId === track.qqId ? formatTime(duration) : song.durationSeconds === null ? '—' : formatTime(song.durationSeconds) }}</span>
        <button v-if="playable.has(song.qqId)" class="song-play" :aria-label="`${song.qqId === track.qqId && playing ? '暂停' : '播放'} ${song.title}`" @click="selectTrack(playable.get(song.qqId)!)"><MusicIcon :name="song.qqId === track.qqId && playing ? 'pause' : 'play'" />{{ song.qqId === track.qqId && playing ? '暂停' : '播放' }}</button>
        <a v-else-if="song.qqUrl" class="song-external" :href="song.qqUrl" target="_blank" rel="noopener noreferrer" :aria-label="`在 QQ 音乐打开 ${song.title}`">QQ 音乐 <span>↗</span></a>
        <span v-else class="song-unavailable">暂无链接</span>
      </li>
    </ol>
    <p v-if="!filtered.length" class="library-empty">没有找到这首歌，试试其他歌名或歌手。</p>
    <div v-if="pageCount > 1" class="library-pagination">
      <span role="status">共 {{ filtered.length }} 首 · 第 {{ page }} / {{ pageCount }} 页</span>
      <div><button :disabled="page === 1" @click="page--">上一页</button><button :disabled="page === pageCount" @click="page++">下一页</button></div>
    </div>
  </section>
</template>

<style scoped>
.room-library { border-top: 1px solid #d8cbbf77; padding-top: 26px; }
.library-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
.library-heading p { margin: 0; color: #b19c89; font-size: 8px; letter-spacing: 2px; }
.library-heading h2 { display: flex; align-items: baseline; gap: 18px; margin: 7px 0 0; font-size: 20px; font-weight: 550; letter-spacing: 1px; }
.library-heading h2 > span { color: #a49688; font-size: 10px; font-weight: 400; letter-spacing: .5px; }
.library-count { color: #a17f66; font-size: 27px; font-family: Georgia, serif; font-variant-numeric: tabular-nums; }
.library-count > span { color: #a49688; font-size: 10px; margin-left: 5px; font-family: inherit; }
.library-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.library-filters { display: flex; gap: 3px; padding: 4px; border-radius: 12px; background: #ebe4db88; }
.room-library button { font: inherit; border: 0; cursor: pointer; transition: background .2s, color .2s, transform .2s, box-shadow .2s; }
.room-library button:disabled { opacity: .3; cursor: default; }
.library-filters button { padding: 8px 13px; border-radius: 8px; color: #978575; background: transparent; font-size: 11px; }
.library-filters button.active { background: #fffdf9; color: #654f3e; box-shadow: 0 2px 5px #77604b0d; }
.library-filters button > span { margin-left: 5px; padding: 1px 5px; border-radius: 4px; background: #dfd4c966; color: #9c7b63; font-size: 9px; font-variant-numeric: tabular-nums; }
.library-search { display: flex; align-items: center; gap: 9px; width: 230px; padding: 10px 13px; border: 1px solid #e3d8cb; border-radius: 10px; background: #fffcf877; transition: border-color .2s, box-shadow .2s; }
.library-search:focus-within { border-color: var(--room-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--room-accent) 7%, transparent); }
.library-search svg { width: 14px; height: 14px; flex-shrink: 0; color: #ab9784; }
.library-search input { min-width: 0; width: 100%; padding: 0; border: 0; outline: none; background: transparent; color: #655246; font: inherit; font-size: 11px; }
.library-search input::placeholder { color: #b3a18f; }
.room-library button:focus-visible, .room-library a:focus-visible { outline: 2px solid var(--room-accent); outline-offset: 3px; }
.library-note { margin: 12px 0 21px; font-size: 10px; color: #a7998a; }
.library-columns, .library-tracks li { display: grid; grid-template-columns: 28px minmax(0, 1fr) 20% 48px 88px; gap: 18px; align-items: center; padding: 0 18px; text-align: left; }
.library-columns { margin-bottom: 9px; font-size: 9px; color: #ac9b89; letter-spacing: 1px; }
.library-tracks { list-style: none; padding: 0; margin: 0; }
.library-tracks li { position: relative; padding-block: 10px; border: 1px solid transparent; border-radius: 12px; transition: background .2s, transform .2s, box-shadow .2s; }
.library-tracks li + li { margin-top: 3px; }
.library-tracks li.selected { background: #fffaf4; border-color: #ecdbc8; box-shadow: 0 3px 12px #ad865308; }
.library-tracks li.selected::before { content: ''; position: absolute; left: -1px; top: 20px; bottom: 20px; width: 3px; border-radius: 4px; background: var(--room-accent); }
.library-tracks li:hover { background: #fffdf8; transform: translateX(3px); box-shadow: 0 3px 16px #775d3d07; }
.song-number { color: #b09b86; font-size: 11px; font-variant-numeric: tabular-nums; }
.song-main { display: flex; align-items: center; gap: 13px; min-width: 0; }
.song-main > span:last-child { display: grid; gap: 4px; min-width: 0; }
.song-main strong { color: #665447; font-size: 12px; font-weight: 500; overflow-wrap: anywhere; }
.selected .song-main strong { color: var(--room-accent); }
.song-main small { color: #a18c77; font-size: 10px; display: none; }
.song-cover { display: grid; place-items: center; flex-shrink: 0; width: 38px; height: 38px; border: 1px solid #ffffff88; border-radius: 5px; color: hsl(var(--cover-hue) 17% 47%); background: linear-gradient(145deg, hsl(var(--cover-hue) 22% 91%), hsl(var(--cover-hue) 26% 83%)); font-family: 'Songti SC', serif; font-size: 18px; box-shadow: 0 2px 4px #48322308; transition: transform .25s; }
.library-tracks li:hover .song-cover { transform: rotate(-6deg); }
.song-cover.available { background: linear-gradient(145deg, #ddd1db, var(--record-glow)); color: #875e51; }
.song-artist, .song-duration { color: #9b8774; font-size: 11px; }
.song-duration { font-variant-numeric: tabular-nums; }
.song-play { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; border-radius: 8px; background: color-mix(in srgb, var(--room-accent) 8%, transparent); color: var(--room-accent); font-size: 11px !important; }
.song-play:hover { background: var(--room-accent); color: #fff9f1; }
.song-play:active { transform: scale(.95); }
.song-play svg { width: 13px; height: 13px; }
.song-external { padding-block: 8px; text-decoration: none; color: #a18a74; font-size: 10px; text-align: center; }
.song-external > span { display: inline-block; margin-left: 5px; transition: transform .2s; }
.song-external:hover { color: var(--room-accent); }
.song-external:hover > span { transform: translate(2px, -2px); }
.song-unavailable { text-align: center; color: #b5a99c; font-size: 10px; }
.song-equalizer { display: flex; align-items: center; gap: 2px; height: 18px; }
.song-equalizer i { height: 13px; width: 2px; border-radius: 2px; background: var(--room-accent); animation: library-wave .7s ease-in-out infinite alternate; }
.song-equalizer i:nth-child(2) { height: 18px; animation-delay: -.3s; }
.song-equalizer i:nth-child(3) { height: 8px; animation-delay: -.5s; }
.library-empty { text-align: center; padding: 40px 0; font-size: 12px; color: var(--room-muted); }
.library-pagination { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 24px; font-size: 11px; color: #a18c77; }
.library-pagination > div { display: flex; gap: 8px; }
.library-pagination button { padding: 8px 12px; border-radius: 8px; background: #ece2d66b; color: #92775e; font-size: 11px; }
.library-pagination button:hover:not(:disabled) { background: #e9dac9; }
@keyframes library-wave { to { transform: scaleY(.4); } }
@media (max-width: 760px) {
  .library-heading { margin-bottom: 18px; }
  .library-heading h2 { font-size: 19px; }
  .library-heading h2 > span { display: none; }
  .library-count { font-size: 23px; white-space: nowrap; }
  .library-count > span { font-size: 9px; }
  .library-toolbar { flex-wrap: wrap; gap: 12px; }
  .library-search { width: 100%; }
  .library-columns, .library-tracks li { grid-template-columns: 20px minmax(0, 1fr) 32px 65px; padding-left: 8px; padding-right: 8px; gap: 8px; }
  .library-columns > span:nth-child(3), .song-artist { display: none; }
  .song-main { gap: 9px; }
  .song-main small { display: block; }
  .song-cover { width: 32px; height: 32px; font-size: 16px; }
  .song-main strong { font-size: 11px; }
  .song-external { font-size: 9px; }
  .song-external > span { margin-left: 2px; }
  .song-duration { font-size: 10px; }
  .library-note { font-size: 9px; line-height: 1.8; }
}
@media (max-width: 380px) { .song-cover { display: none; } .library-pagination { font-size: 10px; } .library-pagination button { padding: 8px; } }
@media (prefers-reduced-motion: reduce) { .room-library *, .room-library *::before { animation: none !important; transition: none !important; } }
</style>
