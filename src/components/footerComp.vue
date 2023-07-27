<script>
    export default {
        name: 'FooterComp',
        data(){
            return{
                arrayFooterItems:[
                    'Customer Service',
                    'Investor Relations',
                    'Legal Notes',
                    'Help Center',
                    'Job Opportunities',
                    'Cookie Preferences',
                    'Gift Cards',
                    'Terms of Use',
                    'About Us',
                    'Media Center',
                    'Privacy',
                    'Contact Us'
                ]
            }
        }
    }
</script>


<template>
    <footer class="py-5">
        <div class="container">
            <div class="text-white mb-4">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <!-- nav footer -->
            <div id="navFooter" class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <a href=""><span class="d-block" v-for="n in 3">{{ arrayFooterItems[n-1] }}</span></a>
                </div>
                <div>
                    <a href=""><span class="d-block" v-for="n in 3">{{ arrayFooterItems[n+2] }}</span></a>
                </div>
                <div>
                    <a href=""><span class="d-block" v-for="n in 3">{{ arrayFooterItems[n+5] }}</span></a>
                </div>
                <div>
                    <a href=""><span class="d-block" v-for="n in 3">{{ arrayFooterItems[n+8] }}</span></a>
                </div>
            </div>
            <!-- button footer -->
            <button type="button" class="btn btn-outline-secondary">Service Code</button>
            <!-- copyright -->
            <span class="d-block mt-3">&copy; 1997-2023 Deliveboo, Food Delivery</span>
        </div>


    </footer>
</template>


<style lang="scss" scoped>
    @use '../style/main.scss';

    footer{
        // height: 10rem;
        background-color: #0d1525;
        .container{
            div{
                a{
                    text-decoration: none;
                    color:white;
                    i{
                        font-size: 1.5rem;
                        margin: 0 1.5rem 0 0;
                    }
                }
            }
            #navFooter{
                div{
                    a{
                        span{
                            margin-bottom: 1rem;
                            font-size: 0.8rem;
                            color: rgb(116, 113, 113);
                            &:hover{
                                color: white;
                            }
                        }
                    }
                }
            }
            span{
                font-size: 0.8rem;
                color: rgb(116, 113, 113);
            }
        }

    }

</style>