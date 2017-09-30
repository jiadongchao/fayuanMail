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
			<li class="listItem" v-for="(item,index) in textData">
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
	</div>
	<!--<div id="pageTool"></div>-->
</template>

<script>

  export default {
    name:"TextMessage",
    data: function () {
      return {
        msgpath: "这里是-----收件箱",
        apiUrl: 'http://www.easy-mock.com/mock/59c4cb6ae0dc663341b4d777/mail/TextMessage',
        textData:"",

      }
    },
    components: {

    },
		mounted(){
    	this.getTextMessage()
 	  },
		methods: {
      /*改变 -->是否未读状态*/
			changeRead: function (e) {
				$(e.target).toggleClass("icon-read").toggleClass("icon-unread");
			},
			/*改变 -->星标状态*/
			changeStar: function (e) {
				$(e.target).toggleClass("starsActive");
			},
			/*请求收件箱数据*/
      getTextMessage: function() {
        this.$http.post(this.apiUrl)
          .then((response) => {
          	this.textData = response.body.data.items
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