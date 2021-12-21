<template>
  <br />
  选择并上传图片文件：
  <br />
  <br />
  <div class="image-upload">
    上传图片1：

    <el-upload
      ref="upload1"
      class="upload"
      method="POST"
      action="/api/image/upload"
      :auto-upload="true"
      :limit="1"
      :thumbnail-mode="true"
      :on-success="handleSuccess1"
      :on-error="handleError"
      name="file"
    >
      <el-button size="small" type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png文件，不超过2M</div>
      </template>
    </el-upload>
     <br />
    上传图片2：
    <el-upload
      ref="upload2"
      class="upload"
      method="POST"
      action="/api/image/upload"
      :auto-upload="true"
      :limit="1"
      :thumbnail-mode="true"
      :on-success="handleSuccess2"
      :on-error="handleError"
      name="file"
    >
      <el-button size="small" type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png文件，不超过2M</div>
      </template>
    </el-upload>
    <br />
  </div>
  <br />
  <div class="image-container">
    <el-image v-for="src in img_src" :key="src" :src="src" style="width: 50%">
      <template #error>
        <div class="image-slot">
          <el-icon :size="200">
            <i class="el-icon-picture" />
          </el-icon>
        </div>
      </template>
    </el-image>
  </div>
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
  <div>
    <el-button type="primary" @click="analyse" :loading="analyse_loading"
      >分析</el-button
    >
  </div>

  <br />
  <div class="result-container">
    <el-image :src="result.output_img_url" style="width: 80%">
      <template #error>
        <div class="image-slot">
          <el-icon :size="200">
            <i class="el-icon-picture" />
          </el-icon>
        </div>
      </template>
    </el-image>
  </div>
  <el-input
    v-model="result.output_text"
    :rows="10"
    type="textarea"
    placeholder="result"
  />
</template>

<script>
export default {
  components: {},
  data: () => ({
    current_params: "",
    params_list: Array(),
    model: "stitching",
    file_num: 2,
    img_src: Array(),
    result: Object(),
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
              this.params_list.push(data.data[i]);
            }
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
      if (this.img_src.length != this.file_num) {
        this.$message({
          message: "请上传" + this.file_num + "张图片",
          type: "error",
        });
        return;
      }
      this.$message({
        message: "正在分析，该项操作可能需要一定时间，请耐心等待",
        type: "success",
      });
      this.analyse_loading = true;
      const axios = require("axios");
      axios
        .post("/analyse/", {
          model: this.model,
          parameter: this.current_params.value,
          data: this.img_src.toString(),
        })
        .then((response) => {
          this.analyse_loading = false;
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: "分析成功",
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
    handleSuccess1(response, file, fileList) {
      var data = response;
      if (data.code == 0) {
        this.img_src[0] =
          "http://" +
          window.location.host +
          "/api/image/download?file=" +
          response.data;
        this.$message({
          message: "上传成功",
          type: "success",
        });
      } else {
        this.$message({
          message: data.msg,
          type: "error",
        });
      }

      response;
      console.log("upload success");
      console.log(file);
      console.log(fileList);
    },
    handleSuccess2(response, file, fileList) {
      var data = response;
      if (data.code == 0) {
        this.img_src[1] =
          "http://" +
          window.location.host +
          "/api/image/download?file=" +
          response.data;
        this.$message({
          message: "上传成功",
          type: "success",
        });
      } else {
        this.$message({
          message: data.msg,
          type: "error",
        });
      }

      response;
      console.log("upload success");
      console.log(file);
      console.log(fileList);
    },
    handleError(err, file, fileList) {
      this.$message({
        message: err,
        type: "error",
      });
      err;
      file;
      fileList;
    },
  },
  created() {
    this.get_default_params();
    this.get_my_params();
  },
  mounted() {
    for (var i = 0; i < this.file_num; i++) {
      this.img_src.push("");
    }
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