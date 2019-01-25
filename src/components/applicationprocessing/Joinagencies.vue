<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
               <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
            </el-col>
             <el-col :span="2">logon</el-col>
            <el-col :span="3">类型</el-col>
            <el-col :span="4">机构简称</el-col>
            <el-col :span="2">申请人</el-col>
            <el-col :span="2">联系电话</el-col>
            <el-col :span="2">职位</el-col>            
              <el-col :span="2">boss电话</el-col>
               <el-col :span="2">申请时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
           <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
          <el-row v-for="(item,index) in viewResumeArr" v-bind:key="index" class="List">
            <el-col :span="1">
              <el-checkbox :label="item"></el-checkbox>
            </el-col>         
            <el-col :span="2"><img :src="item.logo" alt="" class="headpic"></el-col>      
            <el-col :span="3">{{item.employeeIsState==0?'公司':'店铺'}}</el-col>
            <el-col :span="4">{{item.companyName}}</el-col>
            <el-col :span="2">
              {{item.employeeName}}
            </el-col>
            <el-col :span="2">
              {{item.employeeMobile}}
            </el-col>
             <el-col :span="2">
              {{item.employeeJob}}
            </el-col>
            
             <el-col :span="2">
             {{item.bossCompany.mobile}}
            </el-col>
             <el-col :span="2">
              {{item.creationTime}}
            </el-col>
            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button size="mini" type="primary" v-if="Istate!=1" @click="change(item.companyJobApplicationId,true)">通过</el-button>        
              <!-- </router-link> -->
            </el-col >       
              <el-col :span="1">
                 <el-button size="mini" type="primary" v-if="Istate!=-1" @click="change(item.companyEmployeeId,false)">拒绝</el-button>
            </el-col>
            <el-col :span="1">
              <router-link :to="{ path:'/ListRecruitmentcertification',query:{enterId:item.id}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
          </el-row>
             </el-checkbox-group>        
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"> <el-button size="mini" type="primary" @click="allchange()">通过所有选择项</el-button></el-col>
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
import $ from "jquery";
import paging from "../paging";
export default {
  data() {
    return {
      checkedAll:false,
      selected:'',
      viewResumeArr:[],
      Istate: 0,
      getTotal: 0,
      singPageSize: 10,
      singPageNum: 0,
     
    };
  },
  props: ["index"],
  computed: {},
  components: {
    paging
  },
  watch: {
      index: function(newVal, oldVal) {
      this.Istate = newVal; //newVal即是chartData
      this.Joinagencies(
        this.singPageSize,
        newVal,
        this.singPageNum
      );
      console.log(newVal, "newVal");
    }
  
  },
  methods: {
      /**
       * 全选推荐
       */
       handleCheckAllChange(val) {
         
         console.log(this.checkedAll,'val',this.viewResumeArr,'compangArr')
         this.checkedAll?(this.selected=this.viewResumeArr):(this.selected=[])
      },
      handleCheckedCitiesChange(value) {
          console.log(value,'value')
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
            url: this.$store.state.api + "/companyEmployee/updateCompanyEmployeeIsState",
            data: {
                id:id,
                diff:num
            },
            success: function (data) { 
                if(data.code==200){
                     alert('操作成功')
                   that.Joinagencies(
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
      this.Joinagencies(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.Joinagencies(this.singPageSize, this.Istate, data);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");
      this.Joinagencies(
        this.singPageSize,
        this.Istate,
        this.singPageNum + 1
      );
    },
    //上页
    upPages() {
      console.log(data, "我加了1");
      this.Joinagencies(
        this.singPageSize,
        this.Istate,
        this.singPageNum - 1
      );
    },
    /**
     * 查看加入机构申请列表
     */
    Joinagencies(limit, newVal, page) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/companyEmployee/selectCompanyEmployeeNotCompanyId",
        data: {
          count: limit,
           number: page,
         diff:newVal,
        
        },
        success: function(data) {
          that.getTotal = data.data.sum;
          that.viewResumeArr = data.data.companyMap;
          
        }
      });
    }
  },
  created: function() {
    this.Joinagencies(
      this.singPageSize,
      this.Istate,
      this.singPageNum
    );
  }
 
};
</script>
<style lang="scss" scoped>
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