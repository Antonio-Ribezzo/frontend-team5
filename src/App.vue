<script>
  import axios from 'axios';
  import headerComp from './components/headerComp.vue';
  import {store} from './store';

  export default{
    name: 'App',
    components:{
            headerComp
        },
    data(){
      return{
        restaurants:[],
        baseUrl:'',
        store
      }
    },
    mounted(){
      this.getRestaurants();
    },
    methods: {
      getRestaurants(){
        axios.get(`${this.store.baseUrl}/restaurants`)
        .then(res=>{
          this.restaurants = res.data.restaurants
        })
      }
    }
  }

</script>

<template>
  <headerComp/>

  <ul>
    <li v-for="(el,index) in restaurants" :key="index">
      {{ el.name }}
    </li>
  </ul>

  <!-- <router-view></router-view> -->
  
</template>

<style lang="scss">
  // importo il foglio di stile principale
  @use './style/main.scss' as *;

</style>
