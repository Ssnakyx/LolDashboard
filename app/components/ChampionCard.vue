<template>
  <div class="card" :class="{ 'selecting': isSelected(champion.id) }" @click="$emit('click')">
    <div class="image-container">
      <img :src="champion.icon" :alt="champion.name" class="champ-img" />
      
      <div 
        class="compare-checkbox" 
        :class="{ active: isSelected(champion.id) }"
        @click.stop="toggleComparison(champion.id)"
      >
        <span v-if="isSelected(champion.id)">✔</span>
      </div>

      <button 
        class="fav-btn" 
        :class="{ active: isFavorite }" 
        @click.stop="toggleFavorite(champion.id)"
      >
        ❤
      </button>
      
      <div class="overlay"></div>
    </div>

    <div class="info">
      <h3 class="name">{{ champion.name }}</h3>
      <p class="tag">{{ champion.tags[0] }}</p>
    </div>
    
    <div class="glow-bar"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAccount } from '../composables/useAccount'
import { useComparison } from '../composables/useComparison'

const props = defineProps(['champion'])
defineEmits(['click'])

const { user, toggleFavorite } = useAccount()
const { toggleComparison, isSelected } = useComparison()

const isFavorite = computed(() => user.value.favorites.includes(props.champion.id))
</script>

<style scoped>
.card {
  background: rgba(11, 15, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
}

.card:hover {
  border-color: rgba(168, 85, 247, 0.4);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.card.selecting {
  border-color: #7c3aed;
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
}

.image-container {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
}

.champ-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.card:hover .champ-img { transform: scale(1.1); }

.compare-checkbox {
  position: absolute; top: 10px; left: 10px; width: 22px; height: 22px;
  background: rgba(0,0,0,0.6); border: 2px solid rgba(255,255,255,0.2); border-radius: 6px;
  z-index: 10; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; color: white; font-size: 0.8rem;
}
.compare-checkbox.active { background: #7c3aed; border-color: #7c3aed; }

.fav-btn {
  position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.5);
  border: none; color: white; width: 30px; height: 30px; border-radius: 50%;
  cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s;
}
.fav-btn.active { color: #ff4757; background: white; }

.overlay {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(11, 15, 26, 0.9) 0%, transparent 100%);
}

.info { padding: 12px; text-align: center; }
.name { font-size: 1.1rem; font-weight: 800; color: white; margin: 0; text-transform: uppercase; }
.tag { font-size: 9px; color: #a855f7; margin-top: 4px; font-weight: 700; text-transform: uppercase; }

.glow-bar {
  position: absolute; bottom: 0; left: 0; height: 2px; width: 0;
  background: #7c3aed; transition: width 0.4s ease;
}
.card:hover .glow-bar { width: 100%; }
</style>