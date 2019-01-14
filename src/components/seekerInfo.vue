<template>
  <div>
    <div class="userInfo">
      <h2>用户信息</h2>
      <el-row>
        <el-col :span="5">
          <img class="headpic" :src="userInfo.userDetail.avatar">
        </el-col>
        <el-col :span="4">
          昵称:{{userInfo.userDetail.nickName}}
          <br>
          <br>
          <br>
          <br>
          注册时间:{{userInfo.userDetail.creationTime}}
        </el-col>
        <el-col :span="4">
          姓名:{{userInfo.employee.realName||'暂无填写'}}
          <br>
          <br>
          <br>
          <br>
          注册时长:{{userInfo.year}}年{{userInfo.month}}个月
        </el-col>
        <el-col :span="4">
          性别:{{userInfo.employee.sex == 1 ? '男' : '女'}}
          <br>
          <br>
          <br>
          <br>
          上次修改时间:{{userInfo.employee.modificationTime}}
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini">推荐</el-button>
          <br>
          <br>
          <br>
          <br>
          联系方式:{{userInfo.userDetail.remark}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
     
    };
  },
  computed: {},
  props: ["userInfo"],
  methods: {
   
  },
  mounted:function(){
    
  }
};
</script>
<style lang="scss" scoped>
.userInfo {
  padding: 20px 20px 50px 20px;
  border: 1px solid gainsboro;
}
.headpic {
  width: 120px;
  height: 120px;
}
</style>