<template>
  <div ref="pie" style="height:400px;width:400px">
  </div>
</template>
<script>
import echarts from 'echarts';

export default {
  name: 'Pie',
  data() {
    return {
      options: {
        title: {
          text: '云盘资源',
          left: 'center',
          top: 5
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '云盘资源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '已用', selected: true },
              { value: 1548, name: '剩余' }
            ]
          },
          {
            name: '云盘资源',
            type: 'pie',
            radius: ['40%', '55%'],
            data: [
              { value: 335, name: '部门1' },
              { value: 310, name: '部门2' },
              { value: 234, name: '部门3' },
              { value: 135, name: '部门4' },
              { value: 1048, name: '部门5' },
              { value: 251, name: '部门6' },
              { value: 147, name: '部门7' },
              { value: 102, name: '部门8' }
            ]
          }
        ]
      },
      seriesData: []
    };
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.pie);
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
