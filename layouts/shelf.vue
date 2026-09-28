<script setup lang="ts">
import type { Post } from 'valaxy'
import { useFrontmatter, usePostTitle, useSiteConfig } from 'valaxy'
import { computed } from 'vue'

/**
 * 书架页：按 `pages/<folder>/` 聚合读书笔记，条形卡片（封面/简介/笔记三段）。
 * 在 md 的 frontmatter 里写 `layout: shelf` + `folder: books` 即可。
 */
const fm = useFrontmatter<{
  folder?: string
  columns?: 2 | 3 | 4
  description?: string
}>()

const siteConfig = useSiteConfig()
const title = usePostTitle(computed(() => fm.value as Post))
const folder = computed(() => fm.value.folder || 'books')
const columns = computed<2 | 3 | 4>(() => fm.value.columns ?? 3)
</script>

<template>
  <YunLayoutWrapper>
    <div class="shelf-page">
      <YunPageHeader :title="title" :icon="fm.icon || 'i-ri-book-2-line'" />
      <p v-if="fm.description" class="shelf-page__desc">
        {{ fm.description }}
      </p>

      <BookShelf :folder="folder" :columns="columns" />

      <YunComment
        v-if="siteConfig.comment.enable && fm.comment !== false"
        class="shelf-page__comment"
      />
    </div>
  </YunLayoutWrapper>
</template>

<style lang="scss">
.shelf-page {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;

  &__desc {
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--va-c-text-light);
    font-size: 0.875rem;
  }

  &__comment {
    margin-top: 2rem;
  }
}
</style>
