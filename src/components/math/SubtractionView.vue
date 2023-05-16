<template>
  <a-space direction="vertical">
    <a-image :src="`${baseUrl}/math-sub.webp`" :preview="false"></a-image>
    <a-typography-text><pre>破十法核心口诀：看大数，分出10，一减一加算得数。</pre></a-typography-text>
    <a-typography-text><pre>平十法核心口诀：分小数，连续相减算得数。</pre></a-typography-text>
    <a-typography-text><pre>借十法核心口诀：看大数，分出10，减小数，加剩数。</pre></a-typography-text>
    <a-typography-paragraph>
      <pre>
        《破十歌》

      减九加一，减八加二
      减七加三，减六加四
      减五加五，减四加六
      减三加七，减二加八
      破大数，加小数
      </pre>
    </a-typography-paragraph>
  </a-space>
</template>

<script>
export default {
  name: "SubtractionView",
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
    };
  },
}
</script>

<style scoped>

</style>
