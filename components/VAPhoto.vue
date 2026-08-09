<script lang="ts" setup>
import type { Photo } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  photo: Photo
}>()

const subHtml = computed(() => {
  return `<h4>${props.photo.caption}</h4><p>${props.photo.desc}</p>`
})
</script>

<template>
  <figure class="va-photo-list-item" :data-src="photo.src" :data-sub-html="subHtml">
    <img class="va-photo-list-cover" :src="photo.src" loading="lazy" :alt="photo.caption">
    <figcaption class="yun-title-effects text-$va-c-text op-80 hover:op-100">
      {{ photo.caption }}
    </figcaption>
    <p v-if="photo.desc" class="va-photo-list-desc">
      {{ photo.desc }}
    </p>
  </figure>
</template>

<style lang="scss">
.va-photo-list-item {
  display: inline-flex;
  position: relative;
  width: 15rem;
  margin: 1.8rem;
  cursor: pointer;

  img {
    box-sizing: border-box;
    vertical-align: bottom;
    display: inline-flex;
    border: 0.25rem solid white;
    box-shadow: 0 8px 10px rgba(#000, 0.1);
    width: 100%;
    height: 10rem;
    object-fit: cover;
    background-color: #eee;
  }

  figcaption {
    position: absolute;
    bottom: -2.2rem;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 0.9rem;
  }
}

.va-photo-list-desc {
  position: absolute;
  bottom: -3.6rem;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0 0.5rem;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--va-c-text-light);
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
