<script>
import axios from 'axios';
import { store } from '../store';

export default {
    name: 'AppHome',
    components: {
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
    watch: {
        selectedTypes: {
            handler: "getRestaurants",
            deep: true
        }
    },
    methods: {
        getRestaurants() {

            const params = {}

            if (this.selectedTypes.length > 0) {
                params.type_id = this.selectedTypes.join(',')
            }

            axios.get(`${this.store.baseUrl}/restaurants`, { params })
                .then(res => {
                    this.restaurants = res.data.restaurants
                })
        },
        getTypes() {
            axios.get(`${this.store.baseUrl}/types`)
                .then(res => {
                    this.types = res.data.types
                })
        }
    }
}

</script>

<template>
    <!-- checkbox Types  -->
    <div class="container my-3">
        <button type="button" class="fs-6 btn bg-success form-select form-select-sm" data-bs-toggle="collapse"
            data-bs-target="#collapseTypes" role="button" aria-expanded="false" aria-controls="collapseTypes">
            <span>Types</span>
        </button>
        <div id="collapseTypes" class="collapse mt-2 p-4 rounded">
            <div class="rounded">
                <label v-for="(elem, index) in types" :key="index" :for="elem.name" class="me-2">
                    <input class="me-1" type="checkbox" :value="elem.id" v-model="selectedTypes" :id="elem.name">{{
                        elem.name }}
                </label>
            </div>
        </div>

        <!-- lista ristoranti -->
        <ul class="mt-4">
            <li v-for="(elem, index) in restaurants" :key="index">
                <router-link :to="{ name: 'restaurant', params: { slug: elem.slug } }">{{ elem.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>

