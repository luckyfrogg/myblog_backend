import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import { fetchPost, fetchGet } from '@/plugin/axios/index';
import 'ant-design-vue/dist/antd.css';
Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;
Vue.config.productionTip = false;
Vue.use(Antd);
new Vue({
  router,
  store,
  created() {
    this.getSideMenu()
  },
  methods: {
    getSideMenu() {
      let menu = [
        {
          title: "文章管理",
          name: "article",
          iconType:"read",
          children: [
            {
              title: "文章列表",
              name: "article-list",
              iconType:"ordered-list",
            },
            {
              title: "创建文章",
              name: "article-create",
              iconType:"form",
            }
          ],
        },
        {
          title: "分类列表",
          name: "cate-list",
          iconType:"profile",
        },
        {
          title: "标签列表",
          name: "tag-list",
          iconType:"tags",
        },
      ]
      this.$store.dispatch('setMenu', menu)
    }
  },
  render: h => h(App)
}).$mount('#app')
