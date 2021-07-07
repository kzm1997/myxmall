<template>
  <div class='my_page'>
    <YHeader></YHeader>
     <router-view class="main"></router-view> 
     <Footer></Footer>
  </div>
</template>

<script>
import YHeader from '../common/header'
import Footer from  '../common/footer'
export default {
  components: {
      YHeader,
      Footer
  },
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
