import IndexView from '@/views/platform/Index.vue';
import PhaserRoutes from './phaser';

export default [
  {
    component: IndexView,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'platform',
    },
    path: '/platform',
  },
  ...PhaserRoutes,
];
