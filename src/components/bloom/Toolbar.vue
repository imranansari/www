<template>
  <v-toolbar color="blue darken-1" dark flat fixed clipped-left app>
    <v-toolbar-side-icon v-if="side_icon && $store.state.session" @click.stop="side_icon_clicked">
      <v-icon>mdi-menu</v-icon>
    </v-toolbar-side-icon>
    <router-link to="/">
      <v-toolbar-title class="mr-5 align-center">
        <span class="blm-toolbar-title">Bloom</span> {{ secondary_title }}
      </v-toolbar-title>
    </router-link>

    <v-text-field
      v-if="display_searchbar && $store.state.session"
      :value="$store.state.search"
      flat
      small
      clearable
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      :label="searchbar_label"
      class="hidden-sm-and-down"
      @input="search"
    ></v-text-field>


    <v-spacer></v-spacer>

    <v-tooltip bottom v-if="$store.state.session">
      <v-btn slot="activator" icon to="/" class="hidden-xs-only">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <span>Bloom apps</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn slot="activator" icon href="https://help.bloom.sh" target="_blank" rel="noopener">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
      <span>Help</span>
    </v-tooltip>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="slide-y-transition"
      class="hidden-xs-only"
      v-if="$store.state.session"
      left
      >
      <v-btn icon slot="activator">
        <v-avatar size="40">
          <img v-if="$store.state.account" :src="$store.state.account.avatar" alt="Avatar">
          <img v-else src="/imgs/profile.jpg" alt="Avatar">
        </v-avatar>
      </v-btn>

      <v-card>
        <v-list>

          <v-list-tile avatar>

            <v-list-tile-avatar>
              <img v-if="$store.state.account" :src="$store.state.account.avatar" alt="Avatar">
              <img v-else src="/imgs/profile.jpg" alt="Avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>
                <span v-if="$store.state.account">
                  {{ $store.state.account.first_name }} {{ $store.state.account.last_name }}
                </span>
                <span v-else>Name</span>
              </v-list-tile-title>
              <v-list-tile-sub-title >
                <span v-if="$store.state.account">{{ $store.state.account.username }}</span>
                <span v-else>Username</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>


          <v-list-tile class="text-xs-center">
            <v-btn small
              color="primary"
              to="/account"
              id="menu-account"
              class="elevation-0"
              @click="menu = false">
              Account
            </v-btn>
          </v-list-tile>


        </v-list>
        <v-divider></v-divider>
        <div class="text-xs-center">
          <v-btn flat small @click="sign_out">Sign out</v-btn>
        </div>

      </v-card>
    </v-menu>
    <div v-else-if="$route.meta.onboarding !== true">
      <v-toolbar-items>

      <v-btn flat to="/sign_in" id="sign-in-btn">Sign in</v-btn>
      <v-btn outline dark to="/register" id="register-btn">Try it Free</v-btn>
    </v-toolbar-items>

    </div>

  </v-toolbar>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import api from '@/services/api';


@Component
export default class Toolbar extends Vue {
  // props
  // data
  menu = false;
  side_icon = true;
  display_searchbar = false;
  searchbar_label = 'Search';
  secondary_title = '';


  // computed
  // lifecycle
  created() {
    this.setup();
  }


  // watch
  @Watch('$route')
  on_route_change() {
    this.setup();
  }


  // methods
  sign_out() {
    api.sign_out();
  }

  side_icon_clicked() {
    this.$emit('click:side-icon');
  }

  setup() {
    switch (this.$route.meta.service) {
      case 'account':
        this.secondary_title = 'Account';
        this.side_icon = true;
        this.display_searchbar = false;
        break;
      case 'drive':
        this.secondary_title = 'Drive';
        this.side_icon = true;
        this.display_searchbar = true;
        this.searchbar_label = 'Search Drive';
        break;
      case 'platform':
        this.secondary_title = 'Platform';
        this.side_icon = true;
        this.display_searchbar = false;
        this.searchbar_label = '';
        break;
      case 'bitflow':
        this.secondary_title = 'Bitflow';
        this.side_icon = true;
        this.display_searchbar = false;
        this.searchbar_label = '';
        break;
      case 'notes':
        this.secondary_title = 'Notes';
        this.side_icon = true;
        // this.display_searchbar = true;
        // this.searchbar_label = 'Search Notes';
        break;
      case 'contacts':
        this.secondary_title = 'Contacts';
        this.side_icon = false;
        this.display_searchbar = true;
        this.searchbar_label = 'Search Contacts';
        break;
      default:
        this.secondary_title = '';
        this.side_icon = false;
        this.display_searchbar = false;
        this.searchbar_label = 'Search';
        break;
    }
    document.title = `Bloom ${this.secondary_title}`;
    if (!this.$route.meta.auth || this.$route.meta.auth.layout !== 'authenticated') {
      this.side_icon = false;
    }
  }

  search(q: string) {
    this.$store.commit('set_search', q);
  }
}
</script>


<style scoped lang="scss">
.blm-toolbar-menu-account {
  right: 20px;
  left: 0px;
}
.blm-toolbar-title {
  font-family: rounded_elegance;
}

.v-toolbar a {
  color: white;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
}

#menu-account {
  margin-left: calc(50% - 44px);
}

.v-content {
  height: 100%;
}

#register-btn, #sign-in-btn {
  height: 36px;
}
</style>
