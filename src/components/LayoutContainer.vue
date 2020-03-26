<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <Sider :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <Header :collapsed="collapsed" @click="()=>{collapsed=!collapsed}" />

      <router-view />

      <a-layout-footer>footer</a-layout-footer>
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
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>