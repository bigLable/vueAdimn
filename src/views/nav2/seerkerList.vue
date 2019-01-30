<template>
  <div>
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark" style="border:1px solid red">筛选条件区域</div> -->
        <Search @childFormLabel="receiveData">
          <el-form-item label="期待商场" slot="alternativeFrist">
            <el-input v-model="formLabelAlign.region"  placeholder="请输入期待商场"></el-input>
          </el-form-item>
          <el-form-item label="工作职位"  slot="alternativeSecond"> 
            <el-select v-model="formLabelAlign.value" placeholder="请选择">
              <el-option
                v-for="item in formLabelAlign.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </Search>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="2">头像</el-col>
            <!-- <el-col :span="1">微信昵称</el-col> -->
            <el-col :span="2">姓名</el-col>
            <el-col :span="1">性别</el-col>
            <el-col :span="1">身高</el-col>
            <el-col :span="2">求职职位</el-col>
            <el-col :span="2">求职品类</el-col>
            <el-col :span="2">期望商场</el-col>
            <el-col :span="1">求职状态</el-col>
            <el-col :span="1">简历</el-col>
            <el-col :span="1">分享</el-col>
            <el-col :span='1'>工作数</el-col>
            <el-col :span="3">住址</el-col>
            <el-col :span="2">电话</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <singleRersume :SingleResume="resumInfo"></singleRersume>
          <el-row v-for="(item,index) in seekerArr" v-bind:key="index" class="List">
            <el-col :span="2">
              <img class="headpic" :src="item.avatar">
            </el-col>
            <!-- <el-col :span="1">{{item.nickname}}</el-col> -->  
            <el-col :span="2">{{item.realName}}&nbsp;&nbsp;<span  @mouseover="detailInfo($event,item.id)" class="checkDetail">预览</span> </el-col>
            <el-col :span="1">{{item.sex == 1 ? '男' : '女'}}</el-col>
            <el-col :span="1">{{item.height}}cm</el-col>
            <el-col
              :span="2" 
            >
            <el-row>
              <el-col v-for="(item,index) in JSON.parse(item.objectivePosition)" :key="index">{{item.dictName}}</el-col>
            </el-row>
            
            </el-col>
            <el-col
              :span="2"  
            ><el-row>
              <el-col v-for="(item,index) in JSON.parse(item.objectiveCategory)" :key="index">{{item.categoryName}}</el-col>
            </el-row>
            
            <!-- {{JSON.parse(item.objectiveCategory).map(item => { return item.categoryName })}} -->
            </el-col>
            <el-col
              :span="2"  
            >
            <el-row>
              <el-col v-for="(item,index) in JSON.parse(item.objectiveMall)" :key="index">{{item.mallName}}</el-col>
            </el-row>
            <!-- {{JSON.parse(item.objectiveMall).map(item => { return item.mallName })}} -->
            </el-col>
            <el-col :span="1">{{item.jobStateName}}</el-col>
            <el-col :span="1">{{item.publicState == '0' ? '隐藏' : '公开'}}</el-col>
             <el-col :span="1">{{item.shareCount}}</el-col>
             <el-col :span="1">{{item.hasJobCount}}</el-col>
            <el-col :span="3" class="fontLimtLenght">{{item.address}}</el-col>
            <el-col :span="2">{{item.mobile}}</el-col>
            <el-col :span="1">
              <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a">
                <el-button size="mini" type="primary">推荐</el-button>
              </router-link>
            </el-col>
            <el-col :span="1">
              <router-link :to="{path:'/seekerResume',query:{seekerId:item.id}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-col>
             <el-col :span="1">  
                <meages :empId="item.id">留言</meages>            
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="upPage"
            @next-click="downPage"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import singleRersume from '../../components/singleResume'
import meages from "../../components/meagess"
import Search from "../../components/search";
import $ from "jquery";

export default {
  data() {
    return {
        resumInfo:{},
      formLabelAlign: {
       
        options: [{
           
        }],
        value:'',
        region: "",
        position: ""
      },
      checked: true,
      currentPage: 1,
      total: 0,
      currentSize: 10,
      seekerArr: []
    };
  },
  computed: {},
  components: {
    Search,
    meages,
    singleRersume
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
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
          that.resumInfo = data.data;
           that.resumInfo = Object.assign(
            {},
            { newclientX: X, newclientY: Y },
            that.resumInfo
          );      
          console.log( that.resumInfo,'..............')
        }
      });
    },
    /**
     * 筛选数据的表单  
    */
   receiveData(data){
     console.log(data,'来自父类的元素')/**筛选的值为data+value */
   },
    /**
     * 职位列表
     */
    positionList(){
       let that=this
       $.ajax({
        url: this.$store.state.api + "/dict/listDict?typeId=1",
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
                console.log(data.data,'--')
        data.data.map(item=>{
          that.formLabelAlign.options.push(
            Object.assign({},{label:item.name,value:item.id})
          )   
        })
             
        }
        })
    },
    
    /**
     * 获取求职者列表
     */
    /**
     * websocket
     */
     webSocket() {
     const wsUrl=this.$store.state.api + "/employee/pageEmployee"
     this.webSocket=new WebSocket(wsUrl)
     this.webSocket.onopen=this.websocketopen
     this.webSock.onmessage=this.websocketonmessage
     this.websock.onclose=this.websocketclose
     this.websock.onerror=this.websocketerron
    },
      websocketopen(){//打开
    console.log("WebSocket连接成功")
  },
  websocketonmessage(e){ //数据接收
    console.log(e)
    this.productinfos = JSON.parse(e.data);
  },
  websocketclose(){  //关闭
    console.log("WebSocket关闭");
  },
  websocketerror(){  //失败
    console.log("WebSocket连接失败");
  },
    getseekerList(page, isFirstCommit, limit) {
      let that = this;
      $.ajax({
        url: this.$store.state.api + "/employee/pageEmployee",
        data: {
          page: page,
          isFirstCommit: isFirstCommit,
          limit: limit
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
          that.total = data.data.sum;
          that.seekerArr = data.data.data;
        }
      });
    },
    /**
     * 
     */
    /**
     * 分页控制器
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentSize = val;
      this.getseekerList(this.currentPage - 1, 0, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getseekerList(val - 1, 0, this.currentSize);
    },
    upPage() {
      this.getseekerList(this.currentPage - 1, 0, this.currentSize);
    },
    downPage() {
      this.getseekerList(this.currentPage - 1, 0, this.currentSize);
    }
  },
  mounted: function() {
    this.getseekerList(this.currentPage - 1, 0, this.currentSize);
    this.positionList()
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
.el-row{
  box-sizing: border-box;
    overflow: hidden;
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
.fontLimtLenght{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
</style>