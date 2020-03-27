<template>
  <div class="container">
    <div class="logo-wrapper">
      <div class="logo"></div>
      <div class="title">通行证管理后台系统</div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input placeholder="用户名" v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock"></svg-icon>
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
        username: '',
        password: ''
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
            // if (data.Code == 1) {
            //Code肯定为1
            window.location = data.Data;
            // }
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
  padding-top: 160px;
  .logo-wrapper {
    margin: 0 auto;
    width: 420px;
    max-width: 100%;
    .logo {
      background: url('../../assets/logo.png') no-repeat;
      width: 100px;
      height: 100px;
      display: inline-block;
      vertical-align: middle;
    }
    .title{
      display: inline-block;
      font-size: 28px;
      vertical-align: middle;
      color: #fff;
      margin-right: 20px;
    }
  }
  .el-form {
    width: 420px;
    max-width: 100%;
    margin: 0 auto;
    margin-top:20px;
    // background: #000001;
    // padding: 30px;
    .el-form-item {
      margin-bottom: 22px;
      border: 1px solid rgba(180,188,200,0.5);
      border-radius: 5px;
      text-align: left;
      background: rgba(48,49,51,0.2);
      .svg-container {
        width: 24px;
        display: inline-block;
        height: 24px;
        padding: 0 4px 0 8px;
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
          background: rgba(48,49,51,0.2);
          color: #fff;
        }
        /deep/ i {
          color: #889aa4;
        }
      }
    }
    .el-button {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
