<template>
  <div class="home">
    <div class="home_body">
      <div class="banner">
        <div class="bg">
          <el-carousel>
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div v-for="(item, i) in home" :key="i">
          <div class="activity-panel" v-if="iem.type===1">
              <ul class="box"> 
              <li class="content" v-for="(iitem,j) in item.panelContents" :key="j" @click="linkTo(iitem)">
                  <img class="i" :src="iitem.picUrl">
                  <a class="cover-link"></a>
              </li>
              </ul>
          </div>

          <section class="w mt30 clearfix" v-if="item.type==2">
               <y-shelf :title="item.name">
                   <div class="hot">
                       <mall-goods ></mall-goods>
                   </div>
               </y-shelf>
          </section>

          <section class="w mt30 clearfix" v-if="item.type==3">
            <y-shelf :title="item.name">
                <div solt="content" class="floors">
                    <div class="imgbanner" v-for="(iitem,j) in item.panelContents" :key="j" v-if="iitem.type===2||iitem.type===3">
                        <img v-lazy="iitem.picUrl">         
                        <a class="cover-link"></a>
                    </div>
                    <mall-goods :msg="iitem" v-for="(iitem,j) in item.panelContents" :key="j+'key'" v-if="iitem.type != 2 && iitem.type != 3"></mall-goods>
                </div>
            </y-shelf>
          </section>
      </div>
    </div>
  </div>
</template>

<script>
import { productHome } from "../../api/index.js";
import Yshelf from '@/components/shelf'
export default {
  components: {},
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    productHome()
      .then((result) => {
        if (result.scuuess === false) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeCreate() {}, //
  beforeMount() {}, //
  beforeUpdate() {}, //
  updated() {}, //
  beforeDestroy() {}, //
  destroyed() {}, //
  activated() {}, //
  methods: {},
};
</script>

<style lang='scss' scoped>
.home {
  margin-top: 50px;

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
</style>
