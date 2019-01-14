<template>
  <div >
    <seekerInfo :userInfo="userInfo"></seekerInfo><br><br>
    <seekerResume :userInfo="userInfo"></seekerResume>
  </div>
</template>

<script>
  import $ from 'jquery'
  import seekerInfo from '../seekerInfo'

  import seekerResume from '../seekerResume'
  export default {
       data(){
      return {
       userInfo:[]
      }
    },
    components: {
      seekerInfo,
      seekerResume
    },
    computed: {
        
    },
    methods: {
      /**
     * 求职者详情
     */
    SeekerDetail(seekerid) {
      let that = this;
      $.ajax({
        url: "http://192.168.0.199:10280/employee/getFullEmployee",
        data: {
          employeeId:seekerid
        },
        success: function(data) {
          that.userInfo = data.data;
          console.log(JSON.stringify(data.data), "data.data");
        }
      });
    }
         },
     
   mounted() {
   
    this.SeekerDetail(this.$route.query.seekerId)

   }
  
  }
</script>
<style lang="scss" scoped>

</style>