<script >

import headerComp from './components/headerComp.vue';
import footerComp from './components/footerComp.vue';


export default {
  components: {
    headerComp,
    footerComp
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
}

</script>

<template>
  <headerComp/>
  <router-view></router-view>
  <footerComp/>
</template>

<style lang="scss">
@use './style/main.scss';
</style>