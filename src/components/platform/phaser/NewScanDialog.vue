<template>
  <v-dialog
  v-model="show"
  max-width="400px"
  @keydown.esc="show = false"
  >
    <v-card>
      <v-card-title class="blue darken-1 white--text headline">
        New scan
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12>
              <v-alert icon="mdi-alert-circle" :value="error" type="error" dismissible>
                {{ error }}
              </v-alert>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Name"
                v-model="name"
              />
            </v-flex>

            <v-flex xs12 class="pt-3">
              <v-select
                :items="profiles"
                box
                label="Profile"
                v-model="profile"
              />
            </v-flex>

            <v-flex xs12 class="pt-3">
              <v-select
                :items="schedule_enum"
                box
                label="Schedule"
                v-model="schedule"
              />
            </v-flex>

            <v-flex xs12>
              <v-text-field
                label="Target"
                v-model="target"
              />
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close" :disabled="is_loading">Cancel</v-btn>
        <v-btn
          @click="create"
          color="primary"
          :loading="is_loading"
          :disabled="!can_create">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/services/api';


@Component
export default class NewScanDialog extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) visible!: boolean;


  // data
  error = '';
  is_loading = false;
  profiles = ['network', 'application'];
  schedule_enum = ['daily', 'weekly', 'monthly', 'never'];
  name = '';
  profile = '';
  schedule = 'daily';
  target = '';

  // computed
  get can_create() {
    return this.name !== '' && this.profile !== '' && this.target !== '';
  }

  get show() {
    return this.visible;
  }

  set show(value) {
    if (!value) {
      this.$emit('close');
    }
  }


  // lifecycle
  // watch
  // methods
  close() {
    this.reset();
    this.show = false;
  }

  async create() {
    this.error = '';

    try {
      const profile = this.profile.toUpperCase();
      const schedule = this.schedule.toUpperCase();
      this.is_loading = true;
      const data = await api.mutate(
        api.PHASER_GRAPHQL,
        `mutation ($scan: NewScan!) {
          create_scan(scan: $scan) {
            id
            name
            target
            status
            schedule
            profile
            last
            reports {
              id
              created_at
              high_level_findings
              medium_level_findings
              low_level_findings
            }
          }
        }
        `,
        {
          scan: {
            description: '',
            name: this.name,
            profile,
            schedule,
            target: this.target,
          },
        },
      );
      this.$emit('create', data.create_scan);
      this.close();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  reset() {
    this.name = '';
    this.error = '';
    this.profile = '';
    this.schedule = 'daily';
    this.target = '';
  }
}
</script>
