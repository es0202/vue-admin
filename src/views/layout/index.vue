<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="content">
      <breadcrumb></breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb';
import Sidebar from '@/components/SideBar';
export default {
  components: {
    Sidebar,
    Breadcrumb
  }
};
</script>
<style lang="less" scoped>
.layout {
  min-height: 100%;
  height: 100%;
}
.content{
  padding-left: 220px;
}
</style>
