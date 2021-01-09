<template>
  <div class="navigator">
    <div class="navigator-left">
      <svg-icon
        class="navigator-icon"
        name="logo"
        :width="36"
        :height="36"
        color="#409EFF"
      />
      <div class="navigator-text">TINY-NODE-FAAS</div>
    </div>
    <el-menu
      :default-active="$store.state.menuItemIndex"
      class="navigator-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="0">首页</el-menu-item>
      <el-menu-item index="1">说明文档</el-menu-item>
      <el-menu-item index="2">函数编辑</el-menu-item>
      <el-menu-item index="3">函数列表</el-menu-item>
      <el-menu-item index="4">关于作者</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ROUTER_MAP } from "../router/constant";

export default {
  name: "AppNav",
  methods: {
    handleSelect(key) {
      this.$store.commit("setMenuItemIndex", key);
      this.$router.push(ROUTER_MAP[key]);
    },
  },
};
</script>

<style scoped>
.navigator {
  display: flex;
  flex-direction: row;
}
.navigator-left {
  display: flex;
  flex-direction: row;
  width: 265px;
  height: 60px;
  flex-shrink: 0;
  border-bottom: solid 1px #e6e6e6;
}
.navigator-icon {
  padding: 12px 10px;
}
.navigator-text {
  font-size: 22px;
  line-height: 60px;
  height: 60px;
  color: #409eff;
}
.navigator-menu {
  width: 100%;
}
</style>
