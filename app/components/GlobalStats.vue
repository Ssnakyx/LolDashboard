<template>
  <div class="stats-dashboard">
    <div class="stat-card">
      <span class="stat-label">{{ $t('global.champions') }}</span>
      <span class="stat-value">{{ totalCount }}</span>
    </div>

    <div class="stat-card">
      <span class="stat-label">{{ $t('global.avgAD') }}</span>
      <span class="stat-value">{{ avgAD }}</span>
    </div>

    <div class="stat-card highlight">
      <span class="stat-label">{{ $t('global.tankiest') }}</span>
      <div class="best-champ" v-if="tankiest">
        <img :src="tankiest.icon" alt="" />
        <span>{{ tankiest.name }} ({{ tankiest.stats.hp }})</span>
      </div>
    </div>

    <div class="stat-card highlight">
      <span class="stat-label">{{ $t('global.strongest') }}</span>
      <div class="best-champ" v-if="strongest">
        <img :src="strongest.icon" alt="" />
        <span>{{ strongest.name }} ({{ strongest.stats.attackdamage }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['champions'])

const totalCount = computed(() => props.champions.length)

const avgAD = computed(() => {
  if (!props.champions.length) return 0
  const total = props.champions.reduce((acc, c) => acc + (c.stats.attackdamage || 0), 0)
  return (total / props.champions.length).toFixed(1)
})

const tankiest = computed(() => {
  if (!props.champions.length) return null
  return [...props.champions].sort((a, b) => b.stats.hp - a.stats.hp)[0]
})

const strongest = computed(() => {
  if (!props.champions.length) return null
  return [...props.champions].sort((a, b) => b.stats.attackdamage - a.stats.attackdamage)[0]
})
</script>

<style scoped>
.stats-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto 40px;
}

.stat-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.05);
}

.stat-label {
  font-size: 0.6rem;
  font-weight: 900;
  color: #64748b;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  font-family: monospace;
}

.highlight {
  border-color: rgba(124, 58, 237, 0.2);
}

.best-champ {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a855f7;
  font-weight: bold;
  font-size: 0.9rem;
}

.best-champ img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #7c3aed;
}
</style>