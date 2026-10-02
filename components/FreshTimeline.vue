<script lang="ts" setup>
import type { Post } from 'valaxy'
import { usePageList, useValaxyI18n } from 'valaxy'
import { computed } from 'vue'

/**
 * 日报 frontmatter 字段：
 * - description  一句话导语（卡片背面标题）
 * - highlights   当日热点标题数组，展示在卡片正面
 */
type FreshPost = Post & { description?: string, highlights?: string[] }

const props = defineProps<{
  /** 要聚合的目录（相对 pages 根） */
  folder: string
}>()

/** 正面最多展示的热点条数 */
const VISIBLE = 4

interface Entry {
  path: string
  day: string
  month: string
  weekday: string
  year: number
  headline: string
  highlights: string[]
  rest: number
  digest: string
}

const { $tO } = useValaxyI18n()
const pageList = usePageList()

const items = computed<Entry[]>(() => pageList.value
  .filter(post => post.path?.startsWith(`/${props.folder}/`) && !post.path!.endsWith('/'))
  .sort((a, b) => +new Date(b.date!) - +new Date(a.date!))
  .map((post: FreshPost) => {
    const date = new Date(post.date!)
    const highlights = post.highlights ?? []
    return {
      path: post.path!,
      day: String(date.getDate()).padStart(2, '0'),
      month: date.toLocaleDateString('zh-CN', { month: 'short' }),
      weekday: date.toLocaleDateString('zh-CN', { weekday: 'short' }),
      year: date.getFullYear(),
      headline: post.description || $tO(post.title ?? ''),
      highlights: highlights.slice(0, VISIBLE),
      rest: Math.max(highlights.length - VISIBLE, 0),
      digest: post.excerpt?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '',
    }
  }))

const groups = computed(() => [...items.value
  .reduce((acc, item) => acc.set(item.year, [...acc.get(item.year) ?? [], item]), new Map<number, Entry[]>())
  .entries()]
  .sort((a, b) => b[0] - a[0]))
</script>

<template>
  <div class="fresh">
    <section v-for="[year, list] in groups" :key="year" class="fresh__group">
      <h2 class="fresh__year">
        {{ year }}
      </h2>

      <AppLink v-for="item in list" :key="item.path" :to="item.path" class="fresh-card">
        <div class="fresh-card__inner">
          <div class="fresh-card__front">
            <div class="fresh-card__date">
              <span class="fresh-card__day">{{ item.day }}</span>
              <span class="fresh-card__month">{{ item.month }}</span>
              <span class="fresh-card__weekday">{{ item.weekday }}</span>
            </div>

            <div class="fresh-card__main">
              <ul class="fresh-card__highlights">
                <li v-for="(topic, i) in item.highlights" :key="i">
                  {{ topic }}
                </li>
              </ul>
              <span v-if="item.rest" class="fresh-card__rest">还有 {{ item.rest }} 条</span>
            </div>
          </div>

          <div class="fresh-card__back">
            <span class="fresh-card__back-tag">{{ item.month }}{{ item.day }} 日报</span>
            <p class="fresh-card__headline">
              {{ item.headline }}
            </p>
            <p class="fresh-card__digest">
              {{ item.digest }}
            </p>
            <span class="fresh-card__more">阅读全文 →</span>
          </div>
        </div>
      </AppLink>
    </section>

    <p v-if="!items.length" class="fresh__empty">
      「{{ folder }}」下还没有日报，在 <code>pages/{{ folder }}/YYYY-MM-DD.md</code> 里写即可。
    </p>
  </div>
</template>

<style lang="scss">
.fresh {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0.75rem;
    bottom: 0.75rem;
    left: 0.4rem;
    width: 1px;
    background-color: var(--va-c-bg-soft);
  }

  &__group + &__group {
    margin-top: 2rem;
  }

  &__year {
    position: relative;
    margin: 0 0 1rem;
    color: var(--va-c-text-light);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.08em;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -1.75rem;
      width: 0.5rem;
      height: 0.5rem;
      border: 2px solid var(--va-c-bg-light);
      border-radius: 50%;
      background-color: var(--va-c-primary);
      transform: translate(-50%, -50%);
    }
  }

  &__empty {
    padding: 3rem 1rem;
    text-align: center;
    color: var(--va-c-text-light);
    font-size: 0.875rem;
  }
}

.fresh-card {
  position: relative;
  display: block;
  perspective: 1600px;

  & + & {
    margin-top: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    left: -1.75rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--va-c-primary);
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1.6);
  }

  &__inner {
    position: relative;
    height: 100%;
    min-height: 11.5rem;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.1, 0.2, 1);
  }

  &:hover &__inner {
    transform: rotateY(180deg);
  }

  &__front,
  &__back {
    overflow: hidden;
    border-radius: 0.875rem;
    background-color: var(--va-c-bg-light);
    box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: box-shadow 0.3s ease;
  }

  &:hover &__front,
  &:hover &__back {
    box-shadow: 0 12px 30px rgb(0 0 0 / 14%);
  }

  &__front {
    display: grid;
    grid-template-columns: 4.25rem 1fr;
    gap: 1.125rem;
    height: 100%;
    padding: 1.125rem 1.25rem;
  }

  &__date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 1.125rem;
    border-right: 1px solid var(--va-c-bg-soft);
  }

  &__day {
    color: var(--va-c-text);
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.1;
  }

  &__month,
  &__weekday {
    color: var(--va-c-text-light);
    font-size: 0.6875rem;
    line-height: 1.6;
  }

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    min-width: 0;
  }

  &__highlights {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 0.875rem;
      color: var(--va-c-text);
      font-size: 0.875rem;
      line-height: 1.6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &::before {
        content: '';
        position: absolute;
        top: 0.6rem;
        left: 0;
        width: 0.3125rem;
        height: 0.3125rem;
        border-radius: 50%;
        background-color: var(--va-c-primary);
      }
    }
  }

  &__rest {
    align-self: flex-start;
    padding: 0.0625rem 0.5rem;
    border-radius: 0.25rem;
    background-color: var(--va-c-bg-soft);
    color: var(--va-c-text-light);
    font-size: 0.6875rem;
  }

  &__back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.25rem 1.5rem;
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

  &__headline {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--va-c-text);
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5;
  }

  &__digest {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--va-c-text-light);
    font-size: 0.8125rem;
    line-height: 1.75;
  }

  &__more {
    margin-top: 0.125rem;
    color: var(--va-c-primary);
    font-size: 0.75rem;
  }

  @media (max-width: 639px) {
    &__front {
      grid-template-columns: 3.25rem 1fr;
      gap: 0.875rem;
      padding: 1rem;
    }

    &__date {
      padding-right: 0.75rem;
    }

    &__day {
      font-size: 1.375rem;
    }

    &__back {
      padding: 1rem 1.125rem;
    }
  }
}

@media (max-width: 639px) {
  .fresh {
    padding-left: 1.5rem;
  }

  .fresh-card::before,
  .fresh__year::before {
    left: -1.25rem;
  }
}
</style>
