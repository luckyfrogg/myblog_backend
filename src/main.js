import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { frameInRoutes } from '@/router/routes'
import store from './store'
import Antd from 'ant-design-vue';
import {fetchPost,fetchGet} from '@/plugin/axios/index';
import 'ant-design-vue/dist/antd.css';
Vue.prototype.$get=fetchGet;
Vue.prototype.$post=fetchPost;
Vue.config.productionTip = false;
Vue.use(Antd);
new Vue({
  router,
  store,
  created(){
    this.getAllTagFromRoutes()
  },
  methods: {
    getAllTagFromRoutes () {
      // 所有加载在主框架内的页面
      // const tagPool = []
      // console.log(frameInRoutes[0].children);
      // const push = function (routes) {
      //   console.log("111:",routes)
      //   routes.forEach(route => {
      //     // console.log(route)

      //     // if (route.children) {
      //     //   push(route.children)
      //     // } else {
      //     //   const { meta, name, path } = route
      //     //   tagPool.push({ meta, name, path })
      //     // }
      //   })
      // }
      // push(frameInRoutes)
      this.$store.dispatch('setMenu', frameInRoutes[0].children)
    }
  },
  render: h => h(App)
}).$mount('#app')
