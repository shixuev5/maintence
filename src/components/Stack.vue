<template>
  <div ref="stack" style="height:400px">
  </div>
</template>
<script>
import echarts from 'echarts';

export default {
  name: 'Stack',
  prop: {
    // options: {
    //   type: Object,
    //   required: true
    // },
    // seriesData: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['已用', '未用']
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '云盘资源',
            axisLabel: {
              formatter: '{value} GB'
            }
          }
        ],
        series: [{
          name: '未用',
          type: 'bar',
          stack: '云盘资源',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '已用',
          type: 'bar',
          stack: '云盘资源',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }]
      }
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
