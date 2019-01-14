<template>
  <div>
    <div class="Resume">
      <!-- 简历头 -->
      <el-row style="background:rgba(250,250,250,1)">
        <el-col :span="1">
          <div style="height:30px;width:4px;background:rgba(24,117,240,1)"></div>
        </el-col>
        <el-col :span="23" style="text-align:left">
          <b style="line-height:30px">{{userInfo.employee.realName}}的简历</b>
        </el-col>
      </el-row>
      <!-- 姓名基本信息 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <img class="headpic" :src="userInfo.employee.bustPhotoUrl" alt>
        </el-col>
        <el-col :span="13">
          <el-row :gutter="5">
            <el-col :span="2">
              <h2>{{userInfo.employee.realName}}</h2>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="5">
            <el-col :span="4">性别:{{userInfo.employee.sex == 1 ? '男' : '女'}}</el-col>
            <el-col :span="4">身高:{{userInfo.employee.height}}</el-col>
            <el-col :span="4">年龄:{{userInfo.employee.age}}</el-col>
            <el-col :span="4">到岗时间:{{userInfo.employee.arrivalName}}</el-col>
            <el-col :span="4">工作状态:{{userInfo.employee.jobStateName}}</el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="5">手机号:{{userInfo.employee.mobile}}</el-col>
            <el-col :span="5">邮箱:{{userInfo.employee.email}}</el-col>
            <el-col :span="5">微信:{{userInfo.employee.wechatNo}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="Resume" style="border:1px solid gainsboro;margin-top:20px">
        <el-col :span="24">
          <h2>基本信息</h2>
        </el-col>
        <el-col :span="4">
          <span>姓名:{{userInfo.employee.realName}}</span>
          <br>
          <br>
          <span>邮箱:{{userInfo.employee.email}}</span>
          <br>
          <br>
          <span>拥有孩子数:{{userInfo.employee.fertilityStateName}}</span>
        </el-col>
        <el-col :span="4">
          <span>性别:{{userInfo.employee.sex == 1 ? '男' : '女'}}</span>
          <br>
          <br>
          <span>身高:{{userInfo.employee.height}}</span>
          <br>
          <br>
          <span>学历:{{userInfo.employee.educationName}}</span>
        </el-col>
        <el-col :span="4">
          <span>生日:19980612</span>
          <br>
          <br>
          <span>体重:{{userInfo.employee.weight}}</span>
          <br>
          <br>
        </el-col>
        <el-col :span="4">
          <span>手机号:{{userInfo.employee.mobile}}</span>
          <br>
          <br>
          <span>地区:{{userInfo.employee.address}}</span>
          <br>
          <br>
        </el-col>
        <el-col :span="4">
          <span>微信:{{userInfo.employee.wechatNo}}</span>
          <br>
          <br>
          <span>婚姻情况:{{userInfo.employee.marry == 0 ? '未婚' : "已婚"}}</span>
          <br>
          <br>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <h2>自我介绍</h2>
        </el-col>
        <el-col :span="8">语音---</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h2>求职期望</h2>
        </el-col>
        <br>
        <el-col :span="4">目标城市:{{userInfo.employeeObjective.cityName}}</el-col>
        <el-col
          :span="4"
        >期望商场:{{JSON.parse(userInfo.employeeObjective.mall).map((item, index) => { return item.mallName }).join('')}}</el-col>
        <el-col :span="4">期望底薪:{{parseInt(userInfo.employeeObjective.expectSalary / 1000)}}K</el-col>
        <el-col
          :span="4"
        >期望职位:{{JSON.parse(userInfo.employeeObjective.position).map((item, index) => { return item.mallName }).join('')}}</el-col>
        <el-col
          :span="4"
        >求职品类:{{JSON.parse(userInfo.employeeObjective.category).map((item, index) => { return item.categoryName }).join('')}}</el-col>
      </el-row>

      <el-col :span="24">
        <h2>工作经历</h2>
      </el-col>
      <br>
      <ul>
        <li v-for="(item,index) in userInfo.employeeExperienceList" :key="index">
          <el-row >
            <el-col :span="24">
              <h3>{{item.company}}</h3>&nbsp;&nbsp;&nbsp;
              <span>{{item.creationTime}}-{{item.endTime}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="24"
            >{{item.cityName}}、{{item.positionName}}、{{JSON.parse(item.category).map(item1 => {return item1.categoryName }).join('')}}、</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">工作期间销售额:{{item.performance / 10000}}</el-col>
            <el-col :span="6">工作品牌:{{item.brand}}</el-col>
            <el-col :span="6">竞争品牌:{{item.competitiveBrand}}</el-col>
            <el-col :span="6">管理店铺:{{item.shopNum == null ? '暂无' : `${item.shopNum}`}}</el-col>
          </el-row>
          <el-row>
            <el-col>工作类内容介绍:{{item.content}}</el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  computed: {},
  props: ["userInfo"],
  methods: {
    /**
     * 求职者详情
     */
    SeekerDetail(seekerId) {
      let that = this;
      $.ajax({
        url: "http://192.168.0.199:10280/employee/getFullEmployee",
        data: {
          employeeId: seekerId
        },
        success: function(data) {}
      });
    },

    mounted: function() {
      /**
       * 调用求职者详情
       */
      SeekerDetail();
    }
  }
};
</script>
<style lang="scss" scoped>
.border {
  border: 1px solid gray;
  padding: 20px 20px;
}
.headpic {
  margin-top: 10px;
  width: 120px;
  height: 120px;
}
.Resume {
  padding: 20px 20px 50px 20px;
  border: 0px solid gainsboro;
}
</style>