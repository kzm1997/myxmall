<template>
  <div class='my_page'>
    <YHeader></YHeader>
     <router-view class="main"></router-view> 
  </div>
</template>

<script>
import YHeader from '../common/header'
export default {
  components: {
      YHeader
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
