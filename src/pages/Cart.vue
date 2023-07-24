<script>
export default {
    name: 'Cart',
    data() {
        return {
            cartItems: [],
            restaurantId: null,
        }
    },
    created() {
    // Recupera i dati del carrello dal LocalStorage quando il componente è creato
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  }
}
</script>

<template>
   <div>
    <h2>Carrello</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - Quantità: {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>