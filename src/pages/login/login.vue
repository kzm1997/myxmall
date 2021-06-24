<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow">
        <div class="title">
          <h4>使用XMall 账号 登录官网</h4>
        </div>
        <div class="content">
          <ul class="common-form">
            <li>
              <div class="input">
                <input
                  type="text"
                  v-model="ruleForm.userName"
                  placeholder="账号"
                />
              </div>
            </li>
            <li>
              <div class="input">
                <input
                  type="password"
                  v-model="ruleForm.userPwd"
                  placeholder="密码"
                />
              </div>
            </li>
            <li class="li-auto">
              <el-checkbox class="auto-login" v-model="autoLogin"
                >记住密码</el-checkbox
              >
              <router-link :to="{ name: 'register' }">注册账号</router-link>
            </li>
            <div class="loginClick">
              <y-button
                :text="logintxt"
                :classStyle="
                  ruleForm.userPwd && ruleForm.userName && logintxt === '登录'
                    ? 'main-btn'
                    : 'disabled-btn'
                "
                @btnClick="login"
                style="
                  margin: 0;
                  width: 100%;
                  height: 48px;
                  font-size: 18px;
                  line-height: 48px;
                "
              ></y-button>
            </div>
            <div>
              <y-button
                text="返回"
                @btnClick="login_back"
                style="
                  margintop: 10px;
                  marginbottom: 15px;
                  width: 100%;
                  height: 48px;
                  font-size: 18px;
                  line-height: 48px;
                "
              >
              </y-button>
              <div class="footer">
                <div class="other">其它账号登录：</div>
                <a
                  ><img
                    @click="open('待开发', '此功能开发中...')"
                    style="height: 15px; margin-top: 22px"
                    src="../../../static/images/other-login.png"
                /></a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YButton from "../../components/YButton";
export default {
  components: {
    YButton,
  },
  data() {
    return {
      cart: [],
      loginPage: true,
      ruleForm: {
        userName: "",
        userPwd: "",
        errMsg: "",
      },
      registered: {
        userName: "",
        userPwd: "",
        userPwd2: "",
        errMsg: "",
      },
      autoLogin: false,
      logintxt: "登录",
      statusKey: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {}, //
  beforeMount() {}, //
  beforeUpdate() {}, //
  updated() {}, //
  beforeDestroy() {}, //
  destroyed() {}, //
  activated() {}, //
  methods: {
    open(t,m){
        this.$notify.info({
          title:t,
          message:m
        })
    },
    login(){
      
    },
    login_back() {
      this.$router.go(-1);
    },
    toRegister(){
      this.$router.push({
        path:'/register'
      })
    }
  },
};
</script>

<style lang='scss' scoped>
.login.v2 {
  height: 100vh;
  width: 100vw;
  .wrapper {
    height: 100%;
    width: 100%;
    background: url("../../../static/images/bg_9b9dcb65ff.png") repeat;
    display: flex;
    justify-content: center;

    align-items: center;
  }
  .dialog {
    height: auto;
    width: 30%;
    background-color: #ffffff;
    border-radius: 6%;
    .content {
      padding: 0 40px 22px;
    }
    .title {
      text-align: center;
      font-size: 20px;
      padding: 40px 0px 10px;
    }
    .input {
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      input {
        font-size: 16px;
        width: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }

    .li-auto{
      display: flex;
      justify-content: space-between;
    }

    .auto-login {
      margin-bottom: 15px;
    }

    .loginClick{
      margin-bottom: 10px; 
    }

    .footer{
      margin-top: 20px;
      border-top: 1px solid #ccc;
      display: flex;
      .other{
        margin: 20px 5px 0 0;  
        color: #999;
        font-size: 12px;
      }
    }
    
  }


  



}
</style>
