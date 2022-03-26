<template>
  <div class="role_container">
    <div class="top_operation">
      <el-input style="width:216px" size="medium" placeholder="请输入权限名" clearable></el-input>
      <el-button size="medium" type="info" style="margin-left:8px">
        搜索
      </el-button>
      <el-button icon="el-icon-plus" size="medium" type="primary" style="margin-left:8px">
        添加权限
      </el-button>
    </div>

    <div class="table_div">
      <el-table></el-table>
    </div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Role'
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