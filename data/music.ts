import audioSources from './qq-audio-sources.json'

// 上传会话维护已验证的 OSS 音源清单；手工歌曲保留在这里。
const curatedTracks = [
  {
    id: 'xiangwu',
    qqId: 341950814,
    title: '像雾',
    artist: '徐秉龙',
    accent: '#db553b',
    glow: '#edb6a0',
    duration: 155,
    src: 'https://wyy-alive-0o0.oss-cn-beijing.aliyuncs.com/music/%E5%BE%90%E7%A7%89%E9%BE%99-%E5%83%8F%E9%9B%BE.m4a',
  },
]

const palettes = [
  { accent: '#db553b', glow: '#edb6a0' },
  { accent: '#8870a1', glow: '#d7c3dd' },
  { accent: '#508b91', glow: '#bbd3cb' },
  { accent: '#b88439', glow: '#e6ce9c' },
]

export const musicTracks = [
  ...curatedTracks,
  ...audioSources.filter(song => !curatedTracks.some(track => track.qqId === song.qqId))
    .map(song => ({
      id: `qq-${song.qqId}`,
      qqId: song.qqId,
      title: song.title,
      artist: song.artists.join(' / '),
      duration: song.durationSeconds,
      src: song.audioUrl,
      ...palettes[song.qqId % palettes.length],
    })),
]
