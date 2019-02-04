<template>
  <v-dialog
  v-model="show"
  max-width="400px"
  @keydown.esc="show = false"
  >
  <v-card>
    <v-card-title class="blue darken-1 white--text headline">
      New Folder
    </v-card-title>

    <v-card-text>
      <v-alert icon="mdi-alert-circle" :value="error" type="error" dismissible>
        {{ error }}
      </v-alert>
      <v-text-field
      label="Name"
      outline
      v-model="new_folder_name"
      :disabled="is_loading"
      @keyup.enter.native="create_folder"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click="show = false" :disabled="is_loading">Cancel</v-btn>
      <v-btn
      @click="create_folder"
      color="primary"
      :loading="is_loading"
      >
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
export default class CreateFolderDialog extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  @Prop({ type: Object, default: null }) parent!: any | null;


  // data
  error = '';
  is_loading = false;
  new_folder_name = '';


  // computed
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
  async create_folder() {
    this.error = '';

    if (!this.parent) {
      this.error = 'Error retrieving current folder.';
      return;
    }
    try {
      this.is_loading = true;
      const data = await api.mutate(
        api.DRIVE_GRAPHQL,
        `mutation ($folder: CreateFolder!) {
          create_folder(folder: $folder) {
            file {
              id
              created_at
              updated_at
              name
              type
              size
            }
          }
        }
        `,
        {
          folder: {
            name: this.new_folder_name,
            parent_id: this.parent.id,
          },
        },
      );
      this.$emit('create', data.create_folder.file);
      this.new_folder_name = '';
      this.show = false;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }
}
</script>
