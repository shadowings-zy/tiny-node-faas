<template>
  <div class="item-header">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "ItemHeader",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.item-header {
  width: 200px;
  height: 49px;
  line-height: 49px;
  font-size: inherit;
  font-weight: bold;
  padding-left: 20px;
}
</style>