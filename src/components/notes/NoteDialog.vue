<template>
  <v-dialog
    v-model="show"
    @keydown.esc="show = false"
    scrollable
    width="50%"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="headline">
        <v-text-field
          placeholder="Title"
          :disabled="is_loading"
          v-model="title"
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-alert icon="mdi-alert-circle" :value="error" type="error" dismissible>
          {{ error }}
        </v-alert>
        <v-textarea
          ref="notebody"
          v-model="body"
          placeholder="Take a note..."
          height="100%"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close" :disabled="is_loading">Cancel</v-btn>
        <v-btn
          color="primary"
          :loading="is_loading"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import api from '@/services/api';
const { log } = require('@bloom42/astro');

@Component
export default class NoteDialog extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  @Prop({ type: Object, default: null }) note!: any | null;


  // data
  error = '';
  is_loading = false;
  title = '';
  body = '';


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
  created() {
    if (this.note) {
      this.title = this.note.title;
      this.body = this.note.body;
    }
  }


  // watch
  @Watch('visible')
  on_visible_changed(is_visible: boolean) {
    if (is_visible) {
      this.$nextTick((this.$refs.notebody as any).focus);
    }
  }

  // methods
  save() {
    if (this.note) {
      this.update_note();
    } else {
      this.create_note();
    }
  }

  async create_note() {
    this.error = '';
    try {
      this.is_loading = true;
      const data = await api.mutate(
      api.NOTES_GRAPHQL,
      `mutation ($note: CreateNote!) {
        create_note(note: $note) {
          id
          created_at
          updated_at
          title
          body
          archived_at
          removed_at
        }
      }
      `,
      {
        note: {
          body: this.body,
          title: this.title,
        },
      },
      );
      this.$emit('create', data.create_note);
      this.close();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  async update_note() {
    this.error = '';
    try {
      this.is_loading = true;
      const data = await api.mutate(
      api.NOTES_GRAPHQL,
      `mutation ($note: UpdateNote!) {
        update_note(note: $note) {
          id
          created_at
          updated_at
          title
          body
          archived_at
          removed_at
        }
      }
      `,
      {
        note: {
          body: this.body,
          id: this.note.id,
          title: this.title,
        },
      },
      );
      this.$emit('update', data.update_note);
      this.close();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  close() {
    if (this.note === null) {
      this.title = '';
      this.body = '';
    }
    this.show = false;
  }
}
</script>


<style scoped lang="scss">
.notes-dialog-note {
  max-width: 50%;
}
</style>
