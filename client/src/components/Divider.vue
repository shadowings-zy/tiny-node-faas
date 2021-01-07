<template>
  <div class="divider" :style="{'background': color}"></div>
</template>

<script>
export default {
  name: "Divider",
  props: {
    color: String,
  },
};
</script>

<style scoped>
.divider{
  width: 100%;
  height: 1px;
}
</style>