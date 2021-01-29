<template>
  <div id="app">
    <el-tabs @tab-click="handleClick">
      <el-tab-pane name="first" label="图像拼接" ></el-tab-pane>
      <el-tab-pane name="second" label="数据比较"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'first') {
        this.$router.push('/')
      } else {
        this.$router.push('/analysis')
      }
    }
  }
}
</script>

<style>
</style>
