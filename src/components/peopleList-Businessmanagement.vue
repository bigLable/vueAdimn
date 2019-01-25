<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="2">Logon</el-col>
            <el-col :span="5">企业简称</el-col>
            <el-col :span="1">付费</el-col>
            <el-col :span="3">联系方式</el-col>
            <el-col :span="1">员工数</el-col>
            <el-col :span="3">在招职位</el-col>
            <el-col :span="3">合同时间</el-col>
            <el-col :span="4">企业地址</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
          <div 
            v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="seekerArr"
    style="width: 100%">
          <el-row v-for="(item,index) in seekerArr" v-bind:key="index" class="List">
            <el-col :span="2">
              <img class="headpic" :src="item.logo">
            </el-col>
            <el-col :span="5">{{item.name}}</el-col>
            <el-col :span="1">{{item.isPay == 0 ? '否' : '是'}}</el-col>
            <el-col :span="3">{{item.mobile || '暂无'}}</el-col>
            <el-col :span="1">{{item.employeeSum || '暂无'}}</el-col>
            <el-col :span="3">{{item.jobSum || '暂无'}}</el-col>
            <el-col :span="3">
              {{item.startTime || '暂无'}}
              <br>
              {{item.startEnd || '暂无'}}
            </el-col>
            <el-col :span="4">{{item.adress || '暂无'}}</el-col>
            <el-col :span="1">
              <!-- <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"> -->
              <el-button type="text" @click="dialogFormVisible = true">
                <span @click="listAllCategory(item.id)" v-if="item.isPay==0">去付费</span>
              </el-button>
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
                    <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      closable
                      :type="tag.type"
                      @close="handleClose(tag)"
                    >{{tag.name}}&nbsp;</el-tag>
                    <br>
                    <el-select
                      @change="addtagsValue(value)"
                      v-model="value"
                      placeholder="请选择"
                      :label-width="formLabelWidth"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="请输入招聘人数" :label-width="formLabelWidth">
                    <el-input v-model="form.peopleNum"></el-input>
                  </el-form-item>
                  <el-form-item label="请输入合同金额" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="form.money"
                      @change="handleChange"
                      :precision="2"
                      :step="0.1"
                      :max="10"
                    >
                      <template slot="append">单位:w</template>
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="请输入地区" :label-width="formLabelWidth">
                    <el-input v-model="form.area"></el-input>
                  </el-form-item>
                  <el-form-item label="备注描述" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.description"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <span @click="confirmMoney()">
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </span>
                </div>
              </el-dialog>
              <!-- </router-link> -->
            </el-col>
            <el-col :span="1">
              <router-link :to="{path:'/detailBusinessmanagement',query:{enterId:item.id}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
          </el-row>
          </div>
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
      loading2: true,//模态框
      companyid: "", //公司id
      tags: [], //tags.name职位
      options: [],
      value: "",
      checked: true,
      seekerArr: [],
      Istate: 0,
      getTotal: 0,
      singPageSize: 10,
      singPageNum: 0,
      dialogFormVisible: false,
      form: {
        value4: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ], //合同时间
        peopleNum: "", //招聘人数
        area: "", //合同地区
        money: "", //合同金额
        date1: "",
        date2: "",
        description: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        num1: 1
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
     * 公司确定付费合同
     */
    confirmMoney() {
      console.log(this.description, "description");
      let that = this;
      let tagsName = "";
      this.tags.forEach(element => {
        tagsName += element.name;
      });
      let [description, job, city, companyId, money, startEnd1, startTime1] = [
        this.form.description,
        tagsName,
        this.form.area,
        this.companyid,
        this.form.money,
        this.form.value4[0],
        this.form.value4[1]
      ];
      console.log(
        description,
        "description",
        tagsName,
        "job",
        city,
        "city",
        companyId,
        "companyId",
        money,
        "money",
        startEnd1,
        "startend",
        startTime1,
        "starttime"
      );
      function changeTime(DaTime) {
        var time = DaTime;

        var d = new Date(time);

        var times =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds();
        return times;
      }
      let startTime = changeTime(startTime1);
      let startEnd = changeTime(startEnd1);
      var motaikuangObject = {
        description,
        job,
        city,
        companyId,
        money,
        startTime,
        startEnd
      };
      try {
        $.ajax({
          type: "POST",
          url: this.$store.state.api + "/companyPay/insertCompanyPay",
          data: JSON.stringify(motaikuangObject),
          contentType: "application/json;charset=utf-8",
          success: function(data) {
            // console.log(data)
            if (data.code == 200) {
              that.getBusinessmanagementList(
                that.singPageSize,
                that.Istate,
                that.singPageNum
              );
              alert("付费成功");
            } else {
              that.getBusinessmanagementList(
                that.singPageSize,
                that.Istate,
                that.singPageNum
              );
              alert("付费失败");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 合同金额
     */
    handleChange(value) {
      console.log(value);
    },
    /**
     * 动态删除tags
     */
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    /**
     * 增加tags值
     */
    addtagsValue(label) {
      console.log(this.options, "options");
      let obj = this.options[label];
      console.log(obj, "--");
      // console.log({name:obj.label,type:obj.type},'--------')
      this.tags.push();
      // alert('111')
      this.tags.push({ name: obj.label, type: obj.type });
      let hash = {};
      this.tags = this.tags.reduce(function(item, next) {
        hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
        return item;
      }, []);

      console.log(this.tags, "tags");
    },
    /**
     * 获取职位列表
     */
    listAllCategory(companyid) {
      this.companyid = companyid;
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/dict/listDict?typeId=1",
        success: function(data) {
          data.data.map((item, index) => {
            function changeColor(index) {
              let color = "";
              switch (index) {
                case 0:
                  color = "";
                  break;
                case 1:
                  color = "success";
                  break;
                case 2:
                  color = "warning";
                  break;
                default:
                  color = "info";
                  break;
              }
              return color;
            }
            that.options.push(
              Object.assign(
                {},
                { value: index, label: item.name, type: changeColor(index) }
              )
            );
            console.log(that.options);
          });
        }
      });
    },
    /**
     * 接受分页条数 页数
     */
    changePageSize(data) {
      this.singPageSize = data;
      console.log(data, "每页数据条数");
      this.getBusinessmanagementList(data, this.Istate, this.singPageNum - 1);
    },
    changePageNum(data) {
      this.singPageNum = data;
      console.log(data, "当前页数");
      this.getBusinessmanagementList(this.singPageSize, this.Istate, data - 1);
    },
    //下页
    downPages(data) {
      console.log(data, "下页+1");
      this.getBusinessmanagementList(
        this.singPageSize,
        this.Istate,
        this.singPageNum + 1
      );
    },
    //上页
    upPages() {
      console.log(data, "上页+1");
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
          that.loading2=false
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