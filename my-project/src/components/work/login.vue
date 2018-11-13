<template>
<div id="app">
    <div class="top topLogin">
        <span class="callBack" @click="back">返回</span>
        <span>密码登录</span>
    </div>
    <div class="content">
        <form method="post">
            <div class="inps">
                <div><input type="text" placeholder="账号"></div>
                <div><input type="password" placeholder="密码"></div>
                <div class="yanZheng">
                    <input type="text" placeholder="验证码">
                    <p>
                        <span>看不清</span>
                        <span class="huan">换一张</span>
                    </p>
                </div>
            </div>
        </form>
        <!-- 红字提示 -->
        <div class="ps">
            <p class="redP">温馨提示: 未注册过的账号，登录时会自动注册</p>
            <p class="redP">注册过的用户可凭账号密码登录</p>
        </div>
        <!-- 登录 -->
        <p class="dengA" @click="fn"><a>登录</a></p>
        <router-link to="/forget" class="up">重置密码？</router-link>
    </div>
</div>
    
</template> 

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    },
    fn() {
        console.log("登录");
    }
  }
};
</script>

<style>
@import "./less.css";
.ps {
  padding-left: 10px;
  background-color: transparent;
}
.redP {
  color: red;
  margin: 8px 0;
  font-size: 15px;
}
.up {
    margin-top: 15px;
    padding:10px;
    box-sizing: border-box;
    float: right;
    font-size: 15px;
}
</style>
