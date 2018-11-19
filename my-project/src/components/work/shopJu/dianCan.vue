<template>
    <div class="tabsHuan">
        <i-tabs :animated="false">
            <i-tabpane label="点餐">
                <dian></dian>
            </i-tabpane>
            <i-tabpane label="评价">
                <ping-jia></ping-jia>
            </i-tabpane>
            <i-tabpane label="商家">
                <shops></shops>
            </i-tabpane>
        </i-tabs>
    </div>
</template>

<script>
import Dian from './diancan2.vue'
import PingJia from './pingJia.vue'
import Shops from './shops.vue'
export default {
    components: {
        Dian,
        PingJia,
        Shops
    }
}
</script>

<style>
.ivu-tabs-nav-scroll {
    padding-left: 25%;
}
</style>
