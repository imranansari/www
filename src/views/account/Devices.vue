<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md10 v-if="sessions.length !== 0">
        <blm-session-list
        :sessions="sessions"
        :current="current_session"
        @update="update_sessions"/>
      </v-flex>
      <v-flex xs12 sm10 md8 xl7 v-else>
          <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/services/api';
const { log } = require('@bloom42/astro');


@Component
export default class Sessions extends Vue {
  private current_session: object | null = null;
  private is_loading = false;
  private sessions: any[] = [];

  created() {
    this.current_session = this.$store.state.session;
    this.fetch_data();
  }


  private update_sessions(sessions: any[]) {
    this.sessions = sessions;
  }

  private async fetch_data() {
    try {
      this.is_loading = true;
      const data = await api.query(
        api.ACCOUNT_GRAPHQL,
        `query {
        me {
          sessions {
            id
            created_at
            ip
            location {
              city_name
              country_name
            }
            device {
              type
              browser {
                name
                version
              }
              os {
                name
                version
              }
            }
          }
        }
      }`,
      );
      this.sessions = data.me.sessions;
     } catch (err) {
       log.error(err);
     } finally {
       this.is_loading = false;
     }
  }
}
</script>
