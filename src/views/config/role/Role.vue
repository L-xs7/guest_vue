<template>
  <div class="role_container">
    <div class="top_operation">
      <el-input style="width:216px" size="medium" placeholder="请输入权限名" clearable></el-input>
      <el-button size="medium" type="info" style="margin-left:8px">
        搜索
      </el-button>
      <el-button icon="el-icon-plus" size="medium" type="primary" style="margin-left:8px">
        添加权限11
      </el-button>
    </div>

    <div class="table_div">
      <el-table :data="roleList" row-key="id">
        <el-table-column prop="roleName" label="权限名称" min-width="180">
        </el-table-column>
        <el-table-column prop="roleCode" label="权限编码" min-width="180">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" min-width="180">
        </el-table-column>
        <el-table-column prop="remake" label="权限描述" min-width="180">
        </el-table-column>
        <el-table-column label="创建时间" min-width="180">
          <template slot-scope="scope">
            {{$moment(scope.row.createDate).format('YYYY/MM/DD h:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" min-width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="编辑" width="85" fixed="right">
          <template>
            <a href="javascript:;">
              <svg-icon icon-class="delete" class-name="delete" style="margin-right:4px"></svg-icon>
            </a>
            <a href="javascript:;">
              <svg-icon icon-class="update" class-name="update"></svg-icon>
            </a>
          </template>
        </el-table-column>


      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Role',
    data() {
      return {
        roleList: []
      }
    },
    methods: {
      async getRoleList() {
        const res = await this.getRequest("/role/selRole")
        // console.log(res)
        this.roleList = res.data.selRole
      }
    },
    mounted() {
      this.getRoleList()
    }
  }
</script>

<style lang="scss" scoped>
  .role_container {
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
    }
  }
</style>