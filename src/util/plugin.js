import message from './message.vue';
export default{
    install(Vue){
        function changeStr(str){
            if(!str){
              throw Error("the function of changeStr needs a string!");  
            }
            return str.charAt(0).toUpperCase()+str.slice(1);
        }
        //全局组件自动化注册
        (function autoImport(){
            const requireComponent = require.context('../components/common',false,/\.vue$/);
            requireComponent.keys().forEach((key, index, array) => {
                const component = requireComponent(key);
                // console.log(component)
                // console.log(key) // ./button.vue
                const fileName = changeStr(key.replace('./','').replace('.vue',''));
                // console.log(fileName) //Button
                Vue.component(fileName,component.default || component);
            })
        })()

        //自定义的全局弹框组件
        const getInstance=(options)=>{
            var Profile = Vue.extend(message);
        
            //在文档之外渲染并且随后用原生js手动挂载  new的时候传入组件选项data(值为用户传进来的配置项) 以和 默认模版进行合并
            return new Profile({data:options}).$mount();
            //挂载到当前已有的dom上
            // return new Profile().$mount('#app');
            // return new Profile().$mount(document.createElement('div'));
            // return new Profile().$mount({el: document.createElement('div')});
        }
        Vue.prototype.$myMessage = (options)=>{
            const dom = getInstance(options).$el;
            document.body.appendChild(dom);
        }

        
        

        
    }
}