<template>
  <div class="add-para">
    <br />
    选择模型：
    <el-select
      v-model="select_model"
      placeholder="选择模型"
      @change="get_my_params()"
    >
      <el-option
        v-for="item in model_list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <br />
    <br />
    选择参数：
    <el-select
      v-model="select_params"
      placeholder="选择参数"
      @change="change_para()"
    >
      <el-option
        v-for="item in params_list"
        :key="item.value"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <br />
    <br />
    <div class="param-container">
      <el-input
        v-model="select_params.value"
        :rows="10"
        type="textarea"
        placeholder="参数"
      />
    </div>
    <br />
    <div class="button">
      <el-button @click="updatePara()" type="primary">更新参数</el-button>
      <el-button @click="deletePara()" type="danger">删除参数</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    model_list: [
      {
        value: "sift_matching",
        label: "图片匹配",
      },
      {
        value: "transform_to_painting",
        label: "图片手绘风格转换",
      },
      {
        value: "reconstruct",
        label: "超分辨率重建",
      },
      {
        value: "scanning",
        label: "文档扫描",
      },
    ],
    select_model: "",
    params_list: [],
    select_params: "",
  }),

  methods: {
    get_my_params() {
      this.params_list = [];
      this.select_params = "";
      const axios = require("axios");
      axios
        .get("/parameter/getbymodel?model=" + this.select_model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.params_list = data.data;
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
    deletePara() {
      const axios = require("axios");
      axios
        .delete("/parameter/delete", {data:{id: this.select_params.id }})
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.result = data;
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.analyse_loading = false;
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
   updatePara() {
      const axios = require("axios");
      axios
        .put("/parameter/update", {
          id: this.select_params.id,
          value: this.select_params.value,
          })
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.result = data;
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.analyse_loading = false;
          this.$alert("" + error, "请求失败", {
            confirmButtonText: "确定",
          });
        });
    },
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