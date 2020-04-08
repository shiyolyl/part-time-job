<template>
    <div class="btn">
        我是按钮
        <slot v-bind:otherInfo="otherInfo">
        </slot>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                otherInfo:{
                    text:'可点击'
                }
            }
        },
        methods:{

        },
    }
</script>
<style lang="less" scoped>
.btn{
    width:200px;
    height:30px;
    line-height:30px;
    text-align:center;
    background-color: @theme-color;
    color:#fff;
    border-radius:3px;
    /* margin:0 10px; */
}
</style>