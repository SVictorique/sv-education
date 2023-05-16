<template>
  <a-space direction="vertical">
    <a-image :src="`${baseUrl}/math-add.jpeg`" :preview="false"></a-image>
    <a-typography-text><pre>凑十法核心口诀：看大数，分小数。凑成10，加剩数。</pre></a-typography-text>
    <a-typography-paragraph>
      <pre>
        《凑十歌》

      一九一九好朋友，二八二八手拉手，
      三七三七真亲密，四六四六一起走。
      五五凑成一双手，凑“十”计算无忧愁。
      看大数，分小数，凑成十，加剩数。
      大数记心里，小数记手里。
      一加九，十只小蝌蚪，
      二加八，十只花老鸭，
      三加七，十只老母鸡，
      四加六，十只金丝猴，
      五加五，十只大老虎。
      看到9想到1，看到8想到2，
      看到7想到3，看到6想到4。
      看到大数加小数，
      先把两数换位置。
      </pre>
    </a-typography-paragraph>
  </a-space>
</template>

<script>
export default {
  name: "AdditionView",
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
    };
  },
}
</script>

<style scoped>

</style>
