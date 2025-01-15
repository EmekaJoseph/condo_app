<template>
    <!-- https://mdbootstrap.com/docs/standard/navigation/footer/ -->
    <footer class="bg-dark text-center text-light text-lg-start">
        <!-- Grid container -->
        <div class="container text-light p-lg-5 pt-5">
            <!--Grid row-->
            <div class="row">
                <!--Grid column-->
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">condonote.</h5>

                    <div>
                        Share cherished memories and create a heartfelt tribute to honor the life of your loved ones who have passed.
                        <div class="fst-italic">
                            Build a beautiful, lasting memorial page—completely free of charge.
                        </div>
                    </div>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Built with love ❤️</h5>

                    <div>
                        Crafted with compassion and love for humanity, this online condolence register is a labor of
                        love aimed at offering comfort and connection in times of loss. Your support, in any form, is
                        deeply appreciated. Your feedback and input mean the world to us and can help make this platform
                        even more meaningful for those who use it.
                        <br>

                        <a class=" text-success text-decoration-none mt-5" href="https://wa.me/08139590011"> <i
                                class="bi bi-whatsapp"></i> Send a message</a>
                        </div>
                </div>
                <!--Grid column-->
            </div>
            <!--Grid row-->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.119);">
            <i class="bi bi-c-circle"></i> {{ new Date().getFullYear() }} Copyright:
            <router-link class="text-warning text-decoration-none fs-5" to="/">condonote</router-link>
        </div>
        <!-- Copyright -->
    </footer>
</template>
