<template>
    <el-dialog :title="title" :visible="menuDialogVisible" width="680px" :before-close="menuHandleClose" append-to-body
        style="margin-top:-10vh" @open="menuDialogOpen">
        <el-form ref="menuRuleFormRef" :model="menu" :rules="menuFormRules" label-width="95px">
            <el-form-item label="菜单名称:" prop="name">
                <el-input style="width:216px" size="medium" v-model="menu.name"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单:" prop="parentId">
                <el-cascader :disabled="topMenu" style="width:216px" size="medium" v-model="menu.parentId"
                    :options="menuCascaderData" :props="cascaderProps">
                </el-cascader>
                <el-checkbox v-model="topMenu" @change="topMenuCheckBoxChange" style="margin-left:12px">是否顶级</el-checkbox>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="url:" prop="url">
                        <el-input style="width:128px" v-model="menu.url" size="medium"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="path:" prop="path">
                        <el-input style="width:128px" v-model="menu.path" size="medium"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="component:">
                <el-input style="width:216px" v-model="menu.component" size="medium"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="层级:" prop="level">
                        <el-input-number style="width:80px" v-model="menu.level" size="medium" :controls="false">
                        </el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="位置:" prop="position">
                        <el-input-number style="width:80px" v-model="menu.position" size="medium" :controls="false">
                        </el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="是否菜单:">
                        <el-checkbox v-model="menu.menu"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否缓存:">
                        <el-checkbox v-model="menu.metas.keepAlice"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否认证:">
                        <el-checkbox v-model="menu.metas.requeire"></el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="重定向:">
                <el-select style="width:216px" size="medium" v-model="menu.metas.redirect">
                    <el-option v-for="item in redirectSelectData" :value="item.url+` (${item.name})`" :key="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="menu.metas.redirect" size="medium" style="width:216px"></el-input> -->
            </el-form-item>
            <el-form-item label="图标:">
                <el-input style="width:216px" v-model="menu.metas.icon" size="medium"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="menuHandleClose">取 消</el-button>
            <el-button type="primary" size="medium" @click="insMenu">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: 'InsMenuDialog',
        data() {
            return {
                menu: {
                    id: null,
                    name: '',
                    parentId: 0,
                    url: '',
                    path: '',
                    component: '',
                    level: undefined,
                    position: undefined,
                    menu: false,
                    hidden: false,
                    metas: {
                        icon: "",
                        keepAlice: false,
                        redirect: "",
                        require: false
                    }
                },
                menuFormRules: {
                    name: [{
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    }],
                    parentId: [{
                        required: true,
                        message: '请选择上级菜单',
                        trigger: 'change'
                    }],
                    url: [{
                        required: true,
                        message: '请输入url',
                        trigger: 'blur'
                    }],
                    path: [{
                        required: true,
                        message: '请输入路由路径',
                        trigger: 'blur'
                    }],
                    level: [{
                        required: true,
                        message: '请输入菜单层级',
                        trigger: 'blur'
                    }],
                    position: [{
                        required: true,
                        message: '请输入菜单位置',
                        trigger: 'blur'
                    }],
                },
                cascaderProps: {
                    value: 'id',
                    label: 'name',
                    checkStrictly: true,
                    emitPath: false
                },
                topMenu: false,
                //重定向select数据
                redirectSelectData: [],
                //暂时存储上次菜单，用于恢复取消顶级
                tempParentId:undefined
            }
        },

        props: {
            menuDialogVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            menuCascaderData: {
                type: Array
            },
            defaultParentId: {
                type: Number,
                default: 0
            },
            saveOrUpdate: {
                type: Number,
                default: 0
            },

        },
        methods: {
            menuDialogOpen() {
                this.menu.parentId = this.defaultParentId
                this.getListMenu()
            },
            //菜单重定向select所需下拉菜单数据
            async getListMenu() {
                const res = await this.getRequest('/menu/selMenuList')
                this.redirectSelectData = res.data
            },
            menuHandleClose() {
                this.menu = {
                    id: null,
                    name: '',
                    parentId: 0,
                    url: '',
                    path: '',
                    component: '',
                    level: undefined,
                    position: undefined,
                    menu: false,
                    hidden: false,
                    metas: {
                        icon: "",
                        keepAlice: false,
                        redirect: "",
                        require: false
                    }
                }
                this.topMenu = false
                this.$refs["menuRuleFormRef"].resetFields()
                this.$emit('update:menuDialogVisible', false)
                this.$emit('update:defaultParentId', 0)
            },
            //保存或更新菜单
            insMenu() {
                this.$refs["menuRuleFormRef"].validate(async valid => {
                    if (!valid) return
                    const res = await this.postRequest('/menu/operationMenu', this.menu)
                    if (res.status === 200) {
                        this.$message.success('新建菜单成功')
                        this.menuHandleClose()
                        this.$emit('getMenuTree')
                    }
                })
            },
            //编辑菜单消息回调
            updateMenu(data) {
                console.log(data)
                this.menu = {
                    id: data.id,
                    name: data.name,
                    parentId: data.parentId,
                    url: data.url,
                    path: data.path,
                    component: data.component,
                    level: data.level,
                    position: data.position,
                    menu: data.menu,
                    hidden: data.hidden,
                    metas: {
                        icon: data.metas.icon,
                        keepAlice: data.metas.keepAlice,
                        redirect: data.metas.redirect,
                        require: data.metas.require
                    }
                }
                //编辑后如果parentId===0则开启顶级状态
                if (this.menu.parentId === 0) {
                    this.topMenu = true
                }
            },
            //是否顶级复选框 改变事件
            topMenuCheckBoxChange(val){
                if(val){
                    //存储点击顶级时的父菜单id，用于恢复
                    this.tempParentId = this.menu.parentId
                    //顶级没有父级菜单
                    this.menu.parentId = 0
                    //顶级的层级是0
                    this.menu.level = 0
                }else{
                    //恢复父菜单
                    this.menu.parentId = this.tempParentId
                }
            }
        },
        watch: {
            "menu.parentId": {
                async handler(val) {
                    if(!val || val === undefined){
                        return 
                    }
                    const res = await this.getRequest("/menu/selMenuById?id=" + val)
                    this.menu.level = res.data.selMenuById.level + 1
                }
            }
        },
        mounted() {
            //编辑消息订阅
            this.menuPubSub = PubSub.subscribe('update', (msg, data) => {
                this.updateMenu(data)
            })
        },
        beforeDestroy() {
            // 在组件销毁之前 清除订阅消息
            PubSub.unsubscribe(this.menuPubSub)
        }

    }
</script>

<style>

</style>