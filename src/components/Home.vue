<template>
    <div class="wrapper">
        <!-- <v-head></v-head> -->
        <Header></Header>
        <div class="content">
            <router-view></router-view>
        </div>
        <!-- <v-footer></v-footer> -->
        <Footer></Footer>
    </div>
</template>

<script> 
    //已在插件中将common中的所有组件注册为全局组件，可直接使用
    // import vHead from './common/header.vue';
    // import vFooter from './common/footer.vue';
    export default {
        // components:{
        //     vHead,
        //     vFooter
        // },
        data(){
            return{
               mydata:'111'
            }
        },
        created(){
            //获取子组件
            console.log(this.$children);
        },
        methods:{
            mymethod(){
                console.log('hahahh')
            }
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
