<template>
  <div class="shopping-cart">
    <div class="store-content page-cart">
      <div class="gray-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div v-if="cartList.length">
          <div class="ui-cart">
            <!-- 标题 -->
            <div class="cart-table-title">
              <div class="name"><span>商品信息</span></div>
              <div class="price1">单价</div>
              <div class="num">数量</div>
              <div class="subtotal">小计</div>
              <div class="operation">操作</div>
            </div>
            <!-- 列表 -->
            <div class="cart-table" v-for="(item, i) in cartList" :key="i">
              <div class="cart-group divide pr">
                <div class="cart-top-items">
                  <!-- 勾选 -->
                  <div class="info">
                    <div class="items-choose">
                      <span
                        class="blue-checkbox-new"
                        :class="{ 'checkbox-on': item.checked === '1' }"
                        @click="editCart('check', item)"
                      >
                      </span>
                    </div>
                    <!-- 图片 -->
                    <div class="items-thumb">
                      <a
                        @click="goodsDetails(item.productId)"
                        :title="item.productName"
                        target="_blank"
                      >
                        <img :alt="item.productName" :src="item.productImg" />
                      </a>
                    </div>
                    <!-- 信息 -->
                    <div class="name hide-row">
                      <div class="name-table">
                        <a
                          @click="goodsDetails(item.productId)"
                          :title="item.productName"
                          target="_blank"
                          v-text="item.productName"
                        ></a>
                      </div>
                    </div>
                  </div>
                  <!-- 价格 -->
                  <div class="price1 info">
                    <span>{{ item.salePrice }}</span>
                  </div>
                  <div class="buyNum">
                    <buy-num
                      :num="item.productNum"
                      :id="item.productId"
                      :checked="item.checked"
                      :limit="item.limitNum"
                       @edit-num="EditNum"
                    >
                    </buy-num>
                  </div>
                  <!-- 小计 -->
                  <div class="subMoney">
                    <span> ${{ item.salePrice * item.productNum }}</span>
                  </div>
                  <!-- 删除按钮 -->
                  <div class="operations">
                    <a
                      class="items-delete-btn"
                      @click="cartdel(item.productId)"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-bottom-bg fix-bottom">
            <div class="fix-bottom-inner">
              <div class="cart-bar-operation">
                <div class="operation-choose">
                  <div class="choose-all">
                    <span
                      :class="{ 'checkbox-on': checkAllFlag }"
                      class="blue-checkbox-new"
                      @click="editCheckAll"
                    ></span>
                    <span @click="editCheckAll">全选</span>
                  </div>
                  <div class="delete-choose-goods" @click="delChecked">
                    删除选中的商品
                  </div>
                </div>
              </div>
              <div class="shipping">
                <div class="shipping-box">
                  <div class="shipping-total shipping-num">
                    <div>
                      <h4 class="highlight">
                        已选择
                        <i v-text="checkNum">件商品</i>
                      </h4>
                      <h5>共计<i v-text="totalNum">件商品</i></h5>
                    </div>
                    <div class="shipping-total shipping-price">
                      <h4 class="highlight">
                        应付总额: <span>$</span><i v-text="checkPrice"></i>
                      </h4>
                      <h5 class="shipping-tips ng-scope">应付总额不含运费</h5>
                    </div>
                  </div>
                  <y-button
                    :classStyle="
                      checkNum > 0 && submit ? 'main-btn' : 'disabled-btn'
                    "
                    class="big-main-btn"
                    :text="checkoutNow"
                    @btnClick="checkout"
                  >
                  </y-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="cart-e"></div>
          <p style="text-align: center; padding: 20px; color: #8d8d8d">
            你的购物车空空如也
          </p>
          <div style="text-align: center">
            <router-link to="/goods">
              <y-button
                text="现在选购"
                style="
                  width: 150px;
                  height: 40px;
                  line-height: 38px;
                  color: #8d8d8d;
                "
              ></y-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import YButton from "../../components/YButton.vue";
import { editCheckAll, getCartList, delCartChecked,cartEdit,cartDel } from "../../api/goods";
import { mapState, mapMutations } from "vuex";
import BuyNum from "../../components/buynum.vue";
import { getStore } from "../../utils/store";
export default {
  components: { YButton, BuyNum },
  data() {
    return {
      userId: 0,
      checkoutNow: "现在结算",
      submit: true,
    };
  },
  computed: {
    ...mapState(["cartList"]),
    //是否全选
    checkAllFlag () {
      return this.checkedCount===this.cartList.length;
    },
    //勾选的数量
    checkedCount() {
      let i = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          if (item.checked === "1") {
            i++;
          }
        });
      console.log(i);  
      return Number(i);
    },
    //计算总数量
    totalNum() {
      var totalNum = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          totalNum += item.productNum;
        });
      return Number(totalNum);
    },
    // 选中的总价格
    checkPrice() {
      var totalPrice = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          if (item.checked === "1") {
            totalPrice += item.productNum * item.salePrice;
          }
        });
      return totalPrice;
    },
    // 选中的商品数量
    checkNum() {
      var checkNum = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          if (item.checked === "1") {
            checkNum += item.productNum;
          }
        });
      return checkNum;
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.userId=getStore('userId');
  },
  beforeCreate() {}, //
  beforeMount() {}, //
  beforeUpdate() {}, //
  updated() {}, //
  beforeDestroy() {}, //
  destroyed() {}, //
  activated() {}, //
  methods: {
        ...mapMutations(["EDIT_CART","INIT_BUYCART"]),
    goodsDetails(id) {
      window.open(window.location.origin + "#/goodsDetails?productId=" + id);
    },
    // 修改购物车
    _cartEdit(userId, productId, productNum, checked) {
      cartEdit({
        userId,
        productId,
        productNum,
        checked,
      }).then((res) => {
        if (res.success === true) {
          this.EDIT_CART({
            productId,
            checked,
            productNum,
          });
        }
      });
    },
    // 修改购物车
    editCart(type, item) {
      if (type && item) {
        let checked = item.checked;
        let productId = item.productId;
        let productNum = item.productNum;
        // 勾选
        if (type === "check") {
          let newChecked = checked === "1" ? "0" : "1";
          this._cartEdit(this.userId, productId, productNum, newChecked);
        }
      } else {
        console.log("缺少所需参数");
      }
    },
    //全选
    editCheckAll() {
      let checkAll = !this.checkAllFlag;
      editCheckAll({ userId: this.userId, checked: checkAll }).then(() => {
        this.EDIT_CART({ checked: checkAll });
      });
    },
  EditNum: function(productNum,productId,checked){
      this._cartEdit(this.userId,productId,productNum,checked)
  },
  //删除整个购物车
  cartdel(productId){
     cartDel({userId:this.userId,itemId:productId}).then(()=>{
         this.EDIT_CART({productId})
     })
  },
  delChecked() {
    getCartList({ userId: getStore("userId") }).then((res) => {
      if (res.success === true) {
        res.result.forEach((item) => {
          if (item.checked == "1") {
            let productId = item.productId;
            this.EDIT_CART({ productId });
          }
        });
      }
    });
    delCartChecked({ userId: this.userId }).then((res) => {
      if (res.success !== true) {
        this.$message.error({
          message: "删除失败",
        });
      }
    });
  }
  }
}
</script>

<style lang='scss' scoped>
.shopping-cart.main {
  margin-top: 30px;
  .store-content.page-cart {
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
    .title {
      padding-left: 30px;
      height: 60px;
      padding: 0 10px 0 24px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 8px 8px 0 0;
      box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
      background: #f3f3f3;
      line-height: 60px;
      h2 {
        font-size: 20px;
        font-weight: 400;
      }
    }
    .ui-cart {
      display: flex;
      flex-direction: column;
      .cart-table-title {
        line-height: 38px;
        padding: 0 0 0 30px;
        font-size: 12px;
        background: #eee;
        border-bottom: 1px solid #dbdbdb;
        border-bottom-color: rgba(0, 0, 0, 0.08);
        display: flex;
        justify-content: space-between;
        .name {
          flex: 4;
          box-sizing: border-box;
          padding-left: 20px;
        }
        .num {
          flex: 1;
          text-align: center;
        }
        .operation {
          flex: 1;
          text-align: center;
        }
        .subtotal {
          flex: 1;
          text-align: center;
        }
        .price1 {
          flex: 1;
          text-align: center;
        }
      }
      .cart-top-items {
        height: 140px;
        align-items: center;
        display: flex;
        .items-choose {
          width: 60px;
          text-align: center;
          line-height: 74px;
          .blue-checkbox-new{
            margin-left: 20px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            display: inline-block;           
             background: url(../../../static/images/checkbox-new_631a56a4f6.png)
            no-repeat 0 -20px;
          }
          .blue-checkbox-new.checkbox-on {
      
            background: url(../../../static/images/checkbox-new_631a56a4f6.png)
              no-repeat 0 0px;
     
          }
        }
        .items-thumb {
          a {
            display: inline-block;
            border-radius: 3px;
            border: 2px solid rgba(0, 0, 0, 0.06);
          }
          img {
            height: 80px;
            width: 80px;
          }
        }
        .name.hide-row {
          width: 380px;
          margin-left: 20px;
          a {
            font-size: 16px;
            color: #333;
            cursor: pointer;
          }
        }
      }
      .info {
        display: flex;
        align-items: center;
        flex: 5;
      }
      .price1.info {
        flex: 1;
        span {
          margin-left: 20px;
        }
      }
      .buyNum {
        flex: 1;
      }
      .subMoney {
        flex: 1;
        span {
          margin-left: 40px;
        }
      }
      .operations {
        flex: 1;
        font-size: 12px;
        line-height: 24px;
        .items-delete-btn {
          background-image: url("../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg");
          &:hover {
            background-position: 0 -36px;
          }
        }
        .items-delete-btn {
          display: block;
          width: 24px;
          height: 24px;
          margin: 0 auto;
          color: #c2c2c2;
          background: url("../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg");
          -webkit-background-size: 100% auto;
          background-size: 100% auto;
          -moz-transition: none;
          -webkit-transition: none;
          -o-transition: none;
          transition: none;
        }
      }
    }

    .cart-bottom-bg {
      border-top: 1px solid #e9e9e9;
      background: #fdfdfd;
      background-position: center;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
      height: 80px;
      border-radius: 0 0 8px 8px;
      .fix-bottom-inner {
        display: flex;
        justify-content: space-between;
        .cart-bar-operation {
          display: flex;
          .operation-choose {
            display: flex;
            .choose-all {
              height: 80px;
              display: flex;
              text-align: center;
              align-items: center;
              .blue-checkbox-new{
                margin-left: 25px;
                width: 20px;
                margin-right: 10px;
                height: 20px;
                cursor: pointer;
                display: inline-block;
                  background: url(../../../static/images/checkbox-new_631a56a4f6.png)
                  no-repeat 0 -20px;
              }
              .blue-checkbox-new.checkbox-on {
                background: url(../../../static/images/checkbox-new_631a56a4f6.png)
                  no-repeat 0 0px;
              }
              span {
                display: flex;
                text-align: center;
                align-items: center;
              }
            }
            .delete-choose-goods {
              height: 80px;
              line-height: 80px;
              margin-left: 10px;
              color: #bbb;
              font-size: 12px;
            }
          }
        }
      }
      .shipping {
        display: flex;
        .shipping-box {
          align-items: center;
          margin-right: 50px;
          display: flex;
          .shipping-total.shipping-num {
            padding-right: 15px;
            display: flex;
            .highlight i {
              width: 28px;
              display: inline-block;
              text-align: center;
              color: #d44d44;
              font-size: 18px;
              font-weight: 700;
            }
            h5 {
              color: #959595;
              i {
                width: 28px;
                display: inline-block;
                text-align: center;
                font-size: 18px;
                font-weight: 700;
              }
            }
          }
          .shipping-total.shipping-price {
            border-left: 1px dashed #959595;
            padding-left: 15px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>




