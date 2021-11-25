<template>
  <div class="login-container">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">登录</h3>
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
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item>
        <router-link to="/register">新用户注册</router-link>
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
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit(event) {
      event;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          const axios = require("axios");
          axios
            .post("/user/login", {
              username: this.form.username,
              password: this.form.password,
            })
            .then((response) => {
              var data = response.data;
              if (data.code == 0) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push("/");
              } else {
                this.logining = false;
                this.$alert(data.msg, "登录失败", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              this.logining = false;
              this.$alert("" + error, "登陆失败", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
  created() {
      const axios = require("axios");
      axios
        .get("/user/me")
        .then((response) => {
          console.log(response);
          var data = response.data;
          if (data.code == 0) {
            this.$router.push("/");
          } 
        })
        .catch((error) => {
          console.log(error);
          this.logining = false;
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>