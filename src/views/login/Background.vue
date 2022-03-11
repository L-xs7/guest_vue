<template>
    <canvas id="J_dotLine"></canvas>
</template>

<script>
    import Dotline from "../../utils/dotline.js";
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: "Background",
        methods: {
            draw() {
                let login_main = document.getElementById("login_main");

                const option = {
                    dom: 'J_dotLine', //画布id
                    cw: login_main.offsetWidth, //画布宽
                    ch: login_main.offsetHeight, //画布高
                    ds: 70, //点的个数
                    r: 1, //圆点半径
                    cl: '#fff', //粒子线颜色
                    dis: 120 //触发连线的距离
                }
                new Dotline(option).start();
            }
        },
        mounted() {
            this.draw()
        }
    }
</script>

<style lang="scss" scoped>

</style>