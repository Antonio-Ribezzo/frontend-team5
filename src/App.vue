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

  <h1 class="text-center">ciao</h1>
  
</template>

<style lang="scss">
  // importo il foglio di stile principale
  @use './style/main.scss' as *;

</style>
