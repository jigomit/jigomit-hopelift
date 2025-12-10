<script setup>
import { RouterView } from 'vue-router'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <div class="app-shell">
    <!-- Sentinel element for navbar scroll detection - prevents forced reflows -->
    <div id="navbar-scroll-sentinel" style="position: absolute; top: 0; left: 0; width: 1px; height: 10px; pointer-events: none; visibility: hidden;"></div>
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
