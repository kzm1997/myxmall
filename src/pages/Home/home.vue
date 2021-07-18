<template>
  <div class="home">
    <div class="home_body">
      <div class="banner">
        <div class="bg">
          <el-carousel>
            <el-carousel-item v-for="item in banner" :key="item.id">
              <img :src="item.picUrl" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div v-for="(item, i) in home" :key="i" class="home-main">
        <div class="activity-panel" v-if="item.type === 1">
          <ul class="box">
            <li
              class="content"
              v-for="(iitem, j) in item.panelContents"
              :key="j"
              @click="linkTo(iitem)"
            >
              <img class="i" :src="iitem.picUrl" />
              <a class="cover-link"></a>
            </li>
          </ul>
        </div>

        <section class="w mt30 clearfix" v-if="item.type == 2">
          <y-shelf :title="item.name">
            <div class="hot" slot="content">
              <mall-goods
                :msg="iitem"
                v-for="(iitem, j) in item.panelContents"
                :key="j"
              ></mall-goods>
            </div>
          </y-shelf>
        </section>

        <section class="w mt30 clearfix" v-if="item.type == 3">
          <y-shelf :title="item.name">
            <div slot="content" class="floors">
              <div
                class="imgbanner"
                v-for="(iitem, j) in officalProduct"
                :key="j"
                @click="linkTo(iitem)"
              >
                <img v-lazy="iitem.picUrl" />
                <a class="cover-link"></a>
              </div>
              <mall-goods
                :msg="iitem"
                v-for="(iitem, j) in officalProductNames"
                :key="j + 'key'"
              ></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { productHome } from "../../api/index.js";
import YShelf from "@/components/shelf";
import mallGoods from "@/components/mallGoods";
export default {
  components: {
    YShelf,
    mallGoods,
  },
  data() {
    return {
      error: false,
      banner: [],
      mark: 0,
      bgOpt: {
        px: 0,
        py: 0,
        w: 0,
        h: 0,
      },
      home: [],
      loading: true,
      notify: "1",
      dialogVisible: false,
      timer: "",
    };
  },
  computed: {
    officalProduct: function () {
      let offical = this.home.filter(
        (x) => x.type == 3 && x.name == "官方精选"
      );
      console.log(
        offical[0].panelContents.filter((y) => y.type == 2 || y.type == 3)
      );
      return offical[0].panelContents.filter((y) => y.type == 2 || y.type == 3);
    },
    officalProductNames: function () {
      let offical = this.home.filter(
        (x) => x.type == 3 && x.name == "官方精选"
      );
      console.log(
        offical[0].panelContents.filter((y) => y.type != 2 && y.type != 3)
      );
      return offical[0].panelContents.filter((y) => y.type != 2 && y.type != 3);
    },
  },
  watch: {},
  created() {},
  mounted() {
    productHome().then((result) => {
      if (result.scuuess === false) {
        this.error = true;
        return;
      }
      let data = result.result;
      this.home = data;
      this.loading = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 0) {
          this.banner = data[i].panelContents;
        }
      }
    });
  },
  beforeCreate() {}, //
  beforeMount() {}, //
  beforeUpdate() {}, //
  updated() {}, //
  beforeDestroy() {}, //
  destroyed() {}, //
  activated() {}, //
  methods: {
    linkTo: function (item) {
      if (item.type === 0 || item.type === 2) {
        this.$router.push({
          path: "/goodsDetails",
          query: {
            productId: item.productId,
          },
        });
      } else {
        window.location.href = item.fullurl;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.home {
  margin-top: 50px;

   .el-carousel__item{
     img{
       width: 100%;
       height: 100%;
     }
   }


  .home_body {
    display: flex;
    flex-direction: column;
    .banner {
      display: flex;
      justify-content: center;
    }
    .bg {
      width: 80%;
      margin: 30px, 50px, 40px;
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 50px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.home-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  .activity-panel {
    margin: 0 auto;
    width: 80%;
  }
  .activity-panel ul {
    margin: 20px 0 30px;
    overflow: hidden;
    margin-top: 25px;
    border-radius: 8px;

    display: flex;
    li {
      width: 25%;
      cursor: pointer;
      border: 0.5px solid rgba(0, 0, 0, 0.02);
      color: #5079d9;

      text-decoration: none;
      height: 100%;
      img {
        height: 100%;
      }
      img:hover {
        transform: translateY(-15px) scale(1.15);
      }
      .i {
        width: 100%;
      }
    }
  }

  .hot {
    display: flex;
    .good-item {
      flex: 1;
    }
  }
  .floors {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
  }
  .floors div:first-child {
    width: 50%;
    height: 430px;
    transition: all 0.15s ease;
    &:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    }

     img {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
    }
  }
}
</style>

