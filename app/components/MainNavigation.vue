<template>
  <nav class="navigation">
    <div class="nav-links">
      <button 
        @click="$emit('changeView', 'champions')" 
        :class="['nav-item', { active: currentView === 'champions' }]"
      >
        {{ $t('nav.champions') }}
      </button>
      <button 
        @click="$emit('changeView', 'dashboard')" 
        :class="['nav-item', { active: currentView === 'dashboard' }]"
      >
        {{ $t('nav.dashboard') }}
      </button>
      <button 
        @click="$emit('changeView', 'profile')" 
        :class="['nav-item', { active: currentView === 'profile' }]"
      >
        {{ $t('nav.profile') }}
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps(['currentView']);
defineEmits(['changeView']);
</script>

<style scoped>
.navigation { display: flex; justify-content: center; margin-bottom: 30px; position: sticky; top: 10px; z-index: 100; }
.nav-links { background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px); padding: 6px; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; gap: 5px; }
.nav-item { background: transparent; border: none; color: #94a3b8; padding: 10px 22px; border-radius: 14px; cursor: pointer; font-weight: 700; transition: all 0.3s; }
.nav-item.active { background: #7c3aed; color: white; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); }
</style>