<template>
  <v-container v-if="$store.state.session">
    <v-layout row>
      <v-flex xs12>
        <v-card class="elevation-0">
          <v-container
          fluid
          grid-list-md
          >
          <v-layout row wrap justify-left>
            <v-flex
            v-for="card in cards"
            xs4
            sm3
            lg2
            :key="card.title"
            >
            <v-tooltip bottom>
              <router-link :to="card.to" slot="activator">
                  <v-img
                  :src="card.src"
                  height="150px"
                  contain
                  class="app-icon"
                  >
                </v-img>

                  <p class="headline text-xs-center app-name mt-3">{{ card.name }}</p>
            </router-link>
            <span>{{ card.tooltip }}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</v-flex>
</v-layout>
</v-container>
  <blm-landing-bloom v-else />
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private cards = [
    {
      name: 'Platform',
      src: '/imgs/logos/platform.svg',
      to: '/platform',
      tooltip: 'Global cloud services for developers',
    },
    {
      name: 'Drive',
      src: '/imgs/logos/drive_256.png',
      to: '/drive',
      tooltip: 'Store your files securely in the cloud and access them everywhere',
    },
    {
      name: 'Notes',
      src: '/imgs/logos/notes.svg',
      to: '/notes',
      tooltip: 'Quickly capture what\'s on your mind',
    },
    {
      name: 'Bitflow',
      src: '/imgs/logos/bitflow_256.png',
      to: '/bitflow',
      tooltip: 'Download manager in the cloud',
    },
    {
      name: 'Calendar',
      src: '/imgs/logos/calendar_256.png',
      to: '/calendar',
      tooltip: 'Get organized on the go with the Bloom Calendar',
    },
    {
      name: 'Contacts',
      src: '/imgs/logos/contacts_256.png',
      to: '/contacts',
      tooltip: 'Keep your contacts organized and up to date',
    },
    {
      name: 'Account',
      src: '/imgs/logos/account_256.png',
      to: '/account',
      tooltip: 'Manage and secure your Bloom account',
    },
  ];
}
</script>


<style scoped lang="scss">
.v-card {
  border-radius: 8px;
}

.v-card__actions p {
  width: 100%;
}

a {
  text-decoration: none;
}

.app-icon {
  border-radius: 28px;
}

.app-name {
  color: #787878;
}
</style>
