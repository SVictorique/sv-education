<script setup>
  const grades = ['一','二','三','四','五','六','七','八','九']
  const terms = ['上','下']
</script>

<template>
  <a-tabs size="small" type="line">
    <template v-for="(g, i) in grades" :key="g">
      <a-tab-pane v-for="(t, j) in terms" :key="`${i}-${j}`" :tab="`语文${g}年级${t}册`">
        <a
            :href="`https://lx-public.oss-cn-beijing.aliyuncs.com/www/lewen/pdf/${i>5 ? '初中' : '小学'}语文课本/语文${g}年级${t}册.pdf`"
            target="_blank"
        >教材</a>
      </a-tab-pane>
    </template>
  </a-tabs>
</template>

<style scoped>

</style>
