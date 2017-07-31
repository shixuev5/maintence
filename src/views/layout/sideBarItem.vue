<template>
  <div>
    <Tooltip v-if="!menuIsOpen" :content="route.name" placement="right">
       <SvgIcon :iconClass="route.icon" :size="iconSize"></SvgIcon> 
    </Tooltip>
     <SvgIcon v-else :iconClass="route.icon" :size="iconSize"></SvgIcon>     
    <span class="route-name">{{route.name}}</span>
  </div>
</template>
<script>
import SvgIcon from '@/components/Icon';

export default {
  name: 'SideBarItem',
  components: {
    SvgIcon
  },
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
