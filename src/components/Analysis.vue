<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Analysis',
  data() {
    return {
      algorithm_xAxisList: [],
      algorithm_siftList: [],
      algorithm_orbList: [],
      algorithm_harrisList: [],
    }
  },
  methods: {
    myECharts() {
      let chartDom = document.getElementById('main');
      let myChart = this.$echarts.init(chartDom);
      let option;

      axios.get(this.$deploy_url + "get_algorithm_time_cost").then(response => {
        this.algorithm_harrisList = response.data.algorithm_harrisList
        this.algorithm_orbList = response.data.algorithm_orbList
        this.algorithm_siftList = response.data.algorithm_siftList
        this.algorithm_xAxisList = response.data.algorithm_xAxisList
        option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '特征提取耗时'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['SIFT', 'ORB', 'Harris']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              boundaryGap: false,
              data: this.algorithm_xAxisList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'SIFT',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(128, 255, 165)'
                }, {
                  offset: 1,
                  color: 'rgba(1, 191, 236)'
                }])
              },
              emphasis: {
                focus: 'series'
              },
              data: this.algorithm_siftList
            },
            {
              name: 'ORB',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 221, 255)'
                }, {
                  offset: 1,
                  color: 'rgba(77, 119, 255)'
                }])
              },
              emphasis: {
                focus: 'series'
              },
              data: this.algorithm_orbList
            },
            {
              name: 'Harris',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(55, 162, 255)'
                }, {
                  offset: 1,
                  color: 'rgba(116, 21, 219)'
                }])
              },
              emphasis: {
                focus: 'series'
              },
              data: this.algorithm_harrisList
            }
          ]
        };

        option && myChart.setOption(option);
      })



    },
  },

  mounted() {
    this.myECharts()
  }
}
</script>

<style scoped>

</style>
