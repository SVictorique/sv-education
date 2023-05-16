<template>
  <a-image
      :src="`${baseUrl}/subject-outline.png`"
      :preview="false"
      width="100%"
  ></a-image>
</template>
<script>
import {useBreadItem} from "@/stores/breadItem";
export default {
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
    };
  },
  beforeMount() {
    const items = useBreadItem()
    items.set('Home')
  }
}
</script>
