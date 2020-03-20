<template>
    <div class="personal_wrap clearfix">
        <div class="tab_block">
            <el-tabs v-model="activeName" tab-position="left" @tab-click="handleTabClick">
                <el-tab-pane :label="'个人资料'+'\n'+''" name="profile"">
                    <div class="clearfix">
                        <div class="profile">
                            <div class="profile_title">
                                基本信息
                            </div>
                            <div class="input_title">昵称</div>
                            <div class="nickname_input">
                                <el-input v-model="nickname" placeholder=""></el-input>
                            </div>
                            <div class="input_title">邮箱</div>
                            <div class="nickname_input">
                                <el-input v-model="email" placeholder=""></el-input>
                            </div>
                            <div class="input_title">个人简介</div>
                            <div class="personal_brief">
                                <el-input type="textarea" v-model="personalBrief" :autosize="{ minRows: 2, maxRows: 4}" placeholder=""></el-input>
                            </div>
                            <div class="update_btn" @click="handleUpdateProfile">更新资料</div>
                        </div>
                        <div class="avatar">
                            <div class="head_img">
                                    <img :src="imgUrl" alt="">
                            </div>
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                :show-file-list="false"
                                action="https://zhongxiangwy.cn/api/member/upload_img"
                                :on-success="handleUpload"
                                :on-change="handleUploadChange"
                                :file-list="fileList"
                                :data="{token:token,ditch:2,}"
                                >
                                <div class="upload_img">
                                    <img src="../../../../static/img/upload.png" alt="">
                                    <span class="upload_text">更换头像</span>
                                </div>
                            </el-upload>
                        </div>
                    </div>
                    
                </el-tab-pane>
                <el-tab-pane :label="'我的投递'+'\n'+''" name="myjob">
                    <div class="nodata" v-if="recentViewJobData.length==0">
                        <div class="nodata_img">
                            <img src="../../../../static/img/nojob.png" alt="">
                        </div>
                        <div class="nodata_text">暂无投递</div>
                    </div>
                    <div class="myjobs" v-else>
                        <div class="job_item" v-for="(item,index) in recentViewJobData" :key="item.id">
                            <div class="item1">
                                <div class="job_name">{{item.product_name}}</div>
                                <div class="price">{{item.remuneration}}{{item.settlement}}</div>
                                <div calss="other_info">结算类型：{{item.settlement}}</div>
                            </div>
                            <div class="item2">
                                <div calss="info_company">{{item.recruit_addres}}</div>
                                <div calss="other_info">工作时间：{{item.recruitment}}</div>
                                <div calss="other_info">工作地点：{{item.recruit_addres}}</div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="per_page"
                        :current-page.sync="current_page"
                        @current-change ="handleCurrentChange"
                    >
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
            <div class="tip_info1" :style="activeName=='profile'?'color:#333':''">完善资料方便申请</div>
            <div class="tip_info2" :style="activeName=='myjob'?'color:#333':''">投递过的职位在这里</div>
        </div>
        
    </div>
</template>
<script>
    export default{
        data(){
            return{
                activeName:'profile',
                nickname:sessionStorage.user_name,
                email:'',
                personalBrief:'',
                file:'',
                fileList:[],
                recentViewJobData:[],
                token:sessionStorage.token,
                imgUrl:'../../../../static/img/default_head.png',
                page:1,
                per_page:5,
                current_page:this.page,
                total:5,
            }
        },
        created(){
            this.getUserInfo();
        },
        methods:{
            handleTabClick(tab,event){
                if(tab.name=='myjob'){
                    this.getViewJobList();
                }
            },
            handleCurrentChange(val){
                this.page = val;
                this.getJobList();
            },
            //获取用户信息
            getUserInfo(){
                this.$axios.get('/member/userinfo',{
                    params:{
                        token:sessionStorage.token,
                    }
                })
                .then((res)=>{
                    if(res.data.code==1001){
                        this.nickname=res.data.data.user_name;
                        this.email=res.data.data.email;
                        if(res.data.data.uesr_head){
                            this.imgUrl=res.data.data.uesr_head;
                        }
                        this.personalBrief=res.data.data.autograph;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            //更新资料
            handleUpdateProfile(){
                this.$axios.get('/member/setuserinfo',{
                    params:{
                        token:sessionStorage.token,
                        user_name:this.nickname,
                        email:this.email,
                        autograph:this.personalBrief,
                        ditch:2,
                    }
                })
                .then((res)=>{
                    if(res.data.code==1001){
                        this.$alert('更新成功！', '提示', {
                            confirmButtonText: '确定',
                        });
                    }else{
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                }).catch((err) => {
                    conole.log(err)
                })
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleUpload(response, file, fileList){
                if(response.code==1001){
                    this.imgUrl="https://zhongxiangwy.cn"+response.data.img;
                }
            },
            handleUploadChange(file, fileList) {
                this.file = fileList[0];
            },
            getViewJobList(){
                this.$axios.get('/order/order_list',{
                        params:{
                        token:sessionStorage.token,
                        is_selected:1,
                        ditch:2,
                    }
                })
                .then((res)=>{
                    if(res.data.code==1001){
                        this.recentViewJobData=res.data.data;
                        this.total=res.data.total;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
        },
        
    }
    
</script>
<style lang="less" scoped>
.personal_wrap{
    width:100%;
    margin-bottom:17px;
    background-color:#fff;
    margin-top:5px;
    padding-top:60px;
    .tab_block{
        margin-left:65px;
        position:relative;
        padding-bottom:40px;
        .tip_info1,.tip_info2{
            position: absolute;
            color:#999999;
        }
        .tip_info1{
            left:-27px;
            top:30px;
        }
        .tip_info2{
            left:-40px;
            top:90px;
        }
        .profile_title{
            color:#333;
            font-size:18px;
        }
        .input_title{
            color:#666666;
            margin-top:36px;
            margin-bottom:18px;
        }
        .update_btn{
            width:315px;
            height:48px;
            border-radius:4px;
            line-height:48px;
            text-align:center;
            color:#fff;
            font-size:18px;
            background-color:@theme-color;
            margin-top:44px;
            cursor: pointer;
        }
    }
    .profile{
        float: left;
        padding-bottom: 244px;
    }
    .avatar{
        float: left;
        margin-left:100px;
        padding-top:75px;
        .head_img{
            width:148px;
            height:148px;
            border-radius:50%;
            img{
                width:100%;
                height:100%;
                border-radius: 50%;
            }
        }
        .upload_img{
            width:113px;
            height:32px;
            line-height:32px;
            border:1px solid rgba(192,192,192,1);
            border-radius:4px;
            color:#666;
            margin-top:13px;
            margin-left:17px;
            img{
                width:14px;
                height:14px;
            }
            .upload_text{
                margin-left:5px;
            }
        }
        
    }
    .nodata{
        margin-left:300px;
        .nodata_img{
            width:180px;
            height:180px;
            img{
                width:100%;
                height:100%;
            }
        }
        .nodata_text{
            color:#999;
            font-size:18px;
            width:180px;
            text-align:center;
            margin-top:25px;
        }
        
    }
    .myjobs{
        margin-left:150px;
        padding-bottom: 30px;
        .job_item{
            /* width:calc(100% - 30px); */
            border-top:1px solid rgba(234,238,242,1);
            padding:25px 0 38px 30px;
            display:flex;
            align-items:center;
            line-height:40px;
        }
        .job_item:hover{
            background-color:#F8FCFF;
        }
        .item1{
            flex:3;
        }
        .item2{
            flex:2;
        }
        .job_name{
            font-size:20px;
            color:rgba(40,45,50,1);
        }
        .price{
            font-size:20px;
            color:@theme-color;
        }
        .info_company{
            color:#282D32;
        }
        .other_info{
            font-size:14px;
            color:#5A5F64;
        }
    }
    
}
</style>
<style lang="less">
.personal_wrap{
    .el-tabs__item{
        white-space:pre;
        height:60px;
        padding:0 15px;
        font-size:18px;
        color:#333;
        font-weight:bold;
    }
    .el-tabs__item:hover,.el-tabs__item.is-active{
        color:@theme-color;
    }
    .el-tabs__active-bar{
        background-color:@theme-color;
    }
    .el-tabs--left .el-tabs__header.is-left{
        margin-right: 30px;
    }
    .el-input__inner{
        width:315px;
        height:32px;
        line-height:32px;
        border-radius:2px;
    }
    .el-pagination{
        text-align:center;
        margin-top:50px;
    }
    .el-pager li,.el-pagination button{
        width:40px;
        height:34px;
        line-height:34px;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        background-color:#fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color:@theme-color;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color:@theme-color;
    }
}
    
</style>