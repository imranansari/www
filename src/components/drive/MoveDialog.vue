<template>
  <v-dialog v-model="show" max-width="400px" @keydown.esc="close" scrollable>
    <v-card>
    <v-card-title class="indigo white--text headline">
      User Directory
    </v-card-title>
    <v-card-text style="height: 400px;">
      <v-alert icon="mdi-alert-circle" :value="error" type="error" dismissible>
        {{ error }}
      </v-alert>
    <v-layout
      justify-space-between
      pa-3
    >
      <v-flex>
        <v-treeview
          :active.sync="to"
          :items="items"
          item-key="id"
          :load-children="fetch_folder"
          :open.sync="open"
          activatable
          class="grey lighten-5"
          indeterminate-icon="mdi-loading"
        >
          <v-icon
            v-if="!item.children"
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >mdi-account</v-icon>
        </v-treeview>
      </v-flex>
    </v-layout>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn flat @click="close" :disabled="is_loading">Cancel</v-btn>
    <v-btn
    @click="move"
    color="primary"
    :loading="is_loading"
    :disabled="!can_move"
    >
    Move
  </v-btn>
</v-card-actions>
  </v-card>
  </v-dialog>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/services/api';


@Component
export default class MoveDialog extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  @Prop({ type: Array, default: [] }) selected!: any[];


  // data
  error = '';
  is_loading = false;
  to = [];
  avatar = null;
  open = [];
  users = [];
  folders = [];


  // computed
  get items() {
    if (this.$store.state.drive_profile) {
      return [{
        children: this.folders,
        id: this.$store.state.drive_profile.home,
        name: 'My Drive',
      }];
    }
    return [];
  }

  get can_move() {
    if (this.to.length === 1 && this.to) {
      return true;
    }
    return false;
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
  async fetch_folder(file: any) {
    this.error = '';
    try {
      this.is_loading = true;
      const id = file ? file.id : undefined;
      const data = await api.query(
        api.DRIVE_GRAPHQL,
        `query($id: String) {
          folder(id: $id) {
            file {
              id
              type
              name
            }
            children {
              id
              name
              type
            }
          }
        }
        `,
        { id },
      );

      const children = data.folder.children.map((child: any) => {
        child.children = [];
        return child;
      });
      if (file) {
        file.children.push(...children);
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  async move() {
    this.error = '';
    if (!this.can_move) {
      return;
    }
    try {
      this.is_loading = true;
      const files = this.selected.map((f: any) => f.id);
      const to = this.to[0];
      await api.mutate(
        api.DRIVE_GRAPHQL,
        `mutation ($move: Move!) {
          move(move: $move)
        }
        `,
        {
          move: { files, to },
        },
      );
      this.$emit('move', to);
      this.close();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  close() {
    this.show = false;
    this.folders = [];
    this.to = [];
    this.$emit('close');
  }
}
</script>
