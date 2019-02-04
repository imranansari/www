<template>
  <div>
  <v-container class="mt-4 text-xs-center">
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center mb-3">
        <h1 class="display-1 font-weight-medium">
          Values
        </h1>
      </v-flex>

      <v-flex xs12 sm10 md8 class="text-xs-center mb-5">
        <v-card class="elevation-0">
          <v-card-text>
            <p class="font-18 font-weight-regular">
              Bloom believes in a world where everyone can contribute. Our mission is to change all
              creative work from read-only to read-write. When everyone can contribute, consumers
              become contributors and we greatly increase the rate of human progress.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 class="text-xs-center mb-5">
        <h1 class="display-1 font-weight-medium">
          Core team
        </h1>
      </v-flex>

      <v-flex xs12 sm3 class="text-xs-center">
        <v-hover>
          <a slot-scope="{ hover }" href="https://kerkour.com" target="_blank" rel="noopener">
            <v-avatar size="100px" color="grey lighten-4">
              <img src="/imgs/about/sylvain.jpg" alt="Sylvain Kerkour"
              :class="`elevation-${hover ? hover_elevation : 0}`">
            </v-avatar>
            <h3 class="mt-3">
              Sylvain Kerkour
            </h3>
            <p>Product design</p>
          </a>
        </v-hover>
      </v-flex>

      <v-flex xs12 sm3 class="text-xs-center mb-5">
        <v-hover>
        <a slot-scope="{ hover }" href="https://www.linkedin.com/in/marina-da-silva-b289b4159"
        target="_blank" rel="noopener">
          <v-avatar size="100px" color="grey lighten-4">
            <img src="/imgs/about/marina.jpg" alt="Marina Da Silva"
            :class="`elevation-${hover ? hover_elevation : 0}`">
          </v-avatar>
          <h3 class="mt-3">
            Marina Da Silva
          </h3>
          <p>Graphic design</p>
        </a>
      </v-hover>
      </v-flex>

      <v-flex xs12 class="text-xs-center mb-5">
        <h1 class="display-1 font-weight-medium">
          Contributors
        </h1>
      </v-flex>

      <v-flex xs12 class="text-xs-center mb-5">
        <blm-contributors />
      </v-flex>

      <v-flex xs12 class="mt5">
        <a href="https://www.thefamily.co/" target="_blank" rel="noopener">
          <img alt="image" src="/imgs/about/thefamily.png" height="80">
        </a>
        <h4 class="diasply-4">TheFamily fellowship member.</h4>
        <p>We are part of the most active European startup fellowship.</p>
      </v-flex>
    </v-layout>
  </v-container>

  <blm-footer />
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Index extends Vue {
  // props
  // data
  hover_elevation = 4;
  // computed
  // lifecycle
  // watch
  // methods
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.font-18 {
  font-size: 18px;
}
</style>
