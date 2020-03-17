<template>
  <div class="container">
    <div class="logo"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left" name="EMSYSMANAGE">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input placeholder="用户名" v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="pwd"></svg-icon>
        </span>
        <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <!--.prevent修饰符 提交事件不再重载页面-->
      <el-button type="primary" @click.native.prevent="loginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon';
import { validateUsername, validatePassword } from '@/utils/validate.js';
// import Cookies from 'js-cookie';
export default {
  data() {
    const checkUsername = (rule, value, callback) => {
      //失焦触发
      validateUsername(value) ? callback() : callback(new Error('请输入正确的用户名'));
    };
    const checkPassword = (rule, value, callback) => {
      //自定义校验 callback必须被调用
      validatePassword(value) ? callback() : callback(new Error('密码不能小于六位'));
    };
    return {
      //登录表单model，默认值
      loginForm: {
        username: '171431',
        password: '256917es'
      },
      //登录表单校验规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: checkUsername }],
        password: [{ required: true, trigger: 'blur', validator: checkPassword }]
      }
    };
  },
  methods: {
    loginSubmit() {
      //this.loginForm为data中的model,无validate方法
      //必传callback 否则为promise
      //param: boolean,object (是否校验成功,未通过校验的字段)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(data => {
            if (data.Code == 1) {
              window.location = data.Data;
            }
          });
        } else {
          console.log('loginForm submit error!');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  background-color: #2d3a4b;
  width: 100%;
  min-height: 100%;
  padding-top: 100px;
  .logo {
    background: url('../../assets/logo.png') no-repeat;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  .el-form {
    width: 360px;
    max-width: 100%;
    margin: 0 auto;
    background: #eceef1;
    padding: 30px;
    .el-form-item {
      margin-bottom: 22px;
      border: 1px solid #dde3ec;
      text-align: left;
      background: #dde3ec;
      .svg-container {
        width: 30px;
        display: inline-block;
        height: 30px;
        padding: 6px 4px 6px 8px;
        vertical-align: middle;
      }
      .el-input {
        display: inline-block;
        height: 42px;
        width: 85%;
        vertical-align: middle;
        //scoped 需要deep才能影响组件内样式
        /deep/ input {
          width: 100%;
          border: none;
          height: 42px;
          padding: 10px;
          box-sizing: border-box;
          font-size: 18px;
          outline: none;
          background: #dde3ec;
        }
        /deep/ i {
          color: #889aa4;
        }
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
