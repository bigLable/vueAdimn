<template>
  <div >
    <el-row> <Search></Search> </el-row>
    <el-row>
      <el-col :span="24">
       
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
           
          <div class="grid-content bg-purple-dark" >
            <el-row>
              <el-col :span="1">
                <el-checkbox @change="handleCheckAllChange" v-model="checkedAll">全选</el-checkbox>
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
            <el-checkbox-group v-model="selected" @change="handleCheckedCitiesChange">
          <el-row v-for="(item,index) in companyArr"  v-bind:key="index" class="List">
              <el-col :span="1" >
           <el-checkbox :label="item"></el-checkbox>
              </el-col>
              <el-col :span="1">{{item.company.isState=1?'公司':'店铺'}}</el-col>
              <el-col :span="2">{{item.company.name}}</el-col>
              <el-col :span="2">{{item.companyEmployeeMap.name}}</el-col>
              <el-col :span="2">{{item.companyJob.jobName}}</el-col>
              <el-col :span="2">{{item.companyEmployeeMap.mobile}}</el-col>
              <el-col :span="3">{{item.companyJob.address.split('区')[0]}}</el-col>
              <el-col :span="2">{{item.companyJob.baseSalaryStart}}</el-col>
              <el-col :span="3">{{item.company.brand}}</el-col>
              <el-col :span="3"> {{JSON.parse(item.companyJob.category).map(item=>{return item.parentCategoryName})}}</el-col>
              <el-col :span="1"><el-button size="mini" type="primary" @click="Recommen(item.companyEmployeeMap.employeeId,item.companyJob.jobId)" >推荐</el-button></el-col>
             <router-link :to="{path:'/detailBusinessmanagement',query:{enterId:item.company.id}}" tag="a">
                <el-button size="mini" type="primary">详情</el-button>
              </router-link>
            </el-row>  
            </el-checkbox-group>              
          </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col><el-button size="mini" type="primary" @click="AllRecommen()">所选全部推荐给求职崽</el-button></el-col>
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
  import Search from "../search";
  import $ from 'jquery'
  export default {
       data(){
      return {
         checkedAll:false,
        currentPage:1,
        total:0,
        currentSize:10,
        companyArr:[],
        selected:[],
        categorySingle:'',
        seekID:''
      }
    },
    components:{
    Search
    },
    computed: {
  
    },
    methods: {
      /**
       * 全选推荐
       */
       handleCheckAllChange(val) {
         
         console.log(this.checkedAll,'val',this.companyArr,'compangArr')
         this.checkedAll?(this.selected=this.companyArr):(this.selected=[])
      },
      handleCheckedCitiesChange(value) {
          
       (value.length==this.companyArr.length)?(this.checkedAll=true):(this.checkedAll=false)
      },
      AllRecommen(){
          if(this.selected.length==0){
          alert('请先选择再进行推荐好吧')
          }else{
            this.selected.map(item=>{
              this.Recommen(item.companyEmployeeMap.employeeId,item.companyJob.jobId,this.seekID)
            })
          }
       this.selected=[]
      },
      /**
       * 推荐给求职者方法
       */
       Recommen(employeeId,jobId){
        let that=this
          
        $.ajax({
            type: 'POST',
            url: this.$store.state.api + "/companyJobRecommend/addCompanyJobRecommend",
            data:JSON.stringify( {
                isStates:0,
                jobId:jobId,
                recruiterEmployeeId:employeeId,
                seekerEmployeeId:that.seekID
            }),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
              if(data.data==true){
                  alert('推荐成功！')
              }
     }
        })
     },
        /**
         * 获取给求职者推荐公司列表经过第一层求职者自身筛选
         */
         Selfscreening(count,number,address=null,category=null,market=null,name=null,id=''){
          let that=this
        $.ajax({
            url: this.$store.state.api + "/companyJob/selectCompanyJobByAuditAndNameAndCityAndMarketCategory",
            data: {
                count:count,
                number:number,
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
         this.Selfscreening(val,this.currentPage-1,undefined,undefined,undefined,undefined,this.$route.query.seekerId)
      },
         handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    
        this.Selfscreening(this.currentSize,val-1,undefined,undefined,undefined,undefined,this.$route.query.seekerId)
      },
         upPage(){
          this.currentPage=this.currentPage-1
         },
         downPage(){
             this.currentPage+=this.currentPage
         }
    },
   mounted:function(){
        this.seekID=this.$route.query.seekerId
        alert(this.$route.query.seekerId)
        this.Selfscreening(this.currentSize,this.currentPage-1,undefined,undefined,undefined,undefined,this.$route.query.seekerId)
      /**
       * 调用给求职者推荐公司列表方法 
       * */ 
    
   }
  }

</script>
<style lang="scss" scoped>
.el-checkbox__label{
  display: none
}
.headpic{
    width:50px;
    height:50px;
    border-radius: 25px;
    background:rgba(216,216,216,1);
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