<template>
  <div class="home">
    <div class="title">tiny-node-faas</div>
    <div class="sub-title">
      一款基于NodeJs的FaaS解决方案，用Serverless的方式编写JS代码。
    </div>
    <svg-icon name="computer" :width="500" :height="500" color="#409EFF" />
    <div class="button-group">
      <el-button type="primary" class="button">立即开始</el-button>
      <el-button  class="button">查看源码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: calc(100vh - 61px);
  text-align: center;
}
.title {
  font-size: 34px;
  padding: 30px 0 0 0;
  line-height: 48px;
  color: #555;
}
.sub-title {
  font-size: 18px;
  line-height: 28px;
  color: #888;
  padding: 30px 0 10px 0;
}
.button-group {
  padding: 20px;
}
.button {
  margin: 0 40px;
  width: 150px;
  height: 50px;
  font-size: 16px;
}
</style>
