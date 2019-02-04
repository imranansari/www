<template>
  <div>

    <section id="main-section">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <h1 class="display-3 font-weight-regular">
              The global cloud platform for developers & teams
            </h1>
            <br />
            <v-btn to="/register" large color="primary">
              Get started for Free
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-container class="pt-5 pb-5 text-xs-center text-md-left">

      <v-hover>
        <v-card
        class="mb-5"
        id="product-pahser"
        slot-scope="{ hover }" :class="`elevation-${hover ? 6 : 1}`"
        >
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md5 order-xs2>
                <h2 class="display-1 font-weight-regular">
                  Phaser
                </h2>
                <br/>
                <p class="body-2">
                  Cloud security scanner: automatically identify security issues on your website
                  and in your infrastructure
                </p>
                <v-btn to="/register" color="primary">
                  Try it Free
                </v-btn>
                </v-flex>

                <v-flex xs12 md5 offset-md2 order-md2>
        <img alt="product phaser" class="img-fluid" src="/imgs/landings/bloom/product_phaser.png">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-hover>

      <section class="text-xs-center">
        <h1 class="display-2 font-weight-regular">
          Get started with Bloom Platform for free
        </h1>
        <br />
        <v-btn to="/register" large color="primary">
          Go to Bloom Platform
        </v-btn>
      </section>

    </v-container>

    <blm-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Landing extends Vue {
  // props
  // data
  // computed
  // lifecycle
  // watch
  // methods
}
</script>

<style scoped lang="scss">
.v-card {
  border-radius: 8px;
}

#product-pahser {
  background: right center no-repeat url(/imgs/landings/bloom/corner_purple.svg);
  background-color: #fff;
}
#main-section {
  /* background: url(/imgs/landings/bloom/alt_wide_2.svg) no-repeat center fixed; */
  background: url(/imgs/landings/bloom/alt_wide_2.svg) no-repeat center;
  -webkit-background-size: cover; /* pour Chrome et Safari */
  -moz-background-size: cover; /* pour Firefox */
  -o-background-size: cover; /* pour Opera */
  background-size: cover; /* version standardisée */
  height: calc(100vh - 64px);
  padding-top: 15vh;
}

#card-customers {
  margin-top: 75px;
}

@media (max-width: 960px) {
  #product-pahser {
    background: none;
    background-color: #e8e9fa;
  }

  #main-section {
    height: calc(100vh - 56px);
    padding-top: 1vh;
  }
}
</style>
