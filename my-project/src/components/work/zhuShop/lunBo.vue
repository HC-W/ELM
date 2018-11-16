<template>
    <div class="lunbo">
        <i-carousel autoplay v-model="value2" loop dots="none">
            <i-carouselitem v-for="(item,index) in $store.state.City.allImgs" :key="index">
                <img class="demo-i-carousel" :src="'https://fuss10.elemecdn.com/'+item.image_hash.substr(0,1)+'/'+item.image_hash.substr(1,2)+'/'+item.image_hash.substr(3,item.image_hash.length-3)+'.'+item.image_hash.substr(-4)" alt="">
            </i-carouselitem>
        </i-carousel>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      value2: 0
    };
  },
  created() {
    this.$store.dispatch("City/Allimgs", {
      latitude: this.$route.query.latitude,
      longitude: this.$route.query.longitude,
      name: this.$route.query.name
    });
  }
};
</script>
<style>
.lunbo {
  font-size: 20px;
}
.demo-i-carousel {
  width: 100%;
}
</style>
