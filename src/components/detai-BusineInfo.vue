<template>
<div>
  <div >
    <h3>企业信息</h3>
    <el-row>
        <el-col :span="5">
            <viewer :images="[rejectParentValue.companyLogo]">
	         <img class="imgPhoto" v-for="src in [rejectParentValue.companyLogo]" :src="[rejectParentValue.companyLogo]" :key="src" width="200px" height="200px">
	       </viewer>
          <!-- <img class="imgPhoto" :src="rejectParentValue.companyLogo" alt=""> -->
          </el-col> 
        <el-col :span="19">
            <el-row>
                <el-col :span="6">企业全称:{{rejectParentValue.companyName}}</el-col>
                 <el-col :span="6">简称:{{rejectParentValue.companyNickname}}</el-col>
                  <el-col :span="6">经营品牌:{{rejectParentValue.companyBrand}}</el-col>
                   <el-col :span="6">企业地址:{{rejectParentValue.companyAddress}}</el-col>
            </el-row><br><br>
            <el-row>
                <el-col :span="6">企业邮箱:{{rejectParentValue.companyMalibox}}</el-col>
                 <el-col :span="6">公司注册时间:{{rejectParentValue.companyCreationTime}}</el-col>
                  <el-col :span="6">员工数:{{rejectParentValue.employeeId}}</el-col>
                
            </el-row>
        </el-col>
    </el-row>
    <p>企业简介:{{rejectParentValue.companyResume}}</p>
    <el-row>
        <el-col :span="12"><p>企业风采</p>
        <viewer :images="[rejectParentValue.companyLogo]">
	         <img class="imgPhoto" v-for="src in [rejectParentValue.companyMien]" :src="[rejectParentValue.companyMien]" :key="src" width="200px" height="200px">
	       </viewer>
        <!-- <img class="imgPhoto" :src="rejectParentValue.companyMien" alt=""> -->
        </el-col>
        <el-col :span="12">
          <p>营业执照</p>
          <viewer :images="[rejectParentValue.companyLicense]">
	         <img class="imgPhoto" v-for="src in [rejectParentValue.companyLicense]" :src="[rejectParentValue.companyLicense]" :key="src" width="200px" height="200px">
	       </viewer>
          <!-- <img class="imgPhoto" :src="rejectParentValue.companyLicense" alt=""> -->
        </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
 
  export default {
      data() {
      return {
        activeName: 'second',
        rejectParentValue:{}
       
      };
    },
    props:['enterInfo'],
    computed: {
  
    },
    watch: {
      enterInfo:function(newValue,oldValue){
      this.rejectParentValue=newValue
      let that=this
      // new Promise(function(resolve){
      
      //    const CompanyPhoto=[that.rejectParentValue.companyLogo,that.rejectParentValue.companyMien,that.rejectParentValue.companyLicense]
      //   console.log(CompanyPhoto,'CompanyPhoto')
      //   // that.images=CompanyPhoto
      //   // this.images.push(CompanyLogo,"CompanyLogo")
      //   // resolve()
      // })
      
      
      }
    },
    methods: {
   handleClick(tab, event) {
        console.log(tab, event);
      }
    
    }
  }

</script>
 <style lang="scss" scope>
.imgPhoto{
height: 150px;
width: 150px
}
</style>
 