<template>
    <footer class="footer_wrap">
        <div class="footer_content clearfix">
            <div class="myInfo">
                <div class="contact">联系我们</div>
                <div class="place">地址：天津市武清区京滨工业园京滨睿城10号楼2147室</div>
            </div>
            <div class="qrCode">
                <img src="../../../static/img/qrcode.png" alt="">
                <div class="qrcode_text">手机扫一扫，轻松找工作</div>
            </div>
        </div>
        
    </footer>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{

    }
}

</script>
<style lang="less" scoped>
.footer_wrap{
    width:100%;
    height:200px;
    background:rgba(30,40,50,1);
    .footer_content{
        width:1170px;
        height:100%;
        margin:0 auto;
        .myInfo{
            width:450px;
            float:left;
            margin-top:57px;
            .contact{
                font-weight:bold;
                color:rgba(255,255,255,1);
                font-size:24px;
            }
            .place{
                font-weight:500;
                color:rgba(255,255,255,1);
                font-size:18px;
                margin-top: 25px;
            }
        }
        .qrCode{
            width:160px;
            height:100%;
            float:right;
            margin-right:26px;
            text-align:center;
            img{
                width:136px;
                height:137px;
                margin-top:20px;
                /* margin:0 auto; */
            }
            .qrcode_text{
                font-size:14px;
                color:rgba(255,255,255,1);
                opacity:0.6;
                width:100%;
                text-align:center;
            }
        }
    }
}
</style>