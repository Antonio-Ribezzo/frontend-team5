<script>
export default {
    props:{
        authorization: {
            required: true,
            type: String
        }
    },
    name: 'paymentComp',
    data () {


        return {}
    },
    methods: {
        onSuccess(payload) {
            let nonce = payload.nonce;
            // Do something great with the nonce...
        },
        onError(error) {
            let message = error.message;
            // Whoops, an error has occured while trying to get the nonce
        }
    }
}
</script>


<template>
    <div>
        <v-braintree 
        :authorization="authorization"
        @success="onSuccess"
        @error="onError">
    </v-braintree>
    </div>
</template>


<style lang="scss" scoped>

</style>
