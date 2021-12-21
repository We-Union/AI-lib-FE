<template>
  <div class="app">
    <el-menu default-active="1" class="el-menu" mode="horizontal">
      <router-link to="/main">
        <el-menu-item index="1">
          <i class="el-icon-house"></i>
          <span>主页</span>
        </el-menu-item>
      </router-link>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-camera"></i>
          <span>视觉算法</span>
        </template>
        <router-link to="/painting">
          <el-menu-item index="2-1">图片手绘风格转换</el-menu-item></router-link
        >
        <router-link to="/scanning">
          <el-menu-item index="2-2">文档扫描</el-menu-item></router-link
        >
        <router-link to="/reconstruct ">
          <el-menu-item index="2-3">高分辨率重建</el-menu-item></router-link
        >
        <router-link to="/siftmatching">
          <el-menu-item index="2-4">图片匹配</el-menu-item></router-link
        >
        <router-link to="/stitching">
          <el-menu-item index="2-5">图像拼接</el-menu-item></router-link
        >
        <router-link to="/detectface">
          <el-menu-item index="2-6">人脸检测</el-menu-item></router-link
        >
        <router-link to="/ocrprint">
          <el-menu-item index="2-7">打印体识别</el-menu-item></router-link
        >
        <router-link to="/ocrval">
          <el-menu-item index="2-8">验证码识别</el-menu-item></router-link
        >
        <router-link to="/equalizehist">
          <el-menu-item index="2-9">直方图均衡化</el-menu-item></router-link
        >
        <router-link to="/ostusplit">
          <el-menu-item index="2-10">大津阈值法</el-menu-item></router-link
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-document"></i>
          <span>自然语言处理</span>
        </template>
        <router-link to="/kanjicut">
          <el-menu-item index="3-1">中文分词</el-menu-item></router-link
        >
        <router-link to="/en2zh">
          <el-menu-item index="3-2">英文转中文</el-menu-item></router-link
        >
        <router-link to="/zh2en">
          <el-menu-item index="3-3">中文转英文</el-menu-item></router-link
        >
        <router-link to="/detectmood">
          <el-menu-item index="3-4">情绪检测</el-menu-item></router-link
        >
        <router-link to="/topicclassifier">
          <el-menu-item index="3-5">话题分类</el-menu-item></router-link>
      </el-sub-menu>

      <router-link to="/login">
        <el-menu-item index="4" v-if="!logined">
          <i class="el-icon-user"></i>
          <span>登录/注册</span>
        </el-menu-item>
      </router-link>
      <el-sub-menu index="4" v-if="logined">
        <template #title>
          <i class="el-icon-user"></i>
          <span>{{ user.nickname }}</span>
        </template>
        <el-menu-item index="4-1" @click="logout">登出</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5" v-if="logined">
        <template #title>
          <i class="el-icon-files"></i>
          <span>参数管理</span>
        </template>
        <router-link to="/mypara" v-if="this.user.type == 0">
          <el-menu-item index="5-1">我的参数</el-menu-item></router-link
        >
        <router-link to="/addpara" v-if="this.user.type == 0">
          <el-menu-item index="5-2">新建参数</el-menu-item></router-link
        >
        <router-link to="/defaultpara" v-if="this.user.type == 1">
          <el-menu-item index="5-1">默认参数管理</el-menu-item></router-link
        >
        <router-link to="/adddefault" v-if="this.user.type == 1">
          <el-menu-item index="5-2">新建默认参数</el-menu-item></router-link
        >
      </el-sub-menu>
      <router-link to="/about">
        <el-menu-item index="6">
          <i class="el-icon-location"></i>
          <span>关于</span>
        </el-menu-item>
      </router-link>
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
  width: 100%;
  height: 100vh;
}

#el-menu {
  width: 100%;
}
</style>
