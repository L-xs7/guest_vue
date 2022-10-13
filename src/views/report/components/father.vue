<template>
  <div class="father">
    <child money="100" car="benchi"   :getChaye="getChaye"  @getjiu="getjiu" />
  </div>
</template>

<script>
import child from './child.vue'
import pubsub from 'pubsub-js'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'father',
    components:{
        child
    },
    //父给子传值 最简单 一个方法即可 props传值

    methods:{
        //得到子组件的值
        getChaye(val){
            console.log(val)
        },

        getjiu(val){
            console.log(val)
        }
    },
    //挂载后
    mounted(){
        //发布
        //第一个参数 其实是消息名 不是 你传的值
        //第二个参数才是
        //在挂载的时候 发布消息 最好！在组件销毁的时候 取消这个消息的发布，否则会造成多次发布同一个消息的问题
        this.pid = pubsub.subscribe('getyan',function(_,val){
            console.log(val)
        })
    },
    //在销毁之前调用
    beforeDestroy(){
        pubsub.unsubscribe(this.pid)
    }

}
</script>

<style scoped lang="scss">
.father{
    width: 500px;
    height: 500px;
    background-color: #bfa;
}
</style>