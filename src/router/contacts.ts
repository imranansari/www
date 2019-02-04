import Index from '@/views/contacts/Index.vue';

export default [
  {
    component: Index,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'contacts',
    },
    path: '/contacts',
  },
];
