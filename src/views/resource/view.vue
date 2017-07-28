<template>
  <div>
    <Card shadow dis-hover style="float:left;width:60%;overflow:hidden;">
      <div ref="chart" style="height:400px"></div>
    </Card>
    <Card shadow dis-hover style="float:left;width:39%;margin-left:1%;">
      <Pie style="width:100%"></Pie>
    </Card>
  </div>
</template>
<script>
import echarts from 'echarts';
import Pie from '@/components/Pie';
// import { viewResource } from '@/api/resource/resource';

const colors = ['#c23531', '#2f4554', '#61a0a8'];

export default {
  name: 'ResourceView',
  components: {
    Pie
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          top: '18%',
          right: '14%'
        },
        toolbox: {
          left: 20,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['云盘资源', '内存资源', 'CPU资源']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8', '部门9', '部门10', '部门11', '部门12'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '云盘资源',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} GB'
            }
          },
          {
            type: 'value',
            name: '内存资源',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} GB'
            }
          },
          {
            type: 'value',
            name: 'CPU资源',
            min: 0,
            max: 100,
            position: 'right',
            offset: 60,
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '云盘资源',
            type: 'bar',
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '内存资源',
            type: 'bar',
            yAxisIndex: 1,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          },
          {
            name: 'CPU资源',
            type: 'line',
            yAxisIndex: 2,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
          }
        ]
      },
      seriesData: []
    };
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.chart);
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
<style lang="less">

</style>
