import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Main from './components/Main.vue'
import About from './components/About.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
 

const routes = [
    
    { path: '/', redirect: '/main' },
    { path: '/main', component: Main },
    { path: '/about', component: About },
  ]

const router = createRouter({
history: createWebHashHistory(),
routes,
})
  
const app = createApp(App)
app.use(router)

app.use(ElementPlus)
app.mount('#app')
