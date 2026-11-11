<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HeroCard from './components/HeroCard.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <HeroCard />
    </template>
  </DefaultTheme.Layout>
</template>
