<template>
    <div class="MenuContainer">
        <div class="top_operation">
            <el-input v-model="menuName" style="width:216px" size="medium" placeholder="请输入菜单名" clearable
                @clear="getMenuTree" @keypress.native.enter="getMenuTreeByName"></el-input>
            <el-button size="medium" type="info" style="margin-left:8px" @click="getMenuTreeByName">
                搜索
            </el-button>
            <el-button icon="el-icon-plus" size="medium" type="primary" style="margin-left:8px" @click="insMenu()">
                添加菜单
            </el-button>
        </div>
        <div class="table_div">
            <el-table :data="menuTableData" row-key="id" default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="菜单名" min-width="180">
                </el-table-column>
                <el-table-column prop="url" label="全路径" min-width="180">
                </el-table-column>
                <el-table-column prop="path" label="前端路由" width="180">
                </el-table-column>
                <el-table-column prop="component" label="组件名" min-width="270">
                </el-table-column>
                <el-table-column prop="level" label="层级" min-width="80">
                </el-table-column>
                <el-table-column prop="position" label="位置" min-width="80">
                </el-table-column>
                <el-table-column prop="menu" label="是否菜单" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.menu">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="keepAlice" label="是否缓存" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.metas.keepAlice">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="require" label="是否认证" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.metas.require">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="metas.redirect" label="重定向" min-width="180">
                </el-table-column>
                <el-table-column prop="metas.icon" label="图标" min-width="180">
                </el-table-column>
                <el-table-column label="创建日期" width="180">
                    <template slot-scope="scope">
                        {{$moment(scope.row.createDate).format('YYYY/MM/DD h:mm:ss')}}
                    </template>

                </el-table-column>
                <el-table-column label="编辑" width="85" fixed="right">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="inlineInsertMenu(scope.row)">
                            <svg-icon icon-class="insert" class-name="insert" style="margin-right:4px;"></svg-icon>
                        </a>
                        <a href="javascript:;" @click="deleteMenu(scope.row)">
                            <svg-icon icon-class="delete" class-name="delete" style="margin-right:4px"></svg-icon>
                        </a>
                        <a href="javascript:;" @click="updateMenu(scope.row)">
                            <svg-icon icon-class="update" class-name="update"></svg-icon>
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <InsMenuDialog :menuDialogVisible.sync="menuDialogVisible" :title="title" :menuCascaderData="menuCascaderData"
            @getMenuTree="getMenuTree" :defaultParentId.sync="defaultParentId" />
    </div>
</template>

<script>
    import InsMenuDialog from './InsMenuDialog.vue'
    import PubSub from 'pubsub-js'
    export default {
        name: 'MenuContainer',
        data() {
            return {
                menuTableData: [],
                menuCascaderData: [],
                menuDialogVisible: false,
                title: "",
                menuName: "",
                //默认上次菜单id
                defaultParentId: 0
            }
        },
        components: {
            InsMenuDialog
        },
        methods: {
            async getMenuTree() {
                const res = await this.getRequest(`/menu/selMenuTree`)
                this.menuTableData = res.data
                this.menuCascaderData = res.data
            },
            async getMenuTreeByName() {
                const res = await this.getRequest(`/menu/selMenuByName?menuName=${this.menuName}`)
                // console.log(res.data)
                let menuTreeByName = []
                if (res.data && res.data[0].length > 0) {
                    res.data[0].forEach(item => {
                        menuTreeByName.push(item)
                    })
                    this.menuTableData = menuTreeByName
                }
            },
            insMenu() {
                this.title = "新建菜单"
                this.menuDialogVisible = true
            },
            inlineInsertMenu(row) {
                this.title = "新建菜单"
                this.defaultParentId = row.id
                this.menuDialogVisible = true
            },
            //删除菜单
            async deleteMenu(row) {
                const result = await this.$messageBox.confirm('此操作会删除该菜单信息，是否继续', '确认删除？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).catch((err)=>err)

                if (result !== 'confirm') return this.$message.info('已取消删除')

                const res = await this.getRequest(`/menu/delMenu?id=${row.id}`).catch(err=>err)
                if (res.status === 200) {
                    this.$message.success(`已成功删除【${row.name}】菜单`)
                    this.getMenuTree()
                }
            },
            //修改菜单信息
            updateMenu(row){
                PubSub.publish('update',row)
                this.title="编辑菜单"
                this.menuDialogVisible=true
            }
        },
        mounted() {
            this.getMenuTree()
        }
    }
</script>

<style lang="scss" scoped>
    .MenuContainer {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .top_operation {
            min-height: 48px;
            max-height: 48px;
            height: 48px;
            background-color: #fff;
            display: flex;
            align-items: center;
            padding: 0 12px;
        }

        .table_div {
            padding: 12px;
            flex-grow: 1;
            position: relative;
            overflow: hidden;

            .insert {
                font-size: 13px;
            }
        }
    }
</style>