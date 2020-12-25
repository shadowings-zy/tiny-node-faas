<template>
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
  <router-view />
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
