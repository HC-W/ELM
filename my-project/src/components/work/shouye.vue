<template>
    <div id="app" v-cloak>
        <!-- 头部 -->
        <div class="top topShou">
            <span>ele.me</span>
            <p>
                <router-link to="/login" class="toLogin">登录</router-link>
                <span>|</span>
                <span>注册</span>
            </p>
        </div>
        <!-- 定位城市 -->
        <div class="dingwei">
            <p class="ding">
                <span>当前定位城市:</span>
                <span>定位不准时，请在城市列表中选择</span>
            </p>
            <!-- <router-link to="/id"> -->
                <!-- 当前定位的城市 -->
                <p class="cities">
                    <span class="city">{{city}}</span>
                    
                    <span style="font-size:19px;">></span>
                </p>
            <!-- </router-link> -->
        </div>
        <!-- 热门城市 -->
        <div class="hot">
            <p class="hotCity">热门城市</p>
            <template v-for="(itemHot,indexHot) in $store.state.City.hot">
                <p class="hotA">
                    <router-link :to="{name:'city',params:{'id':itemHot.id}}">{{itemHot.name}}</router-link>
                </p>
            </template>
        </div>
        <!-- 全部的城市 -->
        <div class="allCities">
            <i-row>
                <!-- 左边全部城市 
                <i-col span=21 v-for="(item,index) in cities" :key="index">
                    <i-row v-for="(item,index) in item" :key="index">
                        <i-col>-->
                            <!-- A B C D 
                            <i-row :id="index" class="kk">{{index}}</i-row>-->
                            <!-- 城市 
                            <i-row v-for="(item,index) in item" :key="index">
                                <router-link to="city">{{item.name}}:{{item.id}}</router-link>
                            </i-row>
                        </i-col>
                    </i-row>
                </i-col>-->
                <!-- 右边拼音首字母 
                <i-col span=3 v-for="(item,index) in cities" :key="index">
                    <i-row v-for="(item,index) in item" :key="index" :fn="link(index)">
                        {{index}}
                    </i-row>
                </i-col>-->

                <!-- 左边的所有城市 -->
                <i-col span=21>
                    <template v-for="(itemShou,indexShou) in $store.state.City.arr">
                        <i-row style="margin-top:10px;" :ref="itemShou">
                            <!-- A B C D E ... -->
                            <i-row style="font-size:20px;border-bottom:1px solid #ccc;">
                                <span>{{itemShou}}(按字母排序)</span>
                            </i-row>
                            <template v-for="(itemAll) in $store.state.City.cities">
                                <!-- 对应首字母的城市 -->
                                <template v-for="(itemCity,indexCity) in itemAll[itemShou]">
                                    <p style="font-size:17px;margin-top:8px;">
                                        <router-link :to="{name:'city',params:{'id':itemCity.id}}">{{itemCity.name}}</router-link>
                                    </p>
                                </template>
                            </template>
                            <!-- {{$store.state.City.cities}} -->
                        </i-row>
                    </template>
                </i-col>
                <!-- 右边省份首字母 -->
                <i-col span=3 :class="$store.state.City.num==1?$store.state.City.rightCityFixed:$store.state.City.rightCity">
                    <template v-for="(item,index) in $store.state.City.arr">
                        <p style="margin-top:5px;">
                            <span @click="link(item)">{{item}}</span>
                        </p>
                    </template>
                    
                </i-col>
            </i-row>
        </div>
        <i-backtop :bottom="80" style="text-align:center">
            <i-icon type="md-arrow-round-up" class="icon"/>
        </i-backtop>
    </div>
</template>

<script>
export default {
  data() {
    return {
      city: ""
    };
  },
  methods: {
    link(item) {
      //   window.scrollTo(0, this.$refs[val][0].offsetTop);
      //   console.log(this.$refs[item][0].offsetTop);
    }
  },
  created() {
    this.$store.dispatch("City/AllCity");
    // console.log(this.$store);
    // 定位
    var geolocation = new BMap.Geolocation();
    // console.log(geolocation);
    let that = this;
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // 创建坐标点
          var pt = new BMap.Point(r.point.lng, r.point.lat);
          // 创建地理位置解析器
          var geoc = new BMap.Geocoder();
          geoc.getLocation(pt, function(rs) {
            // 解析格式：城市，区县，街道
            var addComp = rs.addressComponents;
            that.city = addComp.city;
            // console.log(that.city);
          });
        } else {
          alert("定位失败");
        }
      },
      { enableHighAccuracy: true }
    );
  }
};
</script>
<style>
@import "./less.css";
.toLogin {
  color: white;
}
.topShou {
  font-size: 18px;
  justify-content: space-between;
}
.ding,
.cities {
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.city {
  font-size: 18px;
  color: #3191e8;
}
.hot,
.allCities {
  margin-top: 15px;
}
.hotCity {
  padding: 8px 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.hotA {
  display: inline-block;
  width: 25%;
  padding: 12px 0;
  font-size: 20px;
  text-align: center;
  border: 0.2px solid #ccc;
  color: #3191e8;
}
.allCities {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
}

</style>
