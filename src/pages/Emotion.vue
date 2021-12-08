<template>
  <br />
  <div class="text-container"></div>
  <br />
  <el-input
    v-model="text"
    :rows="10"
    type="textarea"
    placeholder="请输入文本"
  />
  <br />
  <br />
  <div class="parameter-select">
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
    <br />
    <br />
    <div class="json-editor">
      <el-input
        v-model="current_params"
        :rows="10"
        type="textarea"
        placeholder="Please input"
      />
      <div class="json-editor-button">
        <br />
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
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
    params_list: Array(),
    model: "face_detection",
    file_num: 1,
    text: "",
  }),

  methods: {
    save() {},
    get_my_params() {
      const axios = require("axios");
      axios
        .get("/parameter/getbymodel?model=" + this.model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            for (var i = 0; i < data.data.length; i++) {
              console.log(data.data[i]);
              this.params_list.push(data.data[i]);
            }
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
        .get("/parameter/default?model=" + this.model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.params_list.push(data.data);
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
          data: this.text,
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