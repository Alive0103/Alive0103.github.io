<script lang="ts" setup>
import type { Post } from 'valaxy'
import { usePageList, useValaxyI18n } from 'valaxy'
import { computed } from 'vue'

/**
 * 读书笔记 frontmatter 字段：
 * - bookCover  书的封面，展示在书架卡片上（缺省退回 cover）
 * - cover      文章页头图（自定义图，可与书封面不同）
 * - summary    读书笔记摘要（卡片背面展示）
 */
type BookPost = Post & { bookCover?: string, summary?: string }

const props = withDefaults(defineProps<{
  /** 要聚合的目录（相对 pages 根），如 books */
  folder?: string
  /** 大屏下的列数 */
  columns?: 2 | 3 | 4
}>(), {
  folder: 'books',
  columns: 3,
})

const { $tO } = useValaxyI18n()
const pageList = usePageList()

const prefix = computed(() => `/${props.folder}/`)

const items = computed(() => pageList.value
  .filter(post => post.path?.startsWith(prefix.value) && !post.path!.endsWith('/'))
  .sort((a, b) => +new Date(b.date!) - +new Date(a.date!))
  .map((post: BookPost) => {
    const digest = post.excerpt?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || ''
    return {
      path: post.path!,
      title: $tO(post.title ?? ''),
      author: post.author || '',
      cover: post.bookCover || post.cover || '',
      intro: post.description || '',
      summary: post.summary || digest,
    }
  }))
</script>

<template>
  <div class="book-shelf" :style="{ '--bs-cols': columns }">
    <AppLink v-for="item in items" :key="item.path" :to="item.path" class="book-card">
      <div class="book-card__inner">
        <!-- 正面：左封面 + 右简介 -->
        <div class="book-card__front">
          <div class="book-card__cover">
            <img v-if="item.cover" :src="item.cover" :alt="item.title" loading="lazy">
            <div v-else class="book-card__fallback">
              {{ item.title.slice(0, 1) }}
            </div>
          </div>
          <div class="book-card__intro">
            <h3 class="book-card__title">
              {{ item.title }}
            </h3>
            <p v-if="item.author" class="book-card__author">
              {{ item.author }}
            </p>
            <p v-if="item.intro" class="book-card__desc">
              {{ item.intro }}
            </p>
          </div>
        </div>

        <!-- 背面：读书笔记摘要 -->
        <div class="book-card__back">
          <span class="book-card__back-tag">读书笔记</span>
          <p class="book-card__summary">
            {{ item.summary }}
          </p>
        </div>
      </div>
    </AppLink>
  </div>

  <p v-if="!items.length" class="book-shelf__empty">
    书架还空着，在 <code>pages/{{ folder }}/</code> 里为每本书新建一个 md 即可。
  </p>
</template>

<style lang="scss">
.book-shelf {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(var(--bs-cols, 3), 1fr);
  }
}

.book-card {
  display: block;
  perspective: 1200px;

  &__inner {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.55s cubic-bezier(0.4, 0.1, 0.2, 1);
  }

  &:hover &__inner {
    transform: rotateY(180deg);
  }

  &__front,
  &__back {
    overflow: hidden;
    border-radius: 0.75rem;
    background-color: var(--va-c-bg-light);
    box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &:hover &__front,
  &:hover &__back {
    box-shadow: 0 12px 30px rgb(0 0 0 / 14%);
  }

  // 正面：横版，左封面右简介
  &__front {
    display: grid;
    grid-template-columns: 88px 1fr;
    column-gap: 1rem;
    align-items: center;
    height: 100%;
    padding: 1rem;
  }

  &__cover {
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 0.375rem;
    background-color: var(--va-c-bg-soft);
    box-shadow: 0 2px 8px rgb(0 0 0 / 12%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--va-c-text-light);
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__intro {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  &__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--va-c-text);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
  }

  &__author {
    color: var(--va-c-text-light);
    font-size: 0.75rem;
  }

  &__desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 0.125rem;
    color: var(--va-c-text);
    font-size: 0.8125rem;
    line-height: 1.7;
    opacity: 0.85;
  }

  // 背面：铺满正面，翻转后回正
  &__back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.125rem;
    transform: rotateY(180deg);
  }

  &__back-tag {
    align-self: flex-start;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    background-color: var(--va-c-primary);
    color: #fff;
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
  }

  &__summary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    color: var(--va-c-text);
    font-size: 0.8125rem;
    line-height: 1.8;
  }
}

.book-shelf__empty {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--va-c-text-light);
  font-size: 0.875rem;
}
</style>
