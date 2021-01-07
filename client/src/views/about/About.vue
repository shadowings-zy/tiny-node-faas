<template>
  <div class="about">
    <iframe
      ref="iframe"
      class="about-iframe"
      src="http://www.shadowingszy.top"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  width: 100%;
  height: calc(100vh - 61px);
}
.about-iframe {
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 0;
}
</style>