<template>
      <a-menu theme="dark" 
      mode="inline"
      :defaultOpenKeys="defaultOpenKeys"
       :defaultSelectedKeys="selectedKeys"
      :openKeys.sync="openKeys" 
      :selectedKeys="openKeys" 
      :inlineCollapsed="collapsed" 
      @click="changePage">
        <a-sub-menu :data-key="item.name" :key="item.name" v-for="item in menuList" :title="item.meta.title">
            <a-menu-item v-for="sub_item in item.children" :key="sub_item.name" >
              {{sub_item.meta.title}}
            </a-menu-item>
        </a-sub-menu>
      </a-menu>
</template>
<script>

  export default {
    name:'Sider',
    props:{
      collapsed:{
            type:Boolean,
            default:true
        }
    },
    data() {
      return {
        
        menuList:[],
        openKeys:[],
        selectedKeys:[],
        defaultOpenKeys:[],
      };
    },
    created(){
      console.log(this.$route)
      this.menuList=this.$store.state.menu
      this.openKeys=[this.$route.name]
      this.selectedKeys=[this.$route.name]
      this.defaultOpenKeys=[this.$route.name]
    },
    methods:{
      changePage({ item, key, keyPath }){
        console.log("name:",{ item, key, keyPath })
        this.$nextTick(()=>{
this.openKeys=[keyPath[1]]
        this.selectedKeys=[keyPath[0]]
        this.defaultOpenKeys=[keyPath[1]]
        })
        
        this.$router.push({name:keyPath[0]})
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