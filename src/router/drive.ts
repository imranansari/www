import IndexView from '@/views/drive/Index.vue';
import TrashView from '@/views/drive/Trash.vue';

export default [
  {
    component: IndexView,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'drive',
    },
    path: '/drive',
  },
  {
    component: IndexView,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/drive',
        required: true,
      },
      service: 'drive',
    },
    path: '/drive/folders/:folder_id',
  },
  {
    component: TrashView,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/drive',
        required: true,
      },
      service: 'drive',
    },
    path: '/drive/trash',
  },
];
