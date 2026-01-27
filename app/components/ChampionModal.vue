<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      
      <div class="modal-content">
        <div class="image-side">
          <img :src="champion.icon" :alt="champion.name" />
          <div class="image-overlay"></div>
        </div>

        <div class="text-side">
          <header class="modal-header">
            <div class="tags">
              <span v-for="tag in champion.tags" :key="tag" class="tag-pill">{{ tag }}</span>
            </div>
            <h2 class="modal-name">{{ champion.name }}</h2>
            <p class="modal-title">{{ champion.title }}</p>
          </header>

          <div class="description-box">
            <p>{{ champion.description }}</p>
          </div>

          <h4 class="stats-title">Statistiques de base</h4>
          <div class="stats-grid-full">
            <div class="stat-group">
              <span class="label">Points de Vie</span>
              <span class="value">{{ champion.stats.hp }} <small>(+{{ champion.stats.hpperlevel }})</small></span>
            </div>
            <div class="stat-group">
              <span class="label">Mana / Énergie</span>
              <span class="value">{{ champion.stats.mp }} <small>(+{{ champion.stats.mpperlevel }})</small></span>
            </div>
            <div class="stat-group">
              <span class="label">Attaque</span>
              <span class="value">{{ champion.stats.attackdamage }} <small>(+{{ champion.stats.attackdamageperlevel }})</small></span>
            </div>
            <div class="stat-group">
              <span class="label">Vitesse d'Attaque</span>
              <span class="value">{{ champion.stats.attackspeed }}</span>
            </div>
            <div class="stat-group">
              <span class="label">Armure</span>
              <span class="value">{{ champion.stats.armor }} <small>(+{{ champion.stats.armorperlevel }})</small></span>
            </div>
            <div class="stat-group">
              <span class="label">Résistance Magique</span>
              <span class="value">{{ champion.stats.spellblock }} <small>(+{{ champion.stats.spellblockperlevel }})</small></span>
            </div>
            <div class="stat-group">
              <span class="label">Portée</span>
              <span class="value">{{ champion.stats.attackrange }}</span>
            </div>
            <div class="stat-group">
              <span class="label">Vitesse de dépl.</span>
              <span class="value">{{ champion.stats.movespeed }}</span>
            </div>
            <div class="stat-group">
              <span class="label">Régén. PV</span>
              <span class="value">{{ champion.stats.hpregen }}</span>
            </div>
            <div class="stat-group">
              <span class="label">Régén. Mana</span>
              <span class="value">{{ champion.stats.mpregen }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['champion']);
defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(15px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: #0b1020;
  border: 1px solid rgba(168, 85, 247, 0.2);
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 40px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.8);
}

.close-btn {
  position: absolute;
  top: 25px;
  right: 25px;
  background: #1e293b;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.close-btn:hover { background: #7c3aed; }

.modal-content { display: flex; flex-direction: column; }
@media (min-width: 850px) { .modal-content { flex-direction: row; } }

.image-side { flex: 1; position: relative; min-height: 400px; }
.image-side img { width: 100%; height: 100%; object-fit: cover; }
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, #0b1020);
}

.text-side { flex: 1.5; padding: 50px; }

.tag-pill {
  font-size: 10px;
  font-weight: 900;
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
  padding: 6px 16px;
  border-radius: 50px;
  margin-right: 8px;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.modal-name { font-size: 3.5rem; font-weight: 900; font-style: italic; text-transform: uppercase; margin: 10px 0 0 0; }
.modal-title { color: #a855f7; font-weight: 700; margin-bottom: 30px; letter-spacing: 1px; }

.description-box {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-left: 4px solid #7c3aed;
  margin-bottom: 40px;
  color: #94a3b8;
  font-style: italic;
  line-height: 1.6;
}

.stats-title {
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #475569;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 10px;
}

.stats-grid-full {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-group { display: flex; flex-direction: column; }
.label { font-size: 9px; font-weight: 900; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
.value { font-size: 1.2rem; font-weight: 700; color: #f1f5f9; }
.value small { font-size: 0.7rem; color: #22c55e; margin-left: 5px; }
</style>