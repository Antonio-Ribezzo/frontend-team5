<script>
import { store } from '../store';
import paymentComp from '../components/paymentComp.vue';
import axios from 'axios';


export default {
  components: {
    paymentComp
  },
  name: 'Cart',
  data() {
    return {
      cartItems: [],
      restaurant: [],
      restaurant_items: [],
      tokenApi: "",
      store,
      baseUrl: "http://127.0.0.1:8000/"
    }
  },
  created() {
    // Recupera i dati del carrello dal LocalStorage quando il componente è creato
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
    console.log(this.cartItems);
  },
  async mounted() {
    let response = await axios.get(`${ this.baseUrl }api/orders/generate`);
    this.tokenApi = response.data.token
    console.log(this.tokenApi)
  },
  methods: {
    deleteFromCart(item) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'))||[];
      const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (cartItemIndex !== -1) {
        if (cartItems[cartItemIndex].quantity > 1) {
          // Rimuovi una quantità se è maggiore di 1
          cartItems[cartItemIndex].quantity--;
          this.store.CartCounter--;
        } else {
          // Rimuovi completamente l'elemento se la quantità è 1
          cartItems.splice(cartItemIndex, 1);
          this.store.CartCounter--;
        }

        // Salva i dati aggiornati nel localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Aggiorna la visualizzazione del carrello (se necessario)
        // Puoi aggiungere qui la logica per aggiornare l'interfaccia utente del carrello

        this.cartItems = cartItems;
      }
    },
    calculateTotalPrice() {
      let total = 0;
      for (const item of this.cartItems) {
        total += item.quantity * item.price;
      }
      return total;
    }
  }
}
</script>


<template>
  <section class="h-100 h-custom" style="background-color: #f5c332;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black"> Cart</h1>
                    </div>
                    <hr class="border border-2 border-dark">

                    <div v-for="item in cartItems" :key="item.id">

                      <div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                          <div class="transform rounded-3">
                            <img :src="`http://127.0.0.1:8000/storage/${item.cover_image}`" :alt="index"
                              class="w-100 rounded-3 ">
                          </div>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                          <h6 class="text-muted">Shirt</h6>
                          <h6 class="text-black mb-0">{{ item.name }}</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">

                          <div>
                            Quantity: {{ item.quantity }}
                          </div>


                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0">€{{ item.quantity === 1 ? item.price : item.quantity *
                            item.price }}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                          <i @click="deleteFromCart(item)" class="fa-solid fa-trash"></i>
                        </div>
                      </div>
                      <hr class="border border-2 border-dark">
                    </div>


                    <div class="pt-5">
                      <h6 class="mb-0"><a href="#!" class="text-body"><i class="fas fa-long-arrow-alt-left me-2"></i>Back
                          to shop</a></h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>

                    <div class="card bc-bacground-summary text-white rounded-3">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                          <h5 class="mb-0">Card details</h5>
                        </div>

                        <p class="small mb-2">Card type</p>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-visa fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-amex fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                        <form class="mt-4">


                          <div class="form-group mb-3">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-control" name="customer_address">
                          </div>

                          <div class="form-group mb-3">
                            <label class="form-label">Mobile number</label>
                            <input type="text" id="Vat" required class="form-control" name="mobile_number">
                          </div>

                          <div class="form-group mb-3">
                            <label class="form-label">Email</label>
                            <input id="email" type="email" class="form-control" name="customer_mail" value=""
                              autocomplete=" email" autofocus>
                          </div>

                          <div class="form-group">
                            <label class="form-label">Note</label>
                            <textarea name="" id="" required class="form-control" cols="30" rows="10"></textarea>
                          </div>


                          <!-- <paymentComp :authorization="tokenApi" /> -->


                          <div class="form-outline form-white mb-4 mt-3">
                            <label class="form-label" for="typeName">Cardholder's Name</label>
                            <input id="typeName" class="form-control form-control-lg" siez="17"
                              placeholder="Cardholder's Name" />
                          </div>

                          <div class="form-outline form-white mb-4">
                            <label class="form-label" for="typeText">Card Number</label>
                            <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                              placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                          </div>

                          <div class="row mb-4">
                            <div class="col-md-6">
                              <div class="form-outline form-white">
                                <input type="text" class="form-control form-control-lg" placeholder="MM/YYYY" size="7"
                                  id="exp" minlength="7" maxlength="7" />
                                <label class="form-label" for="typeExp">Expiration</label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-outline form-white">
                                <input type="password" id="typeText" class="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                <label class="form-label" for="typeText">Cvv</label>
                              </div>
                            </div>
                          </div>

                        </form>

                        <hr class="my-4">

                        <div class="d-flex justify-content-between mb-4">
                          <p class="mb-2">Total(Incl. taxes)</p>
                          <p class="mb-2">€{{ calculateTotalPrice().toFixed(2) }}</p>
                        </div>

                        <button type="button" class="btn button-checkout btn-block btn-lg">
                          <div class="d-flex justify-content-between">
                            <span>€{{ calculateTotalPrice().toFixed(2) }}</span>
                            <span class="ms-3">Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                          </div>
                        </button>

                      </div>
                    </div>




                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bc-bacground-summary {
  background-color: #111227;
}

.button-checkout {
  background-color: #f5c332;
}

.transform {
  transition: transform 0.5s;
  box-shadow: 2px 2px 5px black;
}

.transform:hover {
  transform: scale(1.1);
}
</style>