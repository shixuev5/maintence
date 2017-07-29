<template>
  <Tabs @on-click="tabClick">
    <Tab-pane label="云盘资源" icon="social-apple">
      <Card shadow dis-hover>
        <Row>
          <Col span="14">
          <Stack></Stack>
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
            <Stack></Stack>
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
            <Stack></Stack>
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
// import { viewResource } from '@/api/resource/resource';

export default {
  name: 'ResourceAllocat',
  components: {
    Stack
  },
  data() {
    return {
      value: 10,
      tabName: ''
    };
  },
  methods: {
    tabClick(name) {
      this.tabName = name;
    }
    // fetchResourceInfo() {
    //   viewResource().then((response) => {
    //     response.data.forEach(function _(val) {
    //       this.options.series[0].data.push(val.clouddisk - val.usedclouddisk);
    //       this.options.series[1].data.push(val.usedclouddisk);
    //       // this.ramData[0].data.push(val.ram - val.usedram);
    //       // this.ramData[1].data.push(val.usedram);
    //       // this.cpuData[0].data.push(val.cpu - val.usedcpu);
    //       // this.cpuData[1].data.push(val.usedcpu);
    //       this.options.xAxis[0].data.push(val.name);
    //     });
    //   });
    // }
  }
  // created() {
  //   this.fetchResourceInfo();
  // }
};
</script>
<style lang="less">

</style>
