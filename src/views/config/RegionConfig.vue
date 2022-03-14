<template>
  <div class="RegionConfig">
    <div class="operating_top">
      <el-input style="width:216px" size="medium" placeholder="输入省份名" suffix-icon="el-icon-search">
      </el-input>
      <el-button size="mudium" type="info" style="margin-left:8px">
        搜索
      </el-button>

      <el-button size="mudium" type="primary" style="margin-left:8px">
        添加省份
      </el-button>
    </div>

    <div class="data_medium">
      <div class="left_list">
        <el-card>
          <div class="name">浙江省

             <el-link :underline="false">添加城市</el-link>
          </div>
          <div class="time">2000/02/31</div>
        </el-card>
        <el-card>
          <div class="name">辽宁省</div>
          <div class="time">2000/02/31</div>
        </el-card>
      </div>
      <div class="tableContainer">
        <el-table style="width: 100%" :data="table_date">
          <el-table-column label="城市名" width="230" prop="name">
          </el-table-column>
          <el-table-column label="新建时间" min-width="180" prop="createDate">
          </el-table-column>
          <el-table-column label="启用状态" width="180">
            <template slot-scope="scoped">
              <el-switch v-model="scoped.row.status" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    name: 'RegionConfig',
    data() {
      return {
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

      .left_list {
        width: 270px;
        display: flex;
        flex-direction: column;

        .el-card {
          min-height: 80px;
          font-size: 18px;
          padding: 8px 12px;
          cursor: pointer;
          text-align: left;
          margin-bottom: 8px;
          .name{
            display: flex;
            align-items: center;
            .el-link{
              margin-left: auto;
            }
          }
          .time {
            font-size: 14px;
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
      }
    }

  }
</style>