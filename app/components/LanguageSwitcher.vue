<template>
  <div class="language-switcher">
    <UButton
      :icon="currentLanguageIcon"
      :label="currentLanguageName"
      color="blue"
      variant="solid"
      size="sm"
      @click="isOpen = !isOpen"
    />
    
    <Transition name="fade">
      <div v-if="isOpen" class="language-menu">
        <button
          v-for="lang in availableLocales"
          :key="lang.code"
          :class="['lang-option', { active: locale === lang.code }]"
          @click="selectLanguage(lang.code)"
        >
          <span class="lang-flag">{{ getFlagEmoji(lang.code) }}</span>
          <span class="lang-name">{{ lang.name }}</span>
          <Icon v-if="locale === lang.code" name="i-heroicons-check" class="check-icon" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { locale, locales, setLocale } = useI18n();
const isOpen = ref(false);

const availableLocales = computed(() => locales.value || []);

const currentLanguageName = computed(() => {
  const current = availableLocales.value.find(l => l.code === locale.value);
  return current?.name || 'Language';
});

const currentLanguageIcon = computed(() => {
  return locale.value === 'fr' ? 'i-heroicons-language' : 'i-heroicons-language';
});

const getFlagEmoji = (code) => {
  const flags = {
    en: '🇬🇧',
    fr: '🇫🇷'
  };
  return flags[code] || '🌐';
};

const selectLanguage = (code) => {
  setLocale(code);
  isOpen.value = false;
};
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-top: 8px;
  min-width: 200px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
}

.lang-option {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #f1f5f9;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
  justify-content: space-between;
}

.lang-option:hover:not(.active) {
  background-color: #334155;
}

.lang-option.active {
  background-color: #3b82f6;
  font-weight: 600;
}

.lang-flag {
  font-size: 1.2rem;
}

.lang-name {
  flex: 1;
  text-align: left;
}

.check-icon {
  width: 20px;
  height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
