// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import App from './App'
import router from './router'
import Resource from 'vue-resource'


Vue.config.productionTip = false
Vue.use(Resource);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  Resource,
  template: '<App/>',
  components: { App },
  http: {
    root: 'http://www.easy-mock.com/mock/59c4cb6ae0dc663341b4d777/mail',
  },
  watch:{
    //"$route" : 'checkLogin'
  },
  created() {
    //this.checkLogin();
  },
  methods:{
    checkLogin(){

      //检查是否存在session
      if(!this.getCookie('session')){
        this.$router.push('/Login');
      }else{
        this.$router.push('/Addressee');
      }
    }
  }
})
//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}