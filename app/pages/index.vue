<template>
  <div>
  </div>
</template>

<script lang="ts" setup>
  // to control redirection based on authentication status.
  definePageMeta({
    middleware: 'redirect-home'
  })

  useHead({
    title: 'App Manager | Home'
  })
</script>

<style></style>