<template>
	<div class="matterList">
		<div class="modal"></div>
		<div class="login">
			<input id="txt_userName" type="text" value="" placeholder="输入用户名admin" autocomplete="off" v-model="account">
			<input id="txt_pwd" type="password" value="" placeholder="输入密码123" autocomplete="new-password"  v-model="password">
			<div class="btn-lgn">
				<span class="btn_lg_text">登录</span>
				<input id="btn_lg"  @click="login" class="un_lgn" type="button" value="">
				<!--<input id="btn_lg" onclick="GetPermisson();" class="un_lgn" type="button" value="">-->
			</div>
		</div>
	</div>


</template>

<script>
  export default {
    name:"Login",
    data: function () {
      return {
        isLoging: false,
        account: '',
        password: ''
      }
    },
		methods:{
      //登录逻辑
      login(){
        if(this.account!='' && this.password!=''){
          this.toLogin();
        }else{
          alert("请输入账号或密码")
				}
      },
      //登录请求
      toLogin(){
        //一般要跟后端了解密码的加密规则
        //这里例子用的哈希算法来自./static/js/sha1.min.js
        let password_sha = hex_sha1(hex_sha1( this.password ));
        //需要想后端发送的登录参数
        let loginParam = {
          account: this.account,
          password_sha
        }


        //请求后端,比如:
				/*this.$http.post( 'example.com/login.php', {
				 param: loginParam).then((response) => {
				 if(response.data.code == 1){
				 //设置在登录状态
				 //this.isLoging = true;
				 let expireDays = 1000 * 60 * 60 * 24 * 15;
				 this.setCookie('session', response.data.session, expireDays);
				 //登录成功后
				 this.$router.push('/user_info');
				 }
				 }, (response) => {
				 //Error
				 });
				 */

        //演示用

				if(loginParam.password_sha === "9adcb29710e807607b683f62e555c22dc5659713" && loginParam.account === "admin"){
          setTimeout(()=>{
            //登录状态15天后过期
            let expireDays = 1000 * 60 * 60 * 24 * 15;
            this.setCookie('session','success', expireDays);
            this.isLoging = true;

            //登录成功后
            this.$router.push('/Addressee/');
          },2000)
				}else{
          alert("账号或密码输入错误");
          return false
				}
      }

		},
    components: {

    }
  }
</script>

<style>
	.modal{position: fixed; background-color: rgba(0,0,0, 0.7); top:0 ;left: 0;width: 100%;height: 100%;}
	.login{height: 22rem; padding-left: 9rem; border-radius: 1rem;  width: 40rem;  background: url(../../static/image/bj.jpg) 0 0 no-repeat;  background-size: 100% 100%;     position: absolute;  left: 50%;  margin-left: -20rem;  margin-top: 4rem;}
	/*.content{ width: 40rem;height: 24rem;background-color:rgba(255,255,255,0.6);border-radius: 5px;position: absolute;top: 50%;left: 50%;margin-left: -20rem;margin-top: -12rem;padding-left: 8.5rem}*/
	.login input {margin-top: 3rem;  width: 23rem;  height: 2.5rem;  line-height: 2.5rem;  background: transparent;  font-size: 1.4rem;  color: #ffffff;  border: none;  border-bottom: 1px solid #fff;  text-indent: 4rem;  outline: none;}
	.login input:first-child {background: url(../../static/image/icon_username.png) 0.9rem 0.25rem no-repeat; }
	.login input:nth-child(2) {background: url(../../static/image/icon_lock.png) 0.9rem 0.25rem no-repeat; }
	.login input[placeholder],[placeholder],*[placeholder] { color: #ffffff !important;}
	.login input::-webkit-input-placeholder { color: #ffffff !important;}
	.login input::-moz-input-placeholder { color: #ffffff !important;}
	.login input::-ms-input-placeholder { color: #ffffff !important;}

	.btn-lgn { height: 2.8rem; width: 23rem; text-align: center; margin-top: 3rem;display: inline-block}
	.btn-lgn .lgn{ margin: 0; height: 2.8rem; background: url(../../static/image/btn-lg.png) 0 0 no-repeat !important;    background-size: 100% 100% !important;border: none; cursor: pointer;}
	.btn-lgn .un_lgn{ margin: 0; height: 2.8rem; background: url(../../static/image/btn-unlg.png) 0 0 no-repeat !important;    background-size: 100% 100% !important;border: none; cursor: pointer;}
	.btn_lg_text{vertical-align: bottom; display: inline-block;color: #ffffff;height: 2.8rem;line-height: 2.5rem;font-size: 1.4rem}
	#btn_lg{width: 3rem;margin-left: 1rem;}

</style>