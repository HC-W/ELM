<template>
    <div class="shopping">
      <!-- {{$store.state.City.paiXu}} -->
        <i-row v-for="(item,index) in jsonShop" :key="index" class="rowAll">
            <router-link :to="{name:'shopping',params:{'id':$route.params.id},query:{'id':item.restaurant.id,'name':item.restaurant.name}}" style="color:block;">
                <!-- 左边图片 -->
                <i-col span=5>
                    <img v-if="item.restaurant.image_path.substr(-4)=='jpeg'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-4)" alt="">
                    <img v-else-if="item.restaurant.image_path.substr(-3)=='png'" :src="'https://fuss10.elemecdn.com/'+item.restaurant.image_path.substr(0,1)+'/'+item.restaurant.image_path.substr(1,2)+'/'+item.restaurant.image_path.substr(3,item.restaurant.image_path.length-3)+'.'+item.restaurant.image_path.substr(-3)" alt="">
                </i-col>
                <!-- 右边具体信息 -->
                <i-col span=19>
                  <!-- 右上角点击 -->
                    <i-row type="flex" justify="space-between">
                        <i-col style="font-size:18px;font-weight:700;">{{item.restaurant.name}}</i-col>
                        <i-col>
                          <span @click.prevent="tanchu">口...</span>
                        </i-col>
                    </i-row>
                    <!-- 评分和月售 -->
                    <i-row class="row">
                        <i-rate allow-half v-model="item.restaurant.rating"></i-rate>
                        <span>{{item.restaurant.rating}}</span>
                        
                        <span>月售{{item.restaurant.recent_order_num}}单</span>
                    </i-row>
                    <!-- 配送 -->
                    <i-row class="row" type="flex" justify="space-between">
                        <i-col v-if="item.restaurant.float_delivery_fee == 0">￥{{item.restaurant.float_minimum_order_amount}}起送 | 免配送费</i-col>
                        <i-col v-else>￥{{item.restaurant.float_minimum_order_amount}}起送 | 配送费￥{{item.restaurant.float_delivery_fee}}</i-col>
                        <i-col>距离和时间</i-col>
                    </i-row>
                    <!-- 商标 -->
                    <i-row class="row">
                        <template v-for="(item,indexKou) in item.restaurant.support_tags">
                            <span :key="indexKou" :style="item.text == '口碑人气好店'?redBgc:trBgc">{{item.text}}</span>
                        </template> 
                    </i-row>
                    <!-- 满减活动 -->
                    <i-row class="row">
                        <i-col span=17>
                            <i-row type="flex" justify="space-between" align="middle">
                                <i-col span=22>
                                  <!-- 已显示的优惠 -->
                                  <template v-for="(itema,indexa) in item.restaurant.activities">
                                    <i-row class="jian" v-if="itema.type">
                                      <span :style="{'background-color':'#'+itema.icon_color}" class="colCol">{{itema.icon_name}}</span>
                                        {{itema.tips}}
                                      </i-row>
                                      <!-- 优惠活动具体情况 -->
                                    <i-row class="jian" v-if="index == num && isHeight">
                                      <span :style="{'background-color':'#'+itema.icon_color}" class="colCol">
                                        {{itema.icon_name}}
                                      </span>
                                        {{itema.tips}}
                                    </i-row>
                                  </template>
                                </i-col>
                            </i-row>
                        </i-col>
                        <!-- 优惠个数 -->
                        <i-col span=7 class="col">
                          <!-- 点击事件，优惠活动个数出现 -->
                            <span @click.prevent="fn(index)">{{item.restaurant.activities.length}}个优惠
                            <i-icon type="md-arrow-dropdown" /></span>
                        </i-col>
                    </i-row>
                </i-col>
            </router-link>
        </i-row>
    </div>
</template>

<script>
export default {
  // created() {
  //   this.$store.dispatch("City/PaiXu");
  // },
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
      },
      isHeight: false,
      num:0
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
  },
  methods: {
    tanchu() {
      alert("你好");
    },
    fn(num) {
      this.num = num;
      this.isHeight = !this.isHeight;
    }
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
.jian {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.colCol {
  padding: 1px;
  color: white;
  font-size: 13px;
  margin-right: 2px;
}
</style>
