<template>
    <div class="index_wrap">
        <div class="carousel">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in carouselData" :key="item.p_id">
                    <div class="carousel_img">
                        <a :style="'background:url('+item.thumb+') no-repeat;background-size:cover'"></a>
                    </div>
                </el-carousel-item> 
            </el-carousel>
        </div>
        <div class="part-timeJob_type clearfix">
            <div class="type_title">兼职类型：</div>
            <div class="type_content">
                <el-tabs v-model="activeJobType" @tab-click="handleClickTab_jobType">
                    <el-tab-pane v-for="item in jobTypeArr" :key="item.id" :label="item.type_name" :name="item.id.toString()">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="jobs clearfix">
            <div class="left_wrap">
                <div class="left_menu">
                    <div class="job_tab">
                        <el-tabs v-model="activeSort" @tab-click="handleClickTabSort">
                            <el-tab-pane label="综合排序" name="1"></el-tab-pane>
                            <el-tab-pane label="最新发布" name="2"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="jobTotalNum">
                        为您优选<span class="jobCount">{{total}}</span>个放心职位
                    </div>
                </div>
                <div class="job_detail" v-loading="loading">
                    <div class="job_item" v-for="(item,index) in jobData" :key="item.id" @click="goDatailPage(item.id,item.pid)">
                        <div class="item1">
                            <div class="job_name">{{item.product_name}}</div>
                            <div class="price">{{item.remuneration}}{{item.remuneration_type}}</div>
                            <div calss="other_info">结算类型：{{item.settlement}}</div>
                        </div>
                        <div class="item2">
                            <div calss="info_company">{{item.company_name}}</div>
                            <div calss="other_info">工作时间：{{item.recruitment}}</div>
                            <div calss="other_info">工作地点：{{item.recruit_addres}}</div>
                        </div>
                        <div class="apply" v-if="item.is_do==0">
                            <div class="applyBtn" @click.stop="handleApply(item)">申请</div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="per_page"
                    :current-page.sync="current_page"
                    @current-change ="handleCurrentChange"
                >
                </el-pagination>
            </div>
            <div class="right_wrap">
                <div class="recent_view">已投递</div>
                <div class="recentViewJobs">
                    <div class="recentViewJobs_item clearfix" v-for="(item,index) in recentViewJobData" :key="item.pid">
                        <div class="job_info">
                            <div>{{item.product_name}}</div>
                            <div class="job_type">工作类型：{{item.settlement}}&nbsp|&nbsp;{{item.recruitment}}</div>
                        </div>
                        <div class="job_price">
                            {{item.remuneration}}{{item.remuneration_type}}
                        </div>
                    </div>
                </div>
                <div class="advertising">
                    <div class="advertising_item" v-for="item in advertising">
                        <a :style="'background:url('+item.thumb+') no-repeat;background-size:cover'"></a>
                    </div>
                </div>
                <div class="qrcode">
                    <img src="../../../../static/img/qrcode2.png" alt="">
                    <div class="qrcode_text">
                        <div>手机微信扫一扫</div>
                        <div>随时随地找工作</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventBus from '../../../assets/eventBus';
export default{
    data(){
        return{
            carouselData:[],
            activeJobType:'1',
            activeSort:'1',
            jobTypeArr:[],
            jobData:[],
            loading:true,
            page:1,
            per_page:5,
            current_page:this.page,
            total:0,
            keywords:sessionStorage.keywords || '',
            recentViewJobData:[],
            advertising:[],
        }
    },
    created(){
        this.getBannerData(2,'carouselData');
        this.getBannerData(1,'advertising');
        this.getJobType();
        this.getViewJobList();
        this.keywords=this.$store.state.keywords;
        this.getJobList();
        
            
    },
    mounted(){
        eventBus.$on('handle-search', data => {
            this.keywords=this.$store.state.keywords
            this.page=1;
            this.getJobList();
        })
    },
    beforeDestroy(){
        eventBus.$off("handle-search");
    },
    methods:{
        handleClickTab_jobType(tab, event) {
            this.page=1;
            this.getJobList();
        },
        handleClickTabSort(tab,event){
            this.page=1;
            this.getJobList();
        },
        //分页 下一页/上一页
        handleCurrentChange(val){
            this.page = val;
            this.getJobList();
        },
        //获取首页轮播图图片地址
        getBannerData(show_placement,data){
            this.$axios.get('/index/bannerInfo?show_placement='+show_placement)
            .then((res)=>{
                if(res.data.code==1001){
                    this[data]=res.data.data;
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        //职位分类
        getJobType(){
            this.$axios.get('/product/product_type')
            .then((res)=>{
                if(res.data.code==1001){
                    this.jobTypeArr=res.data.data;
                    this.activeJobType=res.data.data[0].id.toString();
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        //获取职位列表接口
        getJobList(){
            console.log(this.keywords)
            this.loading=true;
            let keyword=this.keywords;
            this.$axios.get('/product/dataList',{
                params:{
                    page:this.page,
                    limit:this.per_page,
                    type:this.activeJobType,
                    order:this.activeSort,
                    keyword:keyword.trim(),
                    token:sessionStorage.token,
                    ditch:2,
                }
            })
            .then((res)=>{
                this.loading=false;
                if(res.data.code==1001){
                    this.jobData=res.data.data;
                    this.total=res.data.total;
                    this.current_page=this.page;
                }
            }).catch((err) => {
                console.log(err)
                this.loading=false;
            })
        },
        //最近浏览 已投递列表
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
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        goDatailPage(id,pid){
            this.$router.push({
                path: '/detail',
                query: {
                    id: id,
                    pid:pid
                }
            })
        },
        //申请
        handleApply(item){
            this.$axios.get('/order/order_create',{
                params:{
                    pid:item.pid,
                    token:sessionStorage.token,
                    ditch:2,
                }
            })
            .then((res)=>{
                if(res.data.code==1001){
                    this.$alert('<p>请尽快联系企业，完成录取。</p><div class="apply_company_info">'+item.contact_name+'：'+item.contact_qq, '报名成功', {
                        confirmButtonText: '好的',
                        dangerouslyUseHTMLString: true,
                        center: true,
                        customClass:'apply_message_box'
                    });
                    this.getJobList();
                }
                if(res.data.code==1000){
                    this.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('./login')
                        }
                    });
                }
                if(res.data.code==1002){
                    this.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                    });
                }
            }).catch((err) => {
                console.log(err)
            })
        }
       
    }
}

</script>
<style lang="less" scoped>
.index_wrap{
    .carousel{
        width:100%;
        height:500px;
        margin-top:20px;
        .carousel_img{
            width:100%;
            height:100%;
            a{
                display:inline-block;
                width:100%;
                height:100%;
            }
            img{
                width:100%;
                height:100%;
            }
        }
    }
    .part-timeJob_type{
        width:calc(100% - 30px);
        height:100px;
        line-height:100px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding-left:30px;
        margin-bottom:10px;
        .type_title{
            float:left;
            font-size:14px;
            color:#5A5F64;
        }
        .type_content{
            float:left;
        }
    }
    .jobs{
        width:100%;
        margin-bottom:160px;
        .left_wrap{
            width:873px;
            border-radius:2px;
            margin-right:18px;
            float:left;
            .left_menu{
                width:calc(100% - 30px);
                padding-left:30px;
                height:53px;
                position: relative;
                background:#fff;
                .job_tab{
                    font-size:14px;
                    width: 249px;
                }
                .jobTotalNum{
                    position: absolute;
                    right:40px;
                    top:0;
                    color:#5A5F64;
                    line-height:53px;
                    .jobCount{
                        color:@theme-color;
                    }
                }
            }
            .job_detail{
                width:100%;
                background:#fff;
                .job_item{
                    width:calc(100% - 30px);
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
                    flex:4;
                }
                .item2{
                    flex:3;
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
                .apply{
                    flex:2;
                }
            }
        }
        .right_wrap{
            width:279px;
            border-radius:2px;
            float:right;
            .recent_view{
                width:calc(100% - 20px);
                height:53px;
                background-color:#fff;
                padding-left:20px;
                font-size:16px;
                color:rgba(40,45,50,1);
                line-height:53px;
            }
            .recentViewJobs_item{
                width:calc(100% - 40px);
                background-color: #fff;
                border-top:1px solid rgba(234,238,242,1);
                padding:15px 20px;
                line-height:24px;
                .job_info{
                    float:left;
                    color:rgba(40,45,50,1);
                    font-size:14px;
                    max-width: 172px;
                    .job_type{
                        color:#5A5F64;
                    }
                }
                .job_price{
                    float:right;
                    color:@theme-color;
                    font-size:14px;
                }
            }
            .advertising{
                width:100%;
                .advertising_item{
                    width:100%;
                    height:158px;
                    margin-top:20px;
                    a{
                        width:100%;
                        height:100%;
                        display:block;
                    }
                    /* img{
                        width:100%;
                        height:100%;
                    } */
                }
            }
            .qrcode{
                width:100%;
                height:158px;
                background-color:#fff;
                display:flex;
                align-items:center;
                justify-content:center;
                margin-top:20px;
                img{
                    width:100px;
                    height:100px;
                }
                .qrcode_text{
                    font-size: 14px;
                    color:#282D32;
                    line-height:24px;
                    margin-left:20px;
                }
            }
        }
    }
}

</style>
<style lang="less">
.index_wrap{
    .carousel .el-carousel__container{
        height:500px!important;
    }
    .job_tab .el-tabs__item{
        color:#5A5F64;
    }
    .el-tabs__item.is-active{
        color:@theme-color;
    }
    .el-tabs__item:hover{
        color:@theme-color;
    }
    .el-tabs__nav-wrap::after{
        display:none;
    }
    .el-tabs__active-bar{
        display:none;
    }
    .part-timeJob_type .el-tabs__item{
        padding:0 10px;
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
.apply_message_box{
    width:480px;
    .apply_company_info{
        width:100%;
        height:60px;
        line-height:60px;
        background:rgba(253,242,236,1);
        border-radius:4px;
        margin-top:39px;
        margin-bottom:20px;
    }
    .el-message-box__title{
        color:@theme-color;
        font-size:30px;
    }
    .el-message-box__header{
        padding-top:35px!important;
    }
    .el-message-box__btns .el-button--small{
        width:280px;
        height:51px;
        line-height:35px;
        font-size:20px;
    }
}
 
</style>