<template>
    <el-dialog title="添加省份信息" :visible="insRegionDialogVisible" width="30%" :before-close="handleClose" append-to-body>

        <el-form ref="form" :rules="rules" :model="region" label-width="85px">
            <el-form-item label="省份名称:" prop="name">
                <el-input style="width:216px" size="medium" v-model="region.name"></el-input>
            </el-form-item>
            <el-form-item label="省份编码:" prop="code">
                <el-input style="width:216px" size="medium" v-model="region.code"></el-input>
            </el-form-item>
            <el-form-item label="启用:">
                <el-switch v-model="region.status" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size='medium' type="info">取 消</el-button>
            <el-button size='medium' type="success">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: 'InsRegionDialog',
        data() {
            return {
                region: {
                    name: '',
                    code: '',
                    status: true,
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入省份名称',
                        trigger: 'blur'
                    }],
                    code: [{
                        required: true,
                        message: '请输入省份编码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        props: {
            insRegionDialogVisible: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClose() {
                this.$emit('update:insRegionDialogVisible', false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>