import Index from '@/views/bitflow/Index.vue';
import History from '@/views/bitflow/History.vue';

export default [
  {
    component: Index,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'bitflow',
    },
    path: '/bitflow',
  },
  {
    component: History,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/bitflow',
        required: true,
      },
      service: 'bitflow',
    },
    path: '/bitflow/history',
  },
];
