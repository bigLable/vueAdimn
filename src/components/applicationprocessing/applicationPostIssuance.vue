<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
             <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
            </el-col>
             <el-col :span="2">logo</el-col>
            <el-col :span="2">类型</el-col>
            <el-col :span="2">机构名称</el-col>
            <el-col :span="2" style="text-align:center">职位</el-col>
            <el-col :span="2">电话</el-col>
            <el-col :span="2">工作数</el-col>
              <el-col :span="2">在招职位数</el-col>
               <el-col :span="3">申请时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
              <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
          <el-row v-for="(item,index) in viewResumeArr" v-bind:key="index" class="List">
            <el-col :span="1">
              <el-checkbox  :label="item"></el-checkbox>
            </el-col>
           
            <el-col :span="2"><img :src="item.avatar" alt="" class="headpic"></el-col>
            <el-col :span="2">{{item.companyState==0?'公司':'店铺'}}</el-col>
           
            <el-col :span="2">
              {{item.companyEmployeeName}}
            </el-col>
             <el-col :span="2" style="text-align:center">
              {{item.companyEmployeeJob}}
            </el-col>
             <el-col :span="2">
              {{item.companyEmployeeMobile}}
            </el-col>
             <el-col :span="2">
              {{item. hasEmployeeCunt}}
            </el-col>
           
             <el-col :span="2">
             <!-- {{item.companyJobName}}&nbsp;&nbsp;  <span
                    class="checkDetail"
                    @mouseover="checkInfo($event,item.jobId,item.recruiterId)"
                  >预览</span>  -->
            </el-col>
             <el-col :span="2">
              {{item.companyJobSum}}
            </el-col>
            <el-col :span="3">
              {{item.creation_time}}
            </el-col>
            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button size="mini" type="primary" v-if="Istate!=1" @click="change(item.jobId,true)">通过</el-button>
               
              <!-- </router-link> -->
            </el-col >
            
            
              <el-col :span="1">
                 <el-button size="mini" type="primary" v-if="Istate!=-1" @click="change(item.jobId,false)">拒绝</el-button>
            </el-col>
            <el-col :span="1">
              <router-link :to="{path:'/detailapplicationPostIssuance',query:{recruiterId:item.companyJobEmployeeId,jobId:item.jobId}}" tag="a">  
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
            <el-col :span="1">
       <!-- 留言 --><message :empId="item.companyJobEmployeeId"></message>
            </el-col>
          </el-row>
            </el-checkbox-group>          
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><el-button size="mini" type="primary" @change="allchange()">通过所选项</el-button></el-col>
      <el-col :span="12" :offset="3"></el-col>
      <el-row>
        <paging
          @pageSize="changePageSize"
          @currentPageNum="changePageNum"
          @DownPage="downPages"
          @UpPage="upPages"
          :getTotal="getTotal"
        ></paging>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import message from '../meagess'
import $ from "jquery";
import paging from "../paging";
export default {
  data() {
    return {
      meageState:false,
      selected:[],
      checkedAll:false,
      viewResumeArr:[],
      Istate: 0,
      getTotal: 0,
      singPageSize: 10,
      singPageNum: 0,
     
    };
  },
  props: ["index"],
  computed: {
     
  },
  components: {
    paging,
    message
  },
  watch: {
     index: function(newVal, oldVal) {
      this.Istate = newVal; //newVal即是chartData
      this.applicationPostIssuance(
        this.singPageSize,
        newVal,
        this.singPageNum
      );
      console.log(newVal, "newVal");
    }
  
  },
  methods: {
    /**
     * 全部状态修改
     */
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
          this.change(item.jobId,true)
        })
      },
      /**
       * 状态修改
       */
    change(id,num) {
        let that=this
        $.ajax({
            url: this.$store.state.api + "/companyJob/updateCompanyJobState",
            data: {
                jobId:id,
                diff:num
            },
            xhrFields: {
                      withCredentials: true
              },
            success: function (data) { 
                if(data.code==200){
                     alert('操作成功')
                   that.applicationPostIssuance(
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
      this.applicationPostIssuance(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.applicationPostIssuance(this.singPageSize, this.Istate, data);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");
      this.applicationPostIssuance(
        this.singPageSize,
        this.Istate,
        this.singPageNum + 1
      );
    },
    //上页
    upPages() {
      console.log(data, "我加了1");
      this.applicationPostIssuance(
        this.singPageSize,
        this.Istate,
        this.singPageNum - 1
      );
    },
    /**
     * 查看职位发布
     */
    applicationPostIssuance(limit, newVal, page) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/companyJob/selectCompanyJobNotDispose",
        data: {
          count: limit,
           number: page,
           diff:newVal,
        
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
          that.getTotal = data.data.sum;
          that.viewResumeArr = data.data.companyJobMap;
          
        }
      });
    }
  },
  created: function() {
    this.applicationPostIssuance(
      this.singPageSize,
      this.Istate,
      this.singPageNum
    );
  }
 
};
</script>

<style lang="scss" scoped>
.meagess{
  position: fixed;
  top: 300px;
  right: 15px;
  width: 300px;
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