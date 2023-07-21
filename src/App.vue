<script >

import headerComp from './components/headerComp.vue';


export default {
  components: {
    headerComp
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
</template>

<style lang="scss">
@use './style/main.scss';
</style>