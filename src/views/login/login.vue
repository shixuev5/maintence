<template>
  <div id="login">
    <div class="form">
      <Form ref="form" :model="form" :rules="rule" :label-width="80" @keydown.enter.native="handleLogin('form')">
        <Form-item prop="name">
          <Input type="text" v-model="form.name" size="large" placeholder="请输入用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="form.password" size="large" placeholder="请输入密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" long @click="handleLogin('form')">登录</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      rule: {
        name: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$store.dispatch('loginByName', this.form).then(() => {
            this.$store.dispatch('generateRoutes');
            this.$router.push('/');
          });
        } else {
          this.$Message.error('表单验证失败，请重试！');
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#login {
    height: 100vh;
    width: 100vw;
    background: url('/static/img/login_bg.jpg') no-repeat;

    .form {
        position: absolute;
        top: 200px;
        right:160px;
        height: 520px;
        width: 550px;
        background: url('/static/img/login.png') no-repeat;
    }
    .ivu-form {
        margin:240px 60px 0 120px;
    }
}
</style>

