<template>
  <v-footer
  color="white"
      height="auto"
      class="text-xs-left"
    >
    <v-container>
      <v-layout row wrap class="text-xs-center text-sm-left">
        <v-flex xs12 sm4 class="pa-4">
          <h5 class="title pb-3">Company</h5>
          <ul>
            <li><router-link class="nav-link" to="/about">About</router-link></li>
            <li><router-link class="nav-link" to="/contact">Contact</router-link></li>
            <li><router-link class="nav-link" to="/security">Security</router-link></li>
            <li><a class="nav-link" href="https://help.bloom.sh/en-us/article/terms-1nnl89s">Terms</a></li>
          </ul>
        </v-flex>
        <v-flex xs12 sm4 class="pa-4">
          <h5 class="title pb-3">Support</h5>
          <ul>
            <li><a class="nav-link" href="https://help.bloom.sh">Help & Support</a></li>
            <li><a class="nav-link" href="https://help.bloom.sh">Documentation</a></li>
            <li><a class="nav-link" href="https://status.bloom.sh" target="_blank" rel="noopener">System Status</a></li>
          </ul>
        </v-flex>
        <v-flex xs12 sm4 class="pa-4">
          <h5 class="title pb-3">Community</h5>
          <ul>
            <li><a class="nav-link" href="https://opensource.bloom.sh" target="_blank" rel="noopener">Open Source</a></li>
            <li><a class="nav-link" href="https://discord.gg/HmDQDGv" target="_blank" rel="noopener">Chat</a></li>
            <li><a class="nav-link" href="https://github.com/bloom42" target="_blank" rel="noopener">GitHub</a></li>
            <li><a class="nav-link" href="https://twitter.com/bloom_cloud" target="_blank" rel="noopener">Twitter</a></li>
          </ul>
        </v-flex>

        <v-flex xs12>
          <p class="text-xs-center">
            <span><a href="mailto:hello@bloom.sh">hello@bloom.sh</a></span><br/><br/>
            <span>&copy; 2018 - {{ new Date().getFullYear() }} Bloom</span>
          </p>
        </v-flex>

      </v-layout>
    </v-container>

    </v-footer>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Footer extends Vue {
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
  color: black;
}

ul li {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
}

ol, ul {
  padding-left: 0px;
}
</style>
