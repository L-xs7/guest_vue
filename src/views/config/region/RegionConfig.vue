<template>
  <div class="RegionConfig">
    <div class="operating_top">
      <el-input style="width:216px" clearable @clear="getRegionList" @keypress.native.enter="getRegionList"
        v-model="query.provinceName" size="medium" placeholder="输入省份名" suffix-icon="el-icon-search">
      </el-input>
      <el-button size="medium" type="info" style="margin-left:8px" @click="getRegionList">
        搜索
      </el-button>
      <el-button icon="el-icon-plus" size="medium" type="primary" style="margin-left:8px" @click="saveProvince()">
        添加省份
      </el-button>
    </div>

    <div class="data_medium">
      <div class="left_list">
        <el-card v-for="item in regionList" :key="item.id">
          <div class="name">
            <svg-icon icon-class="name" style="margin-right:4px"></svg-icon>
            {{item.provinceName}}

            <div class="btn">
              <a href="javascript:;">
                <svg-icon icon-class="insert" class-name="insert"></svg-icon>
              </a>
              <a href="javascript:;" @click="updateProvince(item)">
                <svg-icon icon-class="update" class-name="update"></svg-icon>
              </a>

              <a href="javascript:;" @click="deleteProvince(item)">
                <svg-icon icon-class="delete" class-name="delete"></svg-icon>
              </a>

            </div>
          </div>
          <div class="bottom">
            <div class="code">
              <svg-icon icon-class="code" style="margin-right:4px"></svg-icon>
              {{item.code}}
            </div>
            <div class="time">{{$moment(item.creatDate).format('YYYY/MM/DD h:mm:ss')}}</div>
          </div>

        </el-card>
      </div>
      <div class="tableContainer">
        <el-table style="width: 100%" :data="table_date" :cell-style="changeCellStyle">
          <el-table-column label="城市名" width="230" prop="name">
          </el-table-column>
          <el-table-column label="城市编码" width="230" prop="name">
          </el-table-column>
          <el-table-column label="新建时间" min-width="180" prop="createDate">
          </el-table-column>
          <el-table-column label="启用状态" width="180">
            <template slot-scope="scoped">
              <el-switch v-model="scoped.row.status" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template>
              <svg-icon icon-class="delete" class-name="delete" style="margin-right:4px"></svg-icon>
              <svg-icon icon-class="update" class-name="update"></svg-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <InsRegionDialog :insRegionDialogVisible.sync="insRegionDialogVisible" @getRegionList="getRegionList"
      :saveOrUpdate="saveOrUpdate" />
  </div>

</template>

<script>
  import InsRegionDialog from './InsRegionDialog.vue'
  import PubSub from 'pubsub-js' //引入PubSub
  export default {
    name: 'RegionConfig',
    components: {
      InsRegionDialog
    },
    data() {
      return {
        insRegionDialogVisible: false,
        //省份列表
        regionList: [],
        //获取省份列表查询条件
        query: {
          provinceName: ''
        },
        //保存删除或修改的操作标识
        saveOrUpdate: null,
        table_date: [{
            name: '杭州',
            createDate: '2000/03/23',
            status: true
          },
          {
            name: '杭州',
            createDate: '2000/03/23',
            status: false
          },
          {
            name: '杭州',
            createDate: '2000/03/23',
            status: true
          }
        ]
      }
    },
    methods: {
      /* 修改某列样式 */
      changeCellStyle(row) {
        if (row.column.label === "操作") {
          return "display:flex;" // 修改的样式
        }
      },
      //接口获取所有省份
      async getRegionList() {
        const res = await this.getRequest('/region/selAll', this.query)
        this.regionList = res.data.query_province
      },
      //删除省份信息
      async deleteProvince(item) {
        const result = await this.$messageBox.confirm('此操作会删除改省份信息，是否继续', '确认删除？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).catch(() => {
          this.$message.info('已取消删除！')
        })
        if (result !== 'confirm') return

        const res = await this.getRequest("/region/operationdu", {
          operation: 0,
          id: item.id
        })
        if (res.status === 200) {
          this.$message.success(`删除[${item.provinceName}]省份信息成功！`)
          this.getRegionList()
        }
      },
      //新增省份信息
      saveProvince() {
        this.saveOrUpdate = 0
        this.insRegionDialogVisible = true
      },
      //编辑省份信息
      updateProvince(item) {
        this.saveOrUpdate = 1
        this.insRegionDialogVisible = true
        PubSub.publish('update', item)
      }
    },
    created() {
      this.getRegionList()
    }

  }
</script>

<style lang="scss" scoped>
  .RegionConfig {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .operating_top {
      min-height: 48px;
      max-height: 48px;
      height: 48px;
      display: flex;
      background-color: #FFFFFF;
      align-items: center;
      padding-left: 12px;
    }

    .data_medium {
      flex-grow: 1;
      display: flex;
      padding: 12px;
      background-color: #F5F7FB;

      .left_list {
        width: 270px;
        display: flex;
        flex-direction: column;

        .el-card {
          min-height: 80px;
          font-size: 16px;
          padding: 8px 12px;
          cursor: pointer;
          text-align: left;
          margin-bottom: 8px;

          &:hover {
            border-color: #5A97DB;
          }

          .name {
            display: flex;
            align-items: center;

            .btn {
              margin-left: auto;
              display: flex;
              align-items: center;

              .insert {
                font-size: 16px;
                margin-right: 4px;
              }

              .delete {
                font-size: 19px;
                position: relative;
                top: 0.5px;
              }
            }
          }

          .bottom {
            display: flex;

            .code {
              font-size: 16px;
            }

            .time {
              font-size: 13px;
              margin-left: auto;
            }
          }

        }

        .el-card ::v-deep .el-card__body {
          padding: 0px;
        }

        .el-card.is-always-shadow,
        .el-card.is-hover-shadow:focus,
        .el-card.is-hover-shadow:hover {
          box-shadow: none;
        }
      }

      .tableContainer {
        flex-grow: 1;
        padding: 0 8px;

        .delete,
        .update {
          font-size: 16px;
          cursor: pointer;
        }
      }
    }

  }
</style>