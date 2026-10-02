<script setup lang="ts">
import type { Post } from 'valaxy'
import { useFrontmatter, usePostTitle, useSiteConfig } from 'valaxy'
import { computed } from 'vue'

/**
 * 新鲜事板块：按 pages/<folder>/ 下的日期命名 md 聚合为倒序时间轴。
 * md 里写 `layout: fresh` + `folder: fresh` 即可。
 */
const fm = useFrontmatter<{
  folder?: string
  description?: string
}>()

const siteConfig = useSiteConfig()
const title = usePostTitle(computed(() => fm.value as Post))
const folder = computed(() => fm.value.folder || 'fresh')
</script>

<template>
  <YunLayoutWrapper>
    <div class="fresh-page">
      <YunPageHeader :title="title" :icon="fm.icon || 'i-ri-newspaper-line'" />
      <p v-if="fm.description" class="fresh-page__desc">
        {{ fm.description }}
      </p>

      <FreshTimeline :folder="folder" />

      <YunComment
        v-if="siteConfig.comment.enable && fm.comment !== false"
        class="fresh-page__comment"
      />
    </div>
  </YunLayoutWrapper>
</template>

<style lang="scss">
.fresh-page {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.25rem;

  &__desc {
    margin-bottom: 1.75rem;
    text-align: center;
    color: var(--va-c-text-light);
    font-size: 0.875rem;
  }

  &__comment {
    margin-top: 2rem;
  }
}
</style>
