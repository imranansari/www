import IndexView from '@/views/account/Index.vue';
import SignInForm from '@/components/account/SignInForm.vue';
import RegisterForm from '@/components/account/RegisterForm.vue';
import UnauthenticatedLayout from '@/components/layouts/Unauthenticated.vue';
import AccountRecoveryRequestForm from '@/components/account/RequestRecoveryForm.vue';
import SecurityView from '@/views/account/Security.vue';
import DevicesView from '@/views/account/Devices.vue';
import AuditView from '@/views/account/Audit.vue';
import RecoveryForm from '@/components/account/RecoveryForm.vue';
import VerifyAccount from '@/components/account/Verify.vue';
import SetupUsernameForm from '@/components/account/SetupUsernameForm.vue';


export default [
  {
    component: SignInForm,
    meta: {
      auth: {
        forbidden: true,
      },
      layout: 'auth',
    },
    path: '/sign_in',
  },
  { path: '/login', redirect: '/sign_in' },
  { path: '/signin', redirect: '/sign_in' },

  // registration
  {
    component: RegisterForm,
    meta: {
      auth: {
        forbidden: true,
      },
      layout: 'auth',
    },
    path: '/register',
  },
  { path: '/signup', redirect: '/register' },
  { path: '/sign_up', redirect: '/register' },

  // onboarding
  {
    children: [
      { path: 'verify', component: VerifyAccount },
      { path: 'username', component: SetupUsernameForm },
    ],
    component: UnauthenticatedLayout,
    meta: {
      auth: {
        forbidden: true,
      },
      onboarding: true,
    },
    path: '/welcome',
  },

  // account recovery
  {
    component: RecoveryForm,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'account',
    },
    path: '/recovery',
  },
  {
    component: AccountRecoveryRequestForm,
    meta: {
      auth: {
        layout: 'authenticated',
      },
      layout: 'unauthenticated',
      service: 'account',
    },
    path: '/recovery/request',
  },

  {
    component: IndexView,
    meta: {
      auth: {
        layout: 'authenticated',
        required: true,
      },
      service: 'account',
    },
    path: '/account',
  },
  {
    component: SecurityView,
    meta: {
      auth: {
        layout: 'authenticated',
        required: true,
      },
      service: 'account',
    },
    path: '/account/security',
  },
  {
    component: DevicesView,
    meta: {
      auth: {
        layout: 'authenticated',
        required: true,
      },
      service: 'account',
    },
    path: '/account/devices',
  },
  {
    component: AuditView,
    meta: {
      auth: {
        layout: 'authenticated',
        required: true,
      },
      service: 'account',
    },
    path: '/account/audit',
  },
];
