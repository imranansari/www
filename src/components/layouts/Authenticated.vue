<template>
  <div id="layout-wrapper">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      width="250">

      <v-img class="hidden-lg-and-up pointer" :aspect-ratio="16/6"
      @click="goto('/account'); drawer = false"
        src="/imgs/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-avatar>
            <img v-if="$store.state.account" :src="$store.state.account.avatar" alt="Avatar">
            <img v-else src="/imgs/profile.jpg" alt="Avatar">
          </v-avatar>
          <v-flex shrink>
            <div class="subheading">
              <span v-if="$store.state.account">
                {{ $store.state.account.first_name }} {{ $store.state.account.last_name }}
              </span>
              <span v-else>Name</span>
            </div>
            <div class="body-1">
              <span v-if="$store.state.account">{{ $store.state.account.username }}</span>
              <span v-else>Username</span>
            </div>
          </v-flex>
        </v-layout>
      </v-img>

      <blm-drawer-drive v-if="$route.meta.service === 'drive'" />
      <blm-drawer-bitflow v-else-if="$route.meta.service === 'bitflow'" />
      <blm-drawer-account v-else-if="$route.meta.service === 'account'" />
      <blm-drawer-platform v-else-if="$route.meta.service === 'platform'" />
      <blm-drawer-notes v-else-if="$route.meta.service === 'notes'" />

    </v-navigation-drawer>


    <blm-toolbar @click:side-icon="drawer = !drawer" />


    <v-content>
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-content>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';
import { Route } from 'vue-router';


@Component
export default class Authenticated extends Vue {
  // props
  // data
  drawer = false;
  select_project_dialog = false;


  // computed
  // lifecycle
  created() {
    this.setup(false);
    // if (this.$vuetify.breakpoint.smAndDown) {
    //   this.drawer = false;
    // } else {
    //   this.drawer = true;
    // }
  }


  // watch
  @Watch('$route')
  on_route_change(_: Route, prev: Route) {
    let wasOpen = false;
    if (typeof prev.meta.service === 'string') {
      wasOpen = true;
    }

    this.setup(wasOpen);
  }


  // methods
  goto(path: string) {
    router.push({ path });
  }

  // TODO: close drawer on homepage resize
  setup(wasOpen: boolean) {
    if (typeof this.$route.meta.service !== 'string' && this.$route.meta.service !== '') {
      this.drawer = false; // close for homepage
    }
    if (this.$vuetify.breakpoint.mdAndDown || wasOpen) {
      return; // do not reopen on every route change within each service route
    }

    switch (this.$route.meta.service) {
      case 'account':
        this.drawer = true;
        break;
      case 'drive':
        this.drawer = true;
        break;
      case 'bitflow':
        this.drawer = true;
        break;
      case 'platform':
        this.drawer = true;
        break;
      case 'notes':
        this.drawer = true;
        break;
      case 'contacts':
        this.drawer = false;
        break;
      default:
        this.drawer = false;
        break;
    }
  }
}
</script>


<style scoped lang="scss">
.v-toolbar a {
  color: white;
  text-decoration: none;
}

#menu-account {
  margin-left: calc(50% - 44px);
}

#layout-wrapper {
  height: 100%;
}

.v-content {
  height: 100%;
}

.lightbox {
  box-shadow: 0 0 40px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
