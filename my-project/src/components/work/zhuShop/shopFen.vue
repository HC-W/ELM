<template>
    <div class="shopFen">
        <i-row>
            <i-col v-for="(item,index) in shopTop" :key="index" span=6 style="text-align:center;" v-if="index<8">
                <i-avatar :src="'https://fuss10.elemecdn.com'+item.image_url" class="touxiang"></i-avatar>
                <p>{{item.title}}</p>
            </i-col>
        </i-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopTop: []
        }
    },
    // 请求数据
    async created() {
        let data = await (await fetch('/Api/v2/index_entry?geohash='+this.$route.query.geohash)).json();
        // console.log(data);
        this.shopTop = data;
    }
}
</script>

<style>
.shopFen {
    padding: 10px;
    box-sizing: border-box;
}
.touxiang {
    width: 60px;
    height: auto;
}
p {
    font-size: 15px;
    font-weight: 700;
}
</style>
