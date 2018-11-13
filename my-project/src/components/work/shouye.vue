<template>
    <div id="app">
        <!-- 头部 -->
        <div class="top topShou">
            <span>ele.me</span>
            <p>
                <router-link to="/login" class="toLogin">登录</router-link>
                <span>注册</span>
            </p>
        </div>
        <!-- 定位城市 -->
        <div class="dingwei">
            <p class="ding">
                <span>当前定位城市:</span>
                <span>定位不准时，请在城市列表中选择</span>
            </p>
            <p class="cities">
                <!-- 当前定位的城市 -->
                <span class="city">郑州</span>
                <span style="font-size:19px;">></span>
            </p>
        </div>
        <!-- 热门城市 -->
        <div class="hot">
            <p class="hotCity">热门城市</p>
            <span v-for="(item,index) in $store.state.City.hot" :key="index" class="hotA">
                {{item.name}}
            </span>
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
                    <i-row v-for="(item,index) in $store.state.City.arr" :key="index" style="margin-top:10px;">
                        <!-- A B C D E ... -->
                        <i-row style="font-size:20px;border-bottom:1px solid #ccc;" :id="item" :ref="item">{{item}}(按字母排序)</i-row>
                        <template v-for="(itemAll) in $store.state.City.cities">
                            <!-- 对应首字母的城市 -->
                            <i-row v-for="(item,index) in $store.state.City.cities[itemAll]" :key="index" style="font-size:17px;margin-top:8px;">
                                {{item.name}}
                            </i-row>
                        </template>
                        <!-- {{$store.state.City.cities}} -->
                    </i-row>
                </i-col>
                <!-- 右边省份首字母 -->
                <i-col span=3 :class="$store.state.City.num==1?$store.state.City.rightCityFixed:$store.state.City.rightCity">
                    <template v-for="(item,index) in $store.state.City.arr">
                        <i-row :key="index" style="margin-top:10px;">
                            {{item}}
                        </i-row>
                    </template>
                    
                </i-col>
            </i-row>
        </div>
    </div>
</template>

<script>
export default {
  //   data() {

  //     return {
  //         // 热门的json数据
  //       hot: [],
  //     //   全部城市的json数据
  //       cities: [],
  //       num:0,
  //       arr:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
  //       rightCity: {
  //           "text-align":"center"
  //       },
  //       rightCityFixed: {
  //           "text-align":"center",
  //           position:"fixed",
  //           top:"300px",
  //           right:"20px"
  //       }
  //     };
  //   },
  // //   数据请求
  //   async created() {
  //     let hot = await (await fetch("/Api/v1/cities?type=hot")).json();
  //     this.hot = hot;
  //     let cities = await (await fetch("/Api/v1/cities?type=group")).json();
  //     this.cities.push(cities);
  //   },
  //   methods:{
  //       linkR(val) {
  //         //   window.scrollTo(0,this.$refs[val][0].offsetTop);
  //         console.log(val);
  //       }
  //   }
  created() {
    return this.$store.dispatch("City/AllCity");
    console.log(this.$store);
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
