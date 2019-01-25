<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
             <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
            </el-col>
             <el-col :span="2">申请人</el-col>
            <el-col :span="3">求职职位</el-col>
            <el-col :span="2">联系电话</el-col>
            <el-col :span="2">申请岗位</el-col>
         
            <el-col :span="4">所属机构</el-col>
             <el-col :span="2">联系电话</el-col>
              <el-col :span="1">分享次数</el-col>
               <el-col :span="2">申请时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
            <!-- 预览 -->
            <singleRersume :SingleResume="resumInfo"></singleRersume>
             <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
          <el-row v-for="(item,index) in viewResumeArr" v-bind:key="index" class="List">
            <el-col :span="1">
              <el-checkbox :label="item"></el-checkbox>
            </el-col>
           
            <el-col :span="2">{{item.realName||'暂无'}}&nbsp;&nbsp; <span
                    class="checkDetail"
                    @mouseover="detailInfo($event,item.seekerEmployeeId)"
                  >预览</span></el-col>
         
            <el-col :span="3">
              <el-row>
                <el-col v-for="(item,index) in JSON.parse(item.employeePosition)" :key='index'>{{item.dictName}}</el-col>
              </el-row>
              <!-- {{JSON.parse(item.employeePosition).map(item=>{return item.dictName}) || '暂无'}}</el-col> -->
            </el-col>
            <el-col :span="2">{{item.employeeMobile || '暂无'}}</el-col>
            <el-col :span="2">
              {{item.companyJobName || '暂无'}}
            </el-col>
            
             <el-col :span="4">
              {{item.companyName || '暂无'}}
            </el-col>
             <el-col :span="2">
              {{item.companyEmployeeMobile || '暂无'}}
            </el-col>
             <el-col :span="1">
             {{item.userDetail }}
            </el-col>
             <el-col :span="2">
              {{item.companyJobApplicationCreationTime || '暂无'}}
            </el-col>

            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button size="mini" type="primary" v-if="Istate!=1"  @click="change(item.companyJobApplicationId,true)">通过</el-button>
               
              <!-- </router-link> -->
            </el-col >
          
              <el-col :span="1">
                 <el-button size="mini" type="primary" v-if="Istate!=-1" @click="change(item.companyJobApplicationId,false)">拒绝</el-button>
            </el-col>
            <el-col :span="1">
              <router-link :to="{ path:'/DetailCheckposition',query:{jobId:item.jobId}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
          </el-row>
             </el-checkbox-group>     
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">  <el-button size="mini" type="primary" @click="allchange()">通过所有所选项</el-button></el-col>
      <el-col :span="12" :offset="3">
         <el-row>
        <paging
          @pageSize="changePageSize"
          @currentPageNum="changePageNum"
          @DownPage="downPages"
          @UpPage="upPages"
          :getTotal="getTotal"
        ></paging>
      </el-row>
      </el-col>
     
    </el-row>
  </div>
</template>

<script>
import  singleRersume from '../singleResume'
import $ from "jquery";
import paging from "../paging";
export default {
  data() {
    return {
      selected:'',
      checkedAll:false,
      viewResumeArr:[],
      Istate: 0,
      getTotal: 0,
      singPageSize:10,
      singPageNum: 0,
      resumInfo:{}
    };
  },
  props: ["index"],
  computed: {},
  components: {
    paging,
    singleRersume
  },
  watch: {
      index: function(newVal, oldVal) {
      this.Istate = newVal; //newVal即是chartData
      this.Checkposition(
        this.singPageSize,
        newVal,
        this.singPageNum
      );
      console.log(newVal, "newVal");
    }
  
  },
  methods: {
      /**
     * 求职者简历
     */
    detailInfo(e,id) {
      console.log(id,'--')
         let [X, Y] = [e.clientX, e.clientY];
      let that = this;
      $.ajax({
        type: "GET",
        url: that.$store.state.api+"/employee/getEmployeeShowData",
        data: {
          employeeId: id
        },
        success: function(data) {
          that.resumInfo = data.data;
           that.resumInfo = Object.assign(
            {},
            { newclientX: X, newclientY: Y },
            that.resumInfo
          );
        }
      });
    },
      /**
       * 全选推荐
       */
       handleCheckAllChange(val) {
         
         console.log(this.checkedAll,'val',this.viewResumeArr,'compangArr')
         this.checkedAll?(this.selected=this.viewResumeArr):(this.selected=[])
      },
      handleCheckedCitiesChange(value) {
          
       (value.length==this.viewResumeArr.length)?(this.checkedAll=true):(this.checkedAll=false)
      },
      allchange(){
        this.selected.map(item=>{
          this.change(item.companyJobApplicationId,true)
        })
      },
      /**
       * 状态修改
       */
    change(id,num) {
        let that=this
        $.ajax({
            url: this.$store.state.api + "/companyJobApplication/updateCompanyJobApplication",
            data: {
                id:id,
                diff:num
            },
            success: function (data) { 
                if(data.code==200){
                     alert('操作成功')
                   that.Checkposition(
      that.singPageSize,
      that.Istate,
      that.singPageNum
    );
                }
            } 
        })
       
    },
    /**
     * 接受分页条数 页数
     */
    changePageSize(data) {
      this.singPageSize = data;
      console.log(data, "每页数据条数");
      this.Checkposition(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.Checkposition(this.singPageSize, this.Istate, data-1);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");      
      this.Checkposition(
        this.singPageSize,
        this.Istate,
        this.singPageNum
      );
    },
    //上页
    upPages(data) {
      console.log(data, "我加了1");
      this.Checkposition(
        this.singPageSize,
        this.Istate,
        this.singPageNum - 1
      );
    },
    /**
     * 查看职位申请
     */
    Checkposition(limit, newVal, page) {
      let that = this;
     
      $.ajax({
        url: this.$store.state.api + "/companyJobApplication/selectJobApplication",
        data: {
          count: limit,
           number: page,
         diff:newVal,
        
        },
        success: function(data) {
          that.getTotal = data.data.sum;
         
          ( data.data.selectJobApplicationList).forEach(element => {
            
            if (
              element.employeePosition == null ||
              element.employeePosition == undefined
            ) {
              element.employeePosition = '[{"dictName":"暂无"}]'
            }
              console.log(element.employeePosition);
         
          });

           that.viewResumeArr = data.data.selectJobApplicationList;
        }
      });
    }
  },
  created: function() {
    this.Checkposition(
      this.singPageSize,
      this.Istate,
      this.singPageNum
    );
  }
 
};
</script>
<style lang="scss" scoped>
.checkDetail {
  color: blue;
  cursor: pointer;
}
.headpic {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: rgba(216, 216, 216, 1);
}
.List{
  margin-top:20px;
  height:60px;
background:white;
transition:height 1s;
-moz-transition:height 1s; /* Firefox 4 */
-webkit-transition:height 1s; /* Safari and Chrome */
-o-transition:height 1s; /* Opera */

}
.List:hover{
  border-radius: 15px;

  background-color: rgb(192, 184, 184)
}
</style>