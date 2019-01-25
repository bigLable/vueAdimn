<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
               <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
            </el-col>
            <el-col :span="2">Logon</el-col>
            <el-col :span="5">企业名称</el-col>
            <el-col :span="2">联系方式</el-col>
            <el-col :span="4">接收简历邮箱</el-col>
            <el-col :span="3">职位</el-col>
            <el-col :span="3">申请时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
             <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
          <el-row v-for="(item,index) in RecruitArr" v-bind:key="index" class="List">
            <el-col :span="1">
               <el-checkbox :label="item"></el-checkbox>
            </el-col>
            <el-col :span="2">
              <img class="headpic" :src="item.logo">
            </el-col>
            <el-col :span="5">{{item.name}}</el-col>
         
            <el-col :span="2">{{item.mobile || '暂无'}}</el-col>
            <el-col :span="4">{{item.malibox || '暂无'}}</el-col>
            <el-col :span="3">
              {{item.job || '暂无'}}
            </el-col>
            <el-col :span="3">
              {{item.creation_time || '暂无'}}
            </el-col>
            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button size="mini" type="primary" v-if="Istate==0||Istate==-1" @click="change(item.id,1)">通过</el-button>
               
              <!-- </router-link> -->
            </el-col >
            
              <el-col :span="1">
 <el-button size="mini" type="primary" v-if="Istate==0||Istate==' '||Istate==1"  @click="change(item.id,-1)">拒绝</el-button>
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
      <el-row>
        <el-col :span="2"><el-button size="mini" v-if="Istate!=1" type="primary" @click="Allchange()">所选全部通过</el-button></el-col>
        <el-col :span="10" :offset="3">
          <paging
          @pageSize="changePageSize"
          @currentPageNum="changePageNum"
          @DownPage="downPages"
          @UpPage="upPages"
          :getTotal="getTotal"
        ></paging>
          </el-col>
      </el-row>
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
       selected:[],
       RecruitArr: [],
       Istate: 0,
       getTotal: 0,
       singPageSize: 10,
       singPageNum: 1,
     
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
      this.Recruitmentcertification(
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
      handleCheckAllChange(val) {
         
         console.log(this.checkedAll,'val',this.RecruitArr,'compangArr')
         this.checkedAll?(this.selected=this.RecruitArr):(this.selected=[])
      },
      handleCheckedCitiesChange(value) {
          
       (value.length==this.RecruitArr.length)?(this.checkedAll=true):(this.checkedAll=false)
      },
      Allchange(){
        this.selected.map(item=>{
          this.change(item.id,1)
        })
       
      },
      /**
       * 状态修改
       */
     change(id,num){
         let that=this
         $.ajax({
            url: this.$store.state.api + "/company/updateIsStatusById",
            data: {
                id:id,
                isStates:num
            },
            success: function (data) { 
                if(data.code==200){
                    alert('操作成功！！')
                    that.Recruitmentcertification(
                         that.singPageSize,
                         that.Istate,
                        that.singPageNum
                    )
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
      this.Recruitmentcertification(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.Recruitmentcertification(this.singPageSize, this.Istate, data);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");
      this.Recruitmentcertification(
        this.singPageSize,
        this.Istate,
        this.singPageNum + 1
      );
    },
    //上页
    upPages() {
      console.log(data, "我加了1");
      this.Recruitmentcertification(
        this.singPageSize,
        this.Istate,
        this.singPageNum - 1
      );
    },
    /**
     * 机构认证申请
     */
    Recruitmentcertification(limit, newVal, page) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/company/selectNotAuthentication",
        data: {
          count: limit,
          number: page-1,
          diff:newVal,
        
        },
        success: function(data) {
          that.getTotal = data.data.sum;
          that.RecruitArr = data.data.companies;
        }
      });
    }
  },
  created: function() {
    this.Recruitmentcertification(
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