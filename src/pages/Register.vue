<template>
  <div class="register-container">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm register-page"
    >
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="form.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          type="password"
          v-model="form.repassword"
          auto-complete="off"
          placeholder="重复密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >注册</el-button
        >
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有账号？转去登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        username: "",
        password: "",
        repassword: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请重复您的密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit(event) {
      event;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          if (
            this.form.username === "admin" &&
            this.form.password === "123456"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.ruleForm2.username);
            this.$router.push({ path: "/" });
          } else {
            this.logining = false;
            this.$alert("用户名或密码错误", "提示", {
              confirmButtonText: "确定",
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100%;
}
.register-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>