import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';



const routes = [

  {
    path: '/',
    name: 'index',
    component: () => import('../components/layoutUser/Index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/User/Home.vue')
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/User/Product.vue')
      },
      {
        path: '/product/:id',
        name: 'product.detail',
        component: () => import('../views/User/ProductDetail.vue')
      },

      {
        path: '/carts',
        name: 'carts',
        component: () => import('../views/User/CartList.vue')
      },

      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/User/Checkout.vue')
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: () => import('../views/User/OrderList.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Auth/Register.vue')
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('../views/Admin/LoginAdmin.vue')
  },

  {
    path: "/admin",
    component: () => import("../components/layoutAdmin/Index.vue"),
    meta: {
      authenticatedAdmin: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Admin/Dashboard.vue')
      },


      // producer__________________________________________________
      {
        path: 'producers',
        name: 'producers',
        component: () => import('../views/Admin/Producer/List.vue'),
        meta: {
          description: 'producer.view', 
          permissionId: 1
        }
      },
      {
        path: 'producer/create',
        name: 'producer.create',
        component: () => import('../views/Admin/Producer/Form.vue'),
        meta: {
          description: 'producer.create', 
          permissionId: 2
        }
      },
      {
        path: 'producer/edit/:id',
        name: 'producer.edit',
        component: () => import('../views/Admin/Producer/Form.vue'),
        meta: {
          description: 'producer.edit', 
          permissionId: 3
        }
      },
      //category____________________________________________________
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../views/Admin/Category/List.vue'),
        meta: {
          description: 'category.view', 
          permissionId: 5
        }
      },
      {
        path: 'category/create',
        name: 'category.create',
        component: () => import('../views/Admin/Category/Form.vue'),
        meta: {
          description: 'category.create', 
          permissionId: 6
        }
      },
      {
        path: 'category/edit/:id',
        name: 'category.edit',
        component: () => import('../views/Admin/Category/Form.vue'),
        meta: {
          description: 'category.edit', 
          permissionId: 7
        }
      },
      // product__________________________________________________
      {
        path: 'products',
        name: 'product.list',
        component: () => import('../views/Admin/Product/List.vue'),
        meta: {
          description: 'product.view',
          permissionId: 9
        }
      },
      {
        path: 'product/create',
        name: 'product.create',
        component: () => import('../views/Admin/Product/Form.vue'),
        meta: {
          description: 'product.create', 
          permissionId: 10
        }
      },
      {
        path: 'product/detail/:id',
        name: 'admin.product.detail',
        component: () => import('../views/Admin/Product/Detail.vue'),
        meta: {
          description: 'product.create', //them anh chi tiêt
          permissionId: 10
        }
      },
      {
        path: 'product/edit/:id',
        name: 'product.edit',
        component: () => import('../views/Admin/Product/Form.vue'),
        meta: {
          description: 'product.edit',
          permissionId: 11
        }
      },
      // order__________________________________________________
      {
        path: 'orders',
        name: 'order.list',
        component: () => import('../views/Admin/Order/List.vue'),
        meta: {
          description: 'order.view',
          permissionId: 13
        }
      },
      {
        path: 'orderDetail/:id',
        name: 'order.detail',
        component: () => import('../views/Admin/Order/OrderDetail.vue'),
        meta: {
          description: 'order.view',
          permissionId: 13
        }
      },
      //role
      {
        path: 'roles',
        name: 'roles',
        component: () => import('../views/Admin/Role/List.vue'),
        meta: {
          description: 'role.view',
          permissionId: 17
        }
      },
      {
        path: 'role/create',
        name: 'role.create',
        component: () => import('../views/Admin/Role/Form.vue'),
        meta: {
          description: 'role.create',
          permissionId: 18
        }
      },
      {
        path: 'role/edit/:id',
        name: 'role.edit',
        component: () => import('../views/Admin/Role/Form.vue'),
        meta: {
          description: 'role.edit',
          permissionId: 19
        }
      },
      //employee
      {
        path: 'employees',
        name: 'employees',
        component: () => import('../views/Admin/Employee/List.vue'),
        meta: {
          description: 'employee.view',
          permissionId: 21
        }
      },
      {
        path: 'employee/create',
        name: 'employee.create',
        component: () => import('../views/Admin/Employee/Form.vue'),
        meta: {
          description: 'employee.create',
          permissionId: 22
        }
      },
      {
        path: 'employee/edit/:id',
        name: 'employee.edit',
        component: () => import('../views/Admin/Employee/Form.vue'),
        meta: {
          description: 'employee.edit',
          permissionId: 23
        }
      },
    ]
  },


  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../components/404.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('../components/403.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;
  const userAuthenticated = localStorage.getItem('token') ? true : false;


  if (to.meta.authenticated && !userAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.authenticatedAdmin && !adminAuthenticated) {
    next({ name: 'admin.login' });
  } else {
    if (to.meta.permissionId) {
      const tokenAdmin = localStorage.getItem('tokenAdmin');
      if (tokenAdmin) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/admin`, {
            headers: {
              Authorization: `Bearer ${tokenAdmin}`
            }
          });
          const roles = response.data.roles
          let permissionsArray = [];
          roles.forEach(element => {
            permissionsArray.push(element.permissions);
          });
          let hasPermission = false;
          permissionsArray.forEach(permissions =>{
              hasPermission = permissions.some(permission => permission.id === to.meta.permissionId);
              // Nếu có permission thì tiếp tục điều hướng đến route đích
              if(hasPermission){
                next();
              }
          })
          if (!hasPermission) {              
            next({ name: '403' });    
            return;
          }
        } catch (error) {
          console.error(error);
          next({ name: 'login.admin' });
        }

      } else {
        next({ name: 'admin.login' });
      }
    } else {
      next();
    }
  }
});



export default router
