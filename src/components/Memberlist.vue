<template>
  <div>
    <el-row style="background:rgba(250,250,250,1);">
      <el-col :span="1">
        <div style="height:30px;width:4px;background:blue"></div>
      </el-col>
      <el-col :span="23">
        <span style="line-height:30px">成员列表</span>
      </el-col>
    </el-row>
    <br>
    <el-row style="background:rgba(250,250,250,1);">
      <el-col :span="2">头像</el-col>
      <el-col :span="2">微信昵称</el-col>
      <el-col :span="2">姓名</el-col>
      <el-col :span="2">电话</el-col>
      <el-col :span="2">工作职位</el-col>
      <el-col :span="2">在招职位数</el-col>
      <el-col :span="3">在招职位</el-col>
      <el-col :span="1">简历库</el-col>
     
      <el-col :span="4">注册时间</el-col>
      <el-col :span="4" style="color:rgba(24,117,240,1);">操作</el-col>
    </el-row>
    <el-row v-for="(item,index) in  memberList" :key="index">
      <el-col :span="2"><img class="heapic"  :src="item.avatar" alt=""></el-col>
      <el-col :span="2">{{item.wxNickname}}</el-col>
      <el-col :span="2">无字段</el-col>
      <el-col :span="2">{{item.companyEmployee.mobile}}</el-col>
      <el-col :span="2">{{item.companyEmployee.job}}</el-col>
      <el-col :span="2">{{item.jobSum}}</el-col>

      <el-col :span="3">{{item.nameList.map(item=>{return item }).join('')||'暂无'}}</el-col>
      <el-col :span="1">待建设</el-col>
      
      <el-col :span="4">{{item.companyEmployee.creationTime}}</el-col> 
      <el-col :span="2" style="color:rgba(24,117,240,1);"><el-button size="mini" type="primary"  @click='cancleQualifications(item.companyEmployee.id)'>取消招聘资格</el-button></el-col>
      <el-col :span="2" style="color:rgba(24,117,240,1);"> <el-button type="primary" size="mini" disabled>详情</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
     memberList:[]
    };
  },
  computed: {},
  props: ["enterId"],
  watch: {
    enterId: function(newValue, oldValue) {
      this.Memberlist(newValue);
    }
  },
  methods: {
    /**
     * 公司其他招聘人员
     */
     Memberlist(enterId){
       let that=this
         $.ajax({
        type: 'GET',
        url: this.$store.state.api+"/companyEmployee/selectCompanyEmployeeByCompanyId",
        data: {
            companyId:enterId
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data){
          that.memberList=data.data
      }
         }
         )
     },
     /**
      * 取消招聘资格
      */
     cancleQualifications(singleMemberListid){
      let that=this
    $.ajax({
        type: 'GET',
        url: this.$store.state.api + "/companyEmployee/updateIsDaleteById",
        data: {
            id:singleMemberListid
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data){
            data.code==200?alert('取消成功！'):alert('取消失败！')
           that.Memberlist()
        }
    })
},
     
  }
};
</script>
 <style lang="scss" scoped>
 .heapic{
   height: 50px;
   width: 50px;
   border-radius: 25px
 }
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>



