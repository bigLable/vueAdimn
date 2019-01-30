<template>
  <div>
    <div class="userInfo">
      <h2>用户信息</h2>
      <el-row>
        <el-col :span="5">
          <viewer :images="images">
	         <img class="headpic" v-for="src in images" :src="src" :key="src" width="200px" height="200px">
	       </viewer>
          <!-- <img class="headpic" :src="userInfo.userDetail.avatar"> -->
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
          <router-link :to="{path:'/page5detail',query:{seekerId:userInfo.employee.id}}" tag="a"><el-button size="mini" type="primary" >推荐</el-button></router-link>
        
          <br>
          <br>
          <br>
          <br>
          电话:{{userInfo.userDetail.remark}}
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
     userInfo:{}
     ,images:[]
    };
  },
  computed: {},
  props: ["userInfo"],
  watch:{
    userInfo:function(newValue){
        
        this.images.push(newValue.userDetail.avatar)
    }
  },
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