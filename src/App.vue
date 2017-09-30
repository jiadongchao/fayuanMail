<template>
  <div id="app">

    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
		<!--<router-link to="/Addressee">文字留言</router-link>-->
		<div class = "header">
			<div class = "headerTitle">北京市第二中级人民法院廉政监察信箱</div>
			<div class = "headerExit"><a href="javascript:;" @click="logout"><i class="iconfont icon-exit"></i><span>退出</span></a></div>
			<div class = "headerTime"><span class="datetext">2017年08月08日</span><span class="timetext">18:08:08</span></div>
		</div>
		<div class = "main">
			<div class ="content fix" >
				<div class ="nav" >
					<ul class="navList">
						<li class="navItem navItemActive"><a  href="javascript:;"  v-on:click="active"><span class="navBar"></span><i class="iconfont icon-inbox"></i><span><router-link to="/Addressee">收件箱</router-link></span></a></li>
						<li class="navItem" ><a href="javascript:;" v-on:click="active"><span class="navBar" ></span><i class="iconfont icon-messag"></i><span><router-link to="/TextMessage">文字留言</router-link></span></a></li>
						<li class="navItem" ><a href="javascript:;" v-on:click="active"><span class="navBar" ></span><i class="iconfont icon-voice"></i><span><router-link to="/AudioMessage">语音留言</router-link></span></a></li>
						<li class="navItem" ><a href="javascript:;" v-on:click="active"><span class="navBar" ></span><i class="iconfont icon-starDef"></i><span><router-link to="/StarMail">星标邮件</router-link></span></a></li>
						<li class="navItem" ><a href="javascript:;" v-on:click="active"><span class="navBar" ></span><i class="iconfont icon-del"></i><span><router-link to="/Deleat">已删除</router-link></span></a></li>
					</ul>
				</div>
				<div class="matter">
					<div class="control">
						<div class="dateTime" >
							<div class="flex">
								<input class="dateInput" type="text" @click="openByDialog" :value="calendar4.display" readonly>
							</div>

								<!--<span id="dateTime">-->
									<!--<input id="timeSta" class="dydatepicker" size="20" value=""/>-->
									<!--<span>至</span>-->
									<!--<input id="timeEnd" class="dydatepicker"  size="20" value=""/>-->
								<!--</span>-->
						</div>



						<div class="searchWrap">
							<input class="searchInput" type="text" placeholder="可以按留言时间/内容进行搜索">
							<i class="iconfont icon-sousuo"></i>
						</div>
					</div>
					<div class="btnList">
						<span>{{ toAddressee }}</span>
						<a id="btnRecover" href="#" >一键恢复</a>
						<a class="btnItem btnActive" href="#" >全部</a>
						<a class="btnItem" href="#" >已读</a>
						<a class="btnItem" href="#" >未读</a>
						<span class="refresh"><i class="iconfont icon-shuaxin01"></i></span>
					</div>

				</div>
				<transition name="bounce">
					<router-view ></router-view>
				</transition>

				<!--<router-view :fromApp="toAddressee"></router-view>-->

			</div>
		</div>
		<transition name="fade">
			<div class="calendar-dialog" v-if="calendar4.show">
				<div class="calendar-dialog-mask" @click="closeByDialog"></div>

				<div class="calendar-dialog-body">
					<calendar :range="calendar4.range" :zero="calendar4.zero" :lunar="calendar4.lunar" :value="calendar4.value"  @select="calendar4.select"></calendar>
				</div>
			</div>
		</transition>
  </div>
</template>

<script>
import calendar from './calendar/Calendar.vue'

export default {
  name: 'app',

	data:function(){
    return{
      isLogin:false,
			userInfo:{
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null
			},
      toAddressee:"",
      calendar4:{
        //display:"2018/02/16 ~ 2019/02/16",
        display:"选择日期",
        show:false,
        range:true,
        zero:true,
        //value:[[2018,2,16],[2019,2,16]], //默认日期
        lunar:true, //显示农历
        select:(begin,end)=>{
          console.log(begin,end)
          //console.log(begin.join("/")+"--"+end.join("/"))
          this.calendar4.show=false;
          this.calendar4.value=[begin,end];
          this.calendar4.display=begin.join("/")+" ~ "+end.join("/");


        }
      }
		}
	},
  components:{
    calendar
  },
  methods: {

    active: function (e) {
      $(".navBar").hide();
      $(".navItem").removeClass("navItemActive");
      $(e.target).parents(".navItem").addClass("navItemActive").find(".navBar").show();
    },
    openByDrop: function (e) {
      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener("click", (e) => {
          document.removeEventListener("click", () => {
          }, false);
        }, false);
      }, 1000)
    },
    openByDialog: function () {
      this.calendar4.show = true;
    },
    closeByDialog: function () {
      this.calendar4.show = false;
    },
    dateSystem: function () {
      setInterval(function () {
        var now = new Date();
        $(".headerTime .datetext").html(getFormatDate());
        $(".headerTime .timetext").html(getFormatTime());
      }, 1000);

      //格式化日期
      function getFormatDate(date) {
        if (date == undefined || date == null) {
          date = new Date();
        }
        if (typeof (date) == "string") {
          date = date.replace("T", " ").replace(/-/g, ':').replace(' ', ':');
          date = date.split(':');
          date = new Date(date[0], (date[1] - 1), date[2], date[3], date[4], date[5]);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }


        return year + "年" + month + "月" + strDate + "日";
      };
      //格式化时间
      function getFormatTime(date) {
        if (date == undefined || date == null) {
          date = new Date();
        }
        if (typeof (date) == "string") {
          date = date.replace("T", " ").replace(/-/g, ':').replace(' ', ':');
          date = date.split(':');
          date = new Date(date[0], (date[1] - 1), date[2], date[3], date[4], date[5]);
        }
        return formatComplete(date.getHours()) + ":" + formatComplete(date.getMinutes()) + ":" + formatComplete(date.getSeconds());
      }

      function formatComplete(val) {
        if (val >= 0 && val <= 9) {
          val = "0" + val;
        }
        return val;
      }

      //格式化日期时间
      function getFormatDateTime(date) {
        if (date == undefined || date == null) {
          date = new Date();
        }
        return getFormatDate(date) + getFormatTime(date);
      }
    },//请求用户的一些信息
    getUserInfo(){
      //发送http请求获取，这里写死作演示
      this.userInfo = {
        nick: 'HeyJeck',
        ulevel: 20,
        uid: '10000',
        portrait: './assets/logo.png'
      },
      //实例开发中这里会向服务端请求数据
      //如下(用了vue-resource):
			/*ts.$http.get(url, {
			 //参数
			 "params":{}
			 }).then((response) => {
			 //Success
			 }, (response) => {
			 //Error
			 });*/

			//提交mutation到Store
			this.$store.commit('updateUserInfo', this.userInfo);
    },
    logout(){
      //删除cookie并跳到登录页
      this.isLogouting = true;
      //请求后端，比如logout.php
      // this.$http.post('eaxmple.com/logout.php')...
      //成功后删除cookie
      this.delCookie('session');

      //重置loding状态
      this.isLogouting = false;

      //跳转到登录页
      this.$router.push('/Login/');
    }
  },
	mounted(){
		this.dateSystem();
    //组件开始挂载时获取用户信息
    this.getUserInfo();

	}

}




</script>

<style>
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	.bounce-leave-active {
		animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(1.0);
		}
	}


.flex{
	box-sizing: border-box;

	display: -webkit-box;
	-webkit-box-pack: start;
	-webkit-box-align: start;

	display: -webkit-flex;
	-webkit-justify-content: space-between;
	-webkit-align-items: top;

	display: flex;
	justify-content: space-between;
	align-items: top;
	flex-flow:row wrap
}
.flex>div{
	margin:10px;
	padding:20px;
	width:25%;
	min-width:300px;
	border: 1px solid #eee;
	border-radius: 2px;
	position: relative;
}
.flex>div>span{
	position: absolute;
	left:0px;
	top:0px;
	padding:2px 10px;
	font-size:10px;
	border-radius:0 0 2px 0;
	background:#ea6151;
	color:#fff;
}
.flex>div>input{
	box-sizing: border-box;
	width:100%;
	margin-top:20px;
	border-radius: 2px;
	border:1px solid #dedede;
	padding:10px;
	font-size: 16px;
	background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
	padding-left: 36px;
	color:#666;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
	transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
	opacity: 0;
	transform: translateY(-10px);

}

/*下拉框*/
.calendar-dropdown{
	background: #fff;
	position: absolute;
	left:0;
	top:0;
	padding:20px;
	border: 1px solid #eee;
	border-radius: 2px;
}
.calendar-dropdown:before {
	position: absolute;
	left:30px;
	top: -10px;
	content: "";
	border:5px solid rgba(0, 0, 0, 0);
	border-bottom-color: #DEDEDE;
}
.calendar-dropdown:after {
	position: absolute;
	left:30px;
	top: -9px;
	content: "";
	border:5px solid rgba(0, 0, 0, 0);
	border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog{
	position: absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
}

.calendar-dialog-mask{
	background:rgba(0,0,0,.6);
	width:100%;
	height:100%;
}

.calendar-dialog-body{
	background: #fff;
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
	padding:20px;
	border: 1px solid #eee;
	border-radius: 2px;
}
</style>
