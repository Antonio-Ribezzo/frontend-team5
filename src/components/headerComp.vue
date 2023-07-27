<script>

import { RouterLink } from 'vue-router';
import { store } from '../store';

    export default {
    name: "headerComp",
    components: { RouterLink },
    data() {
        return {
            store,
        }
    },
    computed: {
        cartItemCount() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            this.store.CartCounter = totalItems
            return this.store.CartCounter;
        }
    }
}
</script>

<template>

    <div>
        <nav class="navbar navbar-expand-lg sb-top-bar-frame">
            <div class="container d-flex justify-content-between sb-top-bar">
                <router-link :to="{ name: 'AppHome'}">
                    <img src="/img/deliveboo-low-resolution-logo-color-on-transparent-background.png" alt="" class="navbar-brand me-auto sb-logo-frame" href="#" width="200">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-flex flex-column flex-lg-row sb-right-side">
                    <div class="collapse navbar-collapse mx-auto sb-menu-transition" id="sb-dynamic-menu">
                        <ul class="navbar-nav ms-auto sb-navigation">
                            <li class="nav-item">
                                <router-link :to="{ name: 'AppHome'}" class="nav-link sb-menu-item sb-mb-30 text-decoration-none">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/register" target="_blank">Register your Restaurant</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/login" target="_blank">Login</a>
                            </li>
                        </ul>
                    </div>

                    <div class="ms-lg-3 align-self-center ms-3">
                        <router-link :to="{ name: 'cart'}" class="nav-link">
                            <i class="fa-solid fa-cart-shopping position-relative"> 
                                <span class="sb-cart-number">
                                  {{ cartItemCount }}
                                </span>
                            </i>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
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
    height: 120px;
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

i{
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

.translate{
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




</style>