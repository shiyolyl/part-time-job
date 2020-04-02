<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content">
            <router-view></router-view>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script> 
    import vHead from './common/header.vue';
    import vFooter from './common/footer.vue';
    export default {
        components:{
            vHead,
            vFooter
        },
        data(){
            return{
               
            }
        },
        created(){
        },
        methods:{
        },
       
    }
</script>
<style lang="less" scoped>
.wrapper{
    width:100%;
    background:rgba(244,247,250,1);
    .content{
        width:1170px;
        margin:0 auto;
    }
}
    
</style>
