<template class="talk-to-chat-bot">
  <br />
  <el-scrollbar class="scrollbar" ref="scrollbar">
    <div v-for="i in msgs.length" :key="i">
      <div class="message-cantainer">
        <div v-if="msgs[i - 1].sender == 'me'" style="color: green">
          <p class="msg-info">
            {{ msgs[i - 1].sender }},{{ msgs[i - 1].time }}
          </p>
        </div>
        <div v-else style="color: blue">
          <p class="msg-info">
            {{ msgs[i - 1].sender }},{{ msgs[i - 1].time }}
          </p>
        </div>
        <p class="msg-content">
          {{ msgs[i - 1].content }}
        </p>
      </div>
    </div>
  </el-scrollbar>
  <br />
  <el-input
    v-model="text"
    :rows="5"
    type="textarea"
    placeholder="输入消息"
    :maxlength="max_length"
    :autofocus="true"
    @keyup.enter="analyse"
  />
  <br />
  <br />
  <el-button
    class="send-button"
    type="primary"
    @click="analyse"
    :loading="analyse_loading"
    >发送</el-button
  >
</template>

<script>
export default {
  components: {},
  data: () => ({
    model: "talk_to_chatbot",
    text: "",
    msgs: [],
    analyse_loading: false,
    max_length: 60,
    message_time: "",
  }),

  methods: {
    analyse() {
      if (this.text.length > this.max_length) {
        this.$message({
          message: "输入文本长度不能超过" + this.max_length + "个字符",
          type: "error",
        });
        return;
      }
      if (this.text.length == 0) {
        this.$message({
          message: "输入文本不能为空",
          type: "error",
        });
        return;
      }
      this.analyse_loading = true;
      const axios = require("axios");
      this.addMessage("me", this.text);
      var send_text = this.text;
      var index = this.msgs.length - 1;
      this.$nextTick(() => {
        this.text = "";
      });

      axios
        .post("/analyse", {
          model: this.model,
          parameter: "{}",
          data: send_text,
        })
        .then((response) => {
          var data = response.data;
          this.analyse_loading = false;
          if (data.code == 0) {
            this.analyse_loading = false;
            this.addMessage("bot", data.output_text);
          } else {
            this.analyse_loading = false;
            this.msgs[index].time = this.msgs[index].time + "(发送失败)";
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
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
      return _this.gettime;
    },
    setscrollbarToBottom() {
      this.$refs.scrollbar.setScrollTop(5000);
      console.log("set to bottom");
    },
    addMessage(sender, content) {
      this.msgs.push({
        sender: sender,
        content: content,
        time: this.getCurrentTime(),
      });
      console.log("send message");
      this.$nextTick(() => {
        this.setscrollbarToBottom();
      });
    },
  },
};
</script>

<style scoped>
.talk-to-chat-bot {
  width: 100%;
  height: 90vh;
}
.scrollbar {
  width: 100%;
  height: 50vh;
  border-style: solid;
  border-radius: 10px;
}
.send-button {
  height: 5vh;
  border-radius: 10px;
  float: right;
}
.message-cantainer {
  margin-left: 2vh;
}
</style>