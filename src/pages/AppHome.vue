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
            const id = {}

            if (this.selectedTypes.length > 0) {
                params.type_id = this.selectedTypes.join(',')
            }

            axios.get(`${this.store.baseUrl}/restaurants`, { params })
                .then(res => {
                    this.restaurants = res.data.restaurants
                    console.log(this.restaurants)
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
        <button type="button" class="mb-5 fs-6 btn bg-success form-select form-select-sm" data-bs-toggle="collapse"
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
        <div class="row">

            <div v-for="(elem, index) in restaurants" :key="index" class="col-lg-3">
                <router-link :to="{ name: 'restaurant', params: { slug: elem.slug, id: elem.id } }" class="sb-menu-item sb-mb-30 text-decoration-none">                    
                    <div class="sb-cover-frame">
                        <img :src="`http://127.0.0.1:8000/storage/${elem.restaurant_image}`" :alt="index">
                    </div>

                    <div class="sb-card-tp">
                        <h4 class="sb-card-title black">{{ elem.name }}</h4>
                    </div>

                </router-link>
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

