<template>
<div id="app">
    <div class="top topLogin">
        <span class="callBack" @click="back"><i-icon type="ios-arrow-back" /></span>
        <span>密码登录</span>
    </div>
    <div class="content">
        <form method="post">
            <div class="inps">
                <div><input type="text" placeholder="账号" v-model="user"></div>
                <div class="swit">
                    <!-- 密码输入框 -->
                    <input :type="isShow?'text':'password'" placeholder="密码" v-model="pad">
                    <!-- 密码显示隐藏的开关按钮 -->
                    <i-switch class="iswit" size="large" @on-change="isShow=!isShow">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <!-- 验证码部分 -->
                <div class="yanZheng">
                    <input type="text" placeholder="验证码">
                    <div>
                        <img :src="imgs" alt="" style="width:65px;height:45px;margin-right:5px;">
                        <p @click="change">
                            <span>看不清</span>
                            <span class="huan">换一张</span>
                        </p>
                        
                    </div>
                </div>
            </div>
        </form>
        <!-- 红字提示 -->
        <div class="ps">
            <p class="redP">温馨提示: 未注册过的账号，登录时会自动注册</p>
            <p class="redP">注册过的用户可凭账号密码登录</p>
        </div>
        <!-- 登录 -->
        <p class="dengA" @click="login"><a>登录</a></p>
        <router-link to="/forget" class="up">重置密码？</router-link>
    </div>
</div>
    
</template> 

<script>
export default {
  data() {
    return {
        // 验证码
      imgs: "",
    //   用户名和密码
      user: "",
      pad: "",
    //   显示隐藏
      isShow: false
    };
  },
  methods: {
    //   返回上一页
    back() {
      this.$router.go(-1);
    },
    // 登录请求数据
    login() {
      this.$ajax.ajax({
          url: "/Login/login",
          type: "POST",
          dataType: "json",
          data: {
              user: this.user,
              password: this.pad
          }
      }).then(data => {
          if(data["err"] == 1) {
              alert(data["msg"]);
          }else{
              alert("成功");
              this.$router.go(-1);
          }
        // console.log(data)
      })
    },
    // 点击改变验证码
    change() {
      this.$ajax
        .ajax({
          url: "/Api/v1/captchas",
          type: "POST",
          dataType: "json"
        })
        .then(data => {
          this.imgs = data.code;
        //   console.log(this.imgs.code);
        });
    }
  },
//   刷新页面生成验证码
  created() {
    this.$ajax
      .ajax({
        url: "/Api/v1/captchas",
        type: "POST",
        dataType: "json"
      })
      .then(data => {
        this.imgs = data.code;
        // console.log(this.imgs.code);
      });
  }
};
</script>

<style>
@import "./less.css";
div{
    background-color: white;
}
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
  padding: 10px;
  box-sizing: border-box;
  float: right;
  font-size: 15px;
}
.swit {
    display: flex;
    justify-content: space-between;
}
</style>
