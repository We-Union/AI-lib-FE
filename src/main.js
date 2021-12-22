import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css


import App from './App.vue'
import Main from './pages/Main.vue'
import About from './pages/About.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import SiftMatching from './pages/cv/SiftMatching.vue'
import AddPara from './pages/AddPara.vue'
import MyPara from './pages/MyPara.vue'
import AddDefault from './pages/AddDefault.vue'
import DefaultPara from './pages/DefaultPara.vue'

import Painting from './pages/cv/Painting.vue'
import Reconstruct from './pages/cv/Reconstruct.vue'
import Scanning from './pages/cv/Scanning.vue'
import Stitching from './pages/cv/Stitching.vue'
import DetectFace from './pages/cv/DetectFace.vue'
import OcrPrint from './pages/cv/OcrPrint.vue'
import OcrVal from './pages/cv/OcrVal.vue'
import EqualizeHist from './pages/cv/EqualizeHist.vue'
import OSTUSplit from './pages/cv/OSTUSplit.vue'


import KanjiCut from './pages/nlp/KanjiCut.vue'
import En2Zh from './pages/nlp/En2Zh.vue'
import Zh2En from './pages/nlp/Zh2En.vue'
import DetectMood from './pages/nlp/DetectMood.vue'
import TopicClassifier from './pages/nlp/TopicClassifier.vue'
import GenerateWordcloud from './pages/nlp/GenerateWordcloud.vue'
import VisualWordvec from './pages/nlp/VisualWordvec.vue'
import TalkToChatbot from './pages/nlp/TalkToChatbot.vue'


import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [

  { path: '/', redirect: '/main' },
  { path: '/main', component: Main, meta: { title: "主页" }, },
  { path: '/about', component: About, meta: { title: "关于" } },
  { path: '/login', component: Login, meta: { title: "登录" } },
  { path: '/register', component: Register, meta: { title: "注册" } },
  { path: '/addpara', component: AddPara, meta: { title: "添加参数" } },
  { path: '/mypara', component: MyPara, meta: { title: "我的参数" } },
  { path: '/adddefault', component: AddDefault, meta: { title: "添加默认参数" } },
  { path: '/defaultpara', component: DefaultPara, meta: { title: "修改默认参数" } },

  { path: '/painting', component: Painting, meta: { title: "图片手绘风格转换" } },
  { path: '/reconstruct', component: Reconstruct, meta: { title: "超分辨率重建" } },
  { path: '/scanning', component: Scanning, meta: { title: "文档扫描" } },
  { path: '/siftmatching', component: SiftMatching, meta: { title: "图片匹配" } },
  { path: '/stitching', component: Stitching, meta: { title: "图像拼接" } },
  { path: '/detectface', component: DetectFace, meta: { title: "人脸检测" } },
  { path: '/ocrprint', component: OcrPrint, meta: { title: "打印体识别" } },
  { path: '/ocrval', component: OcrVal, meta: { title: "验证码识别" } },
  { path: '/equalizehist', component: EqualizeHist, meta: { title: "直方图均衡化" } },
  { path: '/ostusplit', component: OSTUSplit, meta: { title: "大津阈值法" } },


  { path: '/kanjicut', component: KanjiCut, meta: { title: "中文分词" } },
  { path: '/en2zh', component: En2Zh, meta: { title: "英译中" } },
  { path: '/zh2en', component: Zh2En, meta: { title: "中译英" } },
  { path: '/detectmood', component: DetectMood, meta: { title: "情绪检测" } },
  { path: '/topicclassifier', component: TopicClassifier, meta: { title: "话题分类" } },
  { path: '/generatewordcloud', component: GenerateWordcloud, meta: { title: "生成词云" } },
  { path: '/visualwordvec', component: VisualWordvec, meta: { title: "中文词向量" } },
  { path: '/talktochatbot', component: TalkToChatbot, meta: { title: "登录" } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})


axios.defaults.baseURL = '/api'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(vue3videoPlay)
app.mount('#app')
