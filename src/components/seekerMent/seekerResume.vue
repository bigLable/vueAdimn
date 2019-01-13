<template>
  <div >
    <seekerInfo></seekerInfo>
  </div>
</template>

<script>
  import $ from 'jquery'
  import seekerInfo from '../seekerInfo'
  export default {
       data(){
      return {
        
      }
    },
    components: {seekerInfo},
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