<template>
  <div class="add-para">
    <br />
    选择模型：
    <el-select v-model="select_model" placeholder="选择模型">
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
    输入参数：
    <br />
    <br />
    <el-input
      v-model="params"
      :rows="10"
      type="textarea"
      placeholder="参数"
    />
    <br />
    <br />
    <el-button @click="addPara()" type="primary">添加参数</el-button>
    <el-button @click="setDefault()" type="warning">重置为默认参数</el-button>
  </div>
</template>

<script>
import Common from "./Common.vue"
export default {
  components: {},
  data: () => ({
    model_list:Common.model_list,
    select_model:"",
    params: "",
  }),

  methods: {
    setDefault(){
      if(this.select_model=="")
      {
        this.$message({
          message: '请选择模型',
          type: 'error'
        });
        return;
      }
     const axios = require("axios");
      axios
        .get("/parameter/default?model=" + this.select_model)
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.params=data.data.value;
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$alert("" + error, "无法获得默认参数，但您仍可尝试添加", {
            confirmButtonText: "确定",
          });
        });
    },
    addPara() {
      if(this.select_model == '' || this.params == '') {
        this.$message({
          message: '请输入完整信息',
          type: 'error'
        });
        return;
      }
      const axios = require("axios");
      axios
        .post("/parameter/adddefault", {
          model: this.select_model,
          value: this.params,
        })
        .then((response) => {
          var data = response.data;
          if (data.code == 0) {
            this.$message({
              message: "添加成功",
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