<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys.sync="openKeys"
    :selectedKeys="selectedKeys"
    :inlineCollapsed="collapsed"
    @click="changePage"
  >
    <template v-for="item in menuList">
      <a-menu-item v-if="!item.children" :key="item.name" :data-key="item.name">
        <a-icon :type="item.iconType" />
        <span>{{item.title}}</span>
      </a-menu-item>
      <a-sub-menu v-else :menu-info="item" :key="item.name" :data-key="item.name">
         <span slot="title"><a-icon :type="item.iconType" /><span>{{item.title}}</span></span>
        <a-menu-item v-for="sub_item in item.children" :key="sub_item.name">
          <a-icon :type="sub_item.iconType" />
          <span>{{sub_item.title}}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script>
export default {
  name: "Sider",
  props: {
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menuList: [],
      openKeys: [],
      selectedKeys: [],
      defaultOpenKeys: []
    };
  },
  mounted() {
    this.menuList = this.$store.state.menu;
    this.openKeys = [this.$route.name.split("-")[0]];
    this.selectedKeys = [this.$route.name];
  },
  methods: {
    changePage({ item, key, keyPath }) {
        this.openKeys = keyPath.length>1?[keyPath[1]]:[keyPath[0]];
      this.selectedKeys = [keyPath[0]];
      this.$router.push({ name: keyPath[0] });
    }
  }
};
</script>
<style>
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
</style>