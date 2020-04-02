<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" >
        博客管理系统
      </div>
      <Sider :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <Header :collapsed="collapsed" @click="()=>{collapsed=!collapsed}" />
        <main class="main">
          <router-view />
        </main>
      

      <a-layout-footer>
        <div id="footer">
          Copyright © 2019-2020 胡橙汁
          <a href="http://beian.miit.gov.cn/">皖ICP备19002031号</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Sider from "./Sider/Sider";
import Header from "./Header/Header";
export default {
  name: "Home",
  components: {
    Header,
    Sider
  },
  data() {
    return {
      collapsed: false,
      transitionName: "slide-left"
    };
  },
  methods: {}
  //   watch: {
  //   '$route' (to, from) {
  //     const toDepth = to.path.split('/').length
  //     const fromDepth = from.path.split('/').length
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // }
};
</script>
<style>
/* .ant-layout-sider {
  height: 100vh;
} */
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  color: #fff;
  background: transparent;
  text-align: center;
  margin: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.ant-layout.ant-layout-has-sider > .ant-layout{
  min-height: 100vh;
}
.ant-layout.ant-layout-has-sider > .ant-layout .main{
  flex: 1;
}
</style>