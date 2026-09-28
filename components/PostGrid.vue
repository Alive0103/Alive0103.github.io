<script lang="ts" setup>
import type { Post } from 'valaxy'
import { usePageList, useValaxyI18n } from 'valaxy'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 要聚合的目录（相对 pages 根），如 essays / posts/tech */
  folder: string
  /** 宽屏下的列数 */
  columns?: 2 | 3
}>(), {
  columns: 3,
})

const { $tO } = useValaxyI18n()
const pageList = usePageList()

const prefix = computed(() => `/${props.folder}/`)

const items = computed(() => pageList.value
  .filter(post => post.path?.startsWith(prefix.value) && !post.path!.endsWith('/'))
  .sort((a, b) => +new Date(b.date!) - +new Date(a.date!))
  .map((post: Post) => {
    const title = $tO(post.title ?? '')
    return {
      path: post.path!,
      title,
      // 无 cover 时退回摘要里的第一张图，再退回渐变色块
      cover: post.cover || post.excerpt?.match(/<img[^>]+src="([^"]+)"/)?.[1] || '',
      digest: post.excerpt?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || '',
      date: post.date ? new Date(post.date).toLocaleDateString('zh-CN') : '',
      hue: [...title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7),
      wordCount: post.wordCount,
    }
  }))
</script>

<template>
  <div class="post-grid" :style="{ '--pg-cols': columns }">
    <AppLink v-for="item in items" :key="item.path" :to="item.path" class="post-grid__item">
      <div class="post-grid__cover">
        <img v-if="item.cover" :src="item.cover" :alt="item.title" loading="lazy">
        <div
          v-else class="post-grid__fallback"
          :style="{ backgroundImage: `linear-gradient(135deg, hsl(${item.hue} 68% 62%), hsl(${(item.hue + 42) % 360} 68% 50%))` }"
        >
          {{ item.title.slice(0, 1) }}
        </div>
      </div>

      <div class="post-grid__body">
        <h3 class="post-grid__title">
          {{ item.title }}
        </h3>
        <p v-if="item.digest" class="post-grid__digest">
          {{ item.digest }}
        </p>
        <div class="post-grid__meta">
          <time v-if="item.date">{{ item.date }}</time>
          <span v-if="item.wordCount">{{ item.wordCount }} 字</span>
        </div>
      </div>
    </AppLink>
  </div>

  <p v-if="!items.length" class="post-grid__empty">
    「{{ folder }}」下还没有内容，在 <code>pages/{{ folder }}/</code> 里新建 md 即可。
  </p>
</template>

<style lang="scss">
.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(var(--pg-cols, 3), 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0.75rem;
    background-color: var(--va-c-bg-light);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 28px rgb(0 0 0 / 10%);
    }
  }

  &__cover {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background-color: var(--va-c-bg-soft);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
  }

  &__item:hover &__cover img {
    transform: scale(1.06);
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.875rem 1rem 1rem;
  }

  &__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--va-c-text);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
  }

  &__digest {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--va-c-text-light);
    font-size: 0.8125rem;
    line-height: 1.7;
  }

  &__meta {
    display: flex;
    gap: 0.75rem;
    color: var(--va-c-text-light);
    font-size: 0.75rem;
    opacity: 0.8;
  }

  &__empty {
    padding: 3rem 1rem;
    text-align: center;
    color: var(--va-c-text-light);
    font-size: 0.875rem;
  }
}
</style>
