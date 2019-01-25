<template>
  <div>
    <el-row><Search></Search></el-row>
    <el-row>
      <el-col :span="24">
       
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="申请未处理" name="0">
        <Checkposition :index="activeName"></Checkposition>
      </el-tab-pane>
      <el-tab-pane label="申请已通过" name="1">
        <Checkposition :index="activeName"></Checkposition>
      </el-tab-pane>
      <el-tab-pane label="申请未通过" name="-1">
        <Checkposition :index="activeName"></Checkposition>
      </el-tab-pane>
      <el-tab-pane label="查看全部申请" name=" ">
        <Checkposition :index="activeName"></Checkposition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Checkposition from "../../components/applicationprocessing/Checkposition";
import Search from '../../components/search'
export default {
  data() {
    return {
      activeName: "0"
    };
  },
  components: {
   Checkposition,
   Search
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, "tab", event, "event");
    }
  }
};
</script>