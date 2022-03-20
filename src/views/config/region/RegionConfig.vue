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
        <el-card v-for="(item,index) in regionList" :key="item.id" @click.native.capture="activeCard(item,index)"
          :class="{isActive:isActiveIndex===index}" @mouseenter.native="cardMouseEnter(index)"
          @mouseleave.native="cardMouseLeave()">
          <div class="name">
            <svg-icon icon-class="name" style="margin-right:4px"></svg-icon>
            {{item.provinceName}}
            <el-switch v-model="item.status" active-color="#5A97DB" inactive-color="#000" :width="35"
              @click.native="regionStatusUpdate(item)">
            </el-switch>
            <div class="btn" v-show="index === mouseEnterIndex">
              <a href="javascript:;" @click="insCitys(item)">
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
            <div class="time">{{$moment(item.createDate).format('YYYY/MM/DD h:mm:ss')}}</div>
          </div>

        </el-card>
      </div>
      <div class="tableContainer">
        <el-table style="width: 100%" :data="table_date" :cell-style="changeCellStyle">
          <el-table-column label="城市名" min-width="130" prop="cityName">
          </el-table-column>
          <el-table-column label="城市编码" min-width="130" prop="code">
          </el-table-column>
          <el-table-column label="新建时间" min-width="180">
            <template slot-scope="scope">
              {{$moment(scope.row.createDate).format('YYYY/MM/DD h:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="启用状态" width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"
                @click.native.capture="updateCityStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <a href="javascript:;" @click="deleteCity(scope.row)">
                <svg-icon icon-class="delete" class-name="delete" style="margin-right:4px"></svg-icon>
              </a>
              <a href="javascript:;" @click="updateCity(scope.row)">
                <svg-icon icon-class="update" class-name="update"></svg-icon>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <InsRegionDialog :insRegionDialogVisible.sync="insRegionDialogVisible" @getRegionList="getRegionList"
      :saveOrUpdate="saveOrUpdate" :title="title" />

    <InsCityDialog :insCityDialogVisible.sync="insCityDialogVisible" :citySelect="citySelect"
      :activeRegionId="activeRegionId" :saveOrUpdate="saveOrUpdate" :cityDialogTitle="cityDialogTitle"
      @getTableData="getTableData" />
  </div>

</template>

<script>
  import InsRegionDialog from './InsRegionDialog.vue'
  import InsCityDialog from './InsCityDialog.vue';
  import PubSub from 'pubsub-js' //引入PubSub
  export default {
    name: 'RegionConfig',
    components: {
      InsRegionDialog,
      InsCityDialog
    },
    data() {
      return {
        insRegionDialogVisible: false,
        title: '',
        insCityDialogVisible: false,
        cityDialogTitle: '',
        //省份列表
        regionList: [],
        //城市选择器数据
        citySelect: [],
        //获取省份列表查询条件
        query: {
          provinceName: ''
        },
        //激活的省份卡index 默认是0
        isActiveIndex: 0,
        //移入的省份卡index
        mouseEnterIndex: null,
        //保存删除或修改的操作标识
        saveOrUpdate: null,
        table_date: [],
        //保存当前激活的省份卡片的id号，用于向此省份下添加城市
        activeRegionId: null
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
        if (this.regionList.length > 0) {
          this.getTableData(this.regionList[0].id)
        }
      },
      //删除省份信息
      async deleteProvince(item) {
        const result = await this.$messageBox.confirm('此操作会删除该省份信息，是否继续', '确认删除？', {
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
      //省份状态修改
      async regionStatusUpdate(item) {
        const result = await this.$messageBox.confirm('此操作会修改该省份的启用状态，是否继续', '确认？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).catch(() => {
          //如果取消了要把状态取反回来
          item.status = !item.status
          this.$message.info('已取消操作！')
        })
        if (result !== 'confirm') return
        const res = await this.getRequest("/region/operationdu", {
          operation: 1,
          id: item.id
        })
        if (res.status === 200) {
          this.$message.success(`修改[${item.provinceName}]省份状态成功！`)
          this.getRegionList()
        }

      },
      //新增省份信息
      saveProvince() {
        this.saveOrUpdate = 0
        this.title = "新增省份信息"

        this.insRegionDialogVisible = true
      },
      //编辑省份信息
      updateProvince(item) {
        this.saveOrUpdate = 1
        this.title = "编辑省份信息"
        this.insRegionDialogVisible = true
        PubSub.publish('update', item)
      },
      //激活省份卡
      activeCard(item, index) {
        this.activeRegionId = item.id
        this.isActiveIndex = index
        //激活时调用
        this.getTableData(item.id);
      },
      //省份卡鼠标移入事件
      cardMouseEnter(index) {
        this.mouseEnterIndex = index
      },
      cardMouseLeave() {
        this.mouseEnterIndex = null
      },

      //打开新增城市信息对话框
      insCitys(item) {
        this.cityDialogTitle = '新增城市信息'
        //打开新增城市对话框前，先查询省份下所有的城市，供select选择器选择
        this.listCitysByDistrict(item.provinceName)
        this.insCityDialogVisible = true
      },
      //查询省份下所有的城市--select
      async listCitysByDistrict(provinceName) {
        const res = await this.getRequest(`/district/selByName?provinceName=${provinceName}`)
        this.citySelect = res.data
      },
      //查询省份下所有城市--tableData
      async getTableData(id) {
        const res = await this.getRequest(`/ciyts/selByPIdD?regionId=${id}`)
        // console.log(res)
        this.table_date = res.data
      },
      //删除城市信息
      async deleteCity(row) {
        const result = await this.$messageBox.confirm('此操作会删除该城市信息，是否继续', '确认删除？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .catch(() => {
            this.$message.info('已取消删除！')
          })
        if (result !== 'confirm') return
        const res = await this.getRequest('/ciyts/citysdu', {
          operation: '0',
          cityId: row.id
        })
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '删除城市信息成功！',
            duration: 0
          })
          this.getTableData(row.provinceId)
        }
      },

      updateCity(row) {
        this.cityDialogTitle = '编辑城市信息'
        //打开新增城市对话框前，先查询省份下所有的城市，供select选择器选择
        this.listCitysByDistrict(row.province.provinceName)
        this.insCityDialogVisible = true
        PubSub.publish('update',row)
      },
      //城市状态修改
      async updateCityStatus(row) {
        const result = await this.$messageBox.confirm('此操作会修改该城市的启用状态，是否继续', '确认？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).catch(() => {
          //如果取消了要把状态取反回来
          row.status = !row.status
          this.$message.info('已取消操作！')
        })
        if (result !== 'confirm') return

        const res = await this.getRequest('/ciyts/citysdu', {
          operation: '1',
          cityId: row.id
        })
        if (res.status === 200) {
          this.$message.success(`修改[${row.cityName}]城市状态成功！`)
          this.getRegionList()
        }
      }
    },
    created() {
      this.getRegionList()
    },
    mounted() {

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

        .isActive {
          border-color: #5A97DB;
        }

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

            .el-switch {
              ::v-deep .el-switch__core {
                height: 14px !important;
                position: relative !important;

                &::after {
                  width: 16px;
                  height: 14px;
                  top: -1px;
                  // left:17px
                }
              }
            }

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
        position: relative;

        .delete,
        .update {
          font-size: 16px;
          cursor: pointer;
        }
      }
    }

  }
</style>