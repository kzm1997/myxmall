<template>
  <div class='login v2'>
     <div class="wrapper">
       <div class="dialog dialog-shadow">
          <div class="registered">
            <h4>注册 Xmall账号</h4>
             <div class="content">
              <ul class="common-form">
                 <li class="username border-1p">
                            <div style="margin-top: 40px;" class="input">
                  <input type="text"
                         v-model="registered.userName" placeholder="账号"
                         >
                </div>
                 </li>
                 <li>
                    <div class="input">
                  <input type="password"
                         v-model="registered.userPwd"
                         placeholder="密码">
                </div>
                 </li>
                 <li>
                    <div class="input">
                  <input type="password"
                         v-model="registered.userPwd2"
                         placeholder="重复密码">
                </div>
                 </li>
              </ul>
             </div>
          </div>
       </div>
     </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  beforeCreate () { }, // 
  beforeMount () { }, // 
  beforeUpdate () { }, //
  updated () { }, //
  beforeDestroy () { }, // 
  destroyed () { }, // 
  activated () { }, // 
  methods: {

  }
}
</script>

<style lang='scss' scoped>


</style>


