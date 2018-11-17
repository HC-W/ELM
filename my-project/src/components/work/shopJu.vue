<template>
    <div id="app">
        <p @click="back" style="font-size:16px;color:white;position:absolute;top:10px;left:15px;"><i-icon type="ios-arrow-back" /></p>
        <template v-for="(item,index) in jsonShop">
            <!-- 查找需要的商家信息 -->
            <template v-if="item.restaurant.id == $route.query.id">
                <!-- 店铺图片 -->
                <img class="dingImg" v-if="item.restaurant.image_path.substr(-4)=='jpeg'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-4)" alt="">
                <img class="dingImg" v-else-if="item.restaurant.image_path.substr(-3)=='png'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-3)" alt="">
                <div style="height:150px;background-color:#C4BDCC"></div>
                <!-- 优惠介绍 -->
                <div style="padding:10px 25px;">
                    <!-- 店铺名称 -->
                    <h1 style="font-weight:700;margin:5px auto;text-align:center;" @click="modal5 = true">
                        {{item.restaurant.name}}
                        <i-icon type="md-arrow-dropright" />
                    </h1>
                    <!-- 点击的弹出框 -->
                    <i-modal :styles="{top:'200px'}" v-model="modal5" :closable="false" :mask-closable="true" :scrollable="true" :footer-hide="true">
                       <h1 style="width:80%;margin:0 auto;color:black;margin-bottom:15px;font-weight:700;">{{item.restaurant.name}}</h1>
                        <i-row type="flex" justify="space-between">
                            <i-col span=5 class="col">
                                <i-row class="str-row">{{item.restaurant.rating}}</i-row>
                                <i-row>评分</i-row>
                            </i-col>
                            <i-col span=4 class="col">
                                <i-row class="str-row">{{item.restaurant.recent_order_num}}单</i-row>
                                <i-row>月售</i-row>
                            </i-col>
                            <i-col span=6 class="col">
                                <i-row class="str-row">{{item.restaurant.delivery_mode.text}}</i-row>
                                <i-row>约。。。分钟</i-row>
                            </i-col>
                            <i-col span=4 class="col">
                                <i-row class="str-row">{{item.restaurant.float_delivery_fee}}元</i-row>
                                <i-row>配送费</i-row>
                            </i-col>
                            <i-col span=5 class="col">
                                <i-row class="str-row">2千米</i-row>
                                <i-row>距离</i-row>
                            </i-col>
                            
                        </i-row>
                        <p style="text-align:center;margin-top:10px;">—— 公告 ——</p>
                        <p style="width:88%;max-height:200px;margin:10px auto;font-size:15px;line-height:1.5em;">{{item.restaurant.promotion_info}}</p>
                    </i-modal>
                    <!-- 评价、月售和配送时间 -->
                    <p style="text-align:center;font-size:14px;">
                        <span>评价{{item.restaurant.rating}}</span>
                        <span class="sps">月售{{item.restaurant.recent_order_num}}单</span>
                        <span>蜂鸟专送</span>
                    </p>
                    <!-- 满减优惠 -->
                    <i-row>
                        <i-col span=18>
                            <i-row type="flex" justify="space-between" align="middle">
                                <i-col span=3 class="manjian">满减</i-col>
                                <i-col span=20>
                                    <i-row  v-for="(item,index) in item.restaurant.activities" v-if="item.icon_name == '减'" :key="index">{{item.tips}}</i-row>
                                </i-col>
                            </i-row>
                        </i-col>
                        <!-- 优惠个数 -->
                        <i-col span=6 class="col">
                            {{item.restaurant.activities.length}}个优惠
                            <i-icon type="md-arrow-dropdown" />
                        </i-col>
                    </i-row>
                    <p class="gongGao">公告：{{item.restaurant.promotion_info}}</p>
                </div>
                <!-- 点餐、评价和商家 -->
                <div class="diancan">
                    <i-row type="flex" justify="space-around">
                        <i-col class="ju_choose" span=8>点餐</i-col>
                        <i-col class="ju_choose" span=8>评价</i-col>
                        <i-col class="ju_choose" span=8>商家</i-col>
                    </i-row>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jsonShop: [],
            modal5: false
        }
    },
    created() {
    this.$ajax
      .ajax({
        url: "/Dat/v3",
        data: "GET",
        dataType: "json"
      })
      .then(data => {
        // console.log(data.items);
        this.jsonShop = data.items;
        // console.log(this.jsonShop);
      });
  },
   methods: {
    back() {
      this.$router.go(-1);
    }
  },
}
</script>

<style>
@import "./less.css"; 
.dingImg {
    width: 100px;
    position: absolute;
    top: 60px;
    left: 157px;
}
.sps {
    margin: 0 10px;
}
.diancan {
    padding: 10px;
    background-color: white;
}
.col {
    text-align: center;
    color: #999999;
}
.manjian {
    color: white;
    display: inline-block;
    background-color: red;
    text-align: center;
    border-radius: 2px;
}
.ju_choose {
    text-align: center;
    font-size: 17px;
    font-weight: 700;
}
.gongGao {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999999
}
.str-row {
    font-size: 20px;
    font-weight: 700;
    color: black;
}
</style>
