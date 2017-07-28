<template>
  <div ref="stack" style="height:400px">
  </div>
</template>
<script>
import echarts from 'echarts';

export default {
  name: 'Stack',
  prop: {
    options: {
      type: Object,
      required: true
    },
    seriesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.stack);
      this.chart.setOption(this.options);
    }
  },
  watch: {
    options: {
      handler(options) {
        this.chart.setOption(options);
      },
      deep: true
    },
    seriesData(val) {
      this.chart.setOption({ series: val });
    }
  },
  mounted() {
    this.initCharts();
  }
};
</script>
