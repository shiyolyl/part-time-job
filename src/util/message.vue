<template>
    <transition name="message-fade">
        <div class="myMessage_wrap" v-show="isShow">
            <div class="title">
                {{title}}
                <div class="close" @click="closeMessage">X</div>
            </div>
            <div>{{text}}</div>
            
        </div>
    </transition>
    
</template>
<script>
    export default {
        data(){
            return{
                isShow:true,
            }
        },
        methods:{
            closeMessage(){
                this.isShow = false;
            },
        },
    }
</script>
<style lang="less" scoped>
.myMessage_wrap{
    width:30%;
    height:300px;
    margin:0 auto;
    font-size:14px;
    color:lightgreen;
    padding:10px 20px;
    border:1px solid #ccc;
    background-color: #fff;
    position: absolute;
    left:35%;
    top:20%;
    z-index: 9;
}
.title{
    width:100%;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size: 16px;
    color:brown;
    position: relative;
}
.close{
    position:absolute;
    top:0;
    right:0;
    cursor: pointer;
    color:#333;
    font-size:20px;

}
</style>