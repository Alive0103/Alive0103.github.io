import { computed, nextTick, ref, shallowRef } from 'vue'
import { musicTracks } from '../data/music'

// 音频元素由 App 持有，路由切换只更换控制界面。
const audio = shallowRef<HTMLAudioElement>()
const selected = ref(0)
const playing = ref(false)
const buffering = ref(false)
const elapsed = ref(0)
const duration = ref(musicTracks[0].duration)
const volume = ref(0.65)
const muted = ref(false)
const repeat = ref(false)
const error = ref('')
const track = computed(() => musicTracks[selected.value])
const progress = computed(() => elapsed.value / duration.value * 100)
const status = computed(() => error.value || (buffering.value ? '正在缓冲…' : playing.value ? '正在播放' : '准备好，就按下播放'))

export const formatMusicTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

async function play() {
  error.value = ''
  buffering.value = true
  try {
    await audio.value!.play()
  }
  catch (cause) {
    // 切歌会取消上一首的播放请求。
    if ((cause as DOMException).name !== 'AbortError') {
      buffering.value = false
      error.value = '暂时无法播放，请点击播放重试'
    }
  }
}

function togglePlay() {
  if (playing.value)
    audio.value!.pause()
  else
    void play()
}

async function selectTrack(index: number) {
  if (selected.value === index) {
    togglePlay()
    return
  }
  selected.value = index
  elapsed.value = 0
  duration.value = track.value.duration
  await nextTick()
  await play()
}

function skip(offset: number) {
  void selectTrack((selected.value + offset + musicTracks.length) % musicTracks.length)
}

function ended() {
  playing.value = false
  if (musicTracks.length > 1)
    skip(1)
}

function seek(event: Event) {
  const seconds = Number((event.target as HTMLInputElement).value)
  audio.value!.currentTime = seconds
  elapsed.value = seconds
}

export function useMusicPlayer() {
  return {
    audio, selected, playing, buffering, elapsed, duration, volume, muted, repeat,
    error, track, progress, status, togglePlay, selectTrack, skip, ended, seek,
  }
}
