<template>
  <div v-if="showState" @mouseleave ="outcontair"
    ref="contair"
    class="label"
    v-bind:style="{position: fixed, width:w+'px', height:h+'px',left:newx+'px',top:newy+'px',overflowY:auto, background: pink}"
  >
    <el-row type="flex" justify="center">
      <el-col :span="8" :offset="6" style="font-size:20px">招聘职位信息</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span style="font-size:30px">{{attribute.name}}</span>
        <span>招聘中</span>
      </el-col>
      <el-col :span="5" :offset="13">底薪:{{attribute.baseSalaryStart}}</el-col>
      <el-col>{{JSON.parse(attribute.category).map(item=>{return item.categoryName}).join('|') }}|{{attribute.isWorkTime}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="20">地区:{{attribute.market}}</el-col>
      <el-col :span="4">{{attribute.salaryStart}}k-{{attribute.salaryEnd}}k</el-col>
      <el-col>定位:{{attribute.address}}-{{attribute.market}}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col>职位要求</el-col>
      <el-col :span="3">{{attribute.study}}</el-col>
      <el-col :span="3">{{attribute.name}}</el-col>
      <el-col :span="3">{{attribute.requirementSenior}}cm</el-col>
    </el-row>
    <el-row>
      <el-col>福利待遇</el-col>
      <el-col>补贴:{{attribute.study}}</el-col>
      <el-col>工资保底:{{attribute.bottomGuard}}</el-col>
      <el-col>{{JSON.parse(attribute.treatment).map(item=>item.name).join('')}}</el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8" style="font-size:20px">其他在招职位({{attribute.positionsList.length}})</el-col>
    </el-row>
    <el-row v-for="(item,index) in attribute.positionsList" :key="index">
      <el-row>
        <el-col :span="6">
          {{item.name}}
          <span>招聘中</span>
        </el-col>
        <el-col :span="6" :offset="12">底薪:{{item.baseSalaryStart}}</el-col>
        <el-col
          :span="24"
        >{{JSON.parse(item.category).map(item1=>{return item1.categoryName}).join('|')}}|{{item.isWorkTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="10">地区:{{item.market}}</el-col>
        <el-col :span="6" :offset="8">{{item.salaryStart}}k-{{item.salaryEnd}}k</el-col>
      </el-row>
      <el-col>-------------------------------------------</el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
        showState:true,
      fixed: "fixed",
      auto: "scroll",
      pink: "#9dc1dc",
      w: 500,
      h: 600,
      newx: 0,
      newy: 0,
      attribute: {
        },
     
    };
  },
  props: ["postInfo"],
  watch: {
    postInfo: function(newValue, oldValue) {
      //     console.log(newValue.hasOwnProperty(newValue.positionsList),'newValue.hasOwnProperty(positionsList')
      //   if (newValue.hasOwnProperty(positionsList)) {
      this.showState=true
      
      this.attribute = newValue;
      this.newx = newValue.newclientX -100;
      this.newy = newValue.newclientY - 50;
      //  alert( this.newy)
      console.log(this, "this------------");
      //   } else {
      //     this.showState = 0;
      //   }
    }
  },
  computed: {},
  methods: {
    outcontair() {
     this.showState=false;
    },
  },
  mounted() {
    
    // this.$refs.contair.addEventListener("mouseout",this.outcontair);
   
  }
};
</script>
 <style lang="scss" scoped>
.label {
  z-index: 99999;
  overflow-x: hidden;
  color: white;
}
.fiexd {
  position: fixed;
  width: 300px;
  height: 500px;
  overflow: auto;
  background: pink;
}
</style>



