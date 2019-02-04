import Index from '@/views/notes/Index.vue';
import ArchiveView from '@/views/notes/Archive.vue';
import TrashView from '@/views/notes/Trash.vue';

export default [
  {
    component: Index,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'notes',
    },
    path: '/notes',
  },
  {
    component: ArchiveView,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/notes',
        required: true,
      },
      service: 'notes',
    },
    path: '/notes/archive',
  },
  {
    component: TrashView,
    meta: {
      auth: {
        layout: 'authenticated',
        redirect: '/notes',
        required: true,
      },
      service: 'notes',
    },
    path: '/notes/trash',
  },
];
