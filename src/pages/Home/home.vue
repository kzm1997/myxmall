<template>
  <div class='home'>
      <div>
         <div class="banner">
           <div class="bg">
               <div ></div>
           </div>
         </div> 
          
      </div>
  </div>
</template>

<script>
import {productHome} from '../../api/index.js'
export default {
  components: {},
  data () {
    return {
        error:false,
        home:[],
        loading: true
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
     productHome().then((result) => {
         if(result.scuuess===false){
             return;
         }
         let data=result.result;
         this.home=data;
         this.loading=false;
         for(let i=0;i<data.length;i++){
             if(data[i].type===0){
                 this.banner=data[i].panelContents;
             }
         }
     }).catch((err) => {
         console.log(err);
     }); 
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
   .home{
       display:flex;
   }
</style>
