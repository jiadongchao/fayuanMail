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

			<li class="listItem" v-for="(item,index) in items">
				<span class="item1">{{ index+1 }}</span>
				<span class="item2"><i  class="iconfont"  v-bind:class="{'icon-read':item.isRead, 'icon-unread':!item.isRead} " ></i></span>
				<span class="item3">{{ item.time }}</span>
				<span class="item4">{{ item.type }}</span>
				<span class="item5">{{ item.content }}</span>
				<span class="item6">
					<a class="btnDownLoda" href="javascript:;"><i class="iconfont icon-downloadActive"></i>下载</a>
					<a class="btnDel" href="javascript:;"><i class="iconfont icon-del"></i>删除</a>
				</span>
				<span class="item7">
					<a class="btnStars starsActive" href="javascript:;"><i class="iconfont icon-starSel" v-bind:class="{starsActive:item.isStart}"></i></a>
				</span>
			</li>
			<!--<li class="listItem">-->
				<!--<span class="item1">1</span>-->
				<!--<span class="item2"><i class="iconfont icon-read"></i></span>-->
				<!--<span class="item3">2017年-08-08 18:18:18</span>-->
				<!--<span class="item4">文字</span>-->
				<!--<span class="item5">逝者如斯夫不舍昼夜，不舍昼夜</span>-->
				<!--<span class="item6">-->
									<!--<a class="btnDownLoda" href="javascript:;"><i class="iconfont icon-downloadActive"></i>下载</a>-->
									<!--<a class="btnDel" href="javascript:;"><i class="iconfont icon-del"></i>删除</a>-->
								<!--</span>-->
				<!--<span class="item7">-->
									<!--<a class="btnStars starsActive" href="javascript:;"><i class="iconfont  icon-starSel"  ></i></a>-->
								<!--</span>-->
			<!--</li>-->
			<!--<li class="listItem">-->
				<!--<span class="item1">1</span>-->
				<!--<span class="item2"><i class="iconfont icon-read"></i></span>-->
				<!--<span class="item3">2017年-08-08 18:18:18</span>-->
				<!--<span class="item4">文字</span>-->
				<!--<span class="item5">逝者如斯夫不舍昼夜，不舍昼夜</span>-->
				<!--<span class="item6">-->
						<!--<a class="btnDownLoda" href="javascript:;"><i class="iconfont icon-downloadActive"></i>下载</a>-->
						<!--<a class="btnDel" href="javascript:;"><i class="iconfont icon-del"></i>删除</a>-->
				<!--</span>-->
				<!--<span class="item7">-->
						<!--<a class="btnStars " href="javascript:;"><i class="iconfont icon-starSel"></i></a>-->
				<!--</span>-->
			<!--</li>-->
		</ul>
	</div>
	<!--<div id="pageTool"></div>-->
</template>

<script>

  export default {
    name:"StarMail",
    data: function () {
      return {
        msg: "hahahhaha",
				items:[
					{
					  time:"2017-0808 19:19:19",
            isRead:true,
						type:"文字",
						content:"窗前明月光，疑是地上霜。",
						isStart:true
					},{
            time:"2017-0808 19:19:19",
            isRead:false,
            type:"文字",
            content:"哈哈哈哈哈哈哈哈，我就是试试，哈哈哈哈哈哈哈哈。",
            isStart:false
          }
				]
      }
    },
    components: {

    }
  }
</script>

<style>

</style>