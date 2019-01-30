<template>
  <div>

       <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="JobRequire(item.value)"
          ></el-option>
            </el-select> 
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="职位详情" name="first">
       
      -->
        <!-- <div class="userInfo">
          <h2>用户信息</h2>
          <el-row>
            <el-col :span="5">
              <img class="headpic" :src="userinfo.bustPhotoUrl || ''">
            </el-col>
            <el-col :span="4">
              名字:{{userinfo.realName|| '空'}}
              <br>
              <br>
              <br>
              <br>
              注册时间:{{ userinfo.creationTime}}
            </el-col>
            <el-col :span="4">性别:{{ userinfo.sex == 1 ? '男' : '女'}}</el-col>
            <el-col :span="4">电话:{{ userinfo.mobile}}</el-col>
          </el-row>
        </div> -->
        <el-row style="background:rgba(250,250,250,1);">
          <el-col :span="1">
            <div style="height:30px;width:4px;background:blue"></div>
          </el-col>
          <el-col :span="23">
            <span style="line-height:30px">职位信息</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <h3>{{jobRequire.name}}</h3>
            <span style="color:rgba(155,155,155,1);">更新时间:{{jobRequire.modificationTime}}</span>
          </el-col>
          <el-col :span="20"></el-col>
        </el-row>
        <br>
        <el-row>
          <el-col
            :span="3"
          >{{JSON.parse(jobRequire.category).map(item=>{return item.categoryName}).join('|')}}</el-col>
          <el-col :span="3">{{jobRequire.isWorkTime}}|</el-col>
          <el-col :span="3">{{jobRequire.address}}|</el-col>
          <el-col :span="3">{{jobRequire.market}}|</el-col>
          <el-col :span="3">{{jobRequire.baseSalaryStart}}-</el-col>
          <el-col :span="3">{{jobRequire.baseSalaryEnd}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">定位:{{jobRequire.companyAdress}}</el-col>
          <el-col :span="12">详细地址:{{jobRequire.companyAdress}}</el-col>
        </el-row>
        <el-row>
          <h3>职位要求</h3>
          <el-col
            :span="4"
          >性别:{{jobRequire.isRequirementSex==0?'女':jobRequire.isRequirementSex==1?'男':'不限'}}</el-col>
          <el-col :span="4">最高年龄:{{jobRequire.requirementAgeEnd}}</el-col>
          <el-col :span="4">最低身高:{{jobRequire.requirementSenior}}</el-col>
          <el-col :span="4">最低工作年限:{{jobRequire.requirementWorkingLife}}</el-col>
          <el-col
            :span="4"
          >{{JSON.parse(jobRequire.category).map(item=>{return item.categoryName}).join('、')}}</el-col>
          <el-col :span="24">学历要求:{{jobRequire.study}}</el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="24">福利待遇</el-col>
        </el-row>
        <el-row >
          <el-col :span="3" v-for="(item,index) in JSON.parse(jobRequire.treatment)" :key="index">{{item.name}}</el-col>
        </el-row>
        <br>
        <br>

        <el-row>
          <el-col :span="24">
            <h3>职位详情</h3>
          </el-col>
          <br>
        </el-row>
        <el-row>{{jobRequire.jobInfo}}</el-row>
        <el-row>
          <el-col :span="24">
            <h3>公司简介</h3>
          </el-col>
          <br>
        </el-row>
        <el-row>
          <el-col :span="24">公司名称:{{jobRequire.companyName}}</el-col>
          <el-col :span="24">公司品牌:{{jobRequire.companyBrand}}</el-col>
          <el-col :span="24">公司简介:{{jobRequire.companyResume}}</el-col>
        </el-row>
         <el-row>
          <h3>公司营业执照</h3>
            <viewer :images="[jobRequire.companyLicense]">
	         <img v-for="src in [jobRequire.companyLicense]" :src="src" :key="src" width="200">
	       </viewer>
          <!-- <img
            :src="jobRequire.companyLicense"
            alt
          > -->
        </el-row>
        <el-row>
          <h3>公司LOGO</h3>
           <viewer :images="[jobRequire.companyLogo]">
	         <img v-for="src in [jobRequire.companyLogo]" :src="src" :key="src" width="200">
	       </viewer>
          <!-- <img
           :src="jobRequire.companyLogo"
            alt
          > -->
        </el-row>
         <el-row>
          <h3>公司风采</h3>
           <viewer :images="[jobRequire.companyMien]">
	         <img v-for="src in [jobRequire.companyMien]" :src="src" :key="src" width="200">
	       </viewer>
          <!-- <img
           :src="jobRequire.companyMien"
            alt
          > -->
        </el-row>
      <!-- </el-tab-pane>
      <el-tab-pane label="简历详情" name="third">
        <seekerResume :userInfo="userInfo"></seekerResume>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
// import seekerResume from "../seekerResume";
import $ from "jquery";
export default {
  data() {
    return {
      userinfo:{},
      userInfo: {},
      jobRequire: {},
      JobList: [],
      activeName: "first",
      options: [],
      value: ""
    };
  },
//   components: {seekerResume},
  computed: {},
  methods: {
    /**
     * 职位要求
     */
    JobRequire(jobId) {
      let that = this;

      $.ajax({
        type: "GET",
        url:
          this.$store.state.api + "/companyJob/selectCompanyJobAndCompanyById",
        data: {
          id: jobId
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
          that.jobRequire = data.data;
        }
      });
    },
    /**
     * 招聘者其他职位
     */
    OtherJobs(UserID) {
      let that=this
      $.ajax({
        type: "GET",
        url:
          this.$store.state.api + "/companyJob/selectCompanyJobListBreviary",
        data: {
          diff: true,
          userId: UserID
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
        data.data.map(item=>{
               that.options.push({value:item.id,
                label:item.name
               })

        })
          console.log(that.options,'opthions')
        }
      });
    },
    /**
     * 求职者简历详情
     */
    seekerResumeDetail(seekerId) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/employee/getFullEmployee",
        data: {
          employeeId: seekerId
        },
        xhrFields: {
                      withCredentials: true
              },
        success:function(data){
          that.userInfo = data.data;
          that.userinfo=data.data.employee
          // console.log(that.userInfo);
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
created() {
    // console.log(this.$route.query.jobId,'this.$route.query.jobId')
    //  console.log(this.$route.query.recruiterId,'this.$route.query.recruiterId')
    //   console.log(this.$route.query.seekerId,'this.$route.query.seekerId')
    let jobId = this.$route.query.jobId;
     let recruiterId=this.$route.query.recruiterId
    let seekerId = this.$route.query.seekerId;
    this.seekerResumeDetail(seekerId);
      
     this.JobRequire(jobId)
    // this.recuitInfo(recruiterId)
    this.OtherJobs(recruiterId)
  }
};
</script>
<style lang="scss" scoped>
.headpic {
  width: 150px;
  height: 150px;
}
</style> 