<template>
	<div class="matterList">
		<ul class="listTitle">
			<li class="listItem">
				<span class="item1">序号</span>
				<span class="item2">状态</span>
				<span class="item3">留言时间</span>
				<span class="item4">留言方式</span>
				<span class="item5">内容</span>
				<span class="item6">操作</span>
				<span class="item6"></span>
			</li>
		</ul>
		<ul class="listContent">
			<li class="listItem" v-for="(item,index) in addressData">
				<span class="item1">{{ index+1 }}</span>
				<span class="item2"><i  class="iconfont" @click='changeRead' v-bind:class="{'icon-read':item.isRead, 'icon-unread':!item.isRead} " ></i></span>
				<span class="item3">{{ item.time }}</span>
				<span class="item4">{{ item.type }}</span>
				<span class="item5">{{ item.content }}</span>
				<span class="item6">
					<a class="btnDownLoda" href="javascript:;"><i class="iconfont icon-downloadActive"></i>下载</a>
					<a class="btnDel" href="javascript:;"><i class="iconfont icon-del"></i>删除</a>
				</span>
				<span class="item7">
					<a class="btnStars starsActive" href="javascript:;"><i class="iconfont icon-starSel" @click='changeStar'  v-bind:class="{starsActive:item.isStart}"></i></a>
				</span>
			</li>
		</ul>
		<input class="" type="text" style="border: 1px solid blue" placeholder="子组件" v-on:change="valuechange" v-model="fromApp" >
		<input class="" type="button" style="border: 1px solid blue" v-on:click="submit" value="传给父组件App">
	</div>

	<!--<div id="pageTool"></div>-->
</template>

<script>

  export default {
//		props:{
//      fromApp: String
//		},
    name:"Addressee",
    data: function () {
      return {
        apiUrl: 'http://www.easy-mock.com/mock/59c4cb6ae0dc663341b4d777/mail/Addressee',
//				items:[
//					{
//					  time:"2017-0808 19:19:19",
//            isRead:true,
//						type:"语音",
//						content:"收件箱、收件箱、收件箱、收件箱窗前明月光，疑是地上霜。",
//						isStart:true
//					},{
//            time:"2017-0808 19:19:19",
//            isRead:false,
//            type:"文字",
//            content:"哈哈哈哈哈哈哈哈，我就是试试，哈哈哈哈哈哈哈哈。",
//            isStart:false
//          }
//				],
        addressData:"",
        fromApp:""
      }
    },
    components: {

    },
		mounted(){
      this.getAddressee()

    },
		methods: {
      submit: function () {
        this.$store.commit("showUInputValue");
      },
      valuechange: function(){

        this.$store.state.input_value = this.fromApp;
        console.log(this)
			},
      /*改变 -->是否未读状态*/
      changeRead: function (e) {
        $(e.target).toggleClass("icon-read").toggleClass("icon-unread");
      },
			/*改变 -->星标状态*/
      changeStar: function (e) {
        $(e.target).toggleClass("starsActive");
      },
			/*请求收件箱数据*/
      getAddressee: function() {
        this.$http.post(this.apiUrl)
          .then((response) => {
            this.addressData = response.body.data.items;
          })
          .catch(function(response) {
            console.log(response)
          })
      }

		}
  }
</script>

<style>

</style>