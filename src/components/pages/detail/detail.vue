<template>
    <div class="detail_wrap">
        <div class="job_brief">
            <div class="job_name">{{detailData.product_name}}</div>
            <div class="job_price"><span class="price_num">{{detailData.remuneration}}</span>{{detailData.remuneration_type}}{{detailData.settlement}}</div>
            <div class="job_info">
                <span>{{detailData.recruit_addres}}</span>
                <span>工资{{detailData.settlement}}</span>
                <span>人数：招聘{{detailData.recruit_people_num}}人</span>
            </div>
            <div class="job_tip">
                防骗指南：又到一年求职旺季，网络求职需要谨慎，下面是小编精心挑选的防骗精华，找工作一定要看哦！
            </div>
            <div class="applyBtn" @click="handleApply">申请</div>
        </div>
        <div class="block_second clearfix">
            <div class="job_detail">
                <div class="job_desc_text">职位描述</div>
                <div class="job_substance">
                    <div class="job_item desc_content"><span class="desc_title">职位类型：</span>{{detailData.settlement}}&nbsp|&nbsp;{{detailData.recruitment}}</div>
                    <!-- <div class="job_item desc_content"><span class="desc_title">发布时间：</span>2020-03-07</div> -->
                    <div class="job_item desc_content"><span class="desc_title">有效日期：</span>{{detailData.recruit_time}}</div>
                    <div class="job_item desc_content"><span class="desc_title">工作地点：</span>{{detailData.recruit_addres}}</div>
                </div>
                <div class="job_desc">
                    <div class="desc_title">职位描述：</div>
                    <div class="desc_content" v-html="detailData.job_content">
                    </div>
                </div>
                <!-- <div class="job_place">
                    <div class="desc_title">工作地址：</div>
                    <div class="desc_content">北京市海淀区莲花桥3号</div>
                </div> -->
            </div>
            <div class="block_right">
                <div class="company">
                    <div class="company_info">
                        <div class="company_logo">
                            <img :src="detailData.company_logo?detailData.company_logo:'../../../static/img/default_head.png'" alt="公司logo">
                        </div>
                        <div class="company_name">{{detailData.company_name}}</div>
                    </div>
                    <div class="company_content">
                        <!-- <div class="desc_content">
                            <span class="desc_title">行业类型：</span>
                            商务服务业
                        </div>
                        <div class="desc_content">
                            <span class="desc_title">成立时间：</span>
                            2019年12月27日
                        </div>
                        <div class="desc_content">
                            <span class="desc_title">注册资本：</span>                    
                            100万人民币
                        </div> -->
                        <div class="desc_content">
                            <span class="desc_title rank_title">综合评分：</span>   
                            <div class="rank" v-show="detailData.company_score>0" v-for="(item,index) in detailData.company_score" :key="index">
                                <img src="../../../../static/img/star_light.png" alt="">
                            </div>  
                            <div class="rank" v-show="detailData.company_score<5" v-for="(item,index) in (5-detailData.company_score)" :key="index">
                                <img src="../../../../static/img/star_grey.png" alt="">
                            </div>        
                        </div>
                    </div>
                    <!-- <div class="view_more">查看该公司全部信息 ></div> -->
                </div>
                <div class="advertising">
                    <div class="advertising_item" v-for="item in advertising">
                        <a :href="item.link_url" :style="'background:url('+item.thumb+') no-repeat;background-size:cover'"></a>
                    </div>
                </div>
                <div class="qrcode">
                    <img src="../../../../static/img/qrcode.png" alt="">
                    <div class="qrcode_text">
                        <div>手机微信扫一扫</div>
                        <div>随时随地找工作</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="job_recommend">
            <div class="recommend_title clearfix">
                <div class="recommend_text">你可能感兴趣的职位</div>
                <!-- <div class="view_more_job">查看更多 >></div> -->
            </div>
            <div class="more_job">
                <el-row :gutter="18">
                    <el-col :span="8" v-for="(item,index) in inserestedJobs" :key="item.id">
                        <div class="job_item">
                            <div class="job_item_title">{{item.product_name}}</div>
                            <div class="job_item_detail">
                                <div>{{item.recruit_addres}}  
                                    <!-- |  2020.03.08发布  |  来自口袋兼职 -->
                                </div>
                                <div>{{item.company_name}}</div>
                            </div>
                            <div class="job_item_price">
                                <span class="price_num">{{item.remuneration}}</span>
                                {{item.remuneration_type}} | {{item.settlement}}
                            </div>
                        </div>
                    </el-col>
                </el-row>

                
            </div>
        </div>
    </div>
</template>
<script>
import eventBus from '../../../assets/eventBus';
export default{
    data(){
        return{
            detailData:{
            },
            inserestedJobs:[],
            advertising:[],
        }
    },
    created(){
        this.getDetailData();
        this.getInserestedJobs();
        this.getBannerData();
    },
    methods:{
        getDetailData(){
            this.$axios.get('/product/details',{
                params:{
                    id:this.$route.query.id,
                    token:sessionStorage.token,
                }
            })
            .then((res)=>{
                if(res.data.code==1001){
                    this.detailData=res.data.data;
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        //感兴趣的职位列表
        getInserestedJobs(){
            this.loading=true;
            this.$axios.get('/product/dataList',{
                params:{
                    is_selected:1,
                    token:sessionStorage.token,
                    ditch:2,
                }
            })
            .then((res)=>{
                this.loading=false;
                if(res.data.code==1001){
                    this.inserestedJobs=res.data.data;
                }
            }).catch((err) => {
                console.log(err)
                this.loading=false;
            })
        },
        handleApply(){
            this.$axios.get('/order/order_create',{
                params:{
                    pid:this.$route.query.pid,
                    token:sessionStorage.token,
                    ditch:2,
                }
            })
            .then((res)=>{
                if(res.data.code==1001){
                    this.$alert('<p>请尽快联系企业，完成录取。</p><div class="apply_company_info">'+this.detailData.contact_name+'：'+this.detailData.contact_qq, '报名成功', {
                        confirmButtonText: '好的',
                        dangerouslyUseHTMLString: true,
                        center: true,
                        customClass:'apply_message_box'
                    });
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
        },
        getBannerData(){
            this.$axios.get('/index/bannerInfo?show_placement=3')
            .then((res,urlData)=>{
                if(res.data.code==1001){
                    this.advertising=res.data.data;
                }
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}

</script>
<style lang="less" scoped>
.detail_wrap{
    .desc_title{
        font-size: 14px;
        line-height:30px;
        color:#5A5F64;
    }
    .desc_content{
        color:#282D32;
        font-size: 14px;
        line-height:30px;
    }
    .job_brief{
        width:calc(100% - 39px);
        height:226px;
        background:rgba(255,255,255,1);
        margin:20px 0;
        padding-top:39px;
        padding-left:39px;
        position: relative;
        .job_name{
            font-size:24px;
            color:rgba(40,45,50,1);
        }
        .job_price{
            font-size: 14px;
            color:#282D32;
            margin-top:30px;
            margin-bottom:29px;
            .price_num{
                color: @theme-color;
                font-size:18px;
            }
        }
        .job_info{
            margin-bottom:36px;
            color:#5A5F64;
            font-size:14px;
            span{
                margin-right:20px;
            }
        }
        .job_tip{
            width:100%;
            line-height:50px;
            font-size: 14px;
            color:rgba(140,145,150,1);
            border-top:1px solid #F1F5F8;
        }
        .applyBtn{
            font-size:24px;
            position:absolute;
            top:60px;
            right:40px;
        }
        
    }
    .block_second{
        width:100%;
        margin-bottom:60px;
        .job_detail{
            width:774px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            padding:49px 59px 49px 40px;
            float:left;
            .job_desc_text{
                color:rgba(40,45,50,1);
                font-size: 20px;
                margin-bottom:39px;
            }
            .job_substance{
                margin-bottom:14px;
                .job_item{
                    margin-bottom:30px;
                }
            }
            .job_desc{
                margin-bottom:60px;
            }
        }
        .block_right{
            width:279px;
            float:right;
            .company{
                border-radius:2px;
                background-color:#fff;
                .company_info{
                    width:calc(100% - 60px);
                    padding:0 30px;
                    padding-top:30px;  
                    .company_logo{
                        width:100px;
                        height:100px;
                        margin:0 auto;
                        margin-bottom:27px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .company_name{
                        font-size: 18px;
                        color:#282D32;
                        margin-bottom:15px;
                    }
                }
                .company_content{
                    padding:0 30px;
                    padding-bottom:15px;
                    .rank_title{
                        display:inline-block;
                        height:30px;
                    }
                    .rank{
                        display:inline-block;
                        width:18px;
                        height:21px;
                        margin-right:5px;
                        position:relative;
                        img{
                            width:18px;
                            height:18px;
                            position:absolute;
                            left:0;
                            top:6px;

                        }
                    }
                }
                .view_more{
                    width:100%;
                    height:60px;
                    line-height:60px;
                    text-align: center;
                    color:#282D32;
                    font-size:14px;
                    border-top:1px solid #F4F7FA;
                    cursor: pointer;
                }
            }
            .advertising{
                margin:20px 0;
                .advertising_item{
                    width:100%;
                    height:158px;
                    a{
                        width:100%;
                        height:100%;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                }
            }
            .qrcode{
                width:100%;
                height:158px;
                background-color:#fff;
                display:flex;
                align-items:center;
                justify-content:center;
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
    .job_recommend{
        width:100%;
        margin-bottom:125px;
        .recommend_title{
            margin-bottom:24px;
        }
        .recommend_text{
            float:left;
            color:#282D32;
            font-size:24px;
        }
        .view_more_job{
            float:right;
            font-size:14px;
            color:#282D32;
            cursor: pointer;
        }
        .more_job{
            width:100%;
        }
        .job_item{
            width:298px;
            padding:25px 40px;
            background-color: #fff;
            border-radius:2px;
            margin-bottom:18px;
            margin-right:18px;
            .job_item_title{
                font-size:20px;
                margin-bottom:20px;
            }
            .job_item_detail{
                color:#8C9199;
                line-height:25px;
                margin-bottom:15px;
            }
            .job_item_price{
                color:#8C9199;
                .price_num{
                    color:@theme-color;
                    font-size:18px;
                }
            }
        }
    }
}

</style>
<style lang="less">
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