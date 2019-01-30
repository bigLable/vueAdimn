<template>
<div>
 <el-row style="background:rgba(250,250,250,1);">
     <el-col :span="1">
       <div style="height:30px;width:4px;background:blue"></div>
     </el-col>
     <el-col :span="23">
         <span style="line-height:30px">缴费信息</span> 
     </el-col>
 </el-row><br>
   <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="startTime"
      label="合同开始时间"
      width="180">
    </el-table-column>
     <el-table-column
      prop="startEnd"
      label="合同结束时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="money"
      label="缴费金额(元)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="job"
      label="招聘职位"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Jobs"
      label="合同职位">
    </el-table-column>
     <el-table-column
      prop="Market"
      label="商场">
    </el-table-column>
     <el-table-column
      prop="city"
      label="地区">
    </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
      data() {
      return {
      tableData: []
      };
    },
    computed: {
  
    },
     props:['enterId'],
 watch: {
      enterId:function(newValue,oldValue){
        this.Pay(newValue)
      }
    },
    methods: {
         /**
          * 企业付费情况
          */
         Pay(enterId){
           let that=this
         $.ajax({
        type: 'GET',
        url: this.$store.state.api + "/companyPay/selectCompanyPay",
        data: {
            companyId:enterId
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data){
          that.tableData=data.data.companyPayList
        }
         }
         )
 },

       tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    
    }
  }

</script>
 <style lang="scss" scoped>
   .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>



