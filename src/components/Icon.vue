<template>
  <svg class="icon" :style="styleObj" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    size: {
      type: Number
    }
  },
  data() {
    return {
      styleObj: {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    };
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>
