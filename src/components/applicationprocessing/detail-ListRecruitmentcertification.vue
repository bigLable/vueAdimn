<template>
<div>
   <div class="userInfo">
      <h2>用户信息</h2>
      <el-row>
        <el-col :span="5">
            <viewer :images="[enterInfo.avatar]">
	         <img class="imgPhoto" v-for="src in [enterInfo.avatar]" :src="[enterInfo.avatar]" :key="src" width="200px" height="200px">
	       </viewer>
          <!-- <img class="headpic" :src="enterInfo.avatar"> -->
        </el-col>
        <el-col :span="4">
          昵称:{{enterInfo.wxNickname}}
          <br>
          <br>
          <br>
          <br>
          注册时间:{{ enterInfo.creationTime}}
        </el-col>
        <el-col :span="4">
          职位:{{ enterInfo.job||'暂无填写'}}
        </el-col>
        <el-col :span="4">
          联系方式:{{ enterInfo.mobile}}
        </el-col>
      </el-row>
    </div>
    <BusineInfo :enterInfo="enterInfo"></BusineInfo>
</div>
   
</template>
<script>
import $ from 'jquery'
import seekInfo from '../seekerInfo'
import BusineInfo from '../detai-BusineInfo'
export default {
    data() {
        return {
           
             enterInfo:[]
        }
    },
    methods: {
        /**
         * 招聘者详情
         */
        recurit(cruiteID){
            let that=this      
            $.ajax({
                url:this.$store.state.api + "/company/selectCompanyAndCompanyEmployeeByComapnyId",
                data:{
                   id:cruiteID
            },
                success: function(data) {
                that.enterInfo=data.data
                }
            })
        },
      },
    components:{
        seekInfo,
        BusineInfo
    },
    mounted() {
        this.recurit(this.$route.query.enterId)
    },
}
</script>