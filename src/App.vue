<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" @click="goHome">
        <a-image
            :src="`${baseUrl}/logo.svg`"
            :preview="false"
            :height="56"
            :width="56"
            style="margin-top: -16px"
        ></a-image>
        <span class="title">银小维 · Edu</span>
      </div>
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px', width: 'calc (100% - 56px)' }"
          @select="select"
      >
        <a-menu-item key="math">数学</a-menu-item>
        <a-menu-item key="english">英语</a-menu-item>
        <a-menu-item key="chinese">语文</a-menu-item>
        <a-menu-item key="history">历史</a-menu-item>
        <a-menu-item key="geography">地理</a-menu-item>
        <a-menu-item key="politics">政治</a-menu-item>
        <a-menu-item key="physical">物理</a-menu-item>
        <a-menu-item key="chemistry">化学</a-menu-item>
        <a-menu-item key="biology">生物</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="item in breadItem.items" :key="item" :href="item.href" @click="select({key: item.href})">
          {{ item.name ? item.name : item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="main-content">
        <RouterView />
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import {useBreadItem} from "./stores/breadItem";

export default {
  data() {
    return {
      baseUrl: import.meta.env.BASE_URL,
      breadItem: useBreadItem(),
      selectedKeys: []
    }
  },
  methods: {
    select(item) {
      console.log(item)
      this.$router.push(`/${item.key}`)
    },
    goHome() {
      this.selectedKeys = []
      this.$router.push('/')
    }
  },
  watch: {
    '$route.name'(){
      this.selectedKeys = [this.$route.name.split('-')[0]]
    }
  }
}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.layout .ant-layout-content {
  height: calc(100% - 64px);
}
.main-content{
  padding: 0 24px;
  height: calc(100% - 54px);
  overflow: auto;
}
.logo{
  width: 220px;
  height: 64px;
  float: left;
}
.logo .title {
  height: 100%;
  color: #fff;
  font-size: 24px;
  line-height: 64px;
  margin-left: 16px;
  display: inline-block;
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
}
</style>
