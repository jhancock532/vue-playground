import { createApp } from 'vue'
import App from './App.vue'
import Button from './components/Button.vue'
import router from './router'
import './styles/styles.scss'

const app = createApp(App)
app.component('Button', Button)
app.use(router)
app.mount('#app') 