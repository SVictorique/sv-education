<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" @click="goHome">
        <a-image src="/logo.svg" :preview="false"></a-image>
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
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="item in breadItem.items" :key="item">{{ item }}</a-breadcrumb-item>
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
      breadItem: useBreadItem(),
      selectedKeys: []
    }
  },
  methods: {
    select(item) {
      this.$router.push(item.key)
    },
    goHome() {
      this.selectedKeys = []
      this.$router.push('/')
    }
  },
  watch: {
    '$route.name'(){
      this.selectedKeys = [this.$route.name]
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
  overflow: auto;
}
.main-content{
  background: #fff;
  padding: 24px;
  height: calc(100% - 94px);
}
.logo{
  width: 56px;
  height: 56px;
  float: left;
  margin-top: -4px;
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
}
</style>
