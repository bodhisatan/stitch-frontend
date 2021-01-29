import Vue from 'vue'
import Router from 'vue-router'
import Stitch from '../components/Stitch'
import Analysis from '../components/Analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Stitch',
      component: Stitch
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    }
  ]
})
