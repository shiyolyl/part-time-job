<template>
    <div class="header_wrap">
        <div class="header_content">
            <div class="logo_img">
                <img src="../../../static/img/logo2.png" alt=""@click="goIndex">
            </div>
            <div class="search">
                <el-input v-model="searchValue" placeholder="请输入职位 / 公司名 进行搜索" @input="handleChange" @keyup.native.enter="handleSearch"></el-input>
                <i class="el-icon-search"></i>
            </div>
            <div class="login_btn" v-show="currentPath!='/login' && !token">
                <router-link class="register" :to="{path:'/login',query:{}}">注册</router-link>/
                <router-link class="login" :to="{path:'/login',query:{}}">登录</router-link>
            </div>
            <div class="user_info" v-show="currentPath!='/login' && token" @click="goUserInfo">
                <div class="avatar">
                    <img :src="avatarUrl" alt="">
                </div>
                <span class="phone">{{user_name}}</span>
            </div>
            
        </div>
        
    </div>
</template>
<script>
import eventBus from '../../assets/eventBus';
export default{
    data(){
        return{
            searchValue:'',
            avatarUrl:sessionStorage.urldata,
            currentPath:'',
            token:'',
            user_phone:sessionStorage.user_phone,
            user_name:sessionStorage.user_name
            
        }
    },
    created(){
        this.currentPath = this.$route.path;
        this.token=sessionStorage.token?sessionStorage.token:'';
    },
    watch: {
        '$route':{
            handler(to, from) {
                this.currentPath = this.$route.path;
                this.token=sessionStorage.token?sessionStorage.token:'';
                if(this.currentPath!='/index'){
                    this.searchValue='';
                }else{
                    this.user_name=sessionStorage.user_name;
                    this.avatarUrl=sessionStorage.urldata;
                }
            },
        }
        
    },
    methods:{
        handleChange(value){
            this.$store.commit('changeKeyWords',value);
        },
        handleSearch(){
            this.$router.push('/index');
            eventBus.$emit('handle-search');
        },
        goUserInfo(){
            this.$router.push('./personal');
        },
        goIndex(){
            this.$router.push('./index');
        }
    }
}

</script>
<style lang="less" scoped>
.header_wrap{
    width:100%;
    height:80px;
    background:rgba(255,255,255,1);
    .header_content{
        width:1170px;
        height:100%;
        margin:0 auto;
        display:flex;
        align-items:center;
        position:relative;
        .logo_img{
            font-size:30px;
            font-family:'YouSheBiaoTiHei';
            font-weight:400;
            color:@theme-color;
            line-height:80px;
            display:inline-block;
            img{
                width:110px;
                height:24px;
                cursor: pointer;
            }
        }
        .search{
            width:500px;
            height:48px;
            display:inline-block;
            margin-left:251px;
            position: relative;
        }
        .el-icon-search{
            position:absolute;
            left:15px;
            top:18px;
        }
        .login_btn{
            font-size:18px;
            color:@theme-color;
            position:absolute;
            right:0;
            .register,.login{
                color:@theme-color;
            }
        }
        .user_info{
            position:absolute;
            right:55px;
            display:flex;
            align-items:center;
            cursor: pointer;
            .avatar{
                width:34px;
                height:34px;
                border-radius:50%;
                cursor: pointer;
                display:inline-block;
                img{
                    width:100%;
                    height:100%;
                    border-radius:50%;
                }
            }
            .phone{
                color:#333333;
                font-size:18px;
                line-height:80px;
                margin-left:10px;
            }
        }
        
    }
}
</style>
<style>
.header_wrap .search .el-input__inner{
    height:48px;
    line-height:48px;
    background-color:rgba(240,244,248,1);
    border-radius:24px;
}
.search .el-input__inner{
    padding-left:40px;
}
</style>