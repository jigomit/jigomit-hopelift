<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="cta-panel" v-reveal>
    <p class="section-eyebrow" style="color: rgba(255,255,255,0.8)">Act now</p>
    <h2>Every donation unlocks meals, training, and healthcare.</h2>
    <p>
      Give once or become a sustaining ally. 93¢ of every dollar fuels community-designed programs across Africa,
      Latin America, and Southeast Asia.
    </p>
    <ul class="cta-list">
      <li>Transparent dashboards updated hourly</li>
      <li>Community councils approve budgets</li>
      <li>Culture-first youth training kits</li>
    </ul>
    <div class="cta-actions">
      <RouterLink class="btn btn-primary" to="/donate">Donate monthly</RouterLink>
      <RouterLink class="btn btn-outline" to="/contact">Partner with us</RouterLink>
    </div>
  </section>
</template>
