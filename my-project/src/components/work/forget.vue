<template>
<div id="app">
    <div class="top topLogin">
        <!-- 点击返回上一页 -->
        <span class="callBack" @click="back">返回</span>
        <span>重置密码</span>
    </div>
    <div class="content">
        <form method="post">
            <div class="inps">
                <div><input type="text" placeholder="账号"></div>
                <div><input type="password" placeholder="旧密码"></div>
                <div><input type="password" placeholder="请输入新密码"></div>
                <div><input type="password" placeholder="请确认密码"></div>
                <div class="yanZheng">
                    <input type="text" placeholder="验证码">
                    <p>
                        <span>看不清</span>
                        <span class="huan">换一张</span>
                    </p>
                </div>
            </div>
        </form>
        
        <p class="dengA"><a>确认修改</a></p>
    </div>
</div>
    
</template> 

<script>
export default {
  methods: {
    //   点击返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
@import "./less.css";
</style>

