<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#364150"
        text-color="#b4bcc8"
        active-text-color="#409eef"
        mode="vertical"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
        <item v-for="path in menuList" :item="path" :key="path.Id"></item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Item from './item';
import { getMenu } from '@/api/user';
export default {
  data() {
    return {
      menuList: []
    };
  },
  created() {
    getMenu().then(data => {
      //Code等于1才能进来
      this.menuList = data.Data;
    });
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    }
  },
  methods: {},
  components: { Item }
};
</script>
<style lang="less" scoped>
.sidebar-container {
  width: 210px;
  background: rgb(54, 65, 80);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.el-scrollbar {
  //不设置高度将无法滚动
  height: 100%;
  /deep/.scrollbar-wrapper {
    overflow-x: hidden !important;
  }
}
</style>
