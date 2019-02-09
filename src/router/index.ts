import Vue from 'vue';
import Router from 'vue-router';

import api from '@/services/api';

import Index from '@/views/Index.vue';
import About from '@/views/about/Index.vue';
import Contact from '@/views/contact/Index.vue';
import Security from '@/views/security/Index.vue';
import Beta from '@/views/Beta.vue';


import AccountRoutes from './account';
import DriveRoutes from './drive';
import PlatformRoutes from './platform';
import BitflowRoutes from './bitflow';
import NotesRoutes from './notes';
import ContactsRoutes from './contacts';
import CalendarRoutes from './calendar';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      component: Index,
      meta: {
        auth: {
          layout: 'authenticated',
        },
        layout: 'unauthenticated',
      },
      path: '/',
    },
    {
      component: About,
      meta: {
        auth: {
          layout: 'authenticated',
        },
        layout: 'unauthenticated',
      },
      path: '/about',
    },
    {
      component: Contact,
      meta: {
        auth: {
          layout: 'authenticated',
        },
        layout: 'unauthenticated',
      },
      path: '/contact',
    },
    {
      component: Security,
      meta: {
        auth: {
          layout: 'authenticated',
        },
        layout: 'unauthenticated',
      },
      path: '/security',
    },
    {
      component: Beta,
      meta: {
        auth: {
          layout: 'authenticated',
        },
        layout: 'unauthenticated',
      },
      path: '/beta',
    },
    ...AccountRoutes,
    ...DriveRoutes,
    ...PlatformRoutes,
    ...BitflowRoutes,
    ...NotesRoutes,
    ...ContactsRoutes,
    ...CalendarRoutes,
    { path: '**', redirect: '/' },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.auth && to.meta.auth.required === true) {
    if (api.is_authenticated() === true) {
      next();
    } else if (to.meta.auth.redirect) {
      next({ path: to.meta.auth.redirect });
    } else {
      next({ path: '/sign_in' });
    }
  } else if (to.meta.auth && to.meta.auth.forbidden) {
    if (api.is_authenticated()) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }

  // if (to.meta.auth === true) { // auth required
  //   if (api.is_authenticated() !== true) {
  //     if (to.meta.unauthenticated) {
  //       to.meta.layout = 'unauthenticated';
  //       next({ path: to.meta.unauthenticated });
  //     } else {
  //       next({ path: '/sign_in' });
  //     }
  //   } else {
  //     next();
  //   }
  // } else if (to.meta.auth === false) { // auth forbidden
  //   if (api.is_authenticated()) {
  //     next({ path: '/' });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
});

export default router;
