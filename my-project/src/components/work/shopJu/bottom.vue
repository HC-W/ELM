<template>
    <div class="bottom">
        <div class="shopCar">
            <i-icon type="md-cart" />
        </div>
        <div class="right">
            <div>
                <p>商品</p>
                <p>另需配送费</p>
            </div>
            <div>去结算</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.shopCar {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: 15px;
}
.right {
    width: 80%;
    float: right;
}
</style>
