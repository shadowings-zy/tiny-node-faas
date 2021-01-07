<template>
  <div class="about">
    <iframe
      ref="iframe"
      class="about-iframe"
      src="http://www.shadowingszy.top"
    ></iframe>
    <div class="transparent-layer"></div>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    console.log("this.$refs.iframe: ", this.$refs.iframe.contentWindow);
    this.$refs.iframe.contentWindow.addEventListener("click", (e) => {
      console.log("click");
      e.stopPropagation();
    });
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: calc(100vh - 61px);
}
.transparent-layer {
  position: fixed;
  top: 61px;
  width: calc(100% - 100px);
  height: 100%;
  opacity: 0;
}
.about-iframe {
  width: 100%;
  height: 100%;
  overflow: scroll;
  border: 0;
}
</style>