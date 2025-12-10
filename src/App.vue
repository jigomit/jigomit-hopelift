<script setup>
import { RouterView } from 'vue-router'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <div class="app-shell">
    <BaseNavbar />
    <main class="view-shell">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <BaseFooter />
  </div>
</template>
