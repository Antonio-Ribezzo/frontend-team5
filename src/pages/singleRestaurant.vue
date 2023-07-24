<script>

import { store } from '../store';
import axios from 'axios';


export default {
    name:"singleRestaurant",
    data () {
        return {
            restaurant:[],
            store
        }
    },
    mounted(){
        this.getSingleRestaurant()
        //this.getSingleItem()
    },
    methods:{
        getSingleRestaurant() {
            axios.get(`${this.store.baseUrl}/restaurants/${this.$route.params.slug}`).then((response) => {
                this.restaurant = response.data.restaurant;
                console.log(this.restaurant, 'ristorante')
            }, error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' })
                } else {
                    
                }

                // if (response.data.success) {
                //     this.project = response.data.project;
                // } else {
                //     // redirect alla pagina 404
                //     this.$router.push({ name: 'not-found' })
                // }
            });
        },
        // getSingleItem(){
        //     //http://127.0.0.1:8000/api/items?restaurant_id=1
        //     axios.get(`${this.store.baseUrl}/restaurants/${this.$route.id}/items`).then((response) => {
        //         this.restaurant_items = response.data.restaurant;
        //         console.log(this.restaurant_items)
        //         console.log(this.$route)
        //     }, error => {
        //         if (error.response.status === 404) {
        //             this.$router.push({ name: 'NotFound' })
        //         } else {

        //         }

        //         // if (response.data.success) {
        //         //     this.project = response.data.project;
        //         // } else {
        //         //     // redirect alla pagina 404
        //         //     this.$router.push({ name: 'not-found' })
        //         // }
        //     });
        // }
    }
}
</script>


<template>
    <div>
         <div class="container">
            <h1 v-if="restaurant" class="text-center my-5"> {{ restaurant.name }} </h1>
            <p v-if="restaurant"> <b>address: </b> {{ restaurant.address }} </p>

            <h1 class="text-center my-5 text-black">MENU</h1>
            
            <div class="row">

                <div v-for="(elem, index) in restaurant" :key="index" class="col-lg-3">
                    <router-link :to="{ name: 'restaurant', params: { slug: elem.slug } }" class="sb-menu-item sb-mb-30 text-decoration-none">                    
                        <div class="sb-cover-frame">
                            <img :src="`http://127.0.0.1:8000/storage/${elem.restaurant_image}`" :alt="index">
                        </div>

                        <div class="sb-card-tp">
                            <h4 class="sb-card-title black">{{ elem.name }}</h4>
                            <div class="sb-price">
                                <sub>€</sub>{{elem.price}}
                            </div>
                        </div>

                    </router-link>
                </div>

            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>