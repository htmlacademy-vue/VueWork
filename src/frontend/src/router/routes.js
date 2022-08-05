import { auth, isAdmin, isLoggedIn } from '@/middlewares';

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      layout: 'AppLayoutDefault',
      middlewares: [isLoggedIn]
    }
  },
  {
    path: '/',
    name: 'IndexHome',
    component: () => import('../views/Index.vue'),
    meta: { layout: 'AppLayoutMain' },
    children: [
      {
        path: '/:id',
        name: 'TaskView',
        component: () => import('../views/TaskView.vue'),
        meta: { layout: 'AppLayoutMain' }
      }
    ]
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: () => import('../views/TaskCreate.vue'),
    meta: {
      layout: 'AppLayoutDefault',
      middlewares: [auth, isAdmin]
    }
  },
  {
    path: '/tasks/edit/:id',
    name: 'TaskEdit',
    component: () => import('../views/TaskEdit.vue'),
    meta: {
      layout: 'AppLayoutDefault',
      middlewares: [auth, isAdmin]
    }
  }
];
