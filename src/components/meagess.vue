<template>
    <div>
       <el-button type="text" @click="dialogFormVisible = true">留言</el-button>
        <el-dialog title="留言区" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="留言内容" :label-width="formLabelWidth">
         <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="send"> <span > 发送留言</span></el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
 data() {
    return {
      dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          desc: ''
        },
        formLabelWidth: '120px',
    };
  },
  props:['empId'],
  computed: {},
  methods: {
      send(){
          let that=this
            $.ajax({
        type: "post",
        url: this.$store.state.api +"/mpMessage/guestBook",
        data: {
          content:that.form.desc,
          employeeId:that.empId
        },
       
        success: function(data) {
            if(data.code=="500"){
                alert('留言失败')
            }else{

              that.dialogFormVisible = false
                alert('留言成功')
            }
        console.log(data.data,'data')

          //  console.log(JSON.stringify(jobDetal)+'***********jobDetal')
        }
      });
      }
  }
}
</script>