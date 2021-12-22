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
        :key="item.id"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <br />
    <br />
    <div class="json-editor">
      <el-input
        v-model="current_params.value"
        :rows="10"
        type="textarea"
        placeholder="选择参数"
      />
    </div>
  </div>
  <br />
  <br />
  <div>
    <el-button type="primary" @click="analyse" :loading="analyse_loading"
      >分析</el-button
    >
  </div>
  <br />
 <div class="result-container">
    <el-image :src="result.output_img_url" style="width: 50%">
      <template #error>
        <el-icon :size="200">
          <i class="el-icon-picture" />
        </el-icon>
      </template>
    </el-image>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    current_params: "",
    params_list: Array(),
    model: "generate_wordcloud",
    file_num: 1,
    text: "",
    result:Object(),
    analyse_loading: false,
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
      this.analyse_loading = true;
      const axios = require("axios");
      axios
        .post("/analyse", {
          model: this.model,
          parameter: this.current_params.value,
          data: this.text,
        })
        .then((response) => {
          var data = response.data;
          this.analyse_loading = false;
          if (data.code == 0) {
            this.result = data;
            this.analyse_loading = false;
            this.$message({
              message: "分析成功",
              type: "success",
            });
          } else {
            this.analyse_loading = false;
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