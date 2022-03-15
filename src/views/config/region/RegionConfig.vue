<template>
  <div class="RegionConfig">
    <div class="operating_top">
      <el-input style="width:216px" size="medium" placeholder="输入省份名" suffix-icon="el-icon-search">
      </el-input>
      <el-button size="medium" type="info" style="margin-left:8px">
        搜索
      </el-button>
      <el-button icon="el-icon-plus" size="medium" type="primary" style="margin-left:8px"
        @click="insRegionDialogVisible = true">
        添加省份
      </el-button>
    </div>

    <div class="data_medium">
      <div class="left_list">
        <el-card>
          <div class="name">
            <svg-icon icon-class="name" style="margin-right:4px"></svg-icon>
            浙江省
            <div class="btn">
              <svg-icon icon-class="insert" class-name="insert"></svg-icon>
              <svg-icon icon-class="delete" class-name="delete"></svg-icon>
            </div>
          </div>
          <div class="bottom">
            <div class="code">
              <svg-icon icon-class="code" style="margin-right:4px"></svg-icon>
              zhej
            </div>
            <div class="time">2000/02/31</div>
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

    <InsRegionDialog :insRegionDialogVisible.sync="insRegionDialogVisible" />
  </div>

</template>

<script>
  import InsRegionDialog from './InsRegionDialog.vue'
  export default {
    name: 'RegionConfig',
    components: {
      InsRegionDialog
    },
    data() {
      return {
        insRegionDialogVisible: false,
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
            &:hover{
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
                font-size:19px;
                position: relative;
                top:-0.5px;
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