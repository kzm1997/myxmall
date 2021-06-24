<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow">
        <div class="registered">
          <h4>注册 Xmall账号</h4>
          <div class="content">
            <ul class="common-form">
              <li class="username border-1p">
                <div style="margin-top: 40px" class="input">
                  <input
                    type="text"
                    v-model="registered.userName"
                    placeholder="账号"
                  />
                </div>
              </li>
              <li>
                <div class="input">
                  <input
                    type="password"
                    v-model="registered.userPwd"
                    placeholder="密码"
                  />
                </div>
              </li>
              <li>
                <div class="input">
                  <input
                    type="password"
                    v-model="registered.userPwd2"
                    placeholder="重复密码"
                  />
                </div>
              </li>
              <li>
                <div class="verify">
                  <Verify
                  @success="success" 
                  :mode='pop'
                  :captchaType="blockPuzzle"
                  :imgSize="{ width: '330px', height: '155px' }"
                  ref="verify"
                >
                </Verify>
                </div>     
              </li>
            </ul>
            <div style="margin-bottom: 30px">
              <y-button
                :classStyle="
                  registered.userPwd &&
                  registered.userPwd2 &&
                  registered.userName &&
                  registxt === '注册'
                    ? 'main-btn'
                    : 'disabled-btn'
                "
                :text="registxt"
                style="
                  margin: 0;
                  width: 100%;
                  height: 48px;
                  font-size: 18px;
                  line-height: 48px;
                "
                @btnClick="regist"
              >
              </y-button>
            </div>
            <div class="border" style="margin-bottom: 10px"></div>
               <ul class="common-form pr">
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;font-size: 12px;color: #999;">
                <span>如果您已拥有 XMall 账号，则可在此</span>
                <a href="javascript:;"
                   style="margin: 0 5px"
                   @click="toLogin">登陆</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YButton from "../../components/YButton";
import { register } from "../../api/index.js";
import Verify from "../../components/verifition/Verify.vue";
export default {
  components: {
    YButton,
    Verify,
  },
  data() {
    return {
      pop:'pop',
      blockPuzzle:'blockPuzzle',
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
      agreement: false,
      registxt: "注册",
      statusKey: "",
      captchaVerification:''
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
     regist() {
      this.registxt = "注册中....";
      this.useVerify();
    },
    message (m){
      this.$message.error({
        message:m
      })
    },
    messageSuccess(){
      this.$message({
        message:'恭喜您,注册成功',
        type:'success'
      })
    },
    success(params) {
      console.log(params.captchaVerification);
      this.captchaVerification=params.captchaVerification;

      let userName = this.registered.userName;
      let userPwd = this.registered.userPwd;
      let userPwd2 = this.registered.userPwd2;
      if (!userName || !userPwd || !userPwd2) {
        this.message("账号密码不能为空");
        this.registxt = "注册";
        return false;
      }
      if (userPwd2 != userPwd) {
        this.message("两次输入的密码不相同");
        this.registxt = "注册";
        return false;
      }
      register({
        userName:this.registered.userName,
        userPwd:this.registered.userPwd,
        userPwd2:this.registered.userPwd2,
        captchaVerification:this.captchaVerification
      }).then((res) => {
        if (res.success == true) {
          this.messageSuccess();
          this.toLogin();
        } else {
          this.message(res.message);
          this.registxt = "注册";
          return false;
        }
      });

    },
    useVerify() {
      this.$refs.verify.show();
    },
    toLogin(){
      this.$router.push({
        path:'/login'
      })
    }
  },
};
</script>
<style lang='scss' scoped>
* {
  box-sizing: content-box;
}

.login {
  .verify{
     position: relative;
  }
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url("../../../static/images/bg_9b9dcb65ff.png") repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 10%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .dialog-shadow {
    display: block;
    margin-top: -360px;
  }
  .registered {
    background-color: white;
    display: block;
    height: 100%;
    border-radius: 5%;
    h4 {
      font-size: 22px;
      font-weight: 800;
      padding-top: 10px;
      text-align: center;
    }

    .content {
      padding: 0 40px 22px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>


