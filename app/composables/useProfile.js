import { ref, computed } from 'vue'
import { useAccount } from './useAccount'
import champions from '../datas/champions'

export const useProfile = () => {
  const { user, toggleFavorite, saveAccount, logout } = useAccount()
  const isSaved = ref(false)

  const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email))
  
  const favoriteChampions = computed(() => 
    champions.filter(champ => user.value.favorites.includes(champ.id))
  )

  const roleDistribution = computed(() => {
    const counts = {}
    favoriteChampions.value.forEach(c => c.tags.forEach(t => counts[t] = (counts[t] || 0) + 1))
    return counts
  })

  const mainRole = computed(() => {
    const roles = roleDistribution.value
    if (!Object.keys(roles).length) return "Inconnu"
    return Object.keys(roles).reduce((a, b) => roles[a] > roles[b] ? a : b)
  })

  const handleSave = () => {
    if (isEmailValid.value) {
      saveAccount(); isSaved.value = true
      setTimeout(() => isSaved.value = false, 3000)
    }
  }

  return { 
    user, isSaved, isEmailValid, favoriteChampions, 
    roleDistribution, mainRole, handleSave, toggleFavorite, logout 
  }
}