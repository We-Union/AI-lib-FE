<template>
  <br />
  选择并上传图片文件：
  <br />
  <br />
  <div class="image-upload">
    <el-upload
      ref="upload"
      class="upload-demo"
      method="POST"
      action="/api/image/upload"
      :auto-upload="false"
      :limit="this.file_num"
      :thumbnail-mode="true"
      :on-success="handleSuccess"
      :on-error="handleError"
      name="file"
    >
      <template #trigger>
        <el-button size="small" type="primary">选择文件</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传</el-button
      >
      <template #tip>
        <div class="el-upload__tip">
          jpg/png文件，不超过2M，最多可上传{{ file_num }}张图片
        </div>
      </template>
    </el-upload>
  </div>
  <br />
  <div class="image-container">
    <el-image
      v-for="src in img_src"
      :key="src"
      :src="src"
      style="width: 50%"
    
    >
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
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
          <el-icon><icon-picture /></el-icon>
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
    current_params:  "",
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
    submitUpload() {
      this.img_src = [];
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      var data = response;
      if (data.code == 0) {
        this.img_src.push(
          "http://localhost:8000/image/download?file=" + response.data
        );
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

      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    handleError(err, file, fileList) {
      this.$message({
        message: err,
        type: "error",
      });
      console.log(err);
      console.log(file);
      console.log(fileList);
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