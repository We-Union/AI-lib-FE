<template>
  <div class="main">
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item
          v-for="model in models"
          :key="model.name"
          :title="model.title"
          :name="model.name"
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
export default {
  name: "Main",
  data() {
    return {
      models: [
        {
          name: "sift_matching",
          title: "图片匹配",
          desc: "图片匹配使用了sift特征...",
          params: [
            {
              name: "feature",
              type: "string",
              range: '"akaze", "kaze", "mser", "orb", "sift"',
              default: '"sift"',
              desc: "关键点特征",
            },
            {
              name: "feature",
              type: "string",
              range: '"akaze", "kaze", "mser", "orb", "sift"',
              default: '"sift"',
              desc: "关键点特征",
            },
          ],
        },
        {
          name: "scanning",
          title: "文档扫描",
          desc: "文档扫描用于...",
          params: [
            {
              name: "height",
              type: "height",
              range: '>0',
              default: '500',
              desc: "输出图片大小",
            },
          ],
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
