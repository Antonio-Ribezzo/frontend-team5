<script>

import { store } from '../store';
import axios from 'axios';


export default {
    name: "singleRestaurant",
    data() {
        return {
            restaurant: [],
            restaurant_items: [],
            store,
        }
    },
    mounted() {
        this.getSingleRestaurant()
        this.getItems()
    },
    methods: {
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
        getItems() {

            //http://127.0.0.1:8000/api/restaurants/2/items

            axios.get(`${this.store.baseUrl}/restaurants/${this.$route.params.id}/items`).then((response) => {
                // console.log(response.data.items, 'piatti')
                response.data.items.forEach(element => {
                    if(element.available === 1){
                        this.restaurant_items.push(element)
                    }
                });
                // this.restaurant_items = response.data.items;
                // console.log(this.restaurant_items, 'risultato')
                //console.log(this.$route)
            }, error => {
                if (error.response.status === 404) {
                    this.$router.push({ name: 'NotFound' })
                } else {

                }
            });
        },
        addToCart(item) {

            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

            if (cartItems.length === 0) {
                // Se il carrello è vuoto, imposta l'id del ristorante corrente
                localStorage.setItem('currentRestaurantId', item.restaurant_id);
            }

            const currentRestaurantId = localStorage.getItem('currentRestaurantId');

            //console.log(item);
            if (currentRestaurantId == null || currentRestaurantId == item.restaurant_id) {


                if (cartItem) {
                    cartItem.quantity++;
                    this.store.CartCounter++;
                    console.log(this.restaurant_items)
                } else {
                    cartItems.push({
                        id: item.id,
                        name: item.name,
                        quantity: 1,
                        price: item.price,
                        cover_image: item.cover_image,
                        restaurant_id: item.restaurant_id
                    });
                    this.store.CartCounter++;

                    console.log(this.restaurant_items)
                }

                // Salva i dati aggiornati nel localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                // Aggiorna il contatore del carrello nell'headerComp utilizzando l'evento personalizzato
                this.$emit('cart-updated');

            } else {
                this.openPopup()
                return
            }
        },
        openPopup() {
            document.getElementById('custom-popup').style.display = 'block';
        },
        closePopup() {
            document.getElementById('custom-popup').style.display = 'none';
        }
    }
}

</script>


<template>
    <div>
        <div class="container py-5">
            <div class="row box-1">
                <div class="col-12 col-lg-4">
                    <img class="card-img img-rest mb-4 rounded"
                        :src="`http://127.0.0.1:8000/storage/${restaurant.restaurant_image}`" :alt="index">
                </div>
                <div class="col-12 col-lg-8">
                    <h1 v-if="restaurant" class="text-center"> {{ restaurant.name }} </h1>
                    <p v-if="restaurant" class=" mt-2 ps-lg-5"> <b>Address: </b> {{ restaurant.address }} </p>
                    <p v-if="restaurant.types" class=" mt-2 ps-lg-5"><b>Typology: </b> <span
                            v-for="(elem, index) in restaurant.types">{{ elem.name }}, </span></p>
                </div>
            </div>

            <h2 class="text-center my-5 text-black fst-italic text-uppercase">menu</h2>

            <!-- lista piatti -->
            <div class="row mb-5">
                <div v-for="(elem, index) in restaurant_items" :key="index" class="col-3 mb-3 flip">
                    <router-link :to="{ name: 'restaurant', params: { slug: elem.slug } }"
                        class="sb-menu-item sb-mb-30 text-decoration-none d-flex flex-column" >
                        <div class="card">
                            <img class="card-img img-rest" width="100%" height="270"
                                :src="`http://127.0.0.1:8000/storage/${elem.cover_image}`" :alt="index">
                            <div
                                class="card-img-overlay text-white text-center d-flex flex-column justify-content-center align-items-center">
                                <h2>{{ elem.name }}</h2>
                                <h6 class="rounded-pill bg-dark p-1">&euro;{{ elem.price }}</h6>
                            </div>
                        </div>
                        <div class="btn btn-warning d-flex flex-column" @click="addToCart(elem)">Add to cart
                        </div>
                    </router-link>
                </div>
            </div>
            <div id="custom-popup">
                <div class="popup-content p-4">
                    <span class="close-btn btn btn-danger" @click="closePopup()">&times;</span>
                    <p class="mt-5 fs-5">You can add items to your cart only from a single restaurant!</p>
                </div>
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
router-link {
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    img {
        filter: brightness(70%);
    }
}

.card {
    overflow: hidden;

    img {
        filter: brightness(70%);
        object-fit: cover;
        transition: transform 1.5s;
    }

    &:hover {
        img {
            transform: scale(1.1);
        }
    }
}


.btn-warning {
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        scale: 102%;
    }
}

.box-1 {
    img {
        border-radius: 12px;
        width: 100%;
    }
}

#custom-popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.close-btn {
    padding: 3px 6px;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 18px;
    cursor: pointer;
}
</style>