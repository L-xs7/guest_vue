<template>
  <div class="child">
    <el-button @click="clickHandle">给烟</el-button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'child',
    components:{},
    //数组写法 简单 但不安全
    props:['money','car','getChaye'],
    data(){
        return{

        }
    },
    methods:{
        clickHandle(){
            //订阅消息 给烟
            let yan = 'yuxi'
            pubsub.publish('getyan',yan)
        }
    },
    
    //组件挂载 自动调用
    mounted(){
        console.log(this.money,this.car,this.getChaye)
        let cha = 'tieguanyin'
        this.getChaye(cha)
        
        let jiu = 'maotai'
        this.$emit('getjiu',jiu)
    }

    //子传父

    //1、父组件给子组件 传递一个函数 子组件通过调用传参的方式 间接把数据给到父组件
    //2、自定义事件 原理一样 写法不同
    //3、消息的发布和订阅（不规定父子 ， 任意组件之间传值）
    //4、全局事件总线 （用的不多，偶尔出了问题不可逆）
    //5、ref方式调用父组件内方法 （原理和 1 ， 2  ， 3一样）
    //6、vuex
}
</script>

<style scoped lang="scss">
.child{
    width: 100px;
    height: 100px;
    background-color: red;
}
</style>