<template>
    <div id="app">
        <p @click="back" style="font-size:16px;color:white;position:absolute;top:10px;left:15px;">返回</p>
        <template v-for="(item,index) in jsonShop">
            <template v-if="item.restaurant.id == $route.query.id">
                <img class="dingImg" v-if="item.restaurant.image_path.substr(-4)=='jpeg'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-4)" alt="">
                <img class="dingImg" v-else-if="item.restaurant.image_path.substr(-3)=='png'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-3)" alt="">
                <div style="height:150px;background-color:#C4BDCC"></div>
                <div style="padding:15px;">
                    <h1 style="font-weight:700;margin:8px auto;text-align:center;">{{item.restaurant.name}}</h1>
                    <p style="text-align:center;font-size:14px;">
                        <span>评价{{item.restaurant.rating}}</span>
                        <span class="sps">月售{{item.restaurant.recent_order_num}}单</span>
                        <span>蜂鸟专送</span>
                    </p>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jsonShop: []
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
#app {
    background-color: #C4BDCC;
}    
.dingImg {
    width: 100px;
    position: absolute;
    top: 60px;
    left: 157px;
}
.sps {
    margin: 0 13px;
}
</style>
