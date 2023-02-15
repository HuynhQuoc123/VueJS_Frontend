import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/layoutUser/Index.vue')
  },

  {
    path:"/admin",
    component: () => import("../components/layoutAdmin/Index.vue"),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',   
        component: () => import('../views/Admin/Dashboard.vue')
      },
      {
        path: 'categories',
        name: 'categories',   
        component: () => import('../views/Admin/Category/List.vue')    
      },
      {
        path: 'category/create',
        name: 'category.create',   
        component: () => import('../views/Admin/Category/Form.vue')    
      },
      {
        path: 'category/edit/:id',
        name: 'category.edit',
        component: () => import('../views/Admin/Category/Form.vue')
      },
      {
        path: 'products',
        name: 'product.list',
    
        component: () => import('../views/Admin/Product/List.vue')
      },
      {
        path: 'product/create',
        name: 'product.create',
    
        component: () => import('../views/Admin/Product/Form.vue')
      },
      {
        path: 'product/edit/:id',
        name: 'product.edit',
        component: () => import('../views/Admin/Product/Form.vue')
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
