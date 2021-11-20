# Project routing
In the project we added a dynamic routing.
That is mean that you do not need to change routing by yourself.
Instead, routes will be added automatically once you add
a new page into views directory.

## How to add new pages
Automatic router will read your `views` directory and create appropriate routes.
For example:
```
--views
----index.vue
```
will create a next routes
```
[{
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    meta: {
        layout: 'AppDefaultLayout'
        middlewares: {}
    },
    children: []
}]
```
To create more difficult structure, see next example:
```
--views
----index
------index.vue
------user.vue
----profile.vue
```
```
[
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: []
    }
]
```

If you need dynamic parameter in your view, it needs to start your component with `_`
For example:
```
--views
----posts
------index.vue
------_id.vue
```
will create next structure
```
[
    {
        path: '/',
        name: 'Posts',
        component: () => import('@/views/posts/index.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/posts/:id',
        name: 'PostsId',
        component: () => import('@/views/posts/_id.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: []
    }
]
```
To add children (nested routes) to your should start your route with `^`
```
--views
----index
------index.vue
------^post.vue
```
```
[
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
            layout: 'AppDefaultLayout'
            middlewares: {}
        },
        children: [
            path: '/post',
            component: () => import('@/views/^post.vue')
        ]
    }
]
```
