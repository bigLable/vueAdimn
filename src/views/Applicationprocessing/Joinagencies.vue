<template>
  <div>
    <el-row>
      <el-col :span="24">
       <Search></Search>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="申请未处理" name="0">
        <ViewResume :index="activeName"></ViewResume>
      </el-tab-pane>
      <el-tab-pane label="申请已通过" name="1">
        <ViewResume :index="activeName"></ViewResume>
      </el-tab-pane>
      <el-tab-pane label="申请未通过" name="-1">
        <ViewResume :index="activeName"></ViewResume>
      </el-tab-pane>
      <el-tab-pane label="查看全部申请" name=" ">
        <ViewResume :index="activeName"></ViewResume>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ViewResume from "../../components/applicationprocessing/Joinagencies";
import Search from "../../components/Search";

export default {
  data() {
    return {
      activeName: "0"
    };
  },
  components: {
   ViewResume,
   Search
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, "tab", event, "event");
    }
  }
};
</script>