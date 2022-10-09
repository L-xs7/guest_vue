<template>
  <div
    ref="chartDom"
    class="chart-container"
    :style="{
      width: width,
      height: height,
    }"
  ></div>
</template>

<script>
import * as echarts from "echarts";

// import debounce from "lodash/debounce"; //防抖
import { addListener, removeListener } from "resize-detector"; //重新渲染
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    clickTarget:{ //绑定图表事件
      type:String,
      default:''
    }
  },
  watch: {
    option(val) {
      if (!!val) {
        this.chart.clear()
        this.chart.setOption(this.option);
      }
    },
  },
  created() {
    // this.resize = debounce(, 300);
    this.resize;
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // console.log('初始化echarts实例-renderChart',this.option)
      let _this = this
      if (!!this.option) {
        this.chart = echarts.init(this.$refs.chartDom, null, {
              devicePixelRatio: 2,
            });
           
        this.chart.setOption(this.option);
        if(this.clickTarget=="brushSelected"){//区域选择
          this.chart.on('brushSelected',_this.clickTarget, function (params) {
            // console.log(params)
              _this.$emit('clickEvent',params);
          })
          return
        }
        if(this.clickTarget){
          this.chart.on('click',_this.clickTarget, function (params) {
              _this.$emit('clickEvent',params.name);
          })
        }
        
      }
    },
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>