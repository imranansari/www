<template>
  <div>
  <v-container class="mt-4 text-xs-center">
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center mb-3">
        <h1 class="display-1 font-weight-medium">
          Thank you!
        </h1>
      </v-flex>

      <v-flex xs12 sm10 md8 class="text-xs-center mb-5">
        <v-card class="elevation-0">
          <v-card-text>
            <p class="font-18 font-weight-regular">
              You'll receive an email when public beta is available.
            </p>
            <v-btn to="/" large color="blue" dark>
              Back
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>

</div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class Index extends Vue {
  // props
  // data
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
