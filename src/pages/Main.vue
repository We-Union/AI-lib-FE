<template>
  <div class="main">
    <div class="collapse">
      <el-collapse accordion>
        <el-collapse-item title="图片手绘风格转换" name="sift_matching">
          <h3>算法简介</h3>
          <div>图片手绘风格转换使用了XXX方法，XXX....</div>
          <h3>参数说明</h3>
          <br />
          <div>
            <el-table :data="sift_matching" stripe style="width: 100%">
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
      sift_matching: [
        {
          name: "feature",
          type: "string",
          range: '"akaze", "kaze", "mser", "orb", "sift"',
          default: '"sift"',
          desc: "关键点特征",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
