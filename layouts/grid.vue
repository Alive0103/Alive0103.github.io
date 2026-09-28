<script setup lang="ts">
import type { Post } from 'valaxy'
import { useFrontmatter, usePostTitle, useSiteConfig } from 'valaxy'
import { computed } from 'vue'

/**
 * 分类网格页：按 `pages/posts` 下的子文件夹聚合文章，图文卡片展示。
 * 任意分类都可复用：md 里写 `layout: grid` + `folder: xxx` 即可。
 */
const fm = useFrontmatter<{
  folder?: string
  columns?: 2 | 3
  description?: string
}>()

const siteConfig = useSiteConfig()
const title = usePostTitle(computed(() => fm.value as Post))
const folder = computed(() => fm.value.folder || 'essays')
const columns = computed<2 | 3>(() => fm.value.columns ?? 3)
</script>

<template>
  <YunLayoutWrapper>
    <div class="grid-page">
      <YunPageHeader :title="title" :icon="fm.icon || 'i-ri-quill-pen-line'" />
      <p v-if="fm.description" class="grid-page__desc">
        {{ fm.description }}
      </p>

      <PostGrid :folder="folder" :columns="columns" />

      <YunComment
        v-if="siteConfig.comment.enable && fm.comment !== false"
        class="grid-page__comment"
      />
    </div>
  </YunLayoutWrapper>
</template>

<style lang="scss">
.grid-page {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;

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
