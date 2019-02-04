import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import Vuetify from 'vuetify';
const { log, Level } = require('@bloom42/astro');

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import api from '@/services/api';
import filters from '@/filters';

import VuetifyToast from '@/components/Toast';
Vue.use(VuetifyToast);
declare module 'vue/types/vue' {
  interface Vue {
    $toast: any;
  }
}

import DefaultLayout from '@/components/layouts/Default.vue';
import AuthLayout from '@/components/layouts/Auth.vue';
import UnauthenticatedLayout from '@/components/layouts/Unauthenticated.vue';
import AuthenticatedLayout from '@/components/layouts/Authenticated.vue';
import SignInForm from '@/components/account/SignInForm.vue';
import RegisterForm from '@/components/account/RegisterForm.vue';
import NameForm from '@/components/account/NameForm.vue';
import PasswordForm from '@/components/account/PasswordForm.vue';
import Toolbar from '@/components/bloom/Toolbar.vue';
import SessionList from '@/components/account/SessionList.vue';
import EmailForm from '@/components/account/EmailForm.vue';
import DriveCreateFolderDialog from '@/components/drive/CreateFolderDialog.vue';
import DriveFolder from '@/components/drive/Folder.vue';
import DriveLanding from '@/components/drive/Landing.vue';
import BloomLanding from '@/components/bloom/Landing.vue';
import Footer from '@/components/bloom/Footer.vue';
import DriveTrash from '@/components/drive/Trash.vue';
import DriveDrawer from '@/components/drive/Drawer.vue';
import DriveMoveDialog from '@/components/drive/MoveDialog.vue';
import BitflowLandig from '@/components/bitflow/Landing.vue';
import PlatformLanding from '@/components/platform/Landing.vue';
import BitflowDownlaods from '@/components/bitflow/Downloads.vue';
import BitflowDrawer from '@/components/bitflow/Drawer.vue';
import BitflowSettings from '@/components/bitflow/Settings.vue';
import BitflowHistory from '@/components/bitflow/History.vue';
import AccountDrawer from '@/components/account/Drawer.vue';
import PlatformDashboard from '@/components/platform/Dashboard.vue';
import PlatformDrawer from '@/components/platform/Drawer.vue';
import PhaserScans from '@/components/platform/phaser/Scans.vue';
import PhaserProfiles from '@/components/platform/phaser/Profiles.vue';
import PhaserNewScanDialog from '@/components/platform/phaser/NewScanDialog.vue';
import PhaserReport from '@/components/platform/phaser/Report.vue';
import PhaserReportsChart from '@/components/platform/phaser/ReportsChart.vue';
import BloomContributors from '@/components/bloom/Contributors.vue';
import NotesLanding from '@/components/notes/Landing.vue';
import NotesNotes from '@/components/notes/Notes.vue';
import NotesDrawer from '@/components/notes/Drawer.vue';
import NotesArchive from '@/components/notes/Archive.vue';
import NotesTrash from '@/components/notes/Trash.vue';
import NotesNoteDialog from '@/components/notes/NoteDialog.vue';
import NotesNote from '@/components/notes/Note.vue';
import ContactsLanding from '@/components/contacts/Landing.vue';
import ContactsContacts from '@/components/contacts/Contacts.vue';
import ContactsContact from '@/components/contacts/Contact.vue';


// import './registerServiceWorker';


// init sentry for bug tracking
Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_URL,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.Integrations.Vue({ Vue })],
});

// Check environement
[
  'NODE_ENV',
  'VUE_APP_SENTRY_URL',
  'VUE_APP_ROOT_DOMAIN',
].forEach((env_var) => {
  if (!env_var) {
    throw new Error(`Missing environment variable: ${env_var}`);
  }
});

// init stage dependant stuff
if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = true;
} else {
  Vue.config.productionTip = false;

  if (process.env.NODE_ENV === 'production') {
    log.config({ level: Level.INFO });
  }
}

log.with({ env: process.env }).debug('env loaded');

// init libraries and components
Vue.use(Vuetify, {
  iconfont: 'mdi',
  icons: {
    loading: 'mdi-loading',
  },
});


Vue.use(filters);

Vue.component('blm-layout-default', DefaultLayout);
Vue.component('blm-layout-auth', AuthLayout);
Vue.component('blm-layout-authenticated', AuthenticatedLayout);
Vue.component('blm-layout-unauthenticated', UnauthenticatedLayout);
Vue.component('blm-form-sign-in', SignInForm);
Vue.component('blm-form-register', RegisterForm);
Vue.component('blm-form-name', NameForm);
Vue.component('blm-form-email', EmailForm);
Vue.component('blm-form-password', PasswordForm);
Vue.component('blm-dialog-drive-create-folder', DriveCreateFolderDialog);
Vue.component('blm-landing-drive', DriveLanding);
Vue.component('blm-landing-bitflow', BitflowLandig);
Vue.component('blm-landing-platform', PlatformLanding);
Vue.component('blm-landing-bloom', BloomLanding);
Vue.component('blm-landing-notes', NotesLanding);
Vue.component('blm-landing-contacts', ContactsLanding);
Vue.component('blm-toolbar', Toolbar);
Vue.component('blm-footer', Footer);
Vue.component('blm-session-list', SessionList);
Vue.component('blm-drive-folder', DriveFolder);
Vue.component('blm-drive-trash', DriveTrash);
Vue.component('blm-drawer-drive', DriveDrawer);
Vue.component('blm-drawer-bitflow', BitflowDrawer);
Vue.component('blm-drawer-account', AccountDrawer);
Vue.component('blm-drawer-platform', PlatformDrawer);
Vue.component('blm-drawer-notes', NotesDrawer);
Vue.component('blm-move-dialog', DriveMoveDialog);
Vue.component('blm-bitflow-downloads', BitflowDownlaods);
Vue.component('blm-bitflow-history', BitflowHistory);
Vue.component('blm-bitflow-settings', BitflowSettings);
Vue.component('blm-platform-dashboard', PlatformDashboard);
Vue.component('blm-phaser-scans', PhaserScans);
Vue.component('blm-phaser-profiles', PhaserProfiles);
Vue.component('blm-dialog-phaser-newscan', PhaserNewScanDialog);
Vue.component('blm-phaser-report', PhaserReport);
Vue.component('blm-chart-phaser-reports', PhaserReportsChart);
Vue.component('blm-contributors', BloomContributors);
Vue.component('blm-notes-notes', NotesNotes);
Vue.component('blm-notes-archive', NotesArchive);
Vue.component('blm-notes-trash', NotesTrash);
Vue.component('blm-notes-note', NotesNote);
Vue.component('blm-dialog-note', NotesNoteDialog);
Vue.component('blm-contacts-contacts', ContactsContacts);
Vue.component('blm-contacts-contact', ContactsContact);


api.init();

new Vue({
  render: (h: any) => h(App),
  router,
  store,
}).$mount('#app');
