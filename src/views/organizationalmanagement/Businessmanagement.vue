<template>
  <div>
       
    <el-row>
     <el-row> <Search></Search> </el-row>
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
import Search from "../../components/search";//筛选组件
export default {
  data() {
    return {
      activeName: "0"
    };
  },
  components: {
    businessManagement,
     Search
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, "tab", event, "event");
    }
  }
};
</script>