<template>
  <div>

  <section id="main-section">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          <h1 class="display-3 font-weight-regular">
            Quickly capture what’s on your mind
          </h1>
          <br />
          <v-btn to="/register" large color="blue" dark>
          Get started for Free
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </section>

  <v-container class="pt-5 pb-5">

    <section class="text-xs-center pt-5 pb-5">
      <v-layout row wrap align-center>
        <v-flex xs12 sm6 class="pt-2 pb-2">
           <v-img src="/imgs/landings/drive/devices.png" height="35vh" contain />
        </v-flex>
        <v-flex xs12 sm6 class="pt-2 pb-2">
          <h1 class="display-2 font-weight-regular">
            Feel organized without the effort
          </h1>
          <br />
          <p class="body-2">
            Bloom Notes helps you capture and prioritize ideas, projects, and to-do lists,
            so nothing falls through the cracks.
          </p>
        </v-flex>
      </v-layout>
    </section>


  <section class="text-xs-center">
    <h1 class="display-3 font-weight-regular">
      Get started with Notes for free
    </h1>
    <br />
    <v-btn to="/register" large color="blue" dark>
      Go to Notes
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

@media (max-width: 960px) {
  #main-section {
    height: calc(100vh - 56px);
    padding-top: 5vh;
  }
}
</style>
