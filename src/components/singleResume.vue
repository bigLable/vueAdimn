<template>
  <div
    v-if="showState"
    @mouseleave="outcontair"
    ref="contair"
    class="label"
    v-bind:style="{position: fixed, width:w+'px', height:h+'px',left:newx+'px',top:newy+'px',overflowY:auto, background: pink}"
  >
    <el-row type="flex" justify="center">
      <el-col :span="8" :offset="6" style="font-size:20px">招聘者信息</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span style="font-size:30px">{{attribute.realName}}</span>
      </el-col>
      <el-col :span="3" :offset="15">
        <img :src="attribute.bustPhotoUrl" alt style="height:40px;width:40px; border-radius:20px">
      </el-col>
      <el-col>{{attribute.brand ||'暂无'}} | {{JSON.parse(attribute.category).map((item,index)=> item.categoryName).join('')}} | {{attribute.position || "暂无"}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="10">工作状态:{{attribute.jobStateName}}</el-col>
      <el-col :span="10">{{attribute.height}}cm|{{attribute.age}}|{{attribute.arrivalName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5" style="line-height:40px">语音介绍</el-col>
      <el-col :span="19">
        <img
          @click="me"
          src="../assets/images/语音@2x.png"
          alt
          style="height:40px;width:150px;"
        >
        {{parseInt(attribute.voiceMs/1000)||0 }}s
        <audio ref="pla" :src="attribute.voiceUrl"></audio>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">求职期望</el-col>
      <el-col :span="3" :offset="17">{{attribute.objectiveSalary/1000}}K</el-col>
      <el-col>
        {{JSON.parse(attribute.objectivePosition).map((item,index)=>{
        return item.dictName
        }).join('')}}
      </el-col>
      <el-col>
        {{JSON.parse(attribute.objectiveMall).map((item,index)=>{
        return item.mallName
        }).join('')}}
      </el-col>
      <el-col>
        {{JSON.parse(attribute.objectiveCategory).map((item,index)=>{
        return item.categoryName+"|"
        }).join('')}}
      </el-col>
    </el-row>

    <el-col>-------------------------------------------</el-col>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      playState: false,
      showState: true,
      fixed: "fixed",
      auto: "scroll",
      pink: "#9dc1dc",
      w: 500,
      h: 600,
      newx: 0,
      newy: 0,
      attribute: {}
    };
  },
  props: ["SingleResume"],
  watch: {
    SingleResume: function(newValue, oldValue) {
      //     console.log(newValue.hasOwnProperty(newValue.positionsList),'newValue.hasOwnProperty(positionsList')
      //   if (newValue.hasOwnProperty(positionsList)) {
      this.showState = true;
      this.attribute = newValue;
      this.newx = newValue.newclientX - 100;
      this.newy = newValue.newclientY - 50;
      //  alert( this.newy)
      console.log(this, "this------------");
      //   } else {
      //     this.showState = 0;
      //   }
    }
  },
  computed: {
    // playStateFc: function() {

    //   console.log(this.playState, "--", this.$refs.pla, "---------------");
     
    // }
  },
  methods: {
    outcontair() {
      this.showState = false;
    },
    me(){
        this.playState=!this.playState
        console.log( this.playState,' this.playState')
         this.playState ? this.$refs.pla.play() : this.$refs.pla.pause();
    }
  },
  mounted() {
    // this.playStateFc();
    // this.$refs.contair.addEventListener("mouseout",this.outcontair);
  }
};
</script>
 <style lang="scss" scoped>
img {
  vertical-align: middle;
}
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



