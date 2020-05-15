<template>
  <div class="userlist-wrapper">
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item class="form-item">
        <el-select v-model="formdata.type">
          <el-option v-for="item in typeList" :key="item.TypeValue" :label="item.TypeDescribe" :value="item.TypeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formdata.key" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="formdata.idc" label="B">周浦机房</el-radio>
        <el-radio v-model="formdata.idc" label="E">万国机房</el-radio>
      </el-form-item>
    </el-form>
    <el-container>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane>
          <span slot="label">
            <svg-icon icon-class="user" class-name="svg-class"></svg-icon>用户信息
          </span>
          <el-aside></el-aside>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <svg-icon icon-class="qq" class-name="svg-class"></svg-icon>三方信息
          </span>123用户管理
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <svg-icon icon-class="mobile" class-name="svg-class"></svg-icon>设备信息
          </span>123用户管理
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <svg-icon icon-class="operate" class-name="svg-class"></svg-icon>用户操作
          </span>角色管理
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <svg-icon icon-class="qq" class-name="svg-class"></svg-icon>系统日志
          </span>123用户管理
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>
<script>
import { GetSearchTypes, GetUserInfo } from '@/api/usermanage';
export default {
  data() {
    return {
      formdata: {
        type: '',
        key: '',
        idc: 'B'
      },
      typeList: []
    };
  },
  created() {
    GetSearchTypes().then(data => {
      //Code等于1才能进来
      this.typeList = data;
    });
  },
  methods: {
    onSubmit() {
      GetUserInfo({
        data: { type: this.formdata.type, key: this.formdata.key },
        header: { emaccount_idc: this.formdata.idc }
      }).then(data => {});
    },
    handleClick() {}
  }
};
</script>
<style lang="less" scoped>
.userlist-wrapper {
  text-align: left;
  .form-item {
    width: 120px;
  }
  .svg-class {
    width: 14px;
    height: 14px;
    vertical-align: middle;
    fill: #303133;
  }

  .is-active .svg-class {
    fill: #409eff;
  }
}
</style>
