<template>

</template>

<script>
import {useBreadItem} from "@/stores/breadItem";
export default {
  name: "MathView",
  beforeMount() {
    const items = useBreadItem()
    items.set('数学')
  }
}
</script>

<style scoped>

</style>
