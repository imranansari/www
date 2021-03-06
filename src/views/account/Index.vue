<template>
  <v-container>
  <v-layout row wrap justify-left>

    <v-flex xs12 v-if="initial_loading">
      <v-card class="elevation-0">
        <v-layout row wrap justify-center>
        <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
      </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 text-xs-center v-if="error">
      <v-alert icon="mdi-alert-circle" :value="error" type="error">
        {{ error }}
      </v-alert>
    </v-flex>

    <v-flex xs12 sm10 md8 xl7 v-if="me">
      <v-card class="elevation-0">
        <v-card-title>
          <div class="headline text-xs-left">
            Profile
          </div>
        </v-card-title>
        <v-container grid-list-xl text-xs-left>
          <v-layout row wrap>
            <v-flex xs12 sm3>
              <v-subheader>Avatar</v-subheader>
            </v-flex>
            <v-flex xs12 sm9>
              <v-hover>
                <v-avatar class="pointer" slot-scope="{ hover }" @click="open_avatar_upload">
                  <v-expand-transition>
                    <div
                    v-if="hover"
              class="d-flex transition-fast-in-fast-out black darken-2 white--text v-avatar--reveal"
                    style="height: 100%;"
                    >
                    Update
                  </div>
                </v-expand-transition>
                <img v-if="me.avatar" :src="me.avatar">
                <img v-else src="/imgs/profile.jpg" alt="Avatar">
              </v-avatar>
            </v-hover>
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            v-if="is_loading"
            ></v-progress-circular>
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12>
            <blm-form-name
            :firstname="me.first_name"
            :lastname="me.last_name"
            @update="update_name" />
          </v-flex>


          <v-flex xs12><v-divider></v-divider></v-flex>

          <v-flex xs12>
            <blm-form-email :email="me.email" @update="update_email"/>
          </v-flex>


          <v-flex xs12><v-divider></v-divider></v-flex>

          <v-flex hidden-xs-only sm3>
            <v-subheader>Username</v-subheader>
          </v-flex>
          <v-flex xs12 sm9>
            <v-text-field
            v-model="me.username"
            label="Username"
            disabled
            ></v-text-field>
          </v-flex>


        </v-layout>
      </v-container>
    </v-card>
  </v-flex>

<input type="file" class="avatar-upload" ref="avatarupload" v-on:change="upload_avatar()"/>
</v-layout>
</v-container>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/services/api';
const { log } = require('@bloom42/astro');

interface Name {
  first_name: string;
  last_name: string;
}

@Component
export default class Index extends Vue {
  error = '';
  initial_loading = false;
  is_loading = false;
  me: any | null = null;
  vm = new Vue();

  created() {
    this.fetch_data();
  }


  async fetch_data() {
      this.error = '';
      try {
        this.initial_loading = true;
        const data = await api.query(api.ACCOUNT_GRAPHQL, `query {
            me {
              avatar
              username
              first_name
              last_name
              email
            }
          }
          `);
        this.me = data.me;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.initial_loading = false;
      }
    }

    update_name(name: Name) {
      this.me!.first_name = name.first_name;
      this.me!.last_name = name.last_name;
    }

    update_email(email: string) {
      this.me.email = email;
    }

    open_avatar_upload() {
      const upload = this.$refs.avatarupload as HTMLElement;
      upload.click();
    }

    async upload_avatar() {
      const upload = this.$refs.avatarupload as any; // ugly

      if (upload.files.length < 1) {
        return;
      }
      const file = upload.files[0];

      this.error = '';
      const too_large = file.size > (3 * 1024 * 1024);
      if (too_large) {
        this.error = 'File size must be inferior or equal to 3MB';
        return;
      }
      const good_format = file.type === 'image/jpeg' || file.type === 'image/png';
      if (good_format !== true) {
        this.error = 'Image format must be png, jpg or jpeg';
        return;
      }
      const encoded = await this.encodeFileBase64(file);
      try {
        this.is_loading = true;
        const data = await api.mutate(
          api.ACCOUNT_GRAPHQL,
          `mutation ($update: AccountUpdate!) {
            update_account(update: $update) {
              avatar
            }
          }
          `,
          {
            update: {
              avatar: encoded,
            },
          },
        );
        this.me.avatar = data.update_account.avatar;
        this.$store.commit('set_account', data.update_account);
        this.$toast.success('Success', { icon: 'mdi-check-circle' });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.is_loading = false;
      }
    }

    encodeFileBase64(file: any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if ((reader.result as string).indexOf('data:image/jpeg;base64,') !== -1) {
            resolve((reader.result as string).substring(23));
          } else {
            resolve((reader.result as string).substring(22));
          }
        };
        reader.onerror = (error) => reject(error);
      });
    }
}
</script>

<style scoped lang="scss">
.v-avatar--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  border-radius: 50%;
}

.v-avatar {
  border: 1px solid #444;
}

.avatar-upload{
  display: none;
}
</style>
