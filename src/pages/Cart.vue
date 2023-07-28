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
      detailsItems: [],
      nameSurname: "",
      mobileNumber: "",
      address: "",
      email: "",
      notes: "",
      card_holder: "",
      card_number: "",
      expiration: "",
      cvv: "",
      paymentSuccess: false,
      loadingShow:false,
      paymentFinished:false,
      store,
      baseUrl: "http://127.0.0.1:8000/",
      success:false
    }
  },
  created() {
    // Recupera i dati del carrello dal LocalStorage quando il componente è creato
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(this.cartItems);
  },
  mounted() {


  },
  methods: {
    deleteFromCart(item) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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
        // Emetti l'evento personalizzato 'cart-item-deleted' con l'oggetto item rimosso come payload
        this.$emit('cart-item-deleted', item);
      }
    },
    addFromCart(item) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (cartItemIndex !== -1) {
        if (cartItems[cartItemIndex].quantity >= 1) {
          cartItems[cartItemIndex].quantity++;
          this.store.CartCounter++;
        }

        // Salva i dati aggiornati nel localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        this.cartItems = cartItems;
        // Emetti l'evento personalizzato 'cart-item-deleted' con l'oggetto item rimosso come payload
        this.$emit('cart-item-deleted', item);
      }
    },
    deleteAll(item) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (cartItemIndex !== -1) {

        cartItems.splice(cartItemIndex, 1);
        this.store.CartCounter -= item.quantity;

        // Salva i dati aggiornati nel localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Aggiorna la visualizzazione del carrello (se necessario)
        // Puoi aggiungere qui la logica per aggiornare l'interfaccia utente del carrello

        this.cartItems = cartItems;
        // Emetti l'evento personalizzato 'cart-item-deleted' con l'oggetto item rimosso come payload
        this.$emit('cart-item-deleted', item);
      }
    },
    calculateTotalPrice() {
      let total = 0;
      for (const item of this.cartItems) {
        total += item.quantity * item.price;
      }
      return total;
    },
    clearCart() {
      localStorage.clear();
    },

    sendForm(){
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      const cartItemsArray = Object.values(cartItems);

      const RestaurantIds = cartItemsArray.map(item => item.restaurant_id);

      const RestaurantId = RestaurantIds[0];
      
      console.log(RestaurantId,'restaurantid')

      const data = {
        order: cartItems,
        restaurant_id: RestaurantId,
        customer_name:this.nameSurname,
        customer_address:this.address,
        mobile_number:this.mobileNumber,
        customer_mail:this.email,
        customer_notes:this.notes
      }

      axios.post(`${this.baseUrl}api/payment`, data).then(res => {
        this.success = res.data.success

        if(this.success){
          this.nameSurname = '';
          this.address = '';
          this.mobileNumber = '';
          this.email = '';
          this.notes = '';
          this.card_holder = '';
          this.card_number = '';
          this.expiration = '';

          
          setTimeout(() => {
            this.paymentSuccess = true;
            this.loadingShow = true;

            setTimeout(() => {
              this.loadingShow = false;
              this.paymentFinished = true;

              setTimeout(() => {
                // Svuota il localStorage dopo il completamento del pagamento
              localStorage.removeItem('cartItems');
              
              //Imposto il counter del carrello a 0
              this.store.CartCounter = 0;
                          
              // Utilizza il router per navigare a 'AppHome'
              this.$router.push({ name: 'AppHome' });
            }, 1500);       
 
          }, 2000); // Aggiunto un ritardo di 2000 millisecondi (2 secondi) prima del secondo setTimeout
          
        }, 2000);
        }
        
      })
    }
  }
}
</script>



<template>
  <section class="h-100 h-custom modal-open" style="background-color: #f5c332;">
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
                          <div class="transform rounded-3 mb-3 mb-md-0">
                            <img :src="`http://127.0.0.1:8000/storage/${item.cover_image}`" alt="cover-image"
                              class="w-100 rounded-3 ">
                          </div>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                          <h6 class="text-black text-center mt-2 mt-md-0 mb-3 mb-md-0">{{ item.name }}</h6>
                        </div>


                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex flex-column justify-content-center align-items-center">

                          <h6>Quantity: </h6>

                          <div class="d-flex justify-content-center align-items-center">
                            <button class="btn btn-link button-minus px-2" @click="deleteFromCart(item)">
                              <i class="fas fa-minus"></i>
                            </button>

                            <div>
                              <span class="text-center">{{ item.quantity }}</span>
                            </div>

                            <button class="btn btn-link button-plus px-2" @click="addFromCart(item)">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>

                        </div>
                        <div class="text-center mt-2 mt-md-0 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0">€{{ item.quantity === 1 ? item.price : (item.quantity *
                            item.price).toFixed(2) }}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-center delete mt-2 mt-md-0">
                          <i @click="deleteAll(item)" class="fa-solid fa-trash"></i>
                        </div>
                      </div>
                      <hr class="border border-2 border-dark">
                    </div>


                    <div class="pt-5">
                      <h6 class="mb-0"><router-link :to="{ name: 'AppHome' }" class="text-body"><i
                            class="fas fa-long-arrow-alt-left me-2"></i>Back
                          to shop</router-link></h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <div class="card bc-bacground-summary text-white rounded-3">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                          <h5 class="mb-0">Payment</h5>
                        </div>
                        
                        <!-- form  -->
                        <form class="mt-4" @submit.prevent="sendForm()">
                          <div class="form-group mb-3">
                            <label class="form-label">Name and Surname</label>
                            <input type="text" class="form-control" name="name_surname" v-model="nameSurname">
                          </div>

                          <div class="form-group mb-3">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-control" name="customer_address" v-model="address">
                          </div>

                          <div class="form-group mb-3">
                            <label class="form-label">Mobile number</label>
                            <input type="text" id="Vat" required class="form-control" name="mobile_number"
                              v-model="mobileNumber">
                          </div>

                          <div class="form-group mb-3">
                            <label class="form-label">Email</label>
                            <input id="email" type="email" class="form-control" name="customer_mail" autocomplete=" email"
                              autofocus v-model="email">
                          </div>

                          <div class="form-group mb-5">
                            <label class="form-label">Note</label>
                            <textarea required class="form-control" cols="30" rows="10"
                              v-model="notes"></textarea>
                          </div>
                              <div class="form-outline form-white mb-4">
                                <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                                  placeholder="Cardholder's Name" v-model="card_holder" />
                                <label class="form-label" for="typeName">Cardholder's Name</label>
                              </div>

                              <div class="form-outline form-white mb-4">
                                <input type="text" id="typeText1" class="form-control form-control-lg" siez="17"
                                  placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" v-model="card_number"/>
                                <label class="form-label" for="typeText1">Card Number</label>
                              </div>

                              <div class="row mb-4">
                                <div class="col-md-6">
                                  <div class="form-outline form-white">
                                    <input type="text" id="typeExp" class="form-control form-control-lg"
                                      placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" v-model="expiration"/>
                                    <label class="form-label" for="typeExp">Expiration</label>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-outline form-white">
                                    <input type="password" id="typeText2" class="form-control form-control-lg"
                                      placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" v-model="cvv"/>
                                    <label class="form-label" for="typeText2">Cvv</label>
                                  </div>
                                </div>
                              </div>

                              <hr class="my-4">

                              <div class="d-flex justify-content-between mb-4">
                                <p class="mb-2">Total(Incl. taxes)</p>
                                <p class="mb-2">€{{ calculateTotalPrice().toFixed(2) }}</p>
                              </div>


                              <button id="myBtn" type="submit" class="btn button-checkout btn-block btn-lg">
                                
                                <div v-if="loadingShow == true" class="spinner-border text-secondary d-flex justify-content-center" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                </div>

                                <div v-if="paymentSuccess == false" class="d-flex justify-content-between">
                                  <span>€{{ calculateTotalPrice().toFixed(2) }}</span>
                                  <span class="ms-3">Pay<i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                                </div>

                                <div v-if="paymentFinished == true" class="d-flex justify-content-between">
                                    <span>Pagamento effettuato <i class="fa-solid fa-circle-check" style="color: #00ff55;"></i></span>
                                </div>

                              </button>                              
                        </form>
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

.fa-trash {
  cursor: pointer;
}

.delete {
  transition: transform 0.5s;

}

.delete:hover {
  color: rgb(183, 14, 14);
  transform: scale(1.1);
}

.button-plus {
  transition: transform 0.5s;
}

.button-plus:hover {
  transform: scale(1.2);
}

.button-minus {
  transition: transform 0.5s;

}

.button-minus:hover {
  transform: scale(1.2);
}


</style>
