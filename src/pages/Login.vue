<template>
  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>

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
          class="editline"
           @keyup.enter="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleSubmit"
        ></el-input>
      </el-form-item>
      <br>
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
      imgSrc: require("../assets/main.jpeg"),
      logining: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: ['blur', 'change'] },
          {
            pattern: "^[a-zA-Z0-9]{6,15}$",
            message: "用户名为6-15位，包含大小写字母、数字",
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ['blur', 'change'] },
          {
            pattern: "^[a-zA-Z0-9.@$!%*#_~?&^]{8,18}$",
            message: "密码为8-18位，包含大小写字母、数字、特殊字符（.@$!%*#_~?&）",
            trigger:['blur', 'change'],
          },
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
          this.$message({
            message: "请检查输入",
            type: "error",
          });
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
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}

.login-container {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
}

.login-page {
  -webkit-border-radius: 15px;
  border-radius: 30px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.editline {
  -webkit-border-radius: 15px;
  border-radius: 30px;
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>