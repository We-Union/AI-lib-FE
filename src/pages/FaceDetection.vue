<template>
  选择参数：
  <el-select v-model="current_params" placeholder="选择参数">
    <el-option
      v-for="item in params_list"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    >
    </el-option>
  </el-select>
  <el-button type="primary" @click="useDefault">使用默认参数</el-button>
  <br />
  <el-input
    v-model="current_params"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
  <div class="json-editor">
    <div class="json-editor-button">
      <br />
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="warning" @click="delete_params">删除</el-button>
    </div>
  </div>
  <div>
    <el-button type="primary" @click="analyse">分析</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    current_params: Object(),
    default_params: Object(),
    params_list: Array(),
    model:"face_detection",
  }),

  methods: {
    save() {},
    reset() {},
    get_my_params() {
      const axios = require("axios");
      axios
        .get("/parameter/getbymodel?model="+this.model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.params_list = data.data;
            //   console.log(this.params_list);
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
    get_default_params() {
      const axios = require("axios");
      axios
        .get("/parameter/default?model="+this.model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.default_params = data.data;
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
    delete_params() {},
    analyse() {
      const axios = require("axios");
      axios
        .post("/analyse", {
            model: this.model,
          parameter: this.current_params,
        })
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: data.msg,
              type: "success",
            });
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
    useDefault() {
      this.current_params = this.default_params;
    },
  },
  created() {
    this.get_default_params();
    this.get_my_params();
  },
};
</script>

<style scoped>
.json-editor {
  width: 100%;
  height: 30%;
  text-align: center;
}
</style>