<script>
  import headerComp from './components/headerComp.vue';

  export default{
    name: 'App',
    components:{
            headerComp
        }
  }

</script>

<template>
  <headerComp/>

  <!-- <router-view></router-view> -->
  
</template>

<style lang="scss">
  // importo il foglio di stile principale
  @use './style/main.scss' as *;

</style>
