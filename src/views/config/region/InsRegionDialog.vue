<template>
    <el-dialog :title="title" :visible="insRegionDialogVisible" width="30%" :before-close="handleClose"
        @close="provinceClosed" append-to-body>

        <el-form ref="form" :rules="rules" :model="province" label-width="85px">
            <el-form-item label="省份名称:" prop="provinceName">
                <el-select style="width:216px" size="medium" v-model="province.provinceName">
                    <el-option v-for="item in regions" :key="item.id" :value="item.district_name"
                        :label="item.district_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="省份编码:" prop="code">
                <el-input style="width:216px" size="medium" v-model="province.code"></el-input>
            </el-form-item>
            <el-form-item label="启用:">
                <el-switch v-model="province.status" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size='medium' type="info" @click="handleClose()">取 消</el-button>
            <el-button size='medium' type="success" @click="saveRegion()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: 'InsRegionDialog',
        data() {
            return {
                regions: [],
                province: {
                    id: '',
                    provinceName: '',
                    code: '',
                    status: true,
                },
                rules: {
                    provinceName: [{
                        required: true,
                        message: '请输入省份名称',
                        trigger: 'blur'
                    }],
                    code: [{
                        required: true,
                        message: '请输入省份编码',
                        trigger: 'blur'
                    }]
                },
            }
        },
        props: {
            insRegionDialogVisible: {
                type: Boolean,
                default: false
            },
            //保存删除或修改的操作标识
            saveOrUpdate: {
                type: Number,
            },
            title: {
                type: String
            }
        },
        methods: {
            handleClose() {
                this.$emit('update:insRegionDialogVisible', false)
            },
            //关闭表单之前清空并重置表单的回调
            provinceClosed() {
                this.province = {
                        id: '',
                        provinceName: '',
                        code: '',
                        status: true,
                    },
                    this.$refs['form'].resetFields();
            },
            //添加或修改省份信息
            saveRegion() {
                this.$refs['form'].validate(async valid => {
                    if (!valid) {
                        return
                    }
                    const res = await this.postRequest(`/region/provinceau?operation=${this.saveOrUpdate}`,
                        this.province)
                    if (res.status === 200) {
                        if (this.saveOrUpdate === 0) {
                            this.$message.success('添加省份成功！')
                        } else if (this.saveOrUpdate === 1) {
                            this.$message.success("修改省份成功！")
                        } else {
                            this.$message.error("操作符错误！")
                        }

                        this.handleClose();
                        this.$emit('getRegionList')
                    }
                })
            },
            updateRegion(item) {
                this.province.id = item.id
                this.province.provinceName = item.provinceName
                this.province.code = item.code
                this.province.status = item.status
                this.province.createDate = item.createDate
            },
            async getAllRegion() {
                const res = await this.getRequest('/district/selRegion')
                this.regions = res.data
            }

        },
        mounted() {
            //编辑消息订阅
            PubSub.subscribe('update', (msg, data) => {
                this.updateRegion(data)
            })
        },
        created() {
            this.getAllRegion()
        }
    }
</script>

<style lang="scss" scoped>

</style>