<template>
    <div class="container">
        <div class="f1">
            <div>
                <lineChart/>
            </div>
            <div  class="right">
                <singleLine/>
            </div>
        </div>
        <div class="f2">
            <div></div>
            <div class="right"></div>
        </div>

        <div class="f3">
            <div></div>
            <div class="right"></div>
        </div>

        <div class="f4">
            <div></div>
            <div class="right"></div>
        </div>


    </div>
</template>

<script>
    import lineChart from './components/line.vue'
    import singleLine from './components/singleLine.vue'
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Overview',
        components:{lineChart,singleLine},
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        flex: 1;
        // background-color: #fff;
        overflow: auto;

        .f1,
        .f2,
        .f3,
        .f4 {
            height: 280px;
            display: flex;
            margin-bottom: 12px;
            div {
                flex: 1;
                background-color: #fff;
                border-radius: 4px;
                padding:12px
            }
            .right{
                margin-left: 12px;
            }
        }
    }
</style>