<template>
  <div >
       <h2>用户信息</h2>
       <el-row>
           <el-col :span="5"> <img src="" alt=""></el-col>
           <el-col :span="4">
               昵称:
               注册时间:
               </el-col>
           <el-col :span="4">
               姓名:
               注册时长:
           </el-col>
           <el-col :span='4'>
               性别:
               上次登录时间:
           </el-col>
           <el-col :span='4'>
             <el-button type="primary" size="mini">推荐</el-button>
             联系方式:
           </el-col>
       </el-row>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
       data(){
      return {
        
      }
    },
    computed: {
  
    },
    methods: {
        /**
         * 获取给求职者推荐公司列表经过第一层求职者自身筛选
         */
         Selfscreening(address=null,category=null,market=null,name=null,id=''){
          let that=this
        $.ajax({
            url: "http://192.168.0.199:10280/companyJob/selectCompanyJobByAuditAndNameAndCityAndMarketCategory",
            data: {
                count:that.currentSize,
                number:that.currentPage-1,
                address,
                category,
                market,
                name,
                userId:id
            },
            success: function (data) {
              that.total=data.data.sum                   
              that.companyArr=data.data.listMap
        
              
           }
        })
         },
     
   mounted:function(){
     
      /**
       * 调用给求职者推荐公司列表方法 
       * */ 
    
   }
  }
  }
</script>
<style lang="scss" scoped>

</style>