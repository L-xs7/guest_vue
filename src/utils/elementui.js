import Vue from 'vue'

import {
    Button,
    Select,
    Table,
    Card,
    Input,
    Dialog,
    TableColumn,
    Link,
    Switch,
    Menu,
    Main,
    MenuItem,
    Aside,
    Container,
    Header,
    Form,
    FormItem
} from 'element-ui';

//截取dialog打开方法--背景虚化
const afterEnter = function () {
    //在body上加上allblur类，实现背景虚化
    document.getElementById('app').className = 'allblur'
    //以下是原有的代码，不做修改
    this.$emit('opened')
}
Dialog.methods.afterEnter = afterEnter

// 截取dialog关闭方法
const afterLeave = function () {
    // 去掉body上添加的classname，即实现去除背景模糊
    document.getElementById('app').className = ''
    // 下面是原有的代码，不做修改

    this.$emit('closed')
}
Dialog.methods.afterLeave = afterLeave


const element = {
    install: function () {
        Vue.use(Button)
        Vue.use(Select)
        Vue.use(Table)
        Vue.use(Card)
        Vue.use(Input)
        Vue.use(Dialog)
        Vue.use(TableColumn)
        Vue.use(Link)
        Vue.use(Switch)
        Vue.use(Menu)
        Vue.use(Main)
        Vue.use(MenuItem)
        Vue.use(Container)
        Vue.use(Aside)
        Vue.use(Header)
        Vue.use(Form)
        Vue.use(FormItem)
    }
}

export default element