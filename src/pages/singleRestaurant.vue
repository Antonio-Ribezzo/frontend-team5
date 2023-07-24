<script>

import { store } from '../store';
import axios from 'axios';


export default {
    name:"singleRestaurant",
    data () {
        return {
            restaurant:[],
            restaurant_items:[],
            store
        }
    },
    mounted(){
        this.getSingleRestaurant()
        this.getItems()
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
            });
        },
        getItems(){
            
            //http://127.0.0.1:8000/api/restaurants/2/items

            axios.get(`${this.store.baseUrl}/restaurants/${this.$route.params.id}/items`).then((response) => {
                console.log(response.data.items)
                 this.restaurant_items = response.data.items;
                 console.log(this.restaurant_items)
                 //console.log(this.$route)
             }, error => {
                 if (error.response.status === 404) {
                     this.$router.push({ name: 'NotFound' })
                 } else {

                 }
             });
         }
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

                <div v-for="(elem, index) in restaurant_items" :key="index" class="col-lg-3">
                    <router-link :to="{ name: 'restaurant', params: { slug: elem.slug } }" class="sb-menu-item sb-mb-30 text-decoration-none">                    
                        <div class="sb-cover-frame">
                            <img :src="`http://127.0.0.1:8000/storage/${elem.cover_image}`" :alt="index" class="w-100">
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

.sb-menu-item .sb-card-tp {
    margin-bottom: 15px;
    padding-left: 15px;
    background-color: #F2F3F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sb-menu-item .sb-cover-frame {
    display: block;
    background-color: #F2F3F5;
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
    transition: 0.3s ease-in-out;
}

.sb-menu-item .sb-cover-frame img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    object-position: center;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    transform: scale(1.001);
    transition: 0.3s ease-in-out;
    &:hover {
        scale: 105%;
    }
}

.sb-menu-item .sb-card-tp {
    margin-bottom: 15px;
    padding-left: 15px;
    background-color: #F2F3F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
}

.sb-menu-item .sb-card-tp .sb-card-title {
    // width: calc(100% - 90px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    font-weight: 600;
    color: black;
}
.sb-menu-item .sb-card-tp .sb-price {
    width: 60px;
    height: 60px;
    font-weight: 500;
    background-color: #F5C332;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
}

.sb-menu-item .sb-card-tp .sb-price sub {
    font-size: 12px;
    font-weight: 400;
}

</style>