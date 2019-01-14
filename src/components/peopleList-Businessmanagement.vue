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
            <el-col :span="5">企业简称</el-col>
            <el-col :span="1">付费</el-col>
            <el-col :span="3">联系方式</el-col>
            <el-col :span="1">员工数</el-col>
            <el-col :span="3">在招职位</el-col>
            <el-col :span="3">合同时间</el-col>
            <el-col :span="3">企业地址</el-col>
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
            <el-col :span="1">{{item.ispay == 0 ? '否' : '是'}}</el-col>
            <el-col :span="3">{{item.mobile || '暂无'}}</el-col>
            <el-col :span="1">{{item.employeeSum || '暂无'}}</el-col>
            <el-col :span="3">{{item.jobSum || '暂无'}}</el-col>
            <el-col :span="3">
              {{item.startTime || '暂无'}}
              <br>
              {{item.startEnd || '暂无'}}
            </el-col>
            <el-col :span="3">{{item.adress || '暂无'}}</el-col>
            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button type="text" @click="dialogFormVisible = true">去付费</el-button>
              <el-dialog title="付费合同消息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="合同起止时间" :label-width="formLabelWidth">
                    <div class="block">
                      <el-date-picker
                        v-model="form.value4"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
                    <el-form-item label="合同职位" :label-width="formLabelWidth">
                    </el-form-item>
                  <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <!-- </router-link> -->
            </el-col>
            <el-col :span="1">
              <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a">
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
      dialogFormVisible: false,
      form: {
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
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
      this.getBusinessmanagementList(
        this.singPageSize,
        newVal,
        this.singPageNum
      );
      console.log(newVal, "newVal");
    }
  },
  methods: {
    /**
     * 付费模态框
     */
    open() {
      this.$alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
        dangerouslyUseHTMLString: true
      });
    },

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
        url: "http://192.168.0.199:10280/company/selectManageCompany",
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