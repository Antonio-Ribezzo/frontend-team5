<script>
import axios from 'axios';
import headerComp from './components/headerComp.vue';
import { store } from './store';

export default {
  name: 'App',
  components: {
    headerComp
  },
  data() {
    return {
      restaurants: [],
      store,
      types: null,
      selectedTypes: []
    }
  },
  
  mounted() {
    this.getRestaurants();
    this.getTypes();
  },
  watch:{
      selectedTypes:{
        handler:"getRestaurants",
        deep:true
      }
  },
  methods: {
    getRestaurants() {

      const params = {}

      if(this.selectedTypes.length > 0){
        params.type_id = this.selectedTypes.join(',')
      }

      axios.get(`${this.store.baseUrl}/restaurants`, { params })
        .then(res => {
          this.restaurants = res.data.restaurants
        })
    },
    getTypes(){
      axios.get(`${this.store.baseUrl}/types`)
        .then(res => {
          this.types = res.data.types
      })
    }
  }
}

</script>

<template>
  <headerComp />

  <!-- checkbox Types  -->
  <div class="container my-3">
      <button type="button" class="fs-6 btn bg-success form-select form-select-sm" data-bs-toggle="collapse" data-bs-target="#collapseTypes" role="button" aria-expanded="false" aria-controls="collapseTypes">
        <span>Types</span>
      </button>
      <div id="collapseTypes" class="collapse mt-2 p-4 rounded">
        <div class="rounded">
          <label v-for="(el,index) in types" :key="index" :for="el.name" class="me-2">
            <input class="me-1" type="checkbox" :value="el.id" v-model="selectedTypes" :id="el.name">{{ el.name }}
          </label>
        </div>
      </div>
      
      <!-- lista ristoranti -->
      <ul class="mt-4">
        <li v-for="(el, index) in restaurants" :key="index">
          {{ el.name }}
        </li>
      </ul>
    </div>


  <!-- <router-view></router-view> -->
</template>

<style lang="scss">
// importo il foglio di stile principale
@use './style/main.scss' as *;
</style>
