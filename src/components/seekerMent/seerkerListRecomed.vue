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
              <el-col :span="1">类型</el-col>
              <el-col :span="2">机构名字</el-col>
              <el-col :span="2">招聘者</el-col>
              <el-col :span="2">招聘职位</el-col>
              <el-col :span="2">联系电话</el-col>
              <el-col :span="3">地区</el-col>
              <el-col :span="2">底薪</el-col>
              <el-col :span="3">经营品牌</el-col>
              <el-col :span="3">品类</el-col>
              <el-col :span="3">操作</el-col>
              
            </el-row>
          <el-row v-for="(item,index) in companyArr" v-bind:key="index">
              <el-col :span="1" >
        <el-checkbox v-model="checked"></el-checkbox>
              </el-col>
              <el-col :span="1">{{item.company.isState}}</el-col>
              <el-col :span="2">{{item.company.name}}</el-col>
              <el-col :span="2">{{item.companyEmployeeMap.name}}</el-col>
              <el-col :span="2">{{item.companyJob.jobName}}</el-col>
              <el-col :span="2">{{item.companyEmployeeMap.mobile}}</el-col>
              <el-col :span="3">{{item.companyJob.address.split('区')[0]}}</el-col>
              <el-col :span="2">{{item.companyJob.baseSalaryStart}}</el-col>
              <el-col :span="3">{{item.company.brand}}</el-col>
              <el-col :span="3"> {{JSON.parse(item.companyJob.category).map(item=>{return item.parentCategoryName})}}</el-col>
              <el-col :span="1"><el-button size="mini" type="primary" >推荐</el-button></el-col>
              <el-col :span="2"><el-button size="mini" type="primary" >详情</el-button></el-col>
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
        currentSize:15,
        companyArr:[],
        categorySingle:''
      }
    },
    computed: {
  
    },
    methods: {
        /**
         * 获取给求职者推荐公司列表经过第一层求职者自身筛选
         */
         Selfscreening(address=null,category=null,market=null,name=null,id=''){
          let that=this
        $.ajax({
            url: "http://192.168.0.199:10280/companyJob/selectCompanyJobByAuditAndNameAndCityAndMarketCategory",
            data: {
                count:that.currentSize,
                number:that.currentPage-1,
                address,
                category,
                market,
                name,
                userId:id
            },
            success: function (data) {
              that.total=data.data.sum                   
              that.companyArr=data.data.listMap
        
              
           }
        })
         },
        /**
         * 分页控制器
         */
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getseekerList(this.currentPage-1,0,val)
      },
         handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getseekerList(val,0,this.limit)
      },
         upPage(){

         },
         downPage(){

         }
    },
   mounted:function(){
        alert(this.$route.query.seekerId)
        this.Selfscreening(undefined,undefined,undefined,undefined,this.$route.query.seekerId)
      /**
       * 调用给求职者推荐公司列表方法 
       * */ 
    
   }
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