import { ref } from 'vue'

const selectedCompareIds = ref([])

export const useComparison = () => {
  const toggleComparison = (id) => {
    const index = selectedCompareIds.value.indexOf(id)
    if (index > -1) {
      selectedCompareIds.value.splice(index, 1)
    } else if (selectedCompareIds.value.length < 2) {
      selectedCompareIds.value.push(id)
    }
  }

  const isSelected = (id) => selectedCompareIds.value.includes(id)
  const clearComparison = () => selectedCompareIds.value = []

  return { selectedCompareIds, toggleComparison, isSelected, clearComparison }
}