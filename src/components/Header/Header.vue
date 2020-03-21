<template>
    <a-layout-header style="background: #fff; padding: 0;display:flex;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=>{$emit('click')}"
        />
      </a-layout-header>
</template>

<script>

export default {
    name:"Header",
    props: {
        collapsed:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
