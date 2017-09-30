import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Addressee from '@/components/Addressee'
import TextMessage from '@/components/TextMessage'
import AudioMessage from '@/components/AudioMessage'
import StarMail from '@/components/StarMail'
import Deleat from '@/components/Deleat'

Vue.use(Router);

export default new Router({
  mode:'history',
  base: __dirname ,
  routes: [
    { path: '/',name:'Login', component: Login },
    { path: '/Login',name:'Login', component: Login },
    { path: '/Addressee',name:'Addressee', component: Addressee },
    { path: '/TextMessage',name:'TextMessage', component: TextMessage },
    { path: '/AudioMessage',name:'AudioMessage', component: AudioMessage },
    { path: '/StarMail',name:'StarMail', component: StarMail },
    { path: '/Deleat',name:'Deleat', component: Deleat }
    //{ path: '/',name:'Hello', component:Hello },
  ]
})

