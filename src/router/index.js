import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/order",
    name: "Order",
    redirect: { name: "Location" },
    /*
     * route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () =>
      import(/* webpackChunkName: "Order" */ "../views/OrderForm.vue"),
    children: [
      {
        path: "location",
        name: "Location",
        meta: { title: "location" },
        component: () =>
          import(
            /* webpackChunkName: "Location" */ "../components/order/Location.vue"
          ),
      },
      {
        path: "model",
        name: "Model",
        meta: { title: "model" },
        component: () =>
          import(
            /* webpackChunkName: "Model" */ "../components/order/Model.vue"
          ),
      },
      {
        path: "extra",
        name: "Extra",
        meta: { title: "extra" },
        component: () =>
          import(
            /* webpackChunkName: "Extra" */ "../components/order/Extra.vue"
          ),
      },
      {
        path: "amount",
        name: "Amount",
        meta: { title: "amount" },
        component: () =>
          import(
            /* webpackChunkName: "Amount" */ "../components/order/Amount.vue"
          ),
      },
      {
        path: "confirm-order",
        name: "Confirm",
        meta: { title: null },
        component: () =>
          import(
            /* webpackChunkName: "Confirm" */ "../components/order/ConfirmOrder.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export const useRouter = () => {
  return {
    routes,
    router,
  };
};

export default router;
