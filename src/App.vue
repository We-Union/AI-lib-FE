<template>
  <div class="app">
    <el-menu default-active="1" class="el-menu" mode="horizontal">
      <router-link to="/main">
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span>主页</span>
        </el-menu-item>
      </router-link>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-camera"></i>
          <span>视觉算法</span>
        </template>
        <router-link to="/facedetection">
          <el-menu-item index="2-1">人脸识别</el-menu-item></router-link
        >
      </el-sub-menu>
          <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-document"></i>
          <span>自然语言处理</span>
        </template>
        <router-link to="/facedetection">
          <el-menu-item index="3-1">人脸识别</el-menu-item></router-link
        >
      </el-sub-menu>
      <router-link to="/about">
        <el-menu-item index="4">
          <i class="el-icon-location"></i>
          <span>关于</span>
        </el-menu-item>
      </router-link>
      <router-link to="/login">
        <el-menu-item index="5" v-if="!logined">
          <i class="el-icon-user"></i>
          <span>登录/注册</span>
        </el-menu-item>
      </router-link>
      <el-sub-menu index="4" v-if="logined" style="margin-right:5%">
        <template #title>
          <i class="el-icon-user"></i>
          <span>{{ user.nickname }}</span>
        </template>
        <el-menu-item index="4-1" @click="logout">登出</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="main-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      logined: false,
      user: Object,
    };
  },
  methods: {
    checkLogin() {
      const axios = require("axios");
      axios
        .get("/user/me")
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.logined = true;
            this.user = data.data;
          } else {
            this.logined = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
    logout() {
      const axios = require("axios");
      axios
        .get("/user/logout")
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: "登出成功",
              type: "success",
            });
            this.checkLogin();
          } else {
            this.$message({
              message: "登出失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
  },
  created() {
    this.checkLogin();
  },
  watch: {
    $route(to, from) {
      from;
      if (to.fullPath == "/main") {
        this.checkLogin();
      }
    },
  },
};
</script>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  min-height: 100vh;
}

/* 取消router-link下划线 */
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}

.main-view {
  width:100%;
  height:100vh;
}

#el-menu {
  width: 100%;
}
#login-button {
  padding-right: 20px;
}
</style>
