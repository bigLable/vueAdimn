<template>
  <div >
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
              <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
            </el-col>
            <el-col :span="5">所属机构</el-col>
            <el-col :span="2">联系电话</el-col>
            <el-col :span="2">招聘职位</el-col>
            <el-col :span="2">求职者</el-col>
            <el-col :span="2">联系电话</el-col>
            <el-col :span="1">分享</el-col>
            <el-col :span="3">申请时间</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
            <viewresumedetailmotai :postInfo="positionDetail"></viewresumedetailmotai>
            <singleRersume :SingleResume="resumInfo"></singleRersume>
          <div v-if="viewResumeArr.length"
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="viewResumeArr"
            style="width: 100%"
          >
            <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
              <el-row  v-for="(item,index) in viewResumeArr" v-bind:key="index" class="List"  >
                <el-col :span="1">
                  <el-checkbox :label="item"></el-checkbox>
                </el-col>
                <el-col :span="5">{{item.recruiterName|| '暂无'}}</el-col>
                <el-col :span="2">{{item.recruiterMobile || '暂无'}}</el-col>
                <el-col :span="2">
                  {{item.jobName || '暂无'}}&nbsp;&nbsp;
                  <span
                    class="checkDetail"
                    @mouseover="checkInfo($event,item.jobId,item.recruiterId)"
                  >预览</span>
                </el-col>
                <el-col :span="2">
                  {{item.seekerRealName || '暂无'}}&nbsp;&nbsp;
                  <span class="checkDetail" @mouseover="detailInfo($event,item.seekerId)">预览</span>
                </el-col>
                <el-col :span="2">{{item.seekerMobile || '暂无'}}</el-col>
                <el-col :span="1">{{item.shareCount }}</el-col>
                <el-col :span="3">{{item.creationTime || '暂无'}}</el-col>
                <el-col :span="1">
                  <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
                  <el-button
                    size="mini"
                    type="primary"
                    v-if="Istate!=1"
                    @click="change(item.id,1)"
                  >通过</el-button>
                  <!-- </router-link> -->
                </el-col>
                <el-col :span="1">
                  <el-button
                    size="mini"
                    v-if="Istate!=-1"
                    type="primary"
                    @click="change(item.id,-1)"
                  >拒绝</el-button>
                </el-col>
                <el-col :span="1">
                  <router-link
                    :to="{ path:'/detailViewResume',query:{jobId:item.jobId,recruiterId:item.recruiterId,seekerId:item.seekerId}}"
                    tag="a"
                  >
                    <el-button size="mini" type="primary">详情</el-button>
                  </router-link>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-button size="mini" type="primary">通过所选项</el-button>
      </el-col>
      <el-col :span="12" :offset="3" @click="allchange()">
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
import viewresumedetailmotai from "../viewResumeDetailMotai";
import singleRersume from "../singleResume"
import $ from "jquery";
import paging from "../paging";
export default {
  data() {
    return {
      resumInfo: {},
      positionDetail: {},
      jobsList: null,
      dialogVisible: false,
      loading2: true,
      selected: [],
      checkedAll: false,
      viewResumeArr: [],
      Istate: 0,
      getTotal: 0,
      singPageSize: 10,
      singPageNum: 1
    };
  },
  props: ["index"],
  computed: {},
  components: {
    paging,
    viewresumedetailmotai,
  singleRersume
  },
  watch: {
    index: function(newVal, oldVal) {
      this.Istate = newVal; //newVal即是chartData
      this.ViewResume(this.singPageSize, newVal, this.singPageNum);
      console.log(newVal, "newVal");
    }
  },
  methods: {
    /**
     * 预览信息职位详情
     */
    checkInfo(e, jobId, recruiterId) {
      // this.positionDetail={}
      console.log(e, "e");
      let [X, Y] = [e.clientX, e.clientY];
      console.log(e.clientX,'e.clientX')
      let that = this;
      this.dialogVisible = true;
      $.ajax({
        type: "GET",
        url: this.$store.state.api+"/companyJob/selectCompanyJobById",
        data: {
          id: jobId
        },
        async: false,
        success: function(data) {
          that.positionDetail = data.data;
          console.log(that.positionDetail, "that.positionDetail");
          that.positionDetail = Object.assign(
            {},
            { newclientX: X, newclientY: Y },
            that.positionDetail
          );

          //  console.log(JSON.stringify(jobDetal)+'***********jobDetal')
        }
      });
      $.ajax({
        type: "GET",
        url:
         this.$store.state.api+"/companyJob/selectCompanyJobListBreviary",
        data: {
          diff: true,
          userId: recruiterId
        },
        async: false,
        success: function(data) {
          that.jobsList = data.data;
          that.positionDetail = Object.assign({}, that.positionDetail, {
            positionsList: that.jobsList
          });
          console.log(that.positionDetail, " that.positionDetail");
        }
      });
    },
    /**
     * 求职者简历
     */
    detailInfo(e,id) {
         let [X, Y] = [e.clientX, e.clientY];
      let that = this;
      $.ajax({
        type: "GET",
        url: this.$store.state.api+"/employee/getEmployeeShowData",
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    /**
     * 全选推荐
     */
    handleCheckAllChange(val) {
      console.log(this.checkedAll, "val", this.viewResumeArr, "compangArr");
      this.checkedAll
        ? (this.selected = this.viewResumeArr)
        : (this.selected = []);
    },
    handleCheckedCitiesChange(value) {
      value.length == this.viewResumeArr.length
        ? (this.checkedAll = true)
        : (this.checkedAll = false);
    },
    /**
     * 全部状态修改
     */
    allchange() {
      this.selected.map(item => {
        this.change(item.id, 1);
      });
    },
    /**
     * 状态修改
     */
    change(id, num) {
      let that = this;
      $.ajax({
        type: "POST",
        url:
          this.$store.state.api +
          "/employeeCompanyPrivacy/updateEmployeeCompanyPrivacyPassed",
        data: {
          id: id,
          isPassed: num
        },
        success: function(data) {
          if (data.code == 200) {
            alert("操作成功！！");
            that.ViewResume(that.singPageSize, that.Istate, that.singPageNum);
          }
        }
      });
    },
    /**
     * 接受分页条数 页数
     */
    changePageSize(data) {
      this.singPageSize = data;
      console.log(data, "每页数据条数");
      this.ViewResume(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.ViewResume(this.singPageSize, this.Istate, data);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");
      this.ViewResume(this.singPageSize, this.Istate, this.singPageNum + 1);
    },
    //上页
    upPages() {
      console.log(data, "我加了1");
      this.ViewResume(this.singPageSize, this.Istate, this.singPageNum - 1);
    },
    /**
     * 简历查看申请
     */
    ViewResume(limit, newVal, page) {
      let that = this;
      $.ajax({
        url:
          this.$store.state.api +
          "/employeeCompanyPrivacy/listMapEmployeeCompanyPrivacy",
        data: {
          limit: limit,
          page: page - 1,
          isPassed: newVal
        },
        success: function(data) {
          that.getTotal = data.data.sum;
          that.viewResumeArr = data.data.data;
          that.loading2 = false;
        }
      });
    }
  },
  created: function() {
    this.ViewResume(this.singPageSize, this.Istate, this.singPageNum);
  }
  /**
   * 调用显示求职者列表方法
   * */
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
.List {
  margin-top: 20px;
  height: 60px;
  background: white;
  transition: height 1s;
  -moz-transition: height 1s; /* Firefox 4 */
  -webkit-transition: height 1s; /* Safari and Chrome */
  -o-transition: height 1s; /* Opera */
}
.List:hover {
  border-radius: 15px;

  background-color: rgb(192, 184, 184);
}
</style>