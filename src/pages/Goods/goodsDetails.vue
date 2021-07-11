<template>
  <div class="w store-content">
    <div class="gray-box-top">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnailleft">
            <ul>
              <li
                v-for="(item, i) in small"
                :key="i"
                :class="{ on: big === item }"
                @click="big = item"
              >
                <img v-lazy="item" :alt="product.productName" />
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big" :alt="product.productName" />
            </div>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{ product.productName }}</h4>
          <h6>
            <span>{{ product.subTitle }}</span>
            <span class="price">
              <em>$</em><i>{{ product.salePrice.toFixed(2) }}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num
            @edit-num="editNum"
            :limit="Number(product.limitNum)"
          ></buy-num>
        </div>
        <div class="buy">
          <y-button
            text="加入购物车"
            @btnClick="addCart(product)"
            classStyle="main-btn"
            class="cartButton"
          >
          </y-button>
          <y-button
            text="现在购买"
            @btnClick="checkout(product.productId)"
            class="buyButton"
          >
          </y-button>
        </div>
      </div>
    </div>
    <!-- 产品信息 -->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="../../../static/images/no-data.png" />
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
</template>

<script>
import YButton from "../../components/YButton.vue";
import YShelf from "../../components/shelf.vue";
import BuyNum from "../../components/buynum.vue";
import { productDet,addCart } from "../../api/goods";
import { getStore } from "../../utils/store";
import { mapMutations, mapState } from "vuex";
export default {
  components: { YButton, YShelf, BuyNum },
  data() {
    return {
      productMsg: {},
      small: [],
      big: "",
      product: {
        salePrice: 0,
      },
      productNum: 1,
      userId: "",
    };
  },
  computed: {
    ...mapState(['login','showMoveImg','showCart'])
  },
  watch: {},
  created() {
    let id = this.$route.query.productId;
    this._productDet(id);
    this.userId = getStore("userId");
  },
  mounted() {},
  beforeCreate() {}, //
  beforeMount() {}, //
  beforeUpdate() {}, //
  updated() {}, //
  beforeDestroy() {}, //
  destroyed() {}, //
  activated() {}, //
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    addCart(product) {
      console.log(product);
      if (!this.showMoveImg) {
        console.log(1213);
        //动画2是否在运动
        if (!this.login) {
          console.log(333);
          //登录了,直接存在用户名下
          let param={
            userId:this.userId,
            productId:product.productId,
            productNum:this.productNum
          }
         let cart={
              //并不重新请求数据
              productId: product.productId,
              salePrice: product.salePrice,
              productName: product.productName,
              productImg: product.productImageBig,
              productNum: this.productNum,
            };
          console.log(cart);
          addCart(param).then(() => {
            this.ADD_CART(cart);
          });
        } else {
          console.log(2222);
          //未登录 vuex
          this.ADD_CART({
            productId: product.productId,
            salePrice: product.salePrice,
            productName: product.productName,
            productImg: product.productImageBig,
            productNum: this.productNum,
          });
        }

        //加入购物车动画
        let dom = event.target;
        //获取点击的坐标
        let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;

        //需要触发
        this.ADD_ANIMATION({
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: product.img,
        });
        if (!this.showCart) {
          this.SHOW_CART({ showCart: true });
        }
      }
    },
    editNum(num) {
      this.productNum = num;
    },
    _productDet(productId) {
      console.log(productId);
      productDet({
        productId: productId,
      }).then((res) => {
        let result = res.result;
        this.product = result;
        this.productMsg = result.detail || "";
        this.small = result.productImageSmall;
        this.big = this.small[0];
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.gray-box-top {
  display: flex;
  width: 100%;
  padding: 60px;
  margin: 20px 0;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);

  .gallery-wrapper {
    flex: 1;
    .gallery {
      display: flex;
      width: 50%;
      .thumbnailleft {
        li {
          padding: 10px;
          border: 3px solid #ccc;
          border-radius: 5px;
          img {
            display: block;
            width: 60px;
            height: 60px;
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
          img {
            display: block;
            width: 440px;
            height: 440px;
          }
        }
      }
    }
  }
  .banner {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 450px;
    margin-left: 10px;
    .sku-custom-title {
      width: 450px;
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .price {
          display: block;
          color: #d44d44;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          text-align: right;
          i {
            padding-left: 2px;
            font-size: 24px;
          }
        }
      }
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
    }

    .buy {
      padding: 30px 0 0 10px;
      border-top: 1px solid #ebebeb;
      .cartButton {
        width: 145px;
        height: 50px;
        line-height: 48px;
      }
      .buyButton {
        width: 145px;
        height: 50px;
        line-height: 48px;
        margin-left: 10px;
      }
    }
  }
}
</style>

