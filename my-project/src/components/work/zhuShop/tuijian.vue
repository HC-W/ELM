<template>
    <div class="tuijian">
        <i-row>
            <i-col span=6 class="paixu_col">
                <i-dropdown>
                    <i-row class="paixu_col">综合排序</i-row>
                    <i-dropdownmenu slot="list">
                        <template v-for="(item,index) in $store.state.City.paiXu">
                            <template v-for="(item,index) in item['outside']['inside_sort_filter']">
                                <i-row class="paixu_row">{{item.name}}</i-row>
                            </template>
                        </template>
                    </i-dropdownmenu>
                </i-dropdown>
            </i-col>
            
            <template v-for="(item,index) in $store.state.City.paiXu">
                <template v-for="(item,index) in item['outside']['outside_sort_filter']">
                    <i-col span=6 class="paixu_col">{{item.name}}</i-col>
                </template>
            </template>
            <i-col span=6 class="paixu_col">筛选</i-col>
        </i-row>
            <!-- <h1>{{item["outside"]}}</h1> -->
        <!-- {{$store.state.City.paiXu}} -->
    </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("City/PaiXu", {
      latitude: this.$route.query.latitude,
      longitude: this.$route.query.longitude
    });
  }
};
</script>

<style>
.tuijian {
    padding: 10px 5px;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
    position: sticky;
    top: 48px;
    z-index: 10;
}
.paixu_col {
  text-align: center;
  font-size: 16px;
}
.paixu_row {
  margin-top: 8px;
  font-size: 15px;
}
</style>







