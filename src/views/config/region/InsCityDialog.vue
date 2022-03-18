<template>
  <el-dialog :title="cityDialogTitle" :visible="insCityDialogVisible" width="30%" :before-close="handleClose"
    @close="citysDialogClosed" append-to-body>

    <el-form ref="form" :rules="rules" :model="citys" label-width="85px">
      <el-form-item label="城市名称:" prop="cityName">
        <el-select style="width:216px" size="medium" v-model="citys.cityName">
          <el-option v-for="item in citySelect" :key="item.id" :value="item.district_name" :label="item.district_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市编码:" prop="code">
        <el-input style="width:216px" size="medium" v-model="citys.code"></el-input>
      </el-form-item>
      <el-form-item label="启用:">
        <el-switch v-model="citys.status">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='medium' type="info" @click="handleClose">取 消</el-button>
      <el-button size='medium' type="success" @click="saveCity">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "InsCityDialog",
    data() {
      return {
        citys: {
          id: '',
          cityName: '',
          code: '',
          provinceId: '',
          status: true
        },
        rules: {
          cityName: [{
            required: true,
            message: '请选择城市名称',
            trigger: 'change'
          }],
          code: [{
            required: true,
            message: '请输入城市编码',
            trigger: 'blur'
          }]
        },
      }
    },
    props: {
      insCityDialogVisible: {
        type: Boolean,
        default: false
      },
      //保存删除或修改的操作标识
      saveOrUpdate: {
        type: Number,
      },
      cityDialogTitle: {
        type: String
      },
      citySelect: {
        type: Array
      },
      activeRegionId: {
        type: Number
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:insCityDialogVisible', false)
      },
      citysDialogClosed() {
        this.citys = {
            id: '',
            cityName: '',
            code: '',
            provinceId: '',
            status: true
          },
          this.$refs['form'].resetFields();
      },
      saveCity() {
        this.$refs['form'].validate(async valid => {
          if (!valid) {
            return
          }
          //赋值外键--省份
          this.citys.provinceId = this.activeRegionId
          const res = await this.postRequest('/ciyts/citysau?operation=0', this.citys)
          if (res.status === 200) {
            this.$message.success('添加城市成功！')
            this.handleClose();
            this.$emit('getTableData', this.activeRegionId)
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>