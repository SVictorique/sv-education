<template>
  <a-image :src="`${baseUrl}/math-mul.jpeg`" :preview="false"></a-image>
</template>

<script>
export default {
  name: "MultiplicationView",
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
    };
  },
}
</script>

<style scoped>

</style>
