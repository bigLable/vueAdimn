<template>
  <div >
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
        <detailBusiness :enterInfo="enterprise" ></detailBusiness>
        <Enterprisepayment :enterId="enterId"></Enterprisepayment>
        <Memberlist :enterId="enterId"></Memberlist>
    </el-tab-pane>
    <el-tab-pane label="职位列表" name="second">待建设---</el-tab-pane>
    <el-tab-pane label="简历列表" name="third">待建设---</el-tab-pane>
  </el-tabs>
  </div>
</template>
 
<script>
 import $ from 'jquery'
  import detailBusiness from '../../detai-BusineInfo.vue'
  import Enterprisepayment from '../../Enterprisepayment.vue'
   import Memberlist from '../../Memberlist.vue'
  export default {
       data(){
      return {
      activeName: 'first',
      enterprise:{},
      enterId:''
      }
    },
    
    components: {
     detailBusiness,
      Enterprisepayment,
      Memberlist
    },
    computed: {
       
    },
    methods: {
     
     handleClick(tab, event) {
        console.log(tab, event);
      },
      /**
       * 企业详情
       */
     EnterpriseInformation(enterId){
       let that=this
        $.ajax({
        type: 'GET',
        url: this.$store.state.api + "/company/selectCompanyAndCompanyEmployeeByComapnyId",
        data: {
        id:enterId
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data){
            var obj=data.data
         if(obj.companyCategory==undefined){
            obj.companyCategory= [{'categoryName':'暂无'}]
         }else{
            obj.companyCategory  = JSON.parse(obj.companyCategory)
         }
         that.enterprise=obj
         }
        })
       }
    },
     
   mounted() {
     alert(this.$route.query.enterId)
       console.log(this.$route.query.enterId,'this.$router.query.enterId')
        this.enterId=this.$route.query.enterId
     this.EnterpriseInformation(this.$route.query.enterId)
    
   }
  
  }
</script>
<style lang="scss" scoped>

</style>