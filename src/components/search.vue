<template>
  <div>
    {{formLabelData}}
      <el-row class="search">
          <el-col :span="20">

          
           <el-form :inline="true"  label-width="100px" :model="formLabelAlign">
                  <el-form-item label="职位名称">
           <el-input v-model="formLabelAlign.name" placeholder="职位名称"></el-input>
  </el-form-item>
   <el-form-item label="地区">
    <el-input v-model="formLabelAlign.region" placeholder="请输入地区"></el-input>
  </el-form-item>
           
            <slot name="alternativeFrist">
             
            </slot>
             <slot name="alternativeSecond">
             
            </slot>
             <slot name="alternativeThird">
             
            </slot>
             <slot name="alternativeFourth">
             
            </slot>
             <slot name="alternativeFifth">
             
            </slot>
           </el-form>
           </el-col>
           <el-col :span="4">
                <el-button type="primary" size="medium" >搜索</el-button>
                <el-button type="primary" size="medium" >重置</el-button>
           </el-col>
      </el-row>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
    formLabelAlign:{
         region:'',
         name:''
    }
    };
  },
  computed:{
      formLabelData:function(){
          /**
           * 如果表单不为空发送数据给父类
           */
       if(this.formLabelAlign.region&&this.formLabelAlign.name){
           this.sendformLabelData()
       }
      }
  },
  methods: {
      /**
       * 发送组件数据给父类
       */
    sendformLabelData(){
        this.$emit("childFormLabel",this.formLabelAlign)
        console.log(this.formLabelAlign,"childFormLabel")
    }
  }
};
</script>
 <style lang="scss" scoped>
 .search{
     margin-top:30px;
     margin-bottom: 20px
 }
 .heapic{
   height: 50px;
   width: 50px;
   border-radius: 25px
 }
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>



