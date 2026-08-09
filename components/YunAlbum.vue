<script lang="ts" setup>
import type { Album } from 'valaxy'

defineProps<{
  album: Album
}>()
</script>

<template>
  <AppLink class="yun-album-list-item" :to="album.url">
    <figure class="m-10" flex="~ col" :title="album.desc">
      <img
        loading="lazy"
        class="yun-album-list-cover"
        :src="album.cover"
        :alt="album.caption"
      >
      <figcaption class="yun-album-caption yun-title-effects text-$va-c-text inline-flex-center">
        {{ album.caption }}
      </figcaption>
      <p v-if="album.desc" class="yun-album-desc">
        {{ album.desc }}
      </p>
    </figure>
  </AppLink>
</template>

<style lang="scss">
.yun-album-caption {
  position: absolute;
  bottom: -3rem;
  display: block;
  text-align: center;
  width: 100%;
}

.yun-album-desc {
  position: absolute;
  bottom: -5.6rem;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0 0.5rem;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--va-c-text-light);
  opacity: 0.75;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
