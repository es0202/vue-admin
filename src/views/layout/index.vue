<template>
  <div class="layout">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from '@/components/SideBar';
export default {
  components: {
    Sidebar
  }
};
</script>
<style lang="less" scoped>
.layout{
  min-height: 100%;
  height: 100%;
}
</style>
