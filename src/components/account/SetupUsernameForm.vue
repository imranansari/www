<template>
  <v-layout row wrap text-xs-center>
    <v-flex xs12 sm8 md6 offset-sm2 offset-md3 id="main" class="text-xs-center">
      <v-card class="elevation-0">
        <v-container fluid fill-height>
          <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <p>
                Your username is unique and cannot be changed. <br/>
                <br />
                We recommend to use the pattern <b>firstname.lastname</b> <br/>
                e.g. sylvain.kerkour
              </p>
            </v-flex>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
              v-model="username"
              label="Your username"
              :disabled="is_loading"
              outline
              :rules="username_rules"
              suffix="@bloom"
              @keyup.enter.native="complete_registration"
              @keyup="username_fn"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 text-xs-center>
              <v-alert icon="mdi-alert-circle" :value="error" type="error">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary" @click="complete_registration" :loading="is_loading">
                Complete registration
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import api from '@/services/api';


@Component
export default class SetupUsernameForm extends Vue {
  error = '';
  is_loading = false;
  token = '';
  pending_account_id = '';
  username = '';
  username_rules = [
    (v: string) => !!v || 'Username is required',
    (v: string) => (v && v.length > 3) || 'Username must be at leat 4 characters',
  ];


  created() {
    // verify that we have the correct values in store
    if (this.$store.state.pending_account) {
      if (this.$store.state.pending_account.id) {
        this.pending_account_id = this.$store.state.pending_account.id;
      }
      if (this.$store.state.pending_account.token) {
        this.token = this.$store.state.pending_account.token;
      }
    }

    if (!this.pending_account_id || !this.token) {
      router.push({ path: '/register' });
    }
  }

  async complete_registration() {
    this.error = '';

    const verification = {
      id: this.pending_account_id,
      token: this.token,
      username: this.username,
    };
    try {
      this.is_loading = true;
      const data = await api.mutate(
        api.ACCOUNT_GRAPHQL,
        `mutation ($verification: AccountVerification!) {
          verify_account(verification: $verification) {
            token
            id
          }
        }
        `,
        {
          verification,
        },
      );
      api.sign_in(data.verify_account);
      router.push({ path: '/' });
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  username_fn() {
    this.username = this.username.toLowerCase();
  }
}
</script>
