<template>
  <Breadcrumb>
    <Breadcrumb-item v-for="level in levels" :key="level.name" :href="level.path">
      {{level.name}}
    </Breadcrumb-item>
  </Breadcrumb>
</template>
<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      levels: []
    };
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first.name === '首页' && first.path !== '/') {
        first.path = '/';
      } else if (first.name !== '首页') {
        matched.unshift({ name: '首页', path: '/' });
      }
      this.levels = matched;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>
