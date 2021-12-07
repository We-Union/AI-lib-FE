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
import FaceDetection from './pages/FaceDetection.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
 

const routes = [
    
    { path: '/', redirect: '/main' },
    { path: '/main', component: Main },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/facedetection', component: FaceDetection },
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
