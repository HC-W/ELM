<template>
    <div class="shopping">
        <i-row v-for="(item,index) in jsonShop" :key="index" class="rowAll">
            <router-link :to="{name:'shopping',params:{'id':$route.params.id},query:{'id':item.restaurant.id,'name':item.restaurant.name}}" style="color:block;">
                <!-- 左边图片 -->
                <i-col span=6>
                    <img v-if="item.restaurant.image_path.substr(-4)=='jpeg'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-4)" alt="">
                    <img v-else-if="item.restaurant.image_path.substr(-3)=='png'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-3)" alt="">
                </i-col>
                <!-- 右边具体信息 -->
                <i-col span=18>
                    <i-row type="flex" justify="space-between">
                        <i-col style="font-size:18px;font-weight:700;">{{item.restaurant.name}}</i-col>
                        <i-col>口...</i-col>
                    </i-row>
                    <i-row class="row">
                        <i-rate allow-half v-model="item.restaurant.rating"></i-rate>
                        <span>{{item.restaurant.rating}}</span>
                        
                        <span>月售{{item.restaurant.recent_order_num}}单</span>
                    </i-row>
                    <i-row class="row" type="flex" justify="space-between">
                        <i-col v-if="item.restaurant.float_delivery_fee == 0">￥{{item.restaurant.float_minimum_order_amount}}起送 | 免配送费</i-col>
                        <i-col v-else>￥{{item.restaurant.float_minimum_order_amount}}起送 | 配送费￥{{item.restaurant.float_delivery_fee}}</i-col>
                        <i-col>距离和时间</i-col>
                    </i-row>
                    <i-row class="row">
                        <template v-for="(item,indexKou) in item.restaurant.support_tags">
                            <span :key="indexKou" :style="item.text == '口碑人气好店'?redBgc:trBgc">{{item.text}}</span>
                        </template>
                        
                    </i-row>
                </i-col>
            </router-link>
        </i-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      jsonShop: [],
      redBgc: {
        color: "white",
        "margin-right": "10px",
        color: "red"
      },
      trBgc: {
        // width: "50px",
        display: "inline-block",
        "box-sizing": "border-box",
        "background-color": "white",
        color: "gray",
        "margin-right": "10px",
        border: "1px solid #ccc",
        "border-radius": "3px"
      }
    };
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
  }
};
</script>

<style>
img {
  width: 70px;
}
.shopping {
  padding: 15px;
  box-sizing: border-box;
}
.row {
  font-size: 14px;
  margin-top: 6px;
}
.rowAll {
  padding: 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
}
</style>
