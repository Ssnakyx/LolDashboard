<template>
  <div class="view-container">
    <header class="main-header">
      <h1 class="glow-text">{{ $t('champions.title') }}</h1>
      <GlobalStats :champions="champions" />
      <div class="filter-section">
        <input v-model="searchQuery" type="text" :placeholder="$t('champions.search')" class="search-input" />
        <div class="roles-filters">
          <button v-for="(displayed, idx) in displayedRoles" :key="realRoles[idx]" @click="selectedRole = realRoles[idx]" :class="['role-btn', { active: selectedRole === realRoles[idx] }]">
            {{ displayed }}
          </button>
          <button @click="showOnlyFavs = !showOnlyFavs" :class="['role-btn fav-filter', { active: showOnlyFavs }]">
            {{ $t('champions.favorites') }}
          </button>
        </div>
      </div>
      <div class="separator"></div>
    </header>

    <main class="content-grid">
      <div v-if="filteredChampions.length" class="champions-wrapper">
        <ChampionCard v-for="champ in filteredChampions" :key="champ.id" :champion="champ" @click="$emit('select', champ)" />
      </div>
      <div v-else class="no-results">
        <p>{{ $t('champions.noResults') }}</p>
        <button @click="resetFilters" class="reset-btn">{{ $t('champions.resetFilters') }}</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import champions from '../datas/champions';
import { useAccount } from '../composables/useAccount';

const { user } = useAccount();
const { t } = useI18n();

const searchQuery = ref('');
const selectedRole = ref('All');
const showOnlyFavs = ref(false);
const realRoles = ['All', 'Fighter', 'Mage', 'Assassin', 'Tank', 'Marksman', 'Support'];

const roleMapping = {
  'All': 'All',
  'Fighter': 'Fighter',
  'Mage': 'Mage',
  'Assassin': 'Assassin',
  'Tank': 'Tank',
  'Marksman': 'Marksman',
  'Support': 'Support'
};

const displayedRoles = computed(() => {
  return realRoles.map(role => {
    if (role === 'All') return t('stats.roleFilter');
    return t(`roles.${role.toLowerCase()}`) || role;
  });
});

const filteredChampions = computed(() => {
  return champions.filter(champ => {
    const matchesSearch = champ.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = selectedRole.value === 'All' || champ.tags.includes(selectedRole.value);
    const matchesFav = !showOnlyFavs.value || user.value.favorites.includes(champ.id);
    return matchesSearch && matchesRole && matchesFav;
  });
});

const resetFilters = () => { searchQuery.value = ''; selectedRole.value = 'All'; showOnlyFavs.value = false; };
defineEmits(['select']);
</script>

<style scoped>
.main-header { text-align: center; margin-bottom: 40px; }
.glow-text { font-size: 3rem; font-weight: 900; background: linear-gradient(to right, #fff, #64748b); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
.filter-section { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 20px; }
.search-input { width: 100%; max-width: 400px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(124, 58, 237, 0.3); padding: 12px 20px; border-radius: 12px; color: white; outline: none; }
.roles-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.role-btn { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); color: #64748b; padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 0.75rem; font-weight: 700; }
.role-btn.active { background: #7c3aed; color: white; border-color: #7c3aed; }
.fav-filter.active { background: #ff4757; border-color: #ff4757; color: white; }
.separator { height: 2px; width: 80px; background: #7c3aed; margin: 30px auto; }
.champions-wrapper { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; max-width: 1300px; margin: 0 auto; }
.reset-btn { margin-top: 15px; background: none; border: 1px solid #7c3aed; color: #7c3aed; padding: 8px 20px; border-radius: 8px; cursor: pointer; }
@media (max-width: 1100px) { .champions-wrapper { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 850px) { .champions-wrapper { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .champions-wrapper { grid-template-columns: repeat(2, 1fr); } }
</style>