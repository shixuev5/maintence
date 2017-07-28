<template>
  <Tabs @on-click="tabClick">
    <Tab-pane label="云盘资源" icon="social-apple">
      <Card shadow dis-hover>
        <Row>
          <Col span="14">
          <Stack options="options"></Stack>
          </Col>
          <Col span="10">
          <Slider v-model="value" show-input></Slider>
          </Col>
        </Row>
      </Card>
    </Tab-pane>
    <Tab-pane label="内存资源" icon="social-windows">
      <keep-alive>
        <Card shadow dis-hover>
          <Row>
            <Col span="14">
            <Stack options="options"></Stack>
            </Col>
            <Col span="10">
            <Slider v-model="value" show-input></Slider>
            </Col>
          </Row>
        </Card>
      </keep-alive>
    </Tab-pane>
    <Tab-pane label="CPU资源" icon="social-tux">
      <keep-alive>
        <Card shadow dis-hover>
          <Row>
            <Col span="14">
            <Stack options="options"></Stack>
            </Col>
            <Col span="10">
            <Slider v-model="value" show-input></Slider>
            </Col>
          </Row>
        </Card>
      </keep-alive>
    </Tab-pane>
  </Tabs>
</template>
<script>
import Stack from '@/components/Stack';
import { viewResource } from '@/api/resource/resource';

export default {
  name: 'ResourceAllocat',
  components: {
    Stack
  },
  data() {
    return {
      value: 10,
      tabName: '',
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
    tabClick(name) {
      this.tabName = name;
    },
    fetchResourceInfo() {
      viewResource().then((response) => {
        response.data.forEach(function _(val) {
          this.options.series[0].data.push(val.clouddisk - val.usedclouddisk);
          this.options.series[1].data.push(val.usedclouddisk);
          // this.ramData[0].data.push(val.ram - val.usedram);
          // this.ramData[1].data.push(val.usedram);
          // this.cpuData[0].data.push(val.cpu - val.usedcpu);
          // this.cpuData[1].data.push(val.usedcpu);
          this.options.xAxis[0].data.push(val.name);
        });
      });
    }
  },
  created() {
    this.fetchResourceInfo();
  }
};
</script>
<style lang="less">

</style>
