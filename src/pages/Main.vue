<template>
  <el-row :gutter="20">
    <el-col :span="7"></el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h1>AI赋能通用图像文本处理网站</h1>
            <a href="https://github.com/We-Union/AI-lib-FE" target="_blank"
              >star我们的github仓库</a
            >
          </div>
        </template>
        <div>
          <li class="item">
            本项目的任务提出者：钱品亦，岑嘉诚，黄哲龙，李亚宁。
          </li>
          <li class="item">
            本项目的任务开发者：钱品亦，岑嘉诚，黄哲龙，李亚宁。
          </li>
          <li class="item">
            用户：具有对于文本和图像具有大量通用处理和增强的用户。
          </li>
          <li class="item">
            基本功能：用户完成各种提供的文本图像处理服务，并完成对自定义模型参数的增删筛查。
          </li>
          <li class="item">
            实现该软件的计算中心或计算机网络：南京航空航天大学计算中心。
          </li>
        </div>
      </el-card>
    </el-col>

    <el-col :span="7"></el-col>
  </el-row>

  <el-row :gutter="20" style="margin: 30px" justify="space-around">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="3">
      <el-card :body-style="{ padding: '0px' }" style="border-radius: 30px">
        <img
          src="https://s2.loli.net/2021/12/04/ZrfINDtOw167jUy.jpg"
          class="image"
        />
        <div style="padding: 14px">
          <span>Kirigaya</span>
          <div class="bottom">
            <p class="intro">研究领域：计算机视觉，计算机听觉，智能机器人</p>
            <br />
            <p>
              <a href="https://github.com/LSTM-Kirigaya" target="_blank"
                >个人主页</a
              >
            </p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="3">
      <el-card :body-style="{ padding: '0px' }" style="border-radius: 30px">
        <img src="https://s4.ax1x.com/2021/12/06/oyY0ED.jpg" class="image" />
        <div style="padding: 14px">
          <span>PeaceSheep</span>
          <div class="bottom">
            <p class="intro">研究领域：云计算、web后端</p>
            <br />
            <p>
              <a href="https://github.com/li1553770945" target="_blank"
                >个人主页</a
              >
            </p>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>

  <el-row :gutter="20" style="margin: 30px" justify="space-around">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="3">
      <el-card :body-style="{ padding: '0px' }" style="border-radius: 30px">
        <img src="https://s4.ax1x.com/2021/12/07/ogm0J0.png" class="image" />
        <div style="padding: 14px">
          <span>Ereshkigal</span>
          <div class="bottom">
            <p class="intro">研究领域：Langlands纲领</p>
            <br />
            <p>
              <a href="https://github.com/Temperance-XIV" target="_blank"
                >个人主页</a
              >
            </p>
          </div>
        </div>
      </el-card>
    </el-col>

     <el-col :span="3">
      <el-card :body-style="{ padding: '0px' }" style="border-radius: 30px">
        <img src="https://s4.ax1x.com/2021/12/08/o2tNQJ.jpg" class="image" />
        <div style="padding: 14px">
          <span>qianpinyi</span>
          <div class="bottom">
            <p class="intro">研究领域：编译原理、操作系统</p>
            <br />
            <p>
              <a href="https://github.com/qianpinyi" target="_blank"
                >个人主页</a
              >
            </p>
          </div>
        </div>
      </el-card>
    </el-col>


    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>


<style lang="css">
.box-fa {
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  float: left;
  line-height: 2;
}

.text {
  font-size: 14px;
}

.box-card {
  width: 720px;
  margin: 30px;
  border-radius: 30px;
}

.image {
  display: block;
  height: 240px;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.intro {
  line-height: 1.5;
  color: "#070707";
}
</style>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
