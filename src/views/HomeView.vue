<template>
  <main>
    <TheWelcome />
  </main>
</template>
<script>
import {useBreadItem} from "../stores/breadItem";
export default {
  beforeMount() {
    const items = useBreadItem()
    items.set('Home')
  }
}
</script>
