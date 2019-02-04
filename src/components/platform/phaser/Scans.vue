<template>
  <div>
    <v-alert icon="mdi-alert-circle" :value="error" type="error" dismissible>
      {{ error }}
    </v-alert>

    <v-toolbar flat dense color="white">
      <v-toolbar-items>
        <v-btn outline color="primary" class="new-btn" @click="open_new_scan_dialog">
          <v-icon left>mdi-plus</v-icon>New scan
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
    :headers="headers"
    :items="scans"
    item-key="id"
    hide-actions
    :loading="is_loading">
      <template slot="no-data">
        <p class="text-xs-center">
          No scan yet
        </p>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.target }}</td>
        <td>{{ props.item.profile.toLowerCase() }}</td>
        <td>
          <span v-if="props.item.status === 'QUEUED'">
            Queued
          </span>
          <div v-else-if="props.item.status === 'SCANNING'">
            <v-progress-circular
              indeterminate
              :size="18"
              :width="2"
              color="primary"
            /> Running
          </div>
          <span v-else-if="props.item.last">
            {{ props.item.last | calendar }}
          </span>
          <span v-else>
            never
          </span>

        </td>
        <td></td>
        <td></td>
        <td class="justify-left layout px-0">

          <v-tooltip bottom>
            <v-btn
              v-if="props.item.reports.length !== 0"
              flat
              icon
              small
              color="grey darken-1"
              slot="activator"
              @click="goto_reports(props.item)"
            >
              <v-icon small>mdi-magnify</v-icon>
            </v-btn>
            <span>See reports</span>
          </v-tooltip>

           <v-tooltip bottom>
            <v-btn
              v-if="props.item.reports.length == 0"
              flat
              icon
              small
              color="grey darken-1"
              slot="activator"
              disabled
            >
              <v-icon small>mdi-magnify</v-icon>
            </v-btn>
            <span>No report yet</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-btn
              flat
              icon
              small
              color="grey darken-1"
              slot="activator"
              @click="queue_scan(props.item)"
              :disabled="props.item.status !== 'WAITING'"
            >
              <v-icon small>mdi-play</v-icon>
            </v-btn>
            <span>Run now</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-btn
              flat
              icon
              small
              color="grey darken-1"
              slot="activator"
              @click="delete_scan(props.item)"
              :disabled="props.item.status !== 'WAITING'"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <span>Delete</span>
          </v-tooltip>

        </td>
      </template>
    </v-data-table>

    <blm-dialog-phaser-newscan
    :visible="new_scan_dialog"
    @close="close_new_scan_dialog"
    @create="scan_created"/>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/services/api';
import router from '@/router';


@Component
export default class Scans extends Vue {
  error = '';
  new_scan_dialog = false;
  is_loading = false;
  scans: any[] = [];
  interval: any = null;
  headers = [
    {
      align: 'left',
      sortable: true,
      text: 'Name',
      value: 'name',
    },
    { text: 'Target', value: 'target', sortable: false },
    { text: 'Profile', value: 'profile', sortable: true },
    { text: 'Last run', value: 'updated_at', sortable: true },
    { text: 'Next run', value: 'updated_at', sortable: true },
    { text: 'Findings', value: 'findings', sortable: false },
    { text: 'Actions', sortable: false },
  ];


  created() {
    this.fetch_data();
    this.interval = setInterval(() => {
      this.fetch_data(false);
    }, 3000);
  }

  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }


  open_new_scan_dialog() {
    this.new_scan_dialog = true;
  }

  close_new_scan_dialog() {
    this.new_scan_dialog = false;
  }

  scan_created(scan: any) {
    this.scans.push(scan);
  }

  async fetch_data(loading?: boolean) {
    try {
      if (loading !== false) {
        this.error = '';
        this.is_loading = true;
      }
      const data = await api.query(
        api.PHASER_GRAPHQL,
        `query {
          scans {
            id
            name
            target
            status
            schedule
            profile
            last
            reports {
              id
            }
          }
        }
        `,
      );
      this.error = '';
      this.scans = data.scans;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  async delete_scan(scan: any) {
    this.error = '';
    try {
      this.is_loading = true;
      const scans = [scan.id];
      await api.mutate(
        api.PHASER_GRAPHQL,
        `mutation ($scans: [String!]!) {
          delete_scans(scans: $scans)
        }
        `,
        { scans },
      );
      this.scans = this.scans.filter((s: any) => scans.indexOf(s.id) === -1);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  async queue_scan(scan: any) {
    this.error = '';
    try {
      this.is_loading = true;
      const data = await api.mutate(
        api.PHASER_GRAPHQL,
        `mutation ($id: String!) {
          queue_scan(id: $id) {
            status
          }
        }
        `,
        { id: scan.id },
      );
      scan.status = data.queue_scan.status;
      const index = this.scans.map((s: any) => s.id).indexOf(scan.id);
      this.$set(this.scans, index, scan);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.is_loading = false;
    }
  }

  goto_reports(scan: any) {
    if (scan.reports.length === 0) {
      return;
    }
    const report_id = scan.reports[0].id;
    router.push({ path: `/platform/phaser/${scan.id}/reports/${report_id}` });
  }
}
</script>


<style scoped lang="scss">
.new-btn {
  height: 36px !important;
}
</style>
