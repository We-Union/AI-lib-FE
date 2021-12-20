import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
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

import { createRouter, createWebHashHistory } from 'vue-router'
 

const routes = [
    
    { path: '/', redirect: '/main' },
    { path: '/main', component: Main },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/addpara', component: AddPara },
    { path: '/mypara', component: MyPara },
    { path: '/adddefault', component: AddDefault },
    { path: '/defaultpara', component: DefaultPara },

    { path: '/painting', component: Painting },
    { path: '/reconstruct', component: Reconstruct },
    { path: '/scanning', component: Scanning },
    { path: '/siftmatching', component: SiftMatching },
    { path: '/stitching', component: Stitching },
    { path: '/detectface', component: DetectFace },
    { path: '/ocrprint', component: OcrPrint },
    { path: '/ocrval', component: OcrVal },
    { path: '/equalizehist', component: EqualizeHist },
    { path: '/ostusplit', component: OSTUSplit },


    { path: '/kanjicut', component: KanjiCut },
  ]

const router = createRouter({
history: createWebHashHistory(),
routes,
})

axios.defaults.baseURL = '/api'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.mount('#app')
