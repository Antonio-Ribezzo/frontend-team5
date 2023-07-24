<script>
import { store } from '../store';

export default {
    name: 'Cart',
    data() {
        return {
            cartItems: [],
            store,
        }
    },
    created() {
    // Recupera i dati del carrello dal LocalStorage quando il componente è creato
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    },
    mounted(){
      
    },
    methods:{
      deleteFromCart(item){
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

        if (cartItemIndex !== -1) {
          if (cartItems[cartItemIndex].quantity > 1) {
            // Rimuovi una quantità se è maggiore di 1
            cartItems[cartItemIndex].quantity--;
          } else {
            // Rimuovi completamente l'elemento se la quantità è 1
            cartItems.splice(cartItemIndex, 1);
          }
        
          // Salva i dati aggiornati nel localStorage
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
          // Aggiorna la visualizzazione del carrello (se necessario)
          // Puoi aggiungere qui la logica per aggiornare l'interfaccia utente del carrello

          location.reload(); // Ricarica la pagina per aggiornare il componente
        }
      }
    }
  }
</script>

<template>
   <div>
    <h2>Carrello</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - Quantity: {{ item.quantity }} - Price: €{{ item.quantity === 1 ? item.price : item.quantity * item.price }}
        <i @click="deleteFromCart(item)" class="fa-solid fa-trash"></i>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>