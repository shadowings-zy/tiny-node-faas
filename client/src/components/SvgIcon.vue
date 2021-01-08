<template>
  <svg
    :style="{
      width: width + 'px',
      height: height + 'px',
      color: color,
    }"
    @mousedown="clickIcon"
  >
    <use :xlink:href="`#icon-${name}`" :fill="color" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: String,
    width: Number,
    height: Number,
    color: String,
  },
};
</script>