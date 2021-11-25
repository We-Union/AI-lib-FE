<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" mode="horizontal">
    <router-link to="/main">
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span>主页</span>
      </el-menu-item>
    </router-link>
    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        <span>视觉算法</span>
      </template>
      <el-menu-item index="1-1">人脸识别</el-menu-item>
      <el-menu-item index="1-2">目标识别</el-menu-item>
    </el-sub-menu>
    <router-link to="/about">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span>关于</span>
      </el-menu-item>
    </router-link>
  </el-menu>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


/* 取消router-link下划线 */
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}


</style>
