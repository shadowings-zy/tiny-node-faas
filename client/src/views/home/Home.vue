<template>
  <div class="home">
    <h1 class="title">tiny-node-faas</h1>
    <p class="sub-title">
      一款开源的、基于NodeJs的FaaS解决方案，用Serverless的方式编写JS代码。
    </p>
    <svg-icon name="computer" :width="400" :height="400" color="#409EFF" />
    <div class="button-group">
      <el-button type="primary" class="button" @click="quickStart">立即开始</el-button>
      <el-button  class="button" @click="github">查看源码</el-button>
    </div>
  </div>
</template>

<script>
import { ROUTER_MAP } from "../../router/constant";

export default {
  name: "Home",
  methods: {
    quickStart() {
      this.$router.push(ROUTER_MAP[1]);
    },
    github() {
      window.open('https://github.com/shadowings-zy/tiny-node-faas')
    }
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  text-align: center;
}
.title {
  font-size: 34px;
  line-height: 48px;
  color: #555;
}
.sub-title {
  font-size: 18px;
  line-height: 28px;
  color: #888;
}
.button-group {
  padding: 20px 0 50px 0;
}
.button {
  margin: 0 40px;
  width: 150px;
  height: 50px;
  font-size: 16px;
}
</style>
