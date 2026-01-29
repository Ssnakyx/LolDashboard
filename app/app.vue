<template>
  <div class="app-container">
    <div class="bg-gradient"></div>

    <div class="header-top">
      <LanguageSwitcher />
    </div>

    <Transition name="fade">
      <LoginView v-if="!user.isLoggedIn" />
    </Transition>

    <template v-if="user.isLoggedIn">
      <MainNavigation 
        :currentView="currentView" 
        @changeView="currentView = $event" 
      />

      <Transition name="page" mode="out-in">
        <div :key="currentView" class="view-content">
          <ChampionsView 
            v-if="currentView === 'champions'" 
            @select="selectedChampion = $event" 
          />
          <StatsDashboard 
            v-else-if="currentView === 'dashboard'" 
          />
          <UserProfile 
            v-else-if="currentView === 'profile'" 
          />
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="selectedCompareIds.length === 2" class="compare-fab">
          <button @click="showComparisonScreen = true">
            ⚔️ {{ $t('compare') }} ({{ selectedCompareIds.length }}/2)
          </button>
          <button class="clear-btn" @click="clearComparison">❌</button>
        </div>
      </Transition>

      <ChampionComparison 
        v-if="showComparisonScreen" 
        :c1="getChamp(selectedCompareIds[0])"
        :c2="getChamp(selectedCompareIds[1])"
        @close="showComparisonScreen = false"
      />

      <Teleport to="body">
        <Transition name="modal-anim">
          <ChampionModal 
            v-if="selectedChampion" 
            :champion="selectedChampion" 
            @close="selectedChampion = null"
          />
        </Transition>
      </Teleport>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAccount } from './composables/useAccount';
import { useComparison } from './composables/useComparison';
import champions from './datas/champions';

const { user } = useAccount();
const { selectedCompareIds, clearComparison } = useComparison();

const currentView = ref('champions');
const selectedChampion = ref(null);
const showComparisonScreen = ref(false);

const getChamp = (id) => champions.find(c => c.id === id);
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  color: #f1f5f9;
  font-family: 'Inter', sans-serif;
  position: relative;
  padding: 20px;
}

.header-top {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: auto;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #111827 0%, #030712 100%);
  z-index: -1; 
}

.view-content {
  position: relative;
  z-index: 10;
}

.compare-fab {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c3aed;
  padding: 10px 25px;
  border-radius: 50px;
  display: flex;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
  z-index: 150;
  align-items: center;
}

.compare-fab button {
  background: none;
  border: none;
  color: white;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.clear-btn {
  border-left: 1px solid rgba(255, 255, 255, 0.3) !important;
  padding-left: 15px !important;
}

.page-enter-active, .page-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.page-enter-from { opacity: 0; transform: translateY(10px); }
.page-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>