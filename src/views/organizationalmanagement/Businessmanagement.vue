<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="border:1px solid red">筛选条件区域</div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未付费" name="0">
        <businessManagement :index="activeName"></businessManagement>
      </el-tab-pane>
      <el-tab-pane label="已付费" name="1">
        <businessManagement :index="activeName"></businessManagement>
      </el-tab-pane>
      <el-tab-pane label="查看全部" name=" ">
        <businessManagement :index="activeName"></businessManagement>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import businessManagement from "../../components/peopleList-Businessmanagement";

export default {
  data() {
    return {
      activeName: "0"
    };
  },
  components: {
    businessManagement,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, "tab", event, "event");
    }
  }
};
</script>