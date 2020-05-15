<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{text[0].meta.title}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{text[1].meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <el-button type="primary">
        {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: this.$store.getters.username
    };
  },
  computed: {
    text() {
      return this.$route.matched.filter(item => item.meta && item.meta.title);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(data => {
        location.href = '/';
      });
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb-wrap {
  display: flex;
  align-items: center;
  /deep/ .el-breadcrumb {
    height: 56px;
    line-height: 56px;
    flex: 1;
  }
  /deep/ .el-dropdown {
    margin-right: 20px;
  }
}
</style>
