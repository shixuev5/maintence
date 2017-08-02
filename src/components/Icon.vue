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
      type: [Number, String]
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      styleObj: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        fill: this.color || 'currentColor'
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
