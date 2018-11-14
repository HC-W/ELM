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
                <div><input type="text" placeholder="账号" v-model="user"></div>
                <div><input type="password" placeholder="旧密码" v-model="oldPad"></div>
                <div><input type="password" placeholder="请输入新密码" v-model="newPad"></div>
                <div><input type="password" placeholder="请确认密码" v-model="endPad" @blur="endMm"></div>
                <b>{{msg}}</b>
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
        
        <p class="dengA" @click="reset"><a>确认修改</a></p>
    </div>
</div>
    
</template> 

<script>
export default {
  data() {
    return {
      imgs: "",
      user: "",
      oldPad: "",
      newPad: "",
      endPad: "",
      msg: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
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
    },
    // 最终密码的失焦判断
    endMm() {
        if(this.endPad != this.newPad) {
            this.msg = "密码不同，请重新输入"
        }else {
            this.msg = ""
        }
    },
    // 更改密码
    reset() {
      this.$ajax
        .ajax({
          url: "/Login/reset",
          type: "POST",
          data: {
            user: this.user,
            oldPassword: this.oldPad,
            newPassword: this.newPad,
            endPassword: this.endPad
          }
        })
        .then(data => {
         if(data["err"] == 1) {
              alert(data["msg"]);
          }else{
              alert("成功");
              this.$router.go(-2);
          }
        });
    }
  },
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
</style>

