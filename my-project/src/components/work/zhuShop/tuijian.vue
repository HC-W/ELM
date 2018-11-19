<template>
    <div class="shoptitle">
        <div cc-Row class="title">
            <div>
                <i-dropdown trigger="click" style="margin-left: 20px">
                <a href="javascript:void(0)">
                    <span @click="Tab(0)">综合排序</span><i-icon type="ios-arrow-down"></i-icon>
                </a>
                <i-dropdownmenu slot="list">
                    <i-dropdownitem><span @click="Tab(0)">综合排序</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(1)">好评优先</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(2)">销量最高</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(3)">起送价最低</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(4)">配送最快</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(5)">配送费最低</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(6)">人均从低到高</span></i-dropdownitem>
                    <i-dropdownitem><span @click="Tab(7)">人均从高到低</span></i-dropdownitem>
                </i-dropdownmenu>
            </i-dropdown>
            </div>
            <div @click="Tab(8)">距离最近</div>
            <div @click="Tab(9)">品质联盟</div>
            <div @click="Tab(10)">筛选</div>
        </div>  
    </div>
</template>


<script>
export default {
    created() {
        this.$store.dispatch("City/PaiXu", {
            latitude: this.$route.query.latitude,
            longitude: this.$route.query.longitude
        });
    },
    methods: {
        Tab(num) {
            this.$store.dispatch("City/PaixuLate",num);
            console.log(num);
        }
    }
  
};
</script>

<style>
.shoptitle{
    padding: 10px;
    text-align: center;
    background-color: white;
    position: sticky;
    top: 50px;
    z-index: 999;

}
.title{
    z-index: 888;
    display: flex;
    justify-content: space-between;
}
.title>div {
    font-size: 16px;
}
.ivu-select-dropdown{
    width: 100%;
}
.ivu-dropdown-menu{
    text-align: left;
}
.ivu-dropdown-menu span {
    display: block;
    padding: 10px;
    font-size: 16px;
}
</style>








