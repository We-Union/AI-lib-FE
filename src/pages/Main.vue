<template>
  <div class="main">
    <div class="video-contianer">
      <center>
      <vue3VideoPlay
        v-bind="options"
        poster="https://iknow-pic.cdn.bcebos.com/6f061d950a7b0208701401e06ed9f2d3562cc8d5"
      />
      </center>
    </div>
    <br>
    <br>
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item
          v-for="model in models"
          :key="model.value"
          :title="model.label"
          :name="model.value"
        >
          <h3>算法简介</h3>
          <div>{{ model.desc }}</div>
          <h3>参数说明</h3>
          <br />
          <div>
            <el-table :data="model.params" stripe style="width: 100%">
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="range" label="范围" />
              <el-table-column prop="default" label="默认值" />
              <el-table-column prop="desc" label="备注" />
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Common from "./Common.vue";
export default {
  name: "Main",
  data() {
    return {
      models: Common.model_list,
      options:{
        width: "800px", //播放器高度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "http://110.40.176.151/media/welcome.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
      }
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-contianer {
  width: 100%;
  text-align: center;
}
</style>
