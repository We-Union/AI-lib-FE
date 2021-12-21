<template>
  <div class="main">
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
import Common from "./Common.vue"
export default {
  name: "Main",
  data() {
    return {
      models:Common.model_list,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
