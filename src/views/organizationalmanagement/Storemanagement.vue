<template>
  <div>
    <el-row> <Search></Search> </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="border:1px solid red">筛选条件区域</div>
      </el-col>
    </el-row>
     <ListStoremangement></ListStoremangement>
  </div>
</template>
<script>
import ListStoremangement from "../../components/List-Storemangement";
import Search from "../../components/Search"
export default {
  data() {
    return {
    
    };
  },
  components: {
    ListStoremangement,
  },
  methods: {
  
  }
};
</script>