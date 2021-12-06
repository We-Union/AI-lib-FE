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
      <el-form-item prop="nickname">
        <el-input
          type="text"
          v-model="form.nickname"
          auto-complete="off"
          placeholder="姓名"
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
          :loading="registering"
          >注册</el-button
        >
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有帐号？转到登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registering: false,
      form: {
        username: "",
        password: "",
        nickname: "",
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
          this.registering = true;
          const axios = require("axios");
          axios
            .post("/user/register", {
              username: this.form.username,
              password: this.form.password,
              nickname: this.form.nickname,
            })
            .then((response) => {
              var data = response.data;
              if (data.code == 0) {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                this.registering = false;
                this.$alert(data.msg, "注册失败", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              this.registering = false;
              this.$alert("" + error, "注册失败", {
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
        var data = response.data;
        if (data.code == 0) {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        this.registering = false;
        this.$alert("" + error, "请求失败", {
          confirmButtonText: "确定",
        });
      });
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
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>