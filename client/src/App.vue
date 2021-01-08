<template>
  <div class="container">
    <div class="navigator">
      <div class="navigator-left">
        <svg-icon name="logo" :width="65" :height="65" color="#409EFF" />
        TINY-NODE-FAAS
      </div>
      <el-menu
        :default-active="$store.state.menuItemIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">函数编辑</el-menu-item>
        <el-menu-item index="2">函数列表</el-menu-item>
        <el-menu-item index="3">关于作者</el-menu-item>
      </el-menu>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { ROUTER_MAP } from "./router/constant";

export default {
  name: "App",
  methods: {
    handleSelect(key) {
      this.$store.commit("setMenuItemIndex", key);
      this.$router.push(ROUTER_MAP[key]);
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 100vw;
  min-height: 100vh;
}
.navigator {
  display: flex;
  flex-direction: row;
}
.navigator-left {
  width: 250px;
  font-size: 22px;
  line-height: 65px;
  height: 65px;
  color: #409EFF
}
</style>
