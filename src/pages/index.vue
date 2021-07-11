<template>
  <div class='my_page'>
    <YHeader class="header"></YHeader>
     <router-view class="main"></router-view> 
     <Footer></Footer>
        <!--抛物图片-->
    <transition @after-enter='afterEnter' @before-enter="beforeEnter">
      <!--整张图片-->
      <div class="move_img" v-if="showMoveImg"
           :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">
        <div><img :src="moveImgUrl"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import YHeader from '../common/header'
import Footer from  '../common/footer'
import { mapMutations,mapState } from 'vuex'
export default {
  components: {
      YHeader,
      Footer
  },
  data () {
    return {

    }
  },
  computed: {
      ...mapState(['cartPositionT', 'cartPositionL', 'showMoveImg', 'elLeft', 'elTop', 'moveImgUrl'])
    },
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
    ...mapMutations(['ADD_ANIMATION']),
        // 监听图片进入购物车
      listenInCart () {
        this.ADD_ANIMATION({moveShow: false, receiveInCart: true})
      },
      beforeEnter (el) {
        let elStyle = el.style
        let elChild = el.children[0]
        let elChildSty = elChild.style
        elStyle.transform = `translate3d(0,${this.elTop - this.cartPositionT}px,0)`
        elChildSty.transform = `translate3d(${-(this.cartPositionL - this.elLeft)}px,0,0) scale(1.2)`
      },
      afterEnter (el) {
        let elStyle = el.style
        let elChild = el.children[0]
        let elChildSty = elChild.style
        elStyle.transform = `translate3d(0,0,0)`
        elChildSty.transform = `translate3d(0,0,0) scale(.2)`
        elStyle.transition = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
        elChildSty.transition = 'transform .55s linear'
        // 动画结束
        elChild.addEventListener('transitionend', () => {
          this.listenInCart()
        })
        elChild.addEventListener('webkitAnimationEnd', () => {
          this.listenInCart()
        })
      }
  }
}
</script>

<style lang='scss' scoped>

 .header{
   position: sticky;
   top: 0px;
   z-index: 9999;
 }
</style>




