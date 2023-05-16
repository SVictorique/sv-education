<template>
  <a-row>
    <button @click="goLetter" class="friendly-btn">单词</button>
  </a-row>
</template>

<script>
import {useBreadItem} from "@/stores/breadItem";

export default {
  name: "EnglishView",
  beforeMount() {
    const items = useBreadItem()
    items.set('英语')
  },
  methods: {
    goLetter() {
      this.$router.push('/english/letter')
    },
  },
}
</script>

<style scoped>

</style>
