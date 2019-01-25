<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-col>
            <el-col :span="2">Logon</el-col>
            <el-col :span="5">店铺名称</el-col>
      
            <el-col :span="3">联系方式</el-col>
            <el-col :span="1">员工数</el-col>
            <el-col :span="3">在招职位</el-col>
            
            <el-col :span="3">店铺地址</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <el-row v-for="(item,index) in seekerArr" v-bind:key="index">
            <el-col :span="1">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-col>
            <el-col :span="2">
              <img class="headpic" :src="item.avatar">
            </el-col>
            <el-col :span="5">{{item.name}}</el-col>
            
            <el-col :span="3">{{item.mobile || '暂无'}}</el-col>
            <el-col :span="1">{{item.employeeSum || '暂无'}}</el-col>
            <el-col :span="3">{{item.jobSum || '暂无'}}</el-col>
           
            <el-col :span="3">{{item.adress || '暂无'}}</el-col>
            <el-col :span="1">            
            </el-col>
            <el-col :span="1">
              <router-link :to="{path:'/detailBusinessmanagement',query:{enterId:item.id}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
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
import $ from "jquery";
import paging from "./paging";
export default {
  data() {
    return {
      checked: true,
      seekerArr: [],
      Istate: 0,
      getTotal: 0,
      singPageSize: 10,
      singPageNum: 0,
    };
  },
  computed: {},
  components: {
    paging
  },
  methods: {
    /**
     * 接受分页条数 页数
     */
    changePageSize(data) {
      this.singPageSize = data;
      console.log(data, "每页数据条数");
      this.getBusinessmanagementList(data, this.Istate, this.singPageNum);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.getBusinessmanagementList(this.singPageSize, this.Istate, data);
    },
    //下页
    downPages(data) {
      console.log(data, "我减了1");
      this.getBusinessmanagementList(
        this.singPageSize,
        this.Istate,
        this.singPageNum + 1
      );
    },
    //上页
    upPages() {
      console.log(data, "我加了1");
      this.getBusinessmanagementList(
        this.singPageSize,
        this.Istate,
        this.singPageNum - 1
      );
    },
    /**
     * 获取企业列表
     */
    getBusinessmanagementList(limit, newVal, page) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/company/selectManageCompany",
        data: {
          count: limit,
          number: page,
          diff: true,
          isPay: newVal
        },
        success: function(data) {
          that.getTotal = data.data.sum;
          that.seekerArr = data.data.mapCompany;
        }
      });
    }
  },
  created: function() {
    this.getBusinessmanagementList(
      this.singPageSize,
      this.Istate,
      this.singPageNum
    );
  }
  /**
   * 调用显示求职者列表方法
   * */
};
</script>
<style lang="scss" scoped>
.headpic {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: rgba(216, 216, 216, 1);
}
</style>