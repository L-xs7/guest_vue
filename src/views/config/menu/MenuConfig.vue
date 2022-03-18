<template>
  <div class="MenuContainer">
      <div class="top_operation">

      </div>
      <div class="table_div">
          <el-table
            
          >

          </el-table>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .MenuContainer{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .top_operation{
            min-height: 48px;
            max-height: 48px;
            height: 48px;
            background-color: #fff;
        }
        .table_div{
            padding:12px;
            flex-grow: 1;

        }
    }
</style>