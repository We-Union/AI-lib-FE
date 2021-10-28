<template>
  <el-row class="tac">
    <el-col :span="5">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span>主页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>视觉算法</span>
          </template>
          <el-menu-item index="1-1">人脸识别</el-menu-item>
          <el-menu-item index="1-2">目标识别</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="19">
      <hello-world></hello-world>
    </el-col>
  </el-row>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
