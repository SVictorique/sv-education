<template>
  <a-image
      src="/subject-outline.png"
      :preview="false"
      width="100%"
  ></a-image>
</template>
<script>
import {useBreadItem} from "@/stores/breadItem";
export default {
  beforeMount() {
    const items = useBreadItem()
    items.set('Home')
  }
}
</script>
