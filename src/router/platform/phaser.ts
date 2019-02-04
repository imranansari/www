import Index from '@/views/platform/phaser/Index.vue';
import Profiles from '@/views/platform/phaser/Profiles.vue';
import Report from '@/views/platform/phaser/Report.vue';


export default [
  {
    component: Index,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'platform',
    },
    path: '/platform/phaser',
  },
  {
    component: Report,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/platform/phaser',
        required: true,
      },
      service: 'platform',
    },
    path: '/platform/phaser/:scan_id/reports/:report_id',
  },
  {
    component: Profiles,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/platform/phaser',
        required: true,
      },
      service: 'platform',
    },
    path: '/platform/phaser/profiles',
  },
];
