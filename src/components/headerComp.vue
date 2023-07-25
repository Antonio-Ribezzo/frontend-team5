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
}
</script>

<template>

    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container d-flex justify-content-between">
                <img src="/img/deliveboo-low-resolution-logo-color-on-transparent-background.png" alt="" class="navbar-brand me-auto" href="#" width="200">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-flex flex-column flex-lg-row">
                    <div class="collapse navbar-collapse mx-auto" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <router-link :to="{ name: 'AppHome'}" class="nav-link sb-menu-item sb-mb-30 text-decoration-none">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/register">Register your Restaurant</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/login">Login</a>
                            </li>
                        </ul>
                    </div>

                    <div class="ms-lg-3 align-self-center ms-3">
                        <router-link :to="{ name: 'cart'}" class="nav-link">
                            <i class="fa-solid fa-cart-shopping position-relative" style="width: 30px;"> 
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                  {{ this.store.CartCounter }}
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
    position: fixed;
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
    height: 80px;
    width: 130px;
    transition: 0.3s ease-in-out;
}

.sb-top-bar-frame .sb-top-bar .sb-right-side {
    width: 71%;
    display: flex;
    justify-content: flex-end;
}

.sb-menu-transition {
    opacity: 1;
    transition: 0.1s ease-in-out;
}



</style>