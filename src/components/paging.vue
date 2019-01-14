 <template>
  <div >
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
         currentPage:1,
         total:0,
         currentSize:10,
      }
    },
    computed: {
  
    },
    props:['getTotal'],
    watch: {
        getTotal:function(newVal,oldVal){
           this.total=newVal
        }
    },
    methods: {
        /**
         * 分页控制器
         */
         handleSizeChange(val) {
          console.log(`每页 ${val} 条`);

          this.$emit("pageSize",val)
      },
         handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit("currentPageNum",val)
        
      },
         upPage(){ 
          this.$emit("UpPage",this.currentPage+1)
         },
         downPage(){
         this.$emit("DownPage",this.currentPage-1)
         }
    },
   mounted:function(){
        
      /**
       * 调用显示求职者列表方法 
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