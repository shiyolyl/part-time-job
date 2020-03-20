<template>
  <div class="login_wrap clearfix">
    <div class="login_left">
      <img src="../../../../static/img/login.png" alt="">
    </div>
    <div class="login_info">
      <div class="logo_img">
          <img src="../../../../static/img/logo.png" alt="">
      </div>
      <div class="input_phone">
          <el-input placeholder="请输入常用手机号" v-model="mobile" class="input-with-select">
            <el-select v-model="phone_pre" slot="prepend" placeholder="">
              <el-option label="0086" value="1"></el-option>
            </el-select>
          </el-input>
      </div>
      <div class="input_code">
          <el-input placeholder="请输入验证码" v-model="code">
          </el-input>
          <div v-if="!codeStatus" class="get_code_btn" @click="getMsgCode">获取验证码</div>
          <div v-else class="get_code_btn time">{{time}}</div>
      </div>
      <div class="login_btn" @click="handelLogin">登录</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        phone_pre:'1',
        mobile:'',
        codeStatus:false,
        code:'',
        time:60,
        interval:'',
      }
    },
    created(){
        sessionStorage.clear();
    },
    methods:{
        //获取验证码
        getMsgCode(){
            //验证手机号
            if(!this.mobile.trim()){
                this.$alert('请输入手机号！', '发送验证码', {
                    confirmButtonText: '确定',
                });
                return;
            };
            if(this.mobile.trim().length!=11){
                this.$alert('请输入正确格式的手机号！', '发送验证码', {
                    confirmButtonText: '确定',
                });
                return;
            };
            this.$axios.get('/member/sendphone?mobile='+this.mobile)
            .then((res)=>{
                if(res.data.code==1001){
                    this.codeStatus = true;
                    this.setTime();
                }else{
                    this.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                    });
                }
            }).catch((err) => {
                conole.log(err)
            })
        },
        //验证码倒计时
        setTime(){
            this.interval = window.setInterval(()=>{
                this.time--;
                if(this.time <= 0) {
                    this.time = 60;
                    this.codeStatus = false;
                    window.clearInterval(this.interval);
                }
            }, 1000);
        },
        //登录
        handelLogin(){
            if(!this.mobile.trim()){
                this.$alert('请输入手机号！', '登录', {
                    confirmButtonText: '确定',
                });
                return;
            };
            if(this.mobile.trim().length!=11){
                this.$alert('请输入正确格式的手机号！', '登录', {
                    confirmButtonText: '确定',
                });
                return;
            };
            if(!this.code.trim()){
                this.$alert('请输入验证码！', '登录', {
                    confirmButtonText: '确定',
                });
                return;
            };
            this.$axios.post('/member/loginbyphonecode',{
                mobile:this.mobile,
                phonecode:this.code
            })
            .then((res)=>{
                if(res.data.code==1001){
                    sessionStorage.token=res.data.data.token;
                    sessionStorage.uid=res.data.data.uid;
                    sessionStorage.user_phone=res.data.data.user_phone;
                    sessionStorage.user_name=res.data.data.user_name;
                    sessionStorage.urldata=res.data.data.urldata;
                    // firstlogin: "true"
                    this.$router.push('./index')
                }else{
                  this.$alert(res.data.msg, '提示', {
                      confirmButtonText: '确定',
                  });
                }
            }).catch((err) => {
                conole.log(err)
            })
        },

    }
  }
  
</script>
<style lang="less" scoped>
.login_wrap{
  width:100%;
  display:flex;
  align-items:center;
  padding-top:100px;
  padding-bottom:250px;
  .login_left{
    width:442px;
    height:338px;
    img{
      width:100%;
      height:100%;
    }
  }
  .login_info{
    margin-left:238px;
    width:436px;
    height:450px;
    background-color: #fff;
    border-radius:2px;
    text-align:center;
    .logo_img{
      margin-top:56px;
      margin-bottom:66px;
      img{
          width:110px;
          height:22px;
      }
    }
    .input_phone,.input_code{
      width:312px;
      height:48px;
      background-color: #F0F5FA;
      margin:0 auto;
      margin-bottom:20px;
    }
    .input_code{
      position:relative;
      .get_code_btn{
        height:48px;
        line-height:48px;
        position:absolute;
        top:0;
        right:10px;
        color:@theme-color;
        cursor: pointer;
      }
      .time{
          right:20px;
          cursor: default;
      }
    }
    .login_btn{
      width:312px;
      height:48px;
      text-align: center;
      line-height: 48px;
      margin:0 auto;
      background-color: @theme-color;
      color:#fff;
      font-size:18px;
      margin-top:44px;
      border-radius:2px;
      cursor: pointer;
    }
  }

}
</style>
<style lang="less">
  .login_wrap{
    .login_info{
      .el-input__inner{
        height:48px;
        line-height:48px;
        background-color: #F0F5FA;
        border:none;
      }
      .el-input-group__prepend div.el-select .el-input__inner{
        background-color: #F0F5FA;
      }
      .el-input-group__prepend{
        border:none;
      }
      .el-input-group__append, .el-input-group__prepend{
        width:40px;
      }
    }
  }
  
</style>