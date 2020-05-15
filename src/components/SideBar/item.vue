<template>
  <div class="submenu-wrapper">
    <!--submenu index必须为string型-->
    <el-submenu :index="item.Id.toString()">
      <template v-slot:title>
        <svg-icon :icon-class="iconClass" :class-name="className"></svg-icon>
        <span>{{item.Name}}</span>
      </template>
      <router-link v-for="subpath in subItem" :key="subpath.Id" :to="'/'+subpath.PageUrl">
        <el-menu-item :index="'/'+subpath.PageUrl">{{subpath.Name}}</el-menu-item>
      </router-link>
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
      subItem: [],
      iconObj: {
        '28': 'setting',
        '39': 'focus',
        '43': 'computer',
        '47': 'wrench',
        '52': 'lock',
        '57': 'pulse',
        '60': 'puzzle',
        '77': 'team',
        '86': 'eye',
        '88': 'data',
        '90': 'notebook',
        '94': 'layers',
        '114': 'option',
        '119': 'vip',
        '126': 'call',
      }
    };
  },
  created() {
    if (this.item.SubMenus) {
      this.subItem = this.item.SubMenus;
      // console.log(this.subItem);
    }
  },
  computed: {
    iconClass() {
      return this.iconObj[this.item.Id];
    },
    className() {
      return this.iconClass + '-class';
    }
  }
};
</script>
<style lang="less" scoped>
.submenu-wrapper {
  text-align: left;
  [class$='-class'] {
    width: 20px;
    height: 20px;
  }
}
</style>
