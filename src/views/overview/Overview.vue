<template>
    <div class="container">
        <div class="f1">
            <!-- 就先实现id为stu这个div -->
            <div id="stu"></div>
            <div class="right">
                <el-button @click="clickHandle">lxs</el-button>
            </div>
        </div>
        <div class="f2">
            <div id="rig"></div>
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
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Overview',
        data() {
            return {
                a: 100,
                b: {
                    c: {
                        d: 3
                    }
                },
                firstName: 'li',
                lastName: 'xuesong',
                // tableData:[2,3,4,5,6]
            }
        },
        props: {},
        computed: {
            //函数写法
            // name(){
            //     let name 
            //     name = this.firstName + this.lastName
            //     return name
            // },

            //对象写法
            name: {
                get() {
                    let name
                    name = this.firstName + this.lastName
                    return name
                },
                set(val){
                    console.log(val)
                    //通过改变源头数据 间接改变计算属性
                    //val  lixuesong123
                    
                    this.lastName =  this.lastName +  val.slice(9)
                }
            }



            // newTableData(){
            //     let newArr = []

            //     newArr = this.tableData.map(item=>{
            //         return item * 2 
            //     })

            //     return newArr
            // }
        },
        //监听 （不单单能监听data中的属性，还可以监听props中的、和计算属性）
        watch: {
            //函数写法 简便的
            // a(val){
            //     console.log('我监听到了a的变化',val)
            // }

            //对象写法
            a: {
                //1、初始化调用
                immediate: true,
                //2、deep 深层次监听

                handler(val) {
                    console.log('我监听到了a的变化', val)
                }
            },

            'b.c.d': {
                // //深层次监听
                // deep:true,
                handler(val) {
                    console.log('我监听到了d的变化', val)
                }
            },

        },
        methods: {
            initLineEcharts() {
                {
                    //生命周期函数 是dom加载之后运行的
                    /**
                     * echarts是要拿到我的dom 然后给你上面的画画 前提得拿到dom
                     * 
                     * 这个你从mounted里允星河就能 拿到  从后created里面就拿不到 也证明了 mounted是在dom加载完事之后运行的
                     */
                    console.log(document.getElementById('stu')) //根据id拿dom

                    /**
                     * 所以代码必须在mounted里面写
                     */
                    //第一步初始化画布
                    let div = document.getElementById('stu') //拿到你要吧图花在哪个dom
                    let myChart = this.$echarts.init(div) //在那个dom 初始化 画布

                    //然后下面就是最重要的配置
                    let option = {
                        //先搞一个折线图试试水
                        //x轴
                        xAxis: {
                            type: 'category', //说明是类目轴
                            data: ['mon', 'yue', 'wed', 'thu', 'fri', 'sat', 'sun'] //星期1-7
                        },

                        //y轴
                        yAxis: {
                            type: 'value', //说明是数值轴
                        },

                        //标题
                        // title: {
                        //     text: 'study',
                        //     fontSize: '18',
                        // },

                        //图例
                        legend: {},

                        //鼠标提示
                        tooltip: {
                            trigger: 'axis'
                        },

                        //工具台
                        toolbox: {
                            show: true, //是否显示
                            //这个是缩放功能
                            feature: {
                                //区域缩放
                                dataZoom: {
                                    //Y周不缩放
                                    yAxisIndex: 'none'
                                },

                                //这个是效果桥花园 下面就是line 折现 bar 是柱状图
                                magicType: {
                                    type: ['line', 'bar'],
                                },

                                //保存为图片
                                saveAsImage: {},
                            },





                        },

                        //数据支持
                        series: [{
                                name: 'Evaporation',
                                data: [150, 230, 334, 211, 147, 260, 777],
                                type: 'line' //说明是折线图
                            },

                            {
                                name: 'Rainfall',
                                data: [350, 130, 234, 111, 247, 360, 577],
                                type: 'line' //说明是折线图
                            },
                        ]
                    }

                    //这个把之前的配置对象 设置到 初始化完事的画布里
                    myChart.setOption(option)
                    this.myChart1 = myChart
                }
            },
            sssas() {
                {
                    console.log(document.getElementById('rig'))

                    let div = document.getElementById('rig') //拿到你要吧图花在哪个dom
                    let myChart = this.$echarts.init(div) //在那个dom 初始化 画布

                    let option = {
                        legend: {
                            bottom:'1%'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        series: [{
                            name: 'Nightingale Chart',
                            type: 'pie',
                            radius: [20, 80],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            legendHoverLink: false,
                            data: [{
                                    value: 40,
                                    name: 'rose1'
                                },
                                {
                                    value: 38,
                                    name: 'rose2'
                                },
                                {
                                    value: 32,
                                    name: 'rose3'
                                },
                                {
                                    value: 30,
                                    name: 'rose4'
                                },
                                {
                                    value: 28,
                                    name: 'rose5'
                                },
                                {
                                    value: 26,
                                    name: 'rose6'
                                },
                                {
                                    value: 22,
                                    name: 'rose7'
                                },
                                {
                                    value: 18,
                                    name: 'rose8'
                                }
                            ]
                        }]
                    }

                    myChart.setOption(option)
                    this.myChart2 = myChart

                }
            },

            clickHandle() {
                console.log('点击了')
                // this.a++

                // this.b.c.d++

                this.name = this.name + '123'

            }

        },
        created() {
            //这是一个生命周期函数
            console.log('我被创建了')
            console.log(this.$echarts)

            //从这个里面有个方法叫init()
            //init 就是 初始化 
            //初始化一个画布
            /**
             * 
             */
        },
        //这张页面是系统总览页面
        beforeDestroy() {
            console.log('我被销毁了')

        },

        mounted() {
            this.initLineEcharts()
            this.sssas()
            window.addEventListener('resize',()=>{
                this.myChart1.resize()
                this.myChart2.resize()
            })

        },

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
            }

            .right {
                margin-left: 12px;
            }
        }
    }
</style>