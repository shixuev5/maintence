<template>
  <div>
    <Tooltip v-if="!menuIsOpen" :content="route.name" placement="right">
      <Icon :type="route.icon" :size="iconSize"></Icon>
    </Tooltip>
    <Icon v-else :type="route.icon" :size="iconSize"></Icon>
    <span class="route-name">{{route.name}}</span>
  </div>
</template>
<script>
export default {
  name: 'SideBarItem',
  props: {
    iconSize: {
      type: Number,
      require: true
    },
    menuIsOpen: {
      type: Boolean,
      require: true
    },
    route: {
      type: Object,
      require: true
    }
  }
};
</script>
