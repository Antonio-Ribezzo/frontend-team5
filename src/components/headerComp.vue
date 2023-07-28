<script>

import { RouterLink } from 'vue-router';
import { store } from '../store';
import axios from 'axios';

export default {
    name: "headerComp",
    components: { RouterLink },
    data() {
        return {
            store,
            cartItems: [],
            restaurant: [],
            restaurant_items: [],
        }
    },
    computed: {
        cartItemCount() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            this.store.CartCounter = totalItems
            return this.store.CartCounter;
        }
    },
    created() {
        // Recupera i dati del carrello dal LocalStorage quando il componente è creato
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log(this.cartItems);
    },

}
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg sb-top-bar-frame py-4">
            <div class="container d-flex justify-content-between sb-top-bar">

                <router-link :to="{ name: 'AppHome' }">
                    <img src="/img/deliveboo-low-resolution-logo-color-on-transparent-background.png" alt="logo-img"
                        class="navbar-brand me-auto sb-logo-frame" href="#" width="200">
                </router-link>

                <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="true"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse py-3" id="navbarTogglerDemo01">
                    <ul class="navbar-nav ms-auto sb-navigation">
                        <li class="nav-item">
                            <router-link :to="{ name: 'AppHome' }"
                                class="nav-link sb-menu-item sb-mb-30 text-decoration-none">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://127.0.0.1:8000/register" target="_blank">Register your
                                Restaurant</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://127.0.0.1:8000/login" target="_blank">Login</a>
                        </li>
                    </ul>
                </div>

                <div class="ms-3">
                    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                        <i class="fa-solid fa-cart-shopping position-relative">
                            <span class="sb-cart-number">
                                {{ cartItemCount }}
                            </span>
                        </i>
                    </button>
                    <!-- <router-link :to="{ name: 'cart'}" class="nav-link">
                        <i class="fa-solid fa-cart-shopping position-relative"> 
                            <span class="sb-cart-number">
                              {{ cartItemCount }}
                            </span>
                        </i>
                    </router-link> -->
                </div>


                <!-- <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> -->

            </div>
        </nav>
        <div class="offcanvas up offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Cart Preview</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body bg-board d-flex flex-column justify-content-between">
                <ul>
                    <li class="text-decoration-none mr-4 my-3" v-for="item in cartItems" :key="item.id">
                        <div class="row d-flex">
                            <div class="col-3">
                                <img :src="`http://127.0.0.1:8000/storage/${item.cover_image}`" alt="cover-image"
                                    class="w-100">
                            </div>
                            <div class="col-3 bg-warning align-items-center">
                                <h6 class="text-black mb-0">{{ item.name }}</h6>
                            </div>
                            <div class="col-3 bg-warning align-items-center">
                                <span class="text-center text-black">Quantity: {{ item.quantity }} pz.</span>
                            </div>
                            <div class="col-3 bg-warning align-items-center">
                                <h6 class="mb-0 text-black">€{{ item.quantity === 1 ? item.price : (item.quantity *
                                    item.price).toFixed(2) }}</h6>
                            </div>

                        </div>

                    </li>
                </ul>

                <div>
                    <button class="btn btn-warning">
                        <router-link :to="{ name: 'cart' }" class="nav-link">
                            Checkout & Payment
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
nav {
    width: 100%;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

li {
    list-style-type: none;
}

.sb-top-bar-frame {
    width: 100%;
    position: sticky;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: solid 1px #F2F3F5;
    border-top: solid 1px #F2F3F5;
}

.sb-top-bar-frame .sb-top-bar-bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.sb-top-bar-frame .sb-top-bar {
    padding: 0 15px;
    position: relative;
    // height: 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease-in-out;
}

.sb-top-bar-frame .sb-top-bar .sb-logo-frame {
    display: flex;
    align-items: center;
    height: 60px;
    width: 200px;
    transition: 0.3s ease-in-out;
}

.sb-top-bar-frame .sb-top-bar .sb-right-side {
    display: flex;
    justify-content: flex-end;
}

.sb-menu-transition {
    opacity: 1;
    transition: 0.1s ease-in-out;
}

i {
    background-color: #F2F3F5;
    transform: scale(0.95);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
    margin: 0;
    width: 55px;
    height: 55px;

}

.translate {
    transform: translate(-80%, -0%) !important;
}

.sb-cart-number {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 20px;
    background-color: #F5C332;
    border-radius: 15px;
    height: 20px;
    padding: 0 6px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

nav .sb-navigation li a {
    position: relative;
    padding: 0 30px;
    display: inline-block;
    font-weight: 400;
    height: 100%;
    color: #231E41;
    font-size: 17px;
    transition: 0.3s ease-in-out;
}

.up {
    z-index: 9999;
}

.bg-board {
    background-image: url('https://th.bing.com/th/id/OIP.zpn9HcSt2rbo1PWTfinBwgAAAA?pid=ImgDet&rs=1');
}
</style>