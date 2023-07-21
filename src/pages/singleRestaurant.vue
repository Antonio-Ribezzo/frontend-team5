<script>

import { store } from '../store';

export default {
    name:"singleRestaurant",
    data () {
        return {
            restaurant:[],
            store
        }
    },
    methods:{
        getSingleRestaurant() {
            axios.get(`${this.store.baseUrl}/restaurants/${this.$route.params.slug}`).then((response) => {
                this.restaurant = response.data.restaurant;
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
        }
    }
}
</script>


<template>
    <div>
         <div class="container">
            <h1 v-if="restaurant" class="text-center my-5"> {{ restaurant.name }} </h1>
            <p v-if="restaurant"> <b>address: </b> {{ restaurant.address }} </p>

            <!-- <p><b>Type: </b>{{ project.type.name }}</p>
            <h5>Technology:</h5>
            <ul>
                <li v-for="(elem, index) in project.technologies" :key="index">
                {{ elem.name }}
                </li>
            </ul> -->
            <!-- <img class="img-fluid" :src="`http://127.0.0.1:8000/storage/${project.cover_image}`" alt="Title"/> -->
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>