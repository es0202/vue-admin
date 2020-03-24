<template>
  <div class="submenu-wrapper">
    <!--submenu index必须为string型-->
    <el-submenu :index="item.Id.toString()">
       <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>{{item.Name}}</span>
        </template>
      <el-menu-item v-for="subpath in subItem" :key="subpath.Id" :index="subpath.Id.toString()">{{subpath.Name}}</el-menu-item>
    </el-submenu>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      subItem: []
    };
  },
  created() {
    if (this.item.SubMenus) {
      this.subItem = this.item.SubMenus
      console.log(this.subItem);
    }
  }
};
</script>
<style lang="less" scoped>
.submenu-wrapper{
  text-align: left;
}
</style>
