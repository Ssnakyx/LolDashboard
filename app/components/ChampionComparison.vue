<template>
  <div class="comparison-overlay">
    <div class="comparison-container">
      <button class="close-compare" @click="$emit('close')">Quitter la comparaison</button>
      
      <div class="vs-header">
        <div class="champ-block">
          <img :src="c1.icon" />
          <h3>{{ c1.name }}</h3>
        </div>
        <div class="vs-circle">VS</div>
        <div class="champ-block">
          <img :src="c2.icon" />
          <h3>{{ c2.name }}</h3>
        </div>
      </div>

      <div class="comparison-grid">
        <div v-for="stat in statsToCompare" :key="stat.key" class="stat-row">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="comparison-bars">
            <div class="bar-wrapper left">
              <span class="val">{{ c1.stats[stat.key] }}</span>
              <div class="bar">
                <div class="fill" :style="{ width: getWidth(c1.stats[stat.key], c2.stats[stat.key]) + '%' }"></div>
              </div>
            </div>
            <div class="bar-wrapper right">
              <div class="bar">
                <div class="fill" :style="{ width: getWidth(c2.stats[stat.key], c1.stats[stat.key]) + '%' }"></div>
              </div>
              <span class="val">{{ c2.stats[stat.key] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['c1', 'c2'])
defineEmits(['close'])

const statsToCompare = [
  { label: 'SANTÉ', key: 'hp' },
  { label: 'ATTAQUE', key: 'attackdamage' },
  { label: 'ARMURE', key: 'armor' },
  { label: 'MAGIE', key: 'spellblock' },
  { label: 'VITESSE', key: 'movespeed' }
]

const getWidth = (val, target) => {
  const max = Math.max(val, target)
  return (val / max) * 100
}
</script>

<style scoped>
.comparison-overlay {
  position: fixed; inset: 0; background: #030712; z-index: 200;
  display: flex; justify-content: center; padding: 40px;
}
.comparison-container { width: 100%; max-width: 1000px; }
.close-compare {
  background: #7c3aed; border: none; color: white; padding: 10px 20px;
  border-radius: 10px; cursor: pointer; margin-bottom: 40px; font-weight: bold;
}
.vs-header { display: flex; justify-content: space-around; align-items: center; margin-bottom: 60px; }
.champ-block { text-align: center; }
.champ-block img { width: 120px; border-radius: 50%; border: 3px solid #7c3aed; }
.champ-block h3 { font-size: 2rem; margin-top: 15px; font-style: italic; }
.vs-circle {
  width: 60px; height: 60px; background: #7c3aed; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-weight: 900;
}
.stat-row { margin-bottom: 30px; }
.stat-label { text-align: center; font-size: 0.7rem; font-weight: 900; color: #a855f7; margin-bottom: 10px; }
.comparison-bars { display: flex; gap: 40px; align-items: center; }
.bar-wrapper { flex: 1; display: flex; align-items: center; gap: 15px; }
.bar { flex: 1; height: 10px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
.fill { height: 100%; background: #7c3aed; transition: width 1s ease-out; }
.left { flex-direction: row; }
.left .bar { transform: rotate(180deg); }
.right .fill { background: #2563eb; }
.val { font-family: monospace; font-size: 1.2rem; min-width: 40px; }
</style>