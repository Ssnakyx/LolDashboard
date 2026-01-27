<template>
  <div class="analysis-section">
    <h3 class="section-title">📊 ANALYSE DU STYLE</h3>
    <div class="analysis-card">
      <p class="analysis-text">
        Votre rôle de prédilection : <span class="highlight">{{ mainRole }}</span>
      </p>
      <div class="role-stats">
        <div v-for="(count, role) in distribution" :key="role" class="role-badge">
          {{ role }} : {{ count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['mainRole', 'distribution'])
</script>

<style scoped>
.analysis-card { background: rgba(11, 16, 32, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; margin-bottom: 30px; }
.highlight { color: #a855f7; font-weight: 900; text-transform: uppercase; }
.role-stats { display: flex; flex-wrap: wrap; gap: 10px; }
.role-badge { background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.3); color: #a855f7; padding: 5px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: bold; }
</style>