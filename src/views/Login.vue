<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" @blur="logo" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import md5 from 'js-md5';
import $ from 'jquery'
  import { requestLogin } from '../api/api';
import { setInterval, clearInterval } from 'timers';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        timer:null,
        logining: false,
        randomNumber:'',
        ruleForm2: {
          account: '',
          checkPass: '',
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      /**
       * 总注册人数
       */
      people(){
        
        let that=this
        $.ajax({
          url:that.$store.state.api+"/user/getAllUserNumber",
          xhrFields: {
                      withCredentials: true
              },
          success:function(data){
            sessionStorage.setItem('peopleNum',data.data)
          }
        })
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      /**
       *登录
       */
      logo(){
        let that=this
           $.ajax({
        url: that.$store.state.api + "/user/getUserNumber",   
        data: {
        username:that.ruleForm2.account
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
          if(data.data==null){
            alert('不存在用户名')
          }else{
             console.log(data.data.passwordsalt,'随机数')
           that.randomNumber=data.data.passwordsalt
          }
       
        }
      });
      },
      handleSubmit2(ev) {
        let that=this
      //   let promise=new Promise(function(resolve,reject){
      //      $.ajax({
      //   url: that.$store.state.api + "/user/getUserNumber",   
      //   data: {
      //   username:that.ruleForm2.account
      //   },
      //   xhrFields: {
      //                 withCredentials: true
      //         },
      //   success: function(data) {
      //     if(data.data==null){
      //       alert('不存在用户名')
      //     }else{
      //        console.log(data.data.passwordsalt,'随机数')
      //         resolve(data.data.passwordsalt);
      //     }
       
      //   }
      // });
      //   })
        /**
         * 验证是否通过
      //    */
      // promise.then(function(Data){
        console.log(md5(that.randomNumber+that.ruleForm2.checkPass),'new密')
        
          $.ajax({
        url: that.$store.state.api + "/user/userByIndex",
        data: {
        name:that.ruleForm2.account,
        password:md5(that.randomNumber+that.ruleForm2.checkPass)
        },
        xhrFields: {
                      withCredentials: true
              },
        success: function(data) {
         console.log(data,'------验证消息')
         if(data.data==false){
           alert ('密码错误')
         }else{
           alert('欢迎登录！')

           sessionStorage.setItem('user', JSON.stringify('欢迎您'));
            that.people()
            that.$router.push({ path: '/' });

         }
        }
      });
      // })
        // this.$refs.ruleForm2.validate((valid) => {
        //   if (valid) {
        //     //_this.$router.replace('/table');
        //     this.logining = true;
        //     //NProgress.start();
        //     var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
        //     requestLogin(loginParams).then(data => {
        //       this.logining = false;
        //       //NProgress.done();
        //       let { msg, code, user } = data;
        //       if (code !== 200) {
        //         this.$message({
        //           message: msg,
        //           type: 'error'
        //         });
        //       } else {
        //         sessionStorage.setItem('user', JSON.stringify(user));
        //         this.$router.push({ path: '/' });
        //       }
        //     });
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    },
    
    mounted:function(){
    

    },
    // destroyed:function(){
    //   clearInterval(this.timer)
    // }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>