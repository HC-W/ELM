<template>
    <div id="app" v-cloak>
        <div class="top topCity">
            <span class="back"><router-link to="/" style="color:white;">返回</router-link></span>
            <span>{{json.name}}</span>
            <span><router-link to="/" style="color:white;">切换城市</router-link></span>
        </div>
        <div class="search">
            <input type="text" placeholder="输入学校、商务楼、地址" class="ser_inp" v-model="searchCity">
            <p class="tiJiao" @click="tijiao">提交</p>
        </div>
        <div id="history">
            <p class="history_p">搜索历史</p>
        </div>
        <template v-for="(item,index) in shopAll">
            <router-link :to="{name:'city',params:{'id':$route.params.id},query: {'geohash':item.geohash,'name':item.name
}}" :key="index">
                <div class="shop">
                    <p>{{item.name}}</p>
                    <p class="pAddress">{{item.address}}</p>
                </div>
            </router-link>
            <!-- {{item}} -->
        </template>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            json: "",
            searchCity:"",
            shopAll:[]
        }
    },
    methods: {
        tijiao() {
            this.$ajax.ajax({
                url: '/Api/v1/pois?type=search&city_id='+this.$route.params.id+'&keyword='+this.searchCity,
                dataType: "json"
            }).then(data => {
                this.shopAll = data;
                console.log(this.shopAll)
            })
        }
    },
    // 请求点击哪个获取的数据
    async created() {
        let ind = this.$route.params.id;
        // console.log(ind);
        let data = await (await fetch('/Api/v1/cities/'+ind)).json();
        // this.json.push(data);
        this.json = data;
        // console.log(this.json);
    }
};
</script>

<style>
@import './less.css';
.search {
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
}
.ser_inp {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.tiJiao {
    margin-top: 15px;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3191E8;
    font-size: 18px;
    color: white;
}
#history {
    background-color: transparent;
}
.history_p {
    padding-left: 10px; 
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.shop {
    padding: 15px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}
.shop p:nth-child(1){
    font-size: 18px;
}
.shop p:nth-child(2){
    font-size: 14px;
}
</style>
