<template>
    <div id="app">
        <!-- 头部 -->
        <div class="topS">
            <p>
                <span class="back" @click="back">返回</span>
                <span>
                    <router-link to="/" style="color:white;font-size:25px;margin-left:8px;">{{$route.query.name}}</router-link>
                </span>
            </p>
        </div>
        <!-- 搜索 -->
        <zhu-search></zhu-search>
        <!-- 商品分类 -->
        <shop-fen></shop-fen>
        <!-- 轮播图 -->
        <lun-bo></lun-bo>
        <p class="tui">-- 推荐商家 --</p>
        <!-- 推荐商家排序方式 -->
        <tuijian-title></tuijian-title>
        <shopping></shopping>
        <i-backtop :bottom="80" style="text-align:center">
            <i-icon type="md-arrow-round-up" class="icon"/>
        </i-backtop>
    </div>
</template>

<script>
// 局部组件的引用
import ShopFen from "./zhuShop/shopFen.vue";
import ZhuSearch from "./zhuShop/zhuSearch.vue";
import LunBo from "./zhuShop/lunBo.vue";
import TuijianTitle from './zhuShop/tuijian.vue';
import Shopping from './zhuShop/shopping.vue';
export default {
    
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  // 局部组件
  components: {
    ShopFen,
    ZhuSearch,
    LunBo,
    TuijianTitle,
    Shopping
  }
};
</script>

<style>
@import "./less.css";
.topS {
   padding: 10px;
    box-sizing: border-box;
    background-color: #3191E8;
    color: white;
    border-bottom: 0;
}
input {
    width: 80%;
    text-align: center;
    font-size: 15px;
    padding: 8px;
}
.searchSP {
    display: inline-block;
    width: 17%;
    margin-left: 3%;
    height: 32px;
    background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}
.tui {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
}
</style>
