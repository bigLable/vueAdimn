<template>
  <div >
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="border:1px solid red">筛选条件区域</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
           
          <div class="grid-content bg-purple-dark" >
            <el-row>
              <el-col :span="1">
                <el-checkbox v-model="checked"></el-checkbox>
              </el-col>
              <el-col :span="1">头像</el-col>
              <el-col :span="1">微信昵称</el-col>
              <el-col :span="1">姓名</el-col>
              <el-col :span="1">性别</el-col>
              <el-col :span="1">身高</el-col>
              <el-col :span="3">求职职位</el-col>
              <el-col :span="3">求职品类</el-col>
              <el-col :span="3">期望商场</el-col>
              <el-col :span="1">求职状态</el-col>
              <el-col :span="1">简历状态</el-col>
              <el-col :span="3">住址</el-col>
              <el-col :span="2">联系方式</el-col>
              <el-col :span="2">操作</el-col>
            </el-row>
          <el-row v-for="(item,index) in seekerArr" v-bind:key="index">
              <el-col :span="1" >
        <el-checkbox v-model="checked"></el-checkbox>
              </el-col>
              <el-col :span="1"> <img class="headpic" :src="item.avatar" /> </el-col>
              <el-col :span="1">{{item.nickname}}</el-col>
              <el-col :span="1">{{item.realName}}</el-col>
              <el-col :span="1">{{item.sex == 1 ? '男' : '女'}}</el-col>
              <el-col :span="1">{{item.height}}cm</el-col>
              <el-col :span="3">{{JSON.parse(item.objectivePosition).map(item => { return item.dictName }).join('、')}}</el-col>
              <el-col :span="3">{{JSON.parse(item.objectiveCategory).map(item => { return item.categoryName }).join('、')}}</el-col>
              <el-col :span="3">{{JSON.parse(item.objectiveMall).map(item => { return item.mallName }).join('、')}}</el-col>
              <el-col :span="1">{{item.jobStateName}}</el-col>
              <el-col :span="1">{{item.publicState == '0' ? '隐藏' : '公开'}}</el-col>
              <el-col :span="3">{{item.address}}</el-col>
              <el-col :span="2">{{item.mobile}}</el-col>
              <el-col :span="1"> <router-link :to="{path:'/page5detail',query:{seekerId:item.id}}" tag="a"><el-button size="mini" type="primary" >推荐</el-button></router-link></el-col>
              <el-col :span="1"><router-link :to="{path:'/seekerResume',query:{seekerId:item.id}}" tag="a"><el-button size="mini" type="primary" >详情</el-button></router-link></el-col>
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
  import $ from 'jquery'
  export default {
       data(){
      return {
         checked:true,
         currentPage:1,
         total:0,
        currentSize:10,
        seekerArr:[],
      }
    },
    computed: {
  
    },
    methods: {
        /**
         * 获取求职者列表
         */
        getseekerList(page,isFirstCommit,limit){
            let that=this
           $.ajax({
               url: "http://192.168.0.199:10280/employee/pageEmployee",
               data: {
              page:page,
              isFirstCommit:isFirstCommit,
              limit:limit
              },
          success: function (data) {
              that.total=data.data.sum
              that.seekerArr=data.data.data
                }
           })
        },
        /**
         * 分页控制器
         */
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentSize=val
         this.getseekerList(this.currentPage-1,0,val)
      },
         handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getseekerList(val-1,0,this.currentSize)
      },
         upPage(){
        this.getseekerList(this.currentPage-1,0,this.currentSize)
         },
         downPage(){
       this.getseekerList(this.currentPage-1,0,this.currentSize)
         }
    },
   mounted:function(){
         this.getseekerList(this.currentPage-1,0,this.currentSize)
         }
      /**
       * 调用显示求职者列表方法 
       * */ 
    
   
  }

</script>
<style lang="scss" scoped>
.headpic{
    width:50px;
    height:50px;
    border-radius: 25px;
    background:rgba(216,216,216,1);
}
</style>