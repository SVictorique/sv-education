import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBreadItem = defineStore('breadItem', () => {
  const items = ref([])
  function set(...item) {
    items.value = item
  }

  return { items, set }
})
