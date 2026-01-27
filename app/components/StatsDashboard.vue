<template>
  <div class="dashboard-page">
    <header class="dashboard-header">
      <h2 class="title italic">RECORDS PAR CATÉGORIE</h2>
      
      <div class="class-selector">
        <button 
          v-for="role in roles" 
          :key="role" 
          @click="selectedRole = role"
          :class="['role-tab', { active: selectedRole === role }]"
        >
          {{ role }}
        </button>
      </div>
    </header>

    <div class="stats-grid">
      <div v-for="stat in statsToAnalyze" :key="stat.key" class="stat-section">
        <h3 class="stat-title">{{ stat.label }}</h3>
        
        <div class="comparison-cards">
          <div class="record-card strongest">
            <div class="badge">MAX {{ selectedRole !== 'Tous' ? selectedRole : '' }}</div>
            <img :src="getRecord(stat.key, 'max').icon" class="champ-mini" />
            <div class="details">
              <span class="champ-name">{{ getRecord(stat.key, 'max').name }}</span>
              <span class="stat-val">{{ getRecord(stat.key, 'max').stats[stat.key] }}</span>
            </div>
          </div>

          <div class="record-card weakest">
            <div class="badge">MIN {{ selectedRole !== 'Tous' ? selectedRole : '' }}</div>
            <img :src="getRecord(stat.key, 'min').icon" class="champ-mini" />
            <div class="details">
              <span class="champ-name">{{ getRecord(stat.key, 'min').name }}</span>
              <span class="stat-val">{{ getRecord(stat.key, 'min').stats[stat.key] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import champions from '../datas/champions'

const selectedRole = ref('Tous')
const roles = ['Tous', 'Fighter', 'Mage', 'Assassin', 'Tank', 'Marksman', 'Support']

const statsToAnalyze = [
  { label: 'Points de Vie', key: 'hp' },
  { label: 'Dégâts d\'Attaque', key: 'attackdamage' },
  { label: 'Armure', key: 'armor' },
  { label: 'Résistance Magique', key: 'spellblock' },
  { label: 'Vitesse de Déplacement', key: 'movespeed' },
  { label: 'Portée de Tir', key: 'attackrange' }
]

const filteredList = computed(() => {
  if (selectedRole.value === 'Tous') return champions
  return champions.filter(c => c.tags.includes(selectedRole.value))
})

const getRecord = (key, type) => {
  const list = [...filteredList.value]
  if (!list.length) return { name: 'N/A', icon: '', stats: { [key]: 0 } }
  
  return list.sort((a, b) => {
    return type === 'max' ? b.stats[key] - a.stats[key] : a.stats[key] - b.stats[key]
  })[0]
}
</script>

<style scoped>
.dashboard-page { padding: 20px; max-width: 1100px; margin: 0 auto; }
.dashboard-header { text-align: center; margin-bottom: 40px; }
.title { font-size: 2.2rem; font-weight: 900; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; color: transparent; }

.class-selector { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px; }
.role-tab {
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8; padding: 8px 16px; border-radius: 12px; cursor: pointer; transition: 0.3s; font-weight: bold;
}
.role-tab.active { background: #7c3aed; color: white; border-color: #7c3aed; box-shadow: 0 0 15px rgba(124, 58, 237, 0.3); }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 25px; }
.stat-section { background: rgba(11, 16, 32, 0.6); border-radius: 24px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.05); }
.stat-title { text-align: center; font-size: 0.8rem; color: #64748b; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase; }

.comparison-cards { display: flex; gap: 15px; }
.record-card { flex: 1; display: flex; align-items: center; gap: 12px; padding: 15px; border-radius: 16px; position: relative; background: rgba(255, 255, 255, 0.02); }
.badge { position: absolute; top: -8px; right: 10px; font-size: 0.55rem; padding: 2px 8px; border-radius: 4px; font-weight: 900; }

.strongest { border-left: 4px solid #22c55e; }
.strongest .badge { background: #22c55e; color: #000; }
.strongest .stat-val { color: #22c55e; }

.weakest { border-left: 4px solid #ef4444; }
.weakest .badge { background: #ef4444; color: #fff; }
.weakest .stat-val { color: #ef4444; }

.champ-mini { width: 50px; height: 50px; border-radius: 12px; object-fit: cover; }
.details { display: flex; flex-direction: column; }
.champ-name { font-weight: 800; font-size: 0.9rem; color: white; }
.stat-val { font-family: monospace; font-size: 1.2rem; font-weight: bold; }

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: 1fr; }
  .comparison-cards { flex-direction: column; }
}
</style>