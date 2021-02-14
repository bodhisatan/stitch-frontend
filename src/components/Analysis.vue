<template>
  <div>
    <div style="display: flex">
      <div id="algorithm_time_cost" style="width: 600px;height:400px;float: left"></div>
      <div id="total_time_cost" style="width: 600px;height:400px;float: left"></div>
    </div>
    <div style="display: flex; margin-left: 50px;">
      <el-select v-model="value" placeholder="请选择图片" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 50px;" @click="submit">查询</el-button>
    </div>
    <div id="data_compare" style="display: flex; margin-left: 50px;margin-top: 50px;width: 1200px;height:400px;">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Analysis',
  data () {
    return {
      algorithm_xAxisList: [],
      algorithm_siftList: [],
      algorithm_orbList: [],
      algorithm_harrisList: [],
      total_xAxisList: [],
      total_siftList: [],
      total_orbList: [],
      total_harrisList: [],

      options: [],
      value: ''
    }
  },
  methods: {
    algorithmTimeECharts () {
      let chartDom = document.getElementById('algorithm_time_cost')
      let myChart = this.$echarts.init(chartDom)
      let option

      axios.get(this.$deploy_url + 'get_algorithm_time_cost').then(response => {
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
        }

        option && myChart.setOption(option)
      })

    },

    totalTimeECharts () {
      let chartDom = document.getElementById('total_time_cost')
      let myChart = this.$echarts.init(chartDom)
      let option

      axios.get(this.$deploy_url + 'get_total_time_cost').then(response => {
        this.total_harrisList = response.data.total_harrisList
        this.total_orbList = response.data.total_orbList
        this.total_siftList = response.data.total_siftList
        this.total_xAxisList = response.data.total_xAxisList
        option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '运算总耗时'
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
              data: this.total_xAxisList
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
              data: this.total_siftList
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
              data: this.total_orbList
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
              data: this.total_harrisList
            }
          ]
        }

        option && myChart.setOption(option)
      })

    },

    getPictureNames () {
      axios.get(this.$deploy_url + 'get_picture_names').then(response => {
        let name_list = response.data.name_list
        for (var i = 0; i < name_list.length; i++) {
          let name_ = name_list[i]
          this.options.push({value: name_, label: name_})
        }
      })
    },

    submit () {
      axios.post(this.$deploy_url + 'get_compare_data', {'pic_name': this.value}).then(response => {
        let datas = response.data.compare_data
        var myChart = this.$echarts.init(document.getElementById('data_compare'))
        var x = []//对应x坐标轴
        var legenddata = []
        var seriesdata = null //series数组中的单个元素
        var seriesdatas = []//series数组
        var sum = 0
        var groups = datas[0].algorithmdata
        //初始化legenddata
        for (let i in groups) {
          legenddata.push(groups[i].algorithmname)
        }
        //初始化x轴
        for (let i in datas) {
          x.push(datas[i].category)
        }
        //
        for (let i in legenddata) {
          var tmparr = []
          seriesdata = null
          for (let j in x) {
            //以legend长度为基础，将数据写入临时数组
            tmparr.push(datas[j].algorithmdata[i]._data)
          }
          //避免数据为0时不显示，将最小高度设置为5
          seriesdata = {name: legenddata[i], type: 'bar', data: tmparr, barMinHeight: 5}
          seriesdatas.push(seriesdata)
        }

        var option1 = {
          title: {
            text: "对比看板"
          },
          tooltip: {},
          legend: {
            data: legenddata
          },
          xAxis: {
            data: x
          },
          yAxis: {},
          series: seriesdatas

        }

        // 使用指定的配置项和数据显示图表。
        myChart.setOption(option1)
        //解决隐藏DIV显示之后图片宽高不对的问题
        myChart.resize()
      })
    }
  },

  mounted () {
    this.getPictureNames()
    this.algorithmTimeECharts()
    this.totalTimeECharts()
  }
}
</script>

<style scoped>

</style>
