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
    <!-- hero section -->
    <section id="hero" class="bg-darker bg-position-center py-5 py-lg-10">
        <div class="container py-5 my-5">
            <div class="row justify-content-center pb-5">
                <div class="col-xl-6 col-lg-7 col-md-8 col-sm-10 text-center">
                    <h5 class="text-light fw-light">#1 Food Delivery Service since 2010</h5>
                    <div class="h1 text-light mb-3 pb-4">We deliver your favorite food fresh &amp; fast in
                        <div class="d-inline-block">
                            <a class="text-decoration-none text-white" href="#">Roma</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- checkbox Types  -->
    <div class="container my-5">
        <h2 class="text-center">Select Categories</h2>
        <div class="mt-2 p-4 rounded">
            <div class="rounded d-flex justify-content-center align-items-center flex-wrap">
                <label v-for="(elem, index) in types" :key="index" :for="elem.name"
                    class="rounded-circle d-flex justify-content-center align-items-center text-white text-center category-icon"
                    :class="(elem.name == 'Pizza') ? 'pizza' : (elem.name == 'Chinese Cuisine') ? 'chinese' : (elem.name == 'Kebab') ? 'kebab' : (elem.name == 'Ice Cream') ? 'ice-cream' : (elem.name == 'Hamburger and Sandwich') ? 'hamburger' : (elem.name == 'Breakfast') ? 'breakfast' : (elem.name == 'Sushi') ? 'sushi' : (elem.name == 'Italian Cuisine') ? 'spaghetti' : ''">
                    <input type="checkbox" :value="elem.id" v-model="selectedTypes" :id="elem.name">
                </label>
            </div>
        </div>

        <!-- lista ristoranti -->
        <div class="row">

            <div v-for="(elem, index) in restaurants" :key="index" class="col-lg-3">
                <router-link :to="{ name: 'restaurant', params: { slug: elem.slug, id: elem.id } }"
                    class="sb-menu-item sb-mb-30 text-decoration-none">
                    <div class="card text-bg-dark transform">
                        <img class="bd-placeholder-img bd-placeholder-img-lg card-img" width="100%" height="270"
                            :src="`http://127.0.0.1:8000/storage/${elem.restaurant_image}`" :alt="index">
                        <div class="card-img-overlay d-flex justify-content-center align-items-center">
                            <h2 class="card-title text-center text-white">{{ elem.name }}</h2>
                        </div>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    img {
        filter: brightness(60%);
    }
}

#hero {
    background-image: url('../../public/img/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    height: 35rem;
}


label {
    height: 80px;
    width: 80px;
    cursor: pointer;
    margin: 1rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .customMark {
        font-size: 3rem;
        color: green;
        background-color: rgba(0, 0, 0, 0.305);
        width: 100%;
        height: 100%;
    }

    &:hover {
        scale: 105%;
    }

    input {
        display: none;
    }
}

.pizza,
.chinese,
.breakfast,
.ice-cream,
.hamburger,
.sushi,
.kebab,
.spaghetti {
    &:hover {
        filter: brightness(60%);
    }
}

.pizza {
    background-image: url('img/pizza.png');
}

.chinese {
    background-image: url('img/chinese.png');
}

.breakfast {
    background-image: url('img/breakfast.png');
}

.ice-cream {
    background-image: url('img/ice-cream.png');
}

.hamburger {
    background-image: url('img/hamburger.png');
}

.sushi {
    background-image: url('img/sushi.png');
}

.kebab {
    background-image: url('img/kebab.png');
}

.spaghetti {
    background-image: url('img/spaghetti.png');
}

.transform {
    transition: transform 0.6s;
    box-shadow: 2px 2px 5px black;
}

.transform:hover {
    transform: scale(1.05);
}
</style>

