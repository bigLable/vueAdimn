<template>
    <div class="alert" v-show="attribute.alertstate" @mouseleave="changeShowstate" :style="{'left':attribute.newclientX-30+'px','top':attribute.newclientY-20+'px'}">
        <el-row type="flex" justify="center"> <el-col :span="4">职位详情</el-col></el-row>
        <el-row>
      <el-col :span="6">
        <span style="font-size:30px">{{attribute.name}}</span>
        <span>招聘中</span>
      </el-col>
      <el-col :span="5" :offset="13">底薪:{{attribute.baseSalaryStart}}</el-col>
      <el-col>{{JSON.parse(attribute.category).map(item=>{return item.categoryName}).join('|') }}|{{attribute.isWorkTime}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="20">地区:{{attribute.market}}</el-col>
      <el-col :span="4">{{attribute.salaryStart}}k-{{attribute.salaryEnd}}k</el-col>
      <el-col>定位:{{attribute.address}}-{{attribute.market}}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col>职位要求</el-col>
      <el-col :span="3">{{attribute.study}}</el-col>
      <el-col :span="3">{{attribute.name}}</el-col>
      <el-col :span="3">{{attribute.requirementSenior}}cm</el-col>
    </el-row>
    <el-row>
      <el-col>福利待遇{{obj}}</el-col>
      <el-col>补贴:{{attribute.study}}</el-col>
      <el-col>工资保底:{{attribute.bottomGuard}}</el-col>
      <el-col>{{JSON.parse(attribute.treatment).map(item=>item.name).join('')}}</el-col>
    </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
           
          attribute:{category:'[{"categoryName":"暂无"}]',treatment:'[{"name":"暂无"}]'},
          attributecontair:{category:'[{"categoryName":"暂无"}]',treatment:'[{"name":"暂无"}]'},
          
        }
    },
   computed:{
       obj:function () {
             this.attributecontair=this.$store.state.viewConfig
           
             if(this.attributecontair.category==undefined){              
                  this.attributecontair.category='[{"categoryName":"暂无"}]'
              }else if(this.attributecontair.treatment==undefined){
                  this.attributecontair.treatment='[{"name":"暂无"}]'
              }
            this.attribute= this.attributecontair
       }
   },
   methods:{
       changeShowstate(){
           this.attribute.alertstate=false
       }
   }
     
}
</script>
<style scoped>
.alert{
    position: fixed;
    z-index: 9999999;
    border: 1px solid red;
    width: 500px;
    height: 400px;
    background-color: #94b0c5;
    overflow-y: scroll;
    overflow-x: hidden
}
</style>

